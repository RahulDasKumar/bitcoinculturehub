import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Bookmark } from "lucide-react";
import { useBookmarkStore } from "@/hooks/use-bookmark";

interface BookmarkToggleProps {
  itemId: string;
  itemType: string;
  onToggle?: (isBookmarked: boolean) => void;
  title:string;
  className?: string;
  tags:string[]
}

const BookmarkToggle = ({ itemId, itemType, onToggle, title, tags,className = "" }: BookmarkToggleProps) => {
  const { bookmarks, toggleBookmark } = useBookmarkStore()
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const addBookmark = useBookmarkStore((state) => state.addBookmark)

  const handleToggleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('clicking')


    setIsLoading(true);
    try {
      const newState = !isBookmarked;
      setIsBookmarked(newState);
      const newItem = {

        title: title,
        itemType:itemType,
        tags:tags
      }
      addBookmark(newItem)
      toast({
        title: newState ? "Added to collection" : "Removed from collection",
        description: newState
          ? `Item (${itemType}) saved to your bookmarks`
          : `Item (${itemType}) removed from your bookmarks`,
      });

      onToggle?.(newState);
    } catch (error) {
      console.error("Bookmark error:", error);
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            onClick={handleToggleBookmark}
            disabled={isLoading}
            className={`w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background transition-all duration-200 ${
              isBookmarked ? "text-primary hover:text-primary" : "text-muted-foreground hover:text-primary"
            } ${className}`}
          >
            <Bookmark
              className={`w-4 h-4 transition-all duration-200 ${
                isBookmarked ? "fill-current" : ""
              }`}
            />
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