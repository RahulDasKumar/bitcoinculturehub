import { ProfileInformation } from '@/components/types';
import { create } from 'zustand';
import { API_URL } from "../config";


interface UserStore {
    globalUsers: ProfileInformation[];
    fetchGlobalUsers: () => Promise<void>;
    set: (state: Partial<UserStore>) => void;
    
}

const devurl = 'http://127.0.0.1:8000'

export const useUserStore = create<UserStore>((set) => ({
    globalUsers: [],

    set: (state) => set(state),

    fetchGlobalUsers: async () => {
        try {
            const res = await fetch(`${API_URL}/users`);
            if (!res.ok) throw new Error("Failed to fetch global users");
            const data: ProfileInformation[] = await res.json();
            set({ globalUsers: data });
        } catch (err) {
            console.error("Error fetching global users:", err);
            set({ globalUsers: [] });
        }
    },
}));
