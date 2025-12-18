import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Palette, FileText, Mic, Video } from "lucide-react";

export const CollectionsTab = () => {
  const collections = [
    {
      type: "Art",
      title: "Bitcoin Park Event Poster",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
      medium: "Digital Art",
      tags: ["Design", "Events"],
      forWork: "Bitcoin Park Summer Series",
    },
    {
      type: "Art",
      title: "What Bitcoin Did Cover",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
      medium: "Podcast Art",
      tags: ["Design", "Media"],
      forWork: "WBD Podcast",
    },
    {
      type: "Writing",
      title: "Why Bitcoin Matters for Students",
      image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=400&h=400&fit=crop",
      medium: "Essay",
      tags: ["Education", "Writing"],
      forWork: "BSN Blog",
    },
    {
      type: "Art",
      title: "Nashville Bitcoin 2024 Badge",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
      medium: "Digital Art",
      tags: ["Design", "Events"],
      forWork: "Bitcoin Conference",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "Art":
        return <Palette className="w-4 h-4" />;
      case "Writing":
        return <FileText className="w-4 h-4" />;
      case "Audio":
        return <Mic className="w-4 h-4" />;
      case "Video":
        return <Video className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((item, index) => (
          <Card
            key={index}
            className="overflow-hidden bg-surface border-border hover:border-bitcoin-orange transition-all group cursor-pointer"
          >
            {/* Image */}
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {getIcon(item.type)}
                  <span>{item.medium}</span>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-bitcoin-orange transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Created for: <span className="text-foreground">{item.forWork}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
