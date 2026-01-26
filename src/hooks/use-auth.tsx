import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProfileInformation } from "../components/types";
import { API_URL } from "@/config";

export interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: Partial<ProfileInformation> | null;
    isLoggedIn: boolean;
    token: string;
    resumePreviewUrl:string
    login: (ProfileInformation: Partial<ProfileInformation>, token: string) => void;
    logout: () => void;
    updateProfile: (updates: Partial<ProfileInformation>) => void;
    uploadResume:(file:File) => Promise<void> 
    getResume:()=>Promise<void>
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoggedIn: false,
            token: null,
            resumePreviewUrl:null,
            login: (userData, token) => {                
                set({ user: userData, isLoggedIn: true, token: token });
            },

            logout: () => {
                set({ user: null, isLoggedIn: false, token:null });
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
            uploadResume: async (file: File) => {
                const token = get().token;
                const currentUser = get().user;

                if (!token || !currentUser) return;

                const formData = new FormData();
                formData.append("file", file);

                const res = await fetch(`${API_URL}/profile/upload-resume`, {
                    method: "POST", 
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData
                });

                if (!res.ok) {
                    throw new Error("Upload failed");
                }

                const data = await res.json();

                set({
                    user: {
                        ...currentUser,
                        resume_link: data.resume_file
                    }
                });
                const previewRes = await fetch(
                    `${API_URL}/profile/resume/preview`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!previewRes.ok) {
                    throw new Error("Failed to fetch preview link");
                }

                const { preview_url } = await previewRes.json();
                console.log(preview_url)

                set({ resumePreviewUrl: preview_url });
            },
            getResume:async ()=>{
                const token = get().token;
                if (!token) return null;

                const res = await fetch(
                    `${API_URL}/profile/resume/preview`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!res.ok) return null;

                const data = await res.json();

                set({ resumePreviewUrl: data.preview_url });
                return data.preview_url;
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                user: state.user,
                isLoggedIn: state.isLoggedIn,
                token: state.token,
                resumePreviewUrl: state.resumePreviewUrl
            }),
        }
    )
);

export default useAuthStore;
