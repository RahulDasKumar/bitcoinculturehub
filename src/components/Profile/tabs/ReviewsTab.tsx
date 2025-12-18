import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Star, Award, Users, Zap } from "lucide-react";

interface Review {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  rating: number;
  content: string;
  context: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Chen',
      handle: 'sarahdesigns',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    rating: 5,
    content: 'Alex\'s workshop on Bitcoin design fundamentals was incredible. Clear teaching style, practical examples, and genuinely helpful feedback on our projects. Highly recommend!',
    context: 'Attended: Bitcoin Design Workshop',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: '2',
    author: {
      name: 'Bitcoin Magazine',
      handle: 'bitcoinmagazine',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=btcmag'
    },
    rating: 5,
    content: 'Outstanding stage management at Bitcoin Nashville. Professional, responsive, and kept everything running smoothly under pressure. Would work with Alex again in a heartbeat.',
    context: 'Collaborated: Bitcoin Nashville 2024',
    date: '1 month ago',
    verified: true
  },
  {
    id: '3',
    author: {
      name: 'Marcus Rodriguez',
      handle: 'marcusr',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus'
    },
    rating: 5,
    content: 'The custom artwork exceeded expectations. Alex really understood the vision and delivered something unique that perfectly captured what we were going for.',
    context: 'Commission: Podcast Cover Art',
    date: '1 month ago',
    verified: true
  },
  {
    id: '4',
    author: {
      name: 'Bitcoin Students Network',
      handle: 'btcstudents',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bsn'
    },
    rating: 5,
    content: 'Alex\'s campus workshop series was phenomenal. Students loved the approachable teaching style and practical focus. We\'re already planning the next round!',
    context: 'Speaking: Campus Bitcoin Workshop Series',
    date: '2 months ago',
    verified: true
  },
  {
    id: '5',
    author: {
      name: 'Jessica Park',
      handle: 'jessicap',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jessica'
    },
    rating: 5,
    content: 'Great collaboration at Bitcoin Park. Always brings positive energy and genuinely cares about the community. A true builder.',
    context: 'Volunteer: Bitcoin Park',
    date: '3 months ago',
    verified: true
  }
];

const badges = [
  { icon: '🚀', name: 'Starter Path', description: 'Completed onboarding journey' },
  { icon: '🎓', name: 'Campus Speaker', description: 'Spoke at 3+ campus events' },
  { icon: '🏛️', name: 'Bitcoin Park Volunteer', description: 'Regular community volunteer' },
  { icon: '✓', name: 'Verified Organizer', description: 'Verified event organizer' },
  { icon: '🎨', name: 'Artist', description: 'Published creative work' },
  { icon: '₿', name: 'Sat Stacker', description: 'Earned 100k+ sats' },
  { icon: '⚡', name: 'Lightning Native', description: 'Active Lightning user' },
  { icon: '🤝', name: 'Community Builder', description: 'Hosted 5+ events' }
];

const ReviewCard = ({ review }: { review: Review }) => (
  <Card className="p-6 bg-surface border-border">
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 rounded-full bg-bitcoin-orange">
            <img src={review.author.avatar} alt={review.author.name} />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{review.author.name}</h4>
              {review.verified && (
                <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30 gap-1">
                  <Award className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{review.author.handle}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < review.rating ? 'fill-bitcoin-orange text-bitcoin-orange' : 'text-muted-foreground'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <p className="text-foreground leading-relaxed">
        {review.content}
      </p>

      {/* Context */}
      <div className="flex items-center justify-between text-sm">
        <Badge variant="secondary" className="text-xs">
          {review.context}
        </Badge>
        <span className="text-muted-foreground">{review.date}</span>
      </div>
    </div>
  </Card>
);

export const ReviewsTab = () => {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
  return (
    <div className="space-y-6">
      {/* Reputation Overview */}
      <Card className="p-6 bg-surface border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-foreground mb-1">
              {averageRating.toFixed(1)}
              <Star className="w-6 h-6 fill-bitcoin-orange text-bitcoin-orange" />
            </div>
            <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-foreground mb-1">
              8
            </div>
            <p className="text-sm text-muted-foreground">Level</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-bitcoin-orange mb-1">
              <Zap className="w-6 h-6" />
              250k
            </div>
            <p className="text-sm text-muted-foreground">Sats earned</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-foreground mb-1">
              18
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>
      </Card>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-bitcoin-orange" />
          Badges & Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {badges.map((badge) => (
            <Card 
              key={badge.name} 
              className="p-4 bg-surface border-border hover:border-bitcoin-orange transition-colors cursor-pointer group"
            >
              <div className="text-center space-y-2">
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <p className="font-semibold text-sm text-foreground group-hover:text-bitcoin-orange transition-colors">
                    {badge.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-bitcoin-orange" />
          Community Reviews
        </h3>
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};
