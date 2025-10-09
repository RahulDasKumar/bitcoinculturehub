import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ExploreItem } from "@/pages/explore/data";
import DynamicImage from "@/components/DynamicImage";
import BookmarkButton from "@/components/BookmarkButton";

interface UniversalCardProps {
  item: ExploreItem;
  onClick?: () => void;
  variant?: 'explore' | 'community';
  className?: string;
}

const UniversalCard = ({ item, onClick, variant = 'explore', className = "" }: UniversalCardProps) => {
  const isCommunity = variant === 'community' || item.category === 'Communities';

  const handleCardClick = () => {
    if (isCommunity && item.external_url) {
      window.open(item.external_url, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  const imageSource = isCommunity && item.logo_url 
    ? item.logo_url 
    : `https://images.unsplash.com/${item.image_url}?w=400&h=300&fit=crop`;

  return (
    <Card 
      className={`group cursor-pointer bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden ${className}`}
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* Image/Logo */}
        <div className={`${isCommunity ? 'aspect-square p-6 bg-muted flex items-center justify-center' : 'aspect-video bg-muted'} overflow-hidden`}>
          {isCommunity ? (
            <div className="w-20 h-20 bg-background rounded-lg overflow-hidden flex items-center justify-center">
              <DynamicImage
                src={item.logo_url || "/placeholder.svg"}
                alt={`${item.title} logo`}
                className="w-full h-full object-contain"
                fallbackSrc="/placeholder.svg"
              />
            </div>
          ) : (
            <img
              src={imageSource}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
        </div>
        
        {/* Category Badge - moved to bottom-right inside the content area */}

        {/* Bookmark Toggle - Always visible */}
  
        
        {/* External Link Icon for Communities - shown in addition to bookmark */}
        {isCommunity && (
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-0 hover:bg-background transition-all duration-200 text-muted-foreground hover:text-primary"
          >
            <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
          </Button>
        )}
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        {/* Summary */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {item.summary}
        </p>

        {/* Tags and Category */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Category Badge - repositioned to bottom-right */}
          <Badge 
            className="ml-2 bg-primary text-primary-foreground font-semibold text-xs"
          >
            {isCommunity ? 'Community' : item.category.slice(0, -1)} {/* Remove 's' from plural */}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default UniversalCard;