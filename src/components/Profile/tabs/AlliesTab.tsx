import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, Info } from "lucide-react";

export const AlliesTab = () => {
  const allies = [
    {
      name: "Voltage",
      logo: "⚡",
      tagline: "I run my Lightning node with Voltage",
      type: "Ally",
      url: "#",
    },
    {
      name: "Human Rights Foundation",
      logo: "🗽",
      tagline: "Proud supporter of HRF's Bitcoin development fund",
      type: "Sponsor",
      url: "#",
    },
    {
      name: "Fold",
      logo: "📱",
      tagline: "Earning sats back on every purchase",
      type: "Ally",
      url: "#",
    },
    {
      name: "Swan Bitcoin",
      logo: "🦢",
      tagline: "Stacking sats with Swan",
      type: "Ally",
      url: "#",
    },
    {
      name: "Bitcoin Magazine",
      logo: "₿",
      tagline: "Official media partner",
      type: "Sponsor",
      url: "#",
    },
    {
      name: "Start9",
      logo: "🚀",
      tagline: "Running my own sovereign server",
      type: "Ally",
      url: "#",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-soft/10 border border-blue-soft/30 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-soft flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground/90">
          Some allies may be paid sponsorships. Users choose what appears here.
        </p>
      </div>

      {/* Allies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allies.map((ally, index) => (
          <Card
            key={index}
            className="p-6 bg-surface border-border hover:border-bitcoin-orange transition-all group cursor-pointer"
          >
            <a href={ally.url} className="block space-y-4">
              {/* Logo & Badge */}
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 bg-surface-elevated rounded-xl flex items-center justify-center text-3xl border border-border group-hover:border-bitcoin-orange transition-colors">
                  {ally.logo}
                </div>
                <Badge
                  variant={ally.type === "Sponsor" ? "default" : "secondary"}
                  className={
                    ally.type === "Sponsor"
                      ? "bg-bitcoin-orange/20 text-bitcoin-orange border-bitcoin-orange/30"
                      : ""
                  }
                >
                  {ally.type}
                </Badge>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-bold text-lg group-hover:text-bitcoin-orange transition-colors flex items-center gap-2">
                  {ally.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground italic">"{ally.tagline}"</p>
              </div>

              {/* Stats (placeholder for future analytics) */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>1.2k views</span>
                <span>45 clicks</span>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};
