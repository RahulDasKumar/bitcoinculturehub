import { create } from "zustand";
import { toast } from "./use-toast";
import useAuthStore from "./use-auth";
import { API_URL } from "../config";
import { BitcoinEvent } from "@/components/types";

interface EventsState {
    events: BitcoinEvent[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    loading: boolean;
    error?: string;

    fetchEvents: (page?: number, pageSize?: number) => Promise<void>;
}



export const useEventsStore = create<EventsState>((set) => ({
    events: [],
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
    loading: false,

    fetchEvents: async (page = 1, pageSize = 10) => {
        set({ loading: true, error: undefined });

        try {
            const res = await fetch(
                `${API_URL}/events?page=${page}&page_size=${pageSize}`
            );

            if (!res.ok) {
                throw new Error("Failed to load events");
            }

            const data = await res.json();
            console.log('events loading response', data)
            set({
                events: data.items,
                page: data.page,
                pageSize: data.page_size,
                total: data.total,
                totalPages: data.total_pages + 1,
                loading: false,
            });
        } catch (err: any) {
            set({
                loading: false,
                error: err.message ?? "Unknown error",
            });
        }
    },
}));
