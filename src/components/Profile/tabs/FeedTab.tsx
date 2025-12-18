import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat2, Share, Image as ImageIcon, Lock } from "lucide-react";

interface FeedPost {
  id: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string };
  tags: string[];
  visibility: 'public' | 'free_members' | 'paid_members' | 'close_friends';
  timestamp: string;
  metrics: {
    likes: number;
    comments: number;
    reposts: number;
  };
}

const mockPosts: FeedPost[] = [
  {
    id: '1',
    content: 'Just finished designing the cover art for a new Bitcoin podcast series! 🎨 Super proud of how this turned out. The challenge was capturing the energy of sound money while keeping it accessible to newcomers.',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop' },
    tags: ['Design', 'Bitcoin', 'Art'],
    visibility: 'public',
    timestamp: '2h ago',
    metrics: { likes: 124, comments: 18, reposts: 12 }
  },
  {
    id: '2',
    content: 'Workshop series update: We hit 50 students this semester! 🎓 Teaching Bitcoin fundamentals to university students has been one of the most rewarding experiences. Thanks to everyone who showed up and asked amazing questions.',
    tags: ['Education', 'Campus', 'Community'],
    visibility: 'public',
    timestamp: '1d ago',
    metrics: { likes: 89, comments: 24, reposts: 8 }
  },
  {
    id: '3',
    content: '🔒 Exclusive: Behind the scenes of my creative process + the tools I use for Bitcoin-themed artwork. Plus a sneak peek at my next project...',
    tags: ['BTS', 'Process', 'Exclusive'],
    visibility: 'paid_members',
    timestamp: '3d ago',
    metrics: { likes: 45, comments: 12, reposts: 3 }
  },
  {
    id: '4',
    content: 'Volunteering at Bitcoin Park this weekend was incredible. Met so many passionate builders and had great convos about grassroots adoption. If you\'re in Nashville, definitely check it out! 🏛️',
    tags: ['Community', 'Nashville', 'IRL'],
    visibility: 'public',
    timestamp: '5d ago',
    metrics: { likes: 156, comments: 31, reposts: 19 }
  }
];

const visibilityConfig = {
  public: { label: 'Public', color: 'bg-blue-soft/20 text-blue-soft border-blue-soft/30' },
  free_members: { label: 'Free Members', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  paid_members: { label: 'Paid Members', color: 'bg-bitcoin-orange/20 text-bitcoin-orange border-bitcoin-orange/30' },
  close_friends: { label: 'Close Friends', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
};

export const FeedTab = () => {
  return (
    <div className="space-y-6">
      {/* Post Composer (shown when viewing own profile) */}
      <Card className="p-6 bg-surface border-border">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 rounded-full bg-bitcoin-orange" />
          <div className="flex-1 space-y-3">
            <textarea 
              placeholder="Share an update, insight, or moment..."
              className="w-full bg-surface-elevated border border-border rounded-lg p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-bitcoin-orange min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Media
                </Button>
                <Badge variant="secondary" className="gap-1.5 cursor-pointer hover:bg-surface">
                  <Lock className="w-3 h-3" />
                  Public
                </Badge>
              </div>
              <Button className="gap-2">
                Post
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Feed Posts */}
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="p-6 bg-surface border-border hover:border-border/60 transition-colors">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 rounded-full bg-bitcoin-orange" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">Alex Rivera</h4>
                      <span className="text-sm text-muted-foreground">@alexbtc</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Badge className={visibilityConfig[post.visibility].color}>
                  {post.visibility === 'paid_members' && <Lock className="w-3 h-3 mr-1" />}
                  {visibilityConfig[post.visibility].label}
                </Badge>
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed">{post.content}</p>

              {/* Media */}
              {post.media && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={post.media.url} 
                    alt="Post media" 
                    className="w-full object-cover"
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 pt-2 border-t border-border">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-bitcoin-orange transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{post.metrics.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-soft transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{post.metrics.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors">
                  <Repeat2 className="w-5 h-5" />
                  <span className="text-sm">{post.metrics.reposts}</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ml-auto">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-4">
        <Button variant="outline">Load more posts</Button>
      </div>
    </div>
  );
};
