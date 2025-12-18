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
    applicantsByOpportunity: Record<string, ApplicantInformation[]>;
    fetchMyOrganizations: (token: string) => Promise<void>;
    fetchOrganizationsOpportunity:(org_id:string)=>Promise<void>;
    postOpportunity: (org:Partial<Opportunity>,token:string)=>Promise<void>;
    fetchAllOpportunity:()=>Promise<void>
    editOpportunity: (opportunity: Partial<Opportunity>, token: string,opp_id:string,org_id:string)=>Promise<void>;
    findAllApplicants:(org_id:string,opp_id:string)=>Promise<void>;
    applyToOpportunity:(token:string, application)=>Promise<void>;
    fetchAllOrganizations:()=>Promise<void>



}

export const useOrganizationStore = create<OrgStore>((set,get) => ({
    organizations: [],
    opportunities:[],
    loading: false,
    all_opportunities:[],
    applicants:[],
    applicantsByOpportunity:{},
    all_organization:[],
    fetchMyOrganizations: async (token: string) => {
        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/org/my`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data)
            set({ organizations: data.organizations });
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
            console.log(data)
            set({ opportunities: data });
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
            const res = await fetch(`${API_URL}/org`, {
                method:"GET",

            });

            const data = await res.json();
            console.log(data,'is the data')
            const cleaned = data.map(element => ({
                ...element,
                org_id: element.PK.replace("ORG#", "")
            }));
            console.log(cleaned)
            set({ all_opportunities: cleaned });
        
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
                opportunities: [...get().opportunities, data],
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
    applyToOpportunity: async (token, application) => {
        set({ loading: true });
        console.log(application)
        try {
            const res = await fetch(`${API_URL}/org/${application.org_id}/opportunities/${application.opp_id}/apply`, {
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
            const res = await fetch(`${API_URL}/general/org`, {
                method: "GET",

            });

            const data = await res.json();
            console.log(data, 'is the data')

            set({ all_organization: data });

        } catch (err) {
            console.error("Failed to load organizations:", err);
        } finally {
            set({ loading: false });
        }
    }


}));
