import { create } from "zustand";
import { Organization,Opportunity, ApplicantInformation } from "@/components/types";
import { toast } from "./use-toast";
import useAuthStore from "./use-auth";
import { API_URL } from "../config";

interface OrgStore {
    organizations: Organization[];
    opportunities:Opportunity[],
    all_opportunities:Opportunity[],
    applicants: ApplicantInformation[]
    loading: boolean;
    all_organization:Organization[],
    user_applications:ApplicantInformation[],
    currentOrganization:Organization
    applicantsByOpportunity: Record<string, ApplicantInformation[]>;
    fetchMyOrganizations: (token: string) => Promise<void>;
    fetchOrganizationsOpportunity:(org_id:string)=>Promise<void>;
    postOpportunity: (org:Partial<Opportunity>,token:string)=>Promise<void>;
    fetchAllOpportunity:()=>Promise<void>
    editOpportunity: (opportunity: Partial<Opportunity>, token: string,opp_id:string,org_id:string)=>Promise<void>;
    findAllApplicants:(org_id:string,opp_id:string)=>Promise<void>;
    applyToOpportunity:(token:string, application)=>Promise<void>;
    fetchAllOrganizations:()=>Promise<void>
    findUserApplicants:()=>Promise<void>
    editOrganization: (org_id:string,organization:Partial<Organization>,token:string)=>Promise<void>
    fetchOrganizationDashboard: (orgId:string, token:string)=>Promise<void>




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
            const org_id = opportunity.id
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

        if (res.ok) {
            const data = await res.json();
            set({ currentOrganization: data });
        } else {
            set({ currentOrganization: null });
        }
    },



}));
