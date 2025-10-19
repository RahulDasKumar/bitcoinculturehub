import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSession, signIn, signOut } from 'next-auth/react'
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useBookmarkStore } from "@/hooks/use-bookmark";
import useAuthStore from "@/hooks/use-auth";
import { User } from "@/hooks/use-auth";

type ItemType = 'artifact' | 'creator' | 'community' | 'event' | 'meme';

interface BookmarkButtonProps {
  itemId: string;
  title?: string;
  itemType: ItemType;
  tags?: string[];
  className?: string;
  onToggled?: (isBookmarked: boolean) => void;
}

const BookmarkButton = ({ itemId,title, itemType, tags = [], className = "", onToggled }: BookmarkButtonProps) => {
  const { user, isLoggedIn } = useAuthStore();
  const { data: session, status } = useSession() || {};
  const userEmail = session?.user?.email ?? null;
  const { bookmarks, addBookmark, removeBookmark, fetchBookmarks } = useBookmarkStore(user.email);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  if (!userEmail) {
    console.warn("⚠️ [BookmarkButton] No user email found — disabling bookmark features.");
    return null; // or render a placeholder button instead
  }
  useEffect(() => {
    console.log(bookmarks)
    setIsBookmarked(bookmarks.some(b => b.title === title));
  }, [bookmarks, title]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn || !user) {
      toast({
        title: "Error",
        description: "You must be logged in to bookmark items.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const bookmarkItem = {
      title,
      itemType,
      tags,
      user,
    };

    try {
      if (isBookmarked) {
        // Remove bookmark via store -> backend
        await removeBookmark(title);
        toast({
          title: "Removed from collection",
          description: `Item (${itemType}) removed from your bookmarks`,
        });
      } else {
        // Add bookmark via store -> backend
        await addBookmark(bookmarkItem);
        toast({
          title: "Added to collection",
          description: `Item (${itemType}) saved to your bookmarks`,
        });
      }

      setIsBookmarked(!isBookmarked);
      onToggled?.(!isBookmarked);

      // Refresh store from backend if needed
      console.log('running')
      await fetchBookmarks();

    } catch (err) {
      console.error("Bookmark error:", err);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBookmarkClick}
      disabled={isLoading}
      className={`h-8 w-8 p-0 min-w-[44px] min-h-[44px] transition-all duration-200 ${isBookmarked ? "hover:scale-110 animate-scale-in" : "hover:scale-105"} ${className}`}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "Unsave item" : "Save item"}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      ) : isBookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-primary animate-fade-in transition-colors duration-150" />
      ) : (
        <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors duration-150" />
      )}
    </Button>
  );
};

export default BookmarkButton;
