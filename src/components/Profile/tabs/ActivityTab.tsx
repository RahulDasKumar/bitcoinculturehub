import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare, Calendar, Briefcase, Users } from "lucide-react";

export const ActivityTab = () => {
  const activities = [
    {
      type: "thread",
      title: "Shared thoughts on Bitcoin education in universities",
      room: "Students",
      time: "2 hours ago",
    },
    {
      type: "event",
      title: "Attending: Bitcoin Park Meetup",
      date: "This Saturday",
      time: "3 days ago",
    },
    {
      type: "opportunity",
      title: "Completed: Stage Runner @ Nashville",
      status: "Verified",
      time: "1 week ago",
    },
    {
      type: "thread",
      title: "Posted design work in Artists room",
      room: "Artists",
      time: "2 weeks ago",
    },
    {
      type: "opportunity",
      title: "In Progress: Campus Workshop Series",
      status: "Active",
      time: "3 weeks ago",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "thread":
        return <MessageSquare className="w-4 h-4" />;
      case "event":
        return <Calendar className="w-4 h-4" />;
      case "opportunity":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <Card
              key={index}
              className="p-4 bg-surface border-border hover:border-bitcoin-orange transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-surface-elevated rounded-lg">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    {activity.room && (
                      <Badge variant="secondary" className="text-xs">
                        {activity.room}
                      </Badge>
                    )}
                    {activity.date && <span>{activity.date}</span>}
                    {activity.status && (
                      <Badge
                        className={
                          activity.status === "Verified"
                            ? "bg-blue-soft/20 text-blue-soft border-blue-soft/30"
                            : "bg-bitcoin-orange/20 text-bitcoin-orange border-bitcoin-orange/30"
                        }
                      >
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Active Rooms */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Most Active Rooms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["Artists", "Students", "Dev & Lightning", "Events"].map((room) => (
            <Card
              key={room}
              className="p-4 bg-surface border-border hover:border-bitcoin-orange transition-all cursor-pointer text-center"
            >
              <div className="space-y-2">
                <Users className="w-6 h-6 mx-auto text-muted-foreground" />
                <p className="font-medium text-sm">{room}</p>
                <p className="text-xs text-muted-foreground">24 contributions</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
