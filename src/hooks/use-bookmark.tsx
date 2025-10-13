import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/hooks/use-auth";

export interface Bookmark {
    id: string;
    title: string;
    itemType: string;
    tags: string[];
    user: User;
}

interface BookmarkState {
    bookmarks: Bookmark[];
    userEmail: string | null;
    setUserEmail: (email: string | null) => void;
    fetchBookmarks: () => Promise<void>;
    addBookmark: (bookmark: Omit<Bookmark, "id">) => Promise<void>;
    removeBookmark: (id: string) => Promise<void>;
    toggleBookmark: (bookmark: Omit<Bookmark, "id"> & { id?: string }) => Promise<void>;
    clearBookmarks: () => void;
}

// Create a store factory
export const createBookmarkStore = (email: string | null) =>
    create<BookmarkState>()(
        persist(
            (set, get) => ({
                bookmarks: [],
                userEmail: email,

                setUserEmail: (email) => set({ userEmail: email, bookmarks: [] }),

                fetchBookmarks: async () => {
                    if (!email) return;
                    const res = await fetch(`https://bch-backend-7vjs.onrender.com/bookmarks/${email}`);
                    if (!res.ok) return;
                    const data = await res.json();
                    const formatted: Bookmark[] = data.map((b: any) => ({
                        id: b.id,
                        title: b.title,
                        itemType: b.itemType ?? "",
                        tags: b.tags ?? [],
                        user: { email: b.user_email } as User,
                    }));
                    set({ bookmarks: formatted });
                },

                addBookmark: async (bookmark: Omit<Bookmark, "id">) => {
                    if (!bookmark.user.email) return;
                    const payload = {
                        title: bookmark.title,
                        user_email: bookmark.user.email,
                        itemType: bookmark.itemType,
                        tags: bookmark.tags,
                    };
                    const res = await fetch(`https://bch-backend-7vjs.onrender.com/bookmarks/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload),
                    });
                    if (res.ok) {
                        const data = await res.json();
                        const newBookmark: Bookmark = { ...bookmark, id: data.id };
                        set((state) => ({ bookmarks: [...state.bookmarks, newBookmark] }));
                    }
                },

                removeBookmark: async (id: string) => {
                    const bookmark = get().bookmarks.find((b) => b.id === id);
                    if (!bookmark) return;
                    const res = await fetch(`https://bch-backend-7vjs.onrender.com/bookmarks/${id}`, { method: "DELETE" });
                    if (res.ok) {
                        set((state) => ({ bookmarks: state.bookmarks.filter((b) => b.id !== id) }));
                    }
                },

                toggleBookmark: async (bookmark: Omit<Bookmark, "id"> & { id?: string }) => {
                    const existing = get().bookmarks.find(
                        (b) => b.title === bookmark.title && b.user.email === bookmark.user.email
                    );
                    if (existing) {
                        await get().removeBookmark(existing.id);
                    } else {
                        await get().addBookmark(bookmark);
                    }
                },

                clearBookmarks: () => set({ bookmarks: [] }),
            }),
            {
                name: `bookmark-storage-${email}`
            }
        )
    );

// Usage:
export const useBookmarkStore = (email: string | null) => createBookmarkStore(email)();
