import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Clock, MapPin, Zap, Calendar, Plus } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'opportunity' | 'hire';
  price?: string;
  format: 'remote' | 'in_person' | 'async' | 'flexible';
  duration?: string;
  availability: 'available' | 'waitlist' | 'booked';
  tags: string[];
}

const offers: Offer[] = [
  {
    id: '1',
    title: '1:1 Design Mentorship',
    description: 'Personalized guidance for creators learning Bitcoin-themed design. We\'ll cover your specific projects, tools, and career goals.',
    type: 'service',
    price: 'from 50k sats/session',
    format: 'remote',
    duration: '1 hour',
    availability: 'available',
    tags: ['Design', 'Mentorship', '1:1']
  },
  {
    id: '2',
    title: 'Custom Artwork Commission',
    description: 'Bespoke Bitcoin-inspired artwork for your project, brand, or personal collection. Posters, digital art, illustrations, or album covers.',
    type: 'service',
    price: 'from 300k sats',
    format: 'async',
    duration: '2-3 weeks',
    availability: 'waitlist',
    tags: ['Art', 'Commission', 'Custom']
  },
  {
    id: '3',
    title: 'Campus Speaking',
    description: 'Available for university speaking engagements on Bitcoin, design, creative entrepreneurship, and grassroots adoption.',
    type: 'opportunity',
    price: 'custom quote',
    format: 'in_person',
    duration: '45-90 min',
    availability: 'available',
    tags: ['Speaking', 'Education', 'Campus']
  },
  {
    id: '4',
    title: 'Workshop Facilitation',
    description: 'Run interactive workshops on Bitcoin fundamentals, creative tools, or community building. For teams, schools, or events.',
    type: 'service',
    price: 'from 500k sats',
    format: 'flexible',
    duration: '2-4 hours',
    availability: 'available',
    tags: ['Workshop', 'Teaching', 'Group']
  },
  {
    id: '5',
    title: 'Event Organizing Support',
    description: 'Looking to collaborate with organizers on Bitcoin events, art shows, or community gatherings. Open to volunteer or paid roles.',
    type: 'opportunity',
    format: 'flexible',
    availability: 'available',
    tags: ['Events', 'Organizing', 'Collab']
  },
  {
    id: '6',
    title: 'Podcast Guest / Interview',
    description: 'Available for podcast appearances to discuss Bitcoin art, education, campus organizing, and creative work in the Bitcoin space.',
    type: 'opportunity',
    format: 'remote',
    duration: '30-60 min',
    availability: 'available',
    tags: ['Podcast', 'Media', 'Speaking']
  }
];

const formatConfig = {
  remote: { icon: '🌐', label: 'Remote' },
  in_person: { icon: '🤝', label: 'In-Person' },
  async: { icon: '📬', label: 'Asynchronous' },
  flexible: { icon: '🔄', label: 'Flexible' }
};

const availabilityConfig = {
  available: { label: 'Available', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  waitlist: { label: 'Waitlist', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  booked: { label: 'Booked', color: 'bg-red-500/20 text-red-400 border-red-500/30' }
};

const OfferCard = ({ offer }: { offer: Offer }) => (
  <Card className="p-6 bg-surface border-border hover:border-bitcoin-orange transition-all group">
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1 flex-1">
          <h3 className="font-bold text-lg text-foreground group-hover:text-bitcoin-orange transition-colors">
            {offer.title}
          </h3>
          {offer.price && (
            <div className="flex items-center gap-1.5 text-sm text-bitcoin-orange font-semibold">
              <Zap className="w-4 h-4" />
              {offer.price}
            </div>
          )}
        </div>
        <Badge className={availabilityConfig[offer.availability].color}>
          {availabilityConfig[offer.availability].label}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {offer.description}
      </p>

      {/* Details */}
      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span>{formatConfig[offer.format].icon}</span>
          <span>{formatConfig[offer.format].label}</span>
        </div>
        {offer.duration && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{offer.duration}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {offer.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Action */}
      <div className="pt-2">
        <Button 
          className="w-full gap-2"
          disabled={offer.availability === 'booked'}
        >
          {offer.availability === 'booked' ? (
            'Currently Booked'
          ) : offer.availability === 'waitlist' ? (
            <>
              <Calendar className="w-4 h-4" />
              Join Waitlist
            </>
          ) : offer.type === 'opportunity' ? (
            <>
              <Briefcase className="w-4 h-4" />
              Propose Collaboration
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              Book / Request
            </>
          )}
        </Button>
      </div>
    </div>
  </Card>
);

export const WorkOffersTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-surface border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-bitcoin-orange" />
              Work & Collaboration
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Services, speaking opportunities, and collaboration options. Let's create something together.
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Offer
          </Button>
        </div>
      </Card>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Availability Banner */}
      <Card className="p-6 bg-gradient-to-r from-bitcoin-orange/10 to-blue-soft/10 border-bitcoin-orange/30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-bitcoin-orange/20 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-6 h-6 text-bitcoin-orange" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Open to opportunities
            </h3>
            <p className="text-sm text-muted-foreground">
              Interested in creator collabs, speaking gigs, design commissions, and event organizing. Reach out!
            </p>
          </div>
          <Button className="gap-2">
            <Briefcase className="w-4 h-4" />
            Pitch an Opportunity
          </Button>
        </div>
      </Card>
    </div>
  );
};
