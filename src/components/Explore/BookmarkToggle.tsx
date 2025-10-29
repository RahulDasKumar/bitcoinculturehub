import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { useBookmarkStore } from "@/hooks/use-bookmark";
import useAuthStore, { User } from "@/hooks/use-auth";

interface BookmarkToggleProps {
  title: string;
  itemType: string;
  tags: string[];
  className?: string;
}

const BookmarkToggle = ({ title, itemType, tags, className = "" }: BookmarkToggleProps) => {

  const { isLoggedIn } = useAuthStore();
  const { toast } = useToast();
  const username = useAuthStore(state => state.user)
  console.log('Hi')
  // always derive bookmark state from store
  const email = username?.email || null;
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore(email);

  const existingBookmark = bookmarks.find((b) => b.title === title);

  const isBookmarked = !!existingBookmark;

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      toast({
        title: "Error",
        description: "You need to log in to bookmark an item.",
        variant: "destructive",
      });
      return;
    }

    const newItem = { title, itemType, tags, user: username };

    try {
      if (isBookmarked && existingBookmark) {
        // remove by ID
        await removeBookmark(existingBookmark.id);
        toast({
          title: "Removed from collection",
          description: `Item (${itemType}) removed from your bookmarks`,
        });
      } else {
        await addBookmark(newItem);
        toast({
          title: "Added to collection",
          description: `Item (${itemType}) saved to your bookmarks`,
        });
      }
    } catch (err) {
      console.error("Bookmark error:", err);
      toast({
        title: "Error",
        description: "Failed to update bookmark.",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleToggle}
            className={`w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background transition-all duration-200 ${isBookmarked ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary"} ${className}`}
          >
            <BookmarkIcon className={`w-4 h-4 transition-all duration-200 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isBookmarked ? "Bookmarked" : "Add to Bookmarks"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkToggle;
