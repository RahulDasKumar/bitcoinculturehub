import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BookmarkItem {
    title: string;
    itemType:string;
    tags:string[];
}

interface BookmarkState {
    bookmarks: BookmarkItem[]
    addBookmark: (item: BookmarkItem) => void
    removeBookmark: (id: string | number) => void
    toggleBookmark: (item: BookmarkItem) => void
    clearBookmarks: () => void
}

export const useBookmarkStore = create<BookmarkState>()(
    persist(
        (set, get) => ({
            bookmarks: [],
            addBookmark: (item) => {
                console.log(item)
                const { bookmarks } = get()
                if (!bookmarks.some((b) => b.title === item.title)) {
                    set({ bookmarks: [...bookmarks, item] })
                }
            },
            removeBookmark: (title) =>
                set((state) => ({
                    bookmarks: state.bookmarks.filter((b) => b.title !== title),
                })),
            toggleBookmark: (item) => {
                const { bookmarks } = get()
                const isBookmarked = bookmarks.some((b) => b.title === item.title)
                set({
                    bookmarks: isBookmarked
                        ? bookmarks.filter((b) => b.title !== item.title)
                        : [...bookmarks, item],
                })
            },
            clearBookmarks: () => set({ bookmarks: [] }),
        }),
        { name: 'bookmark-storage' }
    )
)
