import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Video, ExternalLink, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'irl' | 'virtual' | 'hybrid';
  location?: string;
  link?: string;
  attendees: number;
  maxAttendees?: number;
  image?: string;
  tags: string[];
  status: 'upcoming' | 'past';
  rsvpStatus?: 'going' | 'interested' | 'not_going';
}

const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Bitcoin Design Workshop',
    description: 'Hands-on workshop teaching the fundamentals of Bitcoin-themed design. We\'ll cover color theory, iconography, and creating compelling visual narratives for sound money.',
    date: '2025-12-15',
    time: '6:00 PM - 8:00 PM EST',
    type: 'virtual',
    link: 'https://meet.jit.si/btc-design-workshop',
    attendees: 24,
    maxAttendees: 50,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    tags: ['Design', 'Education', 'Workshop'],
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Campus Bitcoin Meetup',
    description: 'Monthly gathering for students interested in Bitcoin. Open discussion, lightning demos, and networking. Pizza provided!',
    date: '2025-12-18',
    time: '7:00 PM - 9:00 PM EST',
    type: 'irl',
    location: 'University of Texas, Student Union Room 204',
    attendees: 18,
    maxAttendees: 30,
    tags: ['Community', 'Campus', 'IRL'],
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Bitcoin Nashville: Creative Track',
    description: 'Speaking on how artists and creators can leverage Bitcoin for funding and ownership. Part of the larger Bitcoin Nashville conference.',
    date: '2025-12-22',
    time: '2:00 PM - 3:30 PM EST',
    type: 'irl',
    location: 'Music City Center, Nashville TN',
    attendees: 156,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    tags: ['Conference', 'Speaking', 'Nashville'],
    status: 'upcoming'
  }
];

const pastEvents: Event[] = [
  {
    id: '4',
    title: 'Bitcoin Art Gallery Opening',
    description: 'Showcased 15 pieces of Bitcoin-inspired artwork from local and remote artists. Proceeds went to Bitcoin education initiatives.',
    date: '2025-11-10',
    time: '6:00 PM - 10:00 PM EST',
    type: 'irl',
    location: 'Bitcoin Park, Nashville TN',
    attendees: 87,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
    tags: ['Art', 'Community', 'Fundraiser'],
    status: 'past'
  },
  {
    id: '5',
    title: 'Intro to Bitcoin Workshop Series',
    description: 'Six-week educational series covering Bitcoin basics, self-custody, Lightning Network, and privacy.',
    date: '2025-09-15',
    time: 'Various',
    type: 'hybrid',
    location: 'Multiple locations + online',
    attendees: 43,
    tags: ['Education', 'Workshop', 'Series'],
    status: 'past'
  }
];

const EventCard = ({ event }: { event: Event }) => (
  <Card className="overflow-hidden bg-surface border-border hover:border-bitcoin-orange transition-all group">
    {event.image && (
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
      </div>
    )}
    
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-lg text-foreground group-hover:text-bitcoin-orange transition-colors">
            {event.title}
          </h3>
          <Badge 
            variant="secondary" 
            className={
              event.type === 'irl' 
                ? 'bg-blue-soft/20 text-blue-soft' 
                : event.type === 'virtual'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-purple-500/20 text-purple-400'
            }
          >
            {event.type === 'irl' ? 'IRL' : event.type === 'virtual' ? 'Virtual' : 'Hybrid'}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <Calendar className="w-4 h-4 text-bitcoin-orange" />
          <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="w-4" /> {/* Spacer */}
          <span>{event.time}</span>
        </div>
        
        {event.location && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        )}
        
        {event.link && (
          <div className="flex items-center gap-2 text-muted-foreground hover:text-blue-soft transition-colors cursor-pointer">
            <Video className="w-4 h-4" />
            <span className="text-sm">Join link available</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>
            {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} {event.status === 'upcoming' ? 'registered' : 'attended'}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {event.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Actions */}
      {event.status === 'upcoming' && (
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 gap-2">
            RSVP
          </Button>
          <Button variant="outline" size="icon">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      )}
      
      {event.status === 'past' && (
        <Button variant="outline" className="w-full">
          View Recap
        </Button>
      )}
    </div>
  </Card>
);

export const EventsTab = () => {
  return (
    <div className="space-y-6">
      {/* Create Event CTA */}
      <Card className="p-6 bg-surface border-border border-dashed">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Host an event</h3>
            <p className="text-sm text-muted-foreground">
              Bring your community together IRL or online
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>
      </Card>

      {/* Events Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full justify-start bg-surface border border-border rounded-xl p-1">
          <TabsTrigger value="upcoming" className="gap-2 data-[state=active]:bg-surface-elevated">
            Upcoming ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2 data-[state=active]:bg-surface-elevated">
            Past ({pastEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
