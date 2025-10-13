import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
}


const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,

            login: (userData) => {
                set({ user: userData, isLoggedIn: true });
            },

            logout: () => {
                set({ user: null, isLoggedIn: false });
            },

            updateProfile: (updates) => {
                const currentUser = get().user;
                if (currentUser) {
                    const updatedUser = { ...currentUser, ...updates };
                    set({ user: updatedUser });
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
            }),
        }
    )
);

export default useAuthStore;
