import { Calendar, MapPin, Users, ExternalLink, Share2, Bookmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import EventCard from "./EventCard";

interface EventDetailModalProps {
  event: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedEvents?: any[];
}

const EventDetailModal = ({ event, open, onOpenChange, relatedEvents = [] }: EventDetailModalProps) => {
  const friends = [
    { name: "Alex K", avatar: "/placeholder.svg" },
    { name: "Jamie", avatar: "/placeholder.svg" },
    { name: "Sam", avatar: "/placeholder.svg" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Header Image */}
          <div className="w-full h-64 -mx-6 -mt-6 mb-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Meta */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
              <Badge variant="secondary">{event.type}</Badge>
            </div>

            <h2 className="text-3xl font-bold text-foreground">
              {event.title}
            </h2>

            {/* Date, Time, Location */}
            <div className="flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time} (Local) • EST 7:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{event.location}</span>
              </div>
            </div>

            {/* Primary Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="font-semibold">
                RSVP • {event.attending} going
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Add to calendar
              </Button>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-6" />

        {/* Overview */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            Join us for an evening of Bitcoin development discussion, networking, and learning. 
            This meetup is perfect for developers looking to dive deeper into Lightning Network 
            development and scaling solutions.
          </p>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Who this is for:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Bitcoin developers and builders</li>
              <li>Students interested in Bitcoin tech</li>
              <li>Anyone curious about Lightning Network</li>
            </ul>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Hosts & Hubs */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Hosted by</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{event.host[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{event.host}</p>
              <p className="text-sm text-muted-foreground">
                Bitcoin educator & developer advocate
              </p>
              <Button variant="link" className="h-auto p-0 text-primary">
                View profile
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Location Details */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Location</h3>
          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <p className="font-medium text-foreground">{event.location}</p>
            <p className="text-sm text-muted-foreground">
              123 Bitcoin Street, Floor 2<br />
              New York, NY 10001
            </p>
            <Button variant="outline" size="sm" className="mt-2">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on map
            </Button>
          </div>
        </section>

        <Separator className="my-6" />

        {/* Friends & Attendees */}
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground">
            Friends going ({event.friendsGoing})
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {friends.map((friend, i) => (
                <Avatar key={i} className="border-2 border-background h-10 w-10">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              and {event.friendsGoing - 3} other friends
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
            <Users className="h-4 w-4" />
            <span>{event.attending} people going</span>
          </div>
        </section>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <Separator className="my-6" />
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                More from {event.host}
              </h3>
              <div className="space-y-3">
                {relatedEvents.slice(0, 2).map((relatedEvent) => (
                  <EventCard key={relatedEvent.id} event={relatedEvent} />
                ))}
              </div>
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;
