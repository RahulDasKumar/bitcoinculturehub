import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DynamicImage from "@/components/DynamicImage";
import BookmarkToggle from "@/components/BookmarkToggle";
import BitcoinUpvote from "@/components/BitcoinUpvote";

interface UnifiedCardProps {
  title: string;
  description?: string;
  tags?: string[];
  image_url?: string;
  type?: string; // 'artist', 'meme', 'lore', 'artwork', 'community'
  onClick?: () => void; // for modal trigger
  itemId: string; // for bookmarking
  itemType: string; // for bookmarking
}

const UnifiedCard = ({ 
  title, 
  description, 
  tags = [], 
  image_url, 
  type, 
  onClick,
  itemId,
  itemType
}: UnifiedCardProps) => {
  const handleClick = () => {
    if (onClick) {
      console.log("🟢 Card clicked:", title);
      onClick();
    }
  };

  const imgSrc = image_url
    ? image_url.startsWith("http")
      ? image_url
      : `http://localhost:8000${image_url}`
    : "/placeholder.svg";

  return (
    <Card 
      className={`group ${onClick ? 'cursor-pointer' : ''} bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2`}
      onClick={handleClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${title} - ${type}`}
    >
      <div className="relative">
        {/* Image */}
        <div className="aspect-[3/2] bg-muted overflow-hidden">
          {image_url ? (
            <DynamicImage
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              fallbackSrc="/placeholder.svg"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-background rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground text-xs sm:text-sm">No Image</span>
              </div>
            </div>
          )}
        </div>

        <div
          className="absolute top-2 sm:top-3 right-2 sm:right-3"
          onClick={(e) => e.stopPropagation()} // ✨ prevents the modal from opening when clicking the bookmark
        >
        {/* Bookmark Toggle - Always visible in top-right */}
        <BookmarkToggle 
          itemType={itemType}
          title={title}
          tags={tags}
          className="absolute top-2 sm:top-3 right-2 sm:right-3"
        />
      </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tags and Category Badge */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label={`Tag: ${tag}`}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 sm:px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Category Badge - repositioned to bottom-right */}
          {type && (
            <Badge 
              className="ml-2 bg-primary text-primary-foreground font-semibold text-xs capitalize"
            >
              {type}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UnifiedCard;