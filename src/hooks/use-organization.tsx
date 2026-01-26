import { create } from "zustand";
import { Organization, Opportunity, ApplicantInformation, ProfileInformation } from "@/components/types";
import { toast } from "./use-toast";
import useAuthStore from "./use-auth";
import { API_URL } from "../config";

export interface OrganizationPrompt {
    prompt_key: string;
    custom_text: string;
}
const devurl = 'http://127.0.0.1:8000'
interface OrgStore {
    organizations: Organization[];
    opportunities:Opportunity[],
    all_opportunities:Opportunity[],
    applicants: ApplicantInformation[]
    loading: boolean;
    all_organization:Organization[],
    user_applications:ApplicantInformation[],
    currentOrganization:Partial<Organization>
    applicantsByOpportunity: Record<string, ApplicantInformation[]>;
    organizatonMembers: ProfileInformation[];
    orgPrompts: OrganizationPrompt[],
    upsertOrgPrompt: (
        orgId: string,
        prompt: OrganizationPrompt,
        token: string
    ) => Promise<void>;
    fetchOrgPrompts: (orgId: string, token: string) => Promise<void>;
    fetchMyOrganizations: (token: string) => Promise<void>;
    fetchOrganizationsOpportunity:(org_id:string)=>Promise<void>;
    postOpportunity: (org:Partial<Opportunity>,token:string)=>Promise<void>;
    deleteOpportunity: (opportunityId: string, orgId: string, token: string)=>Promise<void>;
    fetchAllOpportunity:()=>Promise<void>
    editOpportunity: (opportunity: Partial<Opportunity>, token: string,opp_id:string,org_id:string)=>Promise<void>;
    findAllApplicants:(org_id:string,opp_id:string)=>Promise<void>;
    applyToOpportunity:(token:string, application)=>Promise<void>;
    fetchAllOrganizations:()=>Promise<void>
    findUserApplicants:()=>Promise<void>
    editOrganization: (org_id:string,organization:Partial<Organization>,token:string)=>Promise<void>
    fetchOrganizationDashboard: (orgId:string, token:string)=>Promise<void>
    fetchGeneralDashboard:(orgId:string)=>Promise<void>
    fetchOrganizationMembers:(orgId:string)=>Promise<void>
    addOrganizationMember:(orgId:string,userId:string,role:string)=>Promise<void>
    removeOrganizationMember: (orgId: string, userId: string) => Promise<void>


}

