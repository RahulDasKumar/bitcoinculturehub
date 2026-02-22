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


interface InterviewSlot {
    date: Date;
    time: string;
}

interface InterviewSlotResponse {
    id: string;
    opportunity_id: string;
    applicant_id: string;
    interview_datetime: string;
    org_name:string;
    opportunity_title:string;
    meeting_link:string;
    status: "pending" | "booked" | "cancelled";
}

interface OpportunityStore {
    selected_opportunity: Opportunity;
    loading: boolean;
    pendingInterviews: InterviewSlotResponse[];
    bookedInterviews: InterviewSlotResponse[];
    getOpportunity: (org_id: string, opp_id: string) => Promise<void>;
    postInterviewTimes: (org_id: string, opp_id: string, applicant_id: string, slots: InterviewSlot[]) => Promise<void>;
    getPendingInterviews: () => Promise<void>;
    getBookedInterviews: () => Promise<void>;
    selectInterviewTime: (slot_id: string,org_id:string) => Promise<void>;
}

export const useOpportunity = create<OpportunityStore>((set, get) => ({
    selected_opportunity: null,
    loading: false,
    pendingInterviews: [],
    bookedInterviews: [],

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

    postInterviewTimes: async (org_id: string, opp_id: string, applicant_id: string, slots: InterviewSlot[]) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("No authentication token available");
        }

        set({ loading: true });

        try {
            // Convert slots to ISO datetime strings
            const formattedSlots = slots.map(slot => slot.date.toISOString());

            const res = await fetch(
                `${API_URL}/org/${org_id}/opportunities/${opp_id}/assign-slot`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        org_id,
                        applicant_id,
                        slots: formattedSlots
                    })
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log(`Created ${data.created_count} interview slots`);

            return data;
        } catch (err) {
            console.error('Failed to post interview times', err);
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    getPendingInterviews: async () => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("No authentication token available");
        }

        set({ loading: true });

        try {
            const res = await fetch(
                `${API_URL}/profile/pending-selection`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            console.log(data,' here is the data right after the api call')
            set({ pendingInterviews: data });

            return data;
        } catch (err) {
            console.error('Failed to fetch pending interviews', err);
            set({ pendingInterviews: [] });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    getBookedInterviews: async () => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("No authentication token available");
        }

        set({ loading: true });

        try {
            const res = await fetch(
                `${API_URL}/profile/my-interviews`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            set({ bookedInterviews: data });

            return data;
        } catch (err) {
            console.error('Failed to fetch booked interviews', err);
            set({ bookedInterviews: [] });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    selectInterviewTime: async (slot_id: string,org_id:string) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("No authentication token available");
        }

        set({ loading: true });

        try {
            const res = await fetch(
                `${API_URL}/profile/select-time`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        slot_id,
                        org_id
                    })
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            await get().getPendingInterviews();
            await get().getBookedInterviews();

        } catch (err) {
            console.error('Failed to select interview time', err);
            throw err;
        } finally {
            set({ loading: false });
        }
    }
}))