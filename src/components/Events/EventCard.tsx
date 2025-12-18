import { Calendar, MapPin, Users, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: {
    title: string;
    date: string;
    time: string;
    location: string;
    tags: string[];
    attending: number;
    friendsGoing: number;
    host: string;
    type: string;
    image: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      irl: "bg-[hsl(var(--event-irl))]/10 text-[hsl(var(--event-irl))] border-[hsl(var(--event-irl))]/20",
      virtual: "bg-[hsl(var(--event-virtual))]/10 text-[hsl(var(--event-virtual))] border-[hsl(var(--event-virtual))]/20",
      conference: "bg-[hsl(var(--event-conference))]/10 text-[hsl(var(--event-conference))] border-[hsl(var(--event-conference))]/20",
      meetup: "bg-[hsl(var(--event-meetup))]/10 text-[hsl(var(--event-meetup))] border-[hsl(var(--event-meetup))]/20",
      drop: "bg-[hsl(var(--event-drop))]/10 text-[hsl(var(--event-drop))] border-[hsl(var(--event-drop))]/20",
    };
    return colors[type] || colors.irl;
  };

  const isFlagship = event.type === "conference";

  return (
    <div className={cn(
      "group bg-card border rounded-xl overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-200 hover:-translate-y-1",
      isFlagship ? "border-primary/30" : "border-border"
    )}>
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        {isFlagship && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Flagship
            </Badge>
          </div>
        )}
        {/* Left Content */}
        <div className="flex-1 min-w-0">
          {/* Date/Time Badge */}
          <div className="mb-3">
            <Badge variant="secondary" className="font-medium">
              <Calendar className="h-3 w-3 mr-1" />
              {event.date} • {event.time}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>

          {/* Social Info with Avatar Stack */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{event.attending} going</span>
            </div>
            {event.friendsGoing > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(3, event.friendsGoing))].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-accent font-medium">
                  {event.friendsGoing} friend{event.friendsGoing > 1 ? "s" : ""} going
                </span>
              </div>
            )}
          </div>

          {/* Host */}
          <p className="text-sm text-muted-foreground">
            Hosted by <span className="text-foreground font-medium">{event.host}</span>
          </p>
        </div>

        {/* Right Content - Image */}
        <div className="sm:w-48 sm:h-36 flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-border bg-muted/30 px-5 py-3 flex items-center justify-between gap-3">
        <Button 
          className={cn(
            "flex-1 sm:flex-none font-medium shadow-sm hover:shadow-md transition-all",
            getTypeColor(event.type)
          )}
        >
          RSVP
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
