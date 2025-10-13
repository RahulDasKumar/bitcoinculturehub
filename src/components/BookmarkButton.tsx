import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";

type ItemType = 'artifact' | 'creator' | 'community' | 'event' | 'meme';

interface BookmarkButtonProps {
  itemId: string;
  itemType: ItemType;
  initialIsBookmarked?: boolean;
  className?: string;
  onToggled?: (isBookmarked: boolean) => void;
}

const BookmarkButton = ({ title, itemType, tags = [], className = "", onToggled }: BookmarkButtonProps) => {
  const { user, isLoggedIn } = useAuthStore();

  const { bookmarks, addBookmark, removeBookmark, fetchBookmarks } = useBookmarkStore(user.email);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  if (!isLoggedIn) return;
  useEffect(() => {
    console.log(bookmarks)
    setIsBookmarked(bookmarks.some(b => b.title === title));
  }, [bookmarks, title]);

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setIsLoading(true);

    try {
      // Toggle state locally (no backend)
      const newState = !isBookmarked;
      setIsBookmarked(newState);

      toast({
        title: newState ? "Added to collection" : "Removed from collection",
        description: newState
          ? `Item (${itemType}) saved to your bookmarks`
          : `Item (${itemType}) removed from your bookmarks`,
      });

      onToggled?.(newState);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Something went wrong.",
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
      className={`h-8 w-8 p-0 min-w-[44px] min-h-[44px] transition-all duration-200 ${
        isBookmarked ? "hover:scale-110 animate-scale-in" : "hover:scale-105"
      } ${className}`}
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
