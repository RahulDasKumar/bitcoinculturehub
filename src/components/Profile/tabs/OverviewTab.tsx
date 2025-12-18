import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, Users, Briefcase, Zap, MessageSquare, Calendar, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export const OverviewTab = () => {

  return (
    <div className="space-y-8">
      {/* Latest Post Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-bitcoin-orange" />
            Latest Update
          </h2>
          <Button variant="ghost" size="sm" className="gap-2">
            View all posts
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <Card className="p-6 bg-surface border-border hover:border-border/60 transition-colors cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <Avatar className="w-10 h-10 rounded-full bg-bitcoin-orange" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">Alex Rivera</h4>
                    <span className="text-sm text-muted-foreground">@alexbtc</span>
                  </div>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>
              </div>
              <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30">
                Public
              </Badge>
            </div>
            <p className="text-foreground leading-relaxed">
              Just finished designing the cover art for a new Bitcoin podcast series! 🎨 Super proud of how this turned out. The challenge was capturing the energy of sound money while keeping it accessible to newcomers.
            </p>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop" 
                alt="Post media" 
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs">#Design</Badge>
              <Badge variant="secondary" className="text-xs">#Bitcoin</Badge>
              <Badge variant="secondary" className="text-xs">#Art</Badge>
            </div>
          </div>
        </Card>
      </section>

      {/* Upcoming Event Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-bitcoin-orange" />
            Next Event
          </h2>
          <Button variant="ghost" size="sm" className="gap-2">
            View all events
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <Card className="overflow-hidden bg-surface border-border hover:border-bitcoin-orange transition-all cursor-pointer group">
          <div className="relative h-48 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop" 
              alt="Event"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-lg text-foreground group-hover:text-bitcoin-orange transition-colors">
                Bitcoin Design Workshop
              </h3>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Virtual
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Hands-on workshop teaching the fundamentals of Bitcoin-themed design.
            </p>
            <div className="text-sm text-foreground">
              <Calendar className="w-4 h-4 text-bitcoin-orange inline mr-2" />
              December 15, 2025 • 6:00 PM - 8:00 PM EST
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1">RSVP</Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Shop Preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-bitcoin-orange" />
            Featured Items
          </h2>
          <Button variant="ghost" size="sm" className="gap-2">
            View shop
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Bitcoin Artist Starter Pack",
              price: 50000,
              image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=300&fit=crop",
              tag: "Digital"
            },
            {
              title: "Limited Edition Print",
              price: 210000,
              image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop",
              tag: "Art"
            },
            {
              title: "Workshop Recordings",
              price: 100000,
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
              tag: "Members",
              locked: true
            }
          ].map((item, i) => (
            <Card key={i} className="overflow-hidden bg-surface border-border hover:border-bitcoin-orange transition-all cursor-pointer group">
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.locked && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-bitcoin-orange/90 text-primary-foreground gap-1 backdrop-blur-sm">
                      <Lock className="w-3 h-3" />
                      Members
                    </Badge>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm text-foreground group-hover:text-bitcoin-orange transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-bitcoin-orange font-bold text-sm">
                    <Zap className="w-4 h-4" />
                    {item.price.toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="text-xs">{item.tag}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Availability & Collab */}
      <section className="bg-surface rounded-xl p-6 border border-border">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-soft" />
          Open for Collaboration
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30">
            Creator Collabs
          </Badge>
          <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30">
            Speaking Gigs
          </Badge>
          <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30">
            Design Commissions
          </Badge>
          <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30">
            Event Organizing
          </Badge>
        </div>
        <Button className="gap-2">
          <Users className="w-4 h-4" />
          Propose a Collaboration
        </Button>
      </section>

    </div>
  );
};
