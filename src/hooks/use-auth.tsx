import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProfileInformation } from "../components/types";

export interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: Partial<ProfileInformation> | null;
    isLoggedIn: boolean;
    token: string;
    login: (ProfileInformation: Partial<ProfileInformation>, token: string) => void;
    logout: () => void;
    updateProfile: (updates: Partial<ProfileInformation>) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            token: null,

            login: (userData, token) => {                
                set({ user: userData, isLoggedIn: true, token: token });
            },

            logout: () => {
                set({ user: null, isLoggedIn: false });
            },

            updateProfile: async (updates) => {
                const currentUser = get().user;
                const token = get().token;
                console.log(currentUser)
                console.log(token)
                if (currentUser && token) {

                    const updatedUser = { ...currentUser, ...updates };
                    const update = await fetch('http://127.0.0.1:8000/profile', {
                        method: 'PATCH',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(
                            updates
                        )
                    });

                    console.log(updatedUser)
                    set({ user: updatedUser });

                }

            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                token: state.token
            }),
        }
    )
);

export default useAuthStore;
