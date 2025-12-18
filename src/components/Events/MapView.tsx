import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const BITCOIN_HUBS = [
  { name: "Austin", state: "Texas", eventCount: 12, color: "bg-event-irl" },
  { name: "Nashville", state: "Tennessee", eventCount: 8, color: "bg-event-meetup" },
  { name: "New York", state: "New York", eventCount: 15, color: "bg-event-conference" },
  { name: "Miami", state: "Florida", eventCount: 10, color: "bg-event-irl" },
  { name: "San Francisco", state: "California", eventCount: 9, color: "bg-event-virtual" },
  { name: "Prague", state: "Czech Republic", eventCount: 6, color: "bg-event-conference" },
];

const MapView = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Bitcoin Hubs & Events
        </h2>
        <p className="text-muted-foreground">
          Explore events by location and discover Bitcoin hubs worldwide
        </p>
      </div>

      {/* Placeholder for map */}
      <Card className="p-8 mb-8 bg-muted/20 border-dashed">
        <div className="flex flex-col items-center justify-center text-center py-12">
          <MapPin className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Interactive Map Coming Soon
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            We're building an interactive map to help you discover Bitcoin events near you
          </p>
        </div>
      </Card>

      {/* Bitcoin Hubs Grid */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Explore Bitcoin Hubs
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BITCOIN_HUBS.map((hub) => (
          <Card
            key={hub.name}
            className="p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)] group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {hub.name}
                </h4>
                <p className="text-sm text-muted-foreground">{hub.state}</p>
              </div>
              <Badge variant="secondary" className="font-medium">
                {hub.eventCount} events
              </Badge>
            </div>
            <div className={`h-1 w-full rounded-full ${hub.color}/20`}>
              <div className={`h-full w-3/4 rounded-full ${hub.color}`} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MapView;