export const useOrganizationStore = create<OrgStore>((set,get) => ({
    organizations: [],
    opportunities:[],
    loading: false,
    all_opportunities:[],
    applicants:[],
    applicantsByOpportunity:{},
    all_organization:[],
    user_applications:[],
    currentOrganization:null,
    organizatonMembers:[],
    orgPrompts: [],
    fetchMyOrganizations: async (token: string) => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/org/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data, 'is the data')
            set({ organizations: Array.isArray(data) ? data : [] });
        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    },
    fetchOrganizationsOpportunity: async (org_id:string) => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/org/${org_id}/opportunities`, {

            });
            const data = await res.json();
            console.log(data,'is this empty?')
            set({ opportunities: data || []});
        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    },
    postOpportunity: async (opportunity:Partial<Opportunity>,token:string) =>{
        set({ loading: true });

        try{
            console.log(opportunity,' is the response')
            const org_id = opportunity.org_id
            const response = await fetch(`${API_URL}/org/${org_id}/opportunities`,{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify(opportunity)
            })
            const data = await response.json()
            console.log(data)
            set({
                opportunities: [...get().opportunities, data],
            });
        }
        catch(err){
            console.error("Failed to post opportunity:", err);
        }
        finally{
            set({loading:false})
        }
    },
    deleteOpportunity: async (opportunityId: string, orgId: string, token: string) => {
        set({ loading: true });

        try {
            const response = await fetch(`${API_URL}/org/${orgId}/opportunities/${opportunityId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                set({
                    opportunities: get().opportunities.filter(o => o.id !== opportunityId),
                });
                console.log(`Opportunity ${opportunityId} deleted successfully.`);
            } else {
                const errorData = await response.json();
                console.error("Failed to delete opportunity:", errorData);
            }
        } catch (err) {
            console.error("Error deleting opportunity:", err);
        } finally {
            set({ loading: false });
        }
    },

    fetchAllOpportunity: async () => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/general/opportunity`, {
                method:"GET",

            });

            let data = await res.json();
            console.log(data,'is the data')
            if(data == null){
                data = []
            }

            set({ all_opportunities: data });
        
        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    },
    editOpportunity: async (opportunity: Partial<Opportunity>, token: string,opp_id,org_id) => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/org/${org_id}/opportunities/${opp_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(opportunity)
            });

            const data = await res.json();
            console.log(data, 'is the data')
            set({
                opportunities: get().opportunities.map(o =>
                    o.id === data.id ? data : o
                ),
            });
        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    },
    findAllApplicants: async (org_id,opp_id) => {
        try {
            const token = useAuthStore.getState().token;
            const res = await fetch(`${API_URL}/org/${org_id}/opportunities/${opp_id}/applicants`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`                },
            });

            const data = await res.json();
            console.log(data, 'is the data')
            set(state => ({
                applicantsByOpportunity: {
                    ...state.applicantsByOpportunity,
                    [opp_id]: data,
                },
            }))
        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
        }
    },
    findUserApplicants: async () => {
        const token = useAuthStore.getState().token;

        set({ loading: true });

        try {
            const res = await fetch(`${API_URL}/general/myapplications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch user applications");
            }

            const data = await res.json();

            set({ user_applications: data });
        } catch (err) {
            console.error(err);
        } finally {
            set({ loading: false });
        }
    },
    applyToOpportunity: async (token, application) => {
        set({ loading: true });
        set((state) => ({
            user_applications: [
                ...state.user_applications,
                application,
            ],
        }));
        try {
            const res = await fetch(`${API_URL}/org/${application.org_id}/opportunities/${application.opportunity_id}/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(application)
            });

            const data = await res.json();
            console.log(data, 'is the data')
            
            if(!res.ok){
                console.log("Running here")
                throw new Error("Already Applied Error")
            }
            set({ applicants: data });
        } finally {
            set({ loading: false });
        }
    },
    fetchAllOrganizations: async () => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/general/orgs`, {
                method: "GET",

            });

            const data = await res.json();
            console.log(data, 'is the data')

            set({ all_organization: data || [] });

        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    },
    editOrganization: async (org_id:string,organization:Partial<Organization>, token:string) =>{
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/org/${org_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(organization)
            });

            const data = await res.json();
            console.log(data, 'is the data')


            set({ currentOrganization: data });
            console.log(data)
        } catch (err) {
            console.error("Failed to update organization", err);
        } finally {
            set({ loading: false });
        }
    }
    ,
    fetchOrganizationDashboard: async (orgId, token) => {
        const res = await fetch(`${API_URL}/org/${orgId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        if (res.ok) {
            const data = await res.json();
            set({ currentOrganization: data });
            console.log(data, ' IS THE DATA')
        } else {
            set({ currentOrganization: null });
        }
    },
    fetchGeneralDashboard: async (orgId) => {
        const res = await fetch(`${API_URL}/org/${orgId}/public`, {
        });
        console.log(res)
        if (res.ok) {
            const data = await res.json();
            set({ currentOrganization: data });
            console.log(data)
        } else {
            set({ currentOrganization: null });
        }
    },
    fetchOrganizationMembers : async (orgId) => {
        const res = await fetch(`${API_URL}/org/${orgId}/members`, {
            // headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res)
        if (res.ok) {
            const data = await res.json();
            set({ organizatonMembers: data });
            console.log(data)
        } else {
            set({ organizatonMembers: null });
        }
    },
    fetchOrgPrompts: async (orgId: string, token: string) => {
        try {
            const res = await fetch(`${API_URL}/org/${orgId}/prompts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch prompts");

            const data: OrganizationPrompt[] = await res.json();

            const defaultPrompts: OrganizationPrompt[] = [
                { prompt_key: "what_it_is", custom_text: "What It Is" },
                { prompt_key: "who_its_for", custom_text: "Who It's For" },
                { prompt_key: "why_it_exists", custom_text: "Why It Exists" },
                { prompt_key: "how_it_operates", custom_text: "How It Operates" },
            ];

            const dbPromptMap = new Map(
                (Array.isArray(data) ? data : []).map(p => [p.prompt_key, p])
            );

            const mergedPrompts = defaultPrompts.map(defaultPrompt => {
                return dbPromptMap.get(defaultPrompt.prompt_key) ?? defaultPrompt;
            });

            if (data.length === 0) {
                await fetch(`${API_URL}/org/${orgId}/prompts`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ prompts: defaultPrompts }),
                });
            }

            set({ orgPrompts: mergedPrompts });
        } catch (err) {
            console.error("Failed to fetch org prompts", err);
        }
    },

 upsertOrgPrompt: async (orgId, prompt, token) => {
        try {
            const res = await fetch(`${API_URL}/org/${orgId}/prompts`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(prompt),
            });

            if (!res.ok) throw new Error("Failed to save prompt");

            set(state => ({
                orgPrompts: [
                    ...state.orgPrompts.filter(p => p.prompt_key !== prompt.prompt_key),
                    prompt,
                ],
            }));
        } catch (err) {
            console.error("Failed to upsert org prompt", err);
        }
    },
    addOrganizationMember: async (orgId: string, userId: string, role: string) => {
        const res = await fetch(`${API_URL}/org/${orgId}/members`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, role :role}),
        });

        if (res.ok) {
            const newMember = await res.json();
            set({ organizatonMembers: [newMember, ...get().organizatonMembers] });
        } else {
            const error = await res.json();
            alert(error.detail || 'Failed to add member');
        }
    },

    removeOrganizationMember: async (orgId: string, userId: string) => {
        const res = await fetch(`${API_URL}/org/${orgId}/members`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId }),
        });

        if (res.ok) {
            set({
                organizatonMembers: get().organizatonMembers.filter((m) => m.id !== userId),
            });
        } else {
            const error = await res.json();
            alert(error.detail || 'Failed to remove member');
        }
    }

}));
