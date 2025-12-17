import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus } from "lucide-react";

export const ContactCard = () => {
  const sharedContext = {
    mutualRooms: ["Artists", "Students"],
    mutualFollows: ["Bitcoin Park", "HRF"],
  };

  return (
    <Card className="p-6 bg-surface border-border space-y-4 top-[28rem]">
      {/* Collaboration CTA */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-blue-soft">
          <Users className="w-5 h-5" />
          <h3 className="font-bold">Contact & Collaborate</h3>
        </div>
        <Button className="w-full gap-2">
          <UserPlus className="w-4 h-4" />
          Invite to Opportunity
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Send a collab request, speaking invite, or commission
        </p>
      </div>

      {/* Shared Context */}
      <div className="pt-4 border-t border-border space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Shared Context
        </h4>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Mutual Rooms</p>
          <div className="flex flex-wrap gap-1.5">
            {sharedContext.mutualRooms.map((room) => (
              <Badge key={room} variant="secondary" className="text-xs">
                {room}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Both Follow</p>
          <div className="flex flex-wrap gap-1.5">
            {sharedContext.mutualFollows.map((follow) => (
              <Badge key={follow} variant="secondary" className="text-xs">
                {follow}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
