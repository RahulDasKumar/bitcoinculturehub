/* 

use organizatoin is fairly bloated. So to increase readability im going to add
functions that are not tied directly to an organization but organzation adjacent into this file

I dont imagine this file being large, but lets see how it goes. 
*/ 

import { create } from "zustand";
const devurl = 'http://127.0.0.1:8000'
import { API_URL } from "../config";
import useAuthStore from "./use-auth";
import { Opportunity } from "@/components/types";


interface OpportunityStore{
    selected_opportunity:Opportunity,
    loading:boolean,
    getOpportunity: (org_id: string,opp_id: string)=>Promise<void>
}

export const useOpportunity = create<OpportunityStore>((set, get) => ({
    selected_opportunity: null,
    loading: false,

    getOpportunity: async (org_id: string, opp_id: string) => {
        set({ loading: true })

        try {
            const res = await fetch(
                `${API_URL}/org/${org_id}/opportunities/${opp_id}`
            )

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()

            set({ selected_opportunity: data ?? null })
        } catch (err) {
            console.error('failed to load opportunity', err)
            set({ selected_opportunity: null })
        } finally {
            set({ loading: false })
        }
    },
}))


