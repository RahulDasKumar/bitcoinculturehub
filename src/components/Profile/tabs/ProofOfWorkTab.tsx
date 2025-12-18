import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Zap, Award, Clock } from "lucide-react";

export const ProofOfWorkTab = () => {
  const proofItems = [
    {
      title: "Bitcoin Nashville 2024 - Stage Manager",
      type: "Volunteer",
      organizer: { name: "Bitcoin Magazine", logo: "₿" },
      date: "July 2024",
      duration: "3 days, 25h",
      location: "Nashville, TN",
      sats: 50000,
      tags: ["Events", "Logistics", "Community"],
      verified: true,
    },
    {
      title: "Podcast Cover Art Commission",
      type: "Creator Collab",
      organizer: { name: "What Bitcoin Did", logo: "🎙️" },
      date: "June 2024",
      duration: "2 weeks",
      location: "Remote",
      sats: 100000,
      tags: ["Design", "Art", "Media"],
      verified: true,
    },
    {
      title: "Campus Bitcoin Workshop Series",
      type: "Speaking",
      organizer: { name: "Bitcoin Students Network", logo: "🎓" },
      date: "April - May 2024",
      duration: "6 weeks, 18h",
      location: "University of Texas",
      sats: 75000,
      tags: ["Education", "Speaking", "Campus"],
      verified: true,
    },
    {
      title: "Bitcoin Park Volunteer",
      type: "Volunteer",
      organizer: { name: "Bitcoin Park", logo: "🏛️" },
      date: "Ongoing",
      duration: "6 months, 50h+",
      location: "Nashville, TN",
      sats: 25000,
      tags: ["Community", "Events", "Education"],
      verified: true,
    },
  ];

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative space-y-6">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border" />

        {proofItems.map((item, index) => (
          <div key={index} className="relative pl-12 md:pl-16">
            {/* Timeline Dot */}
            <div className="absolute left-2 md:left-3.5 top-6 w-5 h-5 rounded-full bg-bitcoin-orange border-4 border-background shadow-glow" />

            <Card className="p-5 bg-surface border-border hover:border-bitcoin-orange transition-all">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                      {item.verified && (
                        <Badge className="bg-blue-soft/20 text-blue-soft border-blue-soft/30 gap-1">
                          <Award className="w-3 h-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl">{item.organizer.logo}</span>
                        <span>{item.organizer.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-bitcoin-orange flex items-center gap-1.5 justify-end">
                      <Zap className="w-5 h-5" />
                      {item.sats.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">sats earned</div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
