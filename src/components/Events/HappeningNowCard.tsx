import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface HappeningNowCardProps {
  event: {
    title: string;
    platform: string;
    status: string;
    time: string;
  };
}

const HappeningNowCard = ({ event }: HappeningNowCardProps) => {
  const isLive = event.status === "Live";

  return (
    <div className="flex-shrink-0 w-72 bg-card border border-border rounded-xl p-4 hover:shadow-[var(--shadow-md)] transition-all duration-200 hover:-translate-y-1">
      <div className="mb-3">
        <Badge
          className={cn(
            "font-semibold",
            isLive
              ? "bg-destructive text-destructive-foreground animate-pulse"
              : "bg-accent/10 text-accent border border-accent/20"
          )}
        >
          {isLive ? "🔴 Live" : event.time}
        </Badge>
      </div>

      <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-2">
        {event.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4">{event.platform}</p>

      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
      >
        {isLive ? "Join" : "View"}
        <ExternalLink className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default HappeningNowCard;
