import { Flame } from "lucide-react";

interface LiveHighlight {
  id: string;
  icon: string;
  category: string;
  description: string;
  karmaBurned: number;
  voters: number;
}

interface LiveHighlightsProps {
  onCategoryClick?: (categoryId: string) => void;
}

export const LiveHighlights = ({ onCategoryClick }: LiveHighlightsProps) => {
  const highlights: LiveHighlight[] = [
    {
      id: "meme",
      icon: "😂",
      category: "Meme of the Year",
      description: "Close 3-way battle for the top spot",
      karmaBurned: 18790,
      voters: 342,
    },
    {
      id: "moment",
      icon: "💫",
      category: "Moment of the Year",
      description: "Historic moment leading the pack",
      karmaBurned: 17650,
      voters: 389,
    },
    {
      id: "influencer",
      icon: "📱",
      category: "Influencer of the Year",
      description: "Community favorite with 420+ votes",
      karmaBurned: 16230,
      voters: 421,
    },
    {
      id: "builder",
      icon: "⚒️",
      category: "Builder of the Year",
      description: "Top 3 within 1,000 karma",
      karmaBurned: 15420,
      voters: 298,
    },
  ];

  return (
    <section className="border-y border-border py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-display uppercase mb-2 flex items-center gap-3">
            <span className="h-2 w-2 bg-live-green rounded-full" />
            Trending Votes
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Most active categories right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="border border-border bg-card p-6 cursor-pointer hover:border-foreground/20 transition-all"
              onClick={() => onCategoryClick?.(highlight.id)}
            >
              <div className="mb-6">
                <h3 className="font-display text-xl md:text-2xl uppercase mb-3 leading-tight">
                  {highlight.category}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-primary" strokeWidth={2.5} />
                  <span className="font-bold text-base">{highlight.karmaBurned.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Karma</span>
                </div>
                <span className="text-xs text-muted-foreground">{highlight.voters} voters</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground max-w-3xl">
            Awards are ranked by total karma burned—each vote is a karmic commitment. 
            The award pool is distributed proportionally to nominees based on their karmic burn rank.
          </p>
        </div>
      </div>
    </section>
  );
};