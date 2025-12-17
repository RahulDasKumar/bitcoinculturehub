import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { motion } from "framer-motion";

interface KarmaDrawerProps {
  open: boolean;
  onClose: () => void;
  userKarma: number;
}

interface KarmaEvent {
  id: string;
  type: "earn" | "burn";
  amount: number;
  description: string;
  timestamp: string;
}

const mockEvents: KarmaEvent[] = [
  {
    id: "1",
    type: "burn",
    amount: -50,
    description: "Voted for Builder of the Year",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "earn",
    amount: 100,
    description: "Nomination approved",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "burn",
    amount: -25,
    description: "Voted for Meme of the Year",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "earn",
    amount: 50,
    description: "Daily participation bonus",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    type: "earn",
    amount: 200,
    description: "Quality nomination bonus",
    timestamp: "3 days ago",
  },
];

export const KarmaDrawer = ({ open, onClose, userKarma }: KarmaDrawerProps) => {
  const totalEarned = 2450;
  const totalBurned = 1210;
  const lifetimeKarma = totalEarned;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="space-y-3">
          <SheetTitle className="text-2xl">My Karma</SheetTitle>
          <SheetDescription>
            Track your karma balance and transaction history
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 pt-6">
          {/* Current Balance */}
          <Card className="p-6 bg-gradient-card border-border text-center space-y-2">
            <p className="text-sm text-muted-foreground">Available Karma</p>
            <motion.p
              className="text-5xl font-bold text-primary"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {userKarma.toLocaleString()}
            </motion.p>
          </Card>

          {/* Lifetime Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm text-muted-foreground">Total Earned</span>
              </div>
              <p className="text-2xl font-bold text-accent">
                {totalEarned.toLocaleString()}
              </p>
            </Card>

            <Card className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-sm text-muted-foreground">Total Burned</span>
              </div>
              <p className="text-2xl font-bold text-destructive">
                {totalBurned.toLocaleString()}
              </p>
            </Card>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lifetime Progress</span>
              <span className="font-medium">
                {Math.round((totalBurned / lifetimeKarma) * 100)}% used
              </span>
            </div>
            <Progress value={(totalBurned / lifetimeKarma) * 100} className="h-2" />
          </div>

          {/* How to Earn More */}
          <Card className="p-4 bg-muted/50 border-border space-y-2">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">How to Earn More Karma</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1 pl-6 list-disc">
              <li>Submit quality nominations (50-200 karma)</li>
              <li>Daily participation (50 karma/day)</li>
              <li>Help verify nominations (25 karma)</li>
              <li>Share the awards (10 karma per share)</li>
            </ul>
          </Card>

          {/* Activity Timeline */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <div className="space-y-2">
              {mockEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {event.type === "earn" ? (
                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-accent" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-destructive/20 flex items-center justify-center">
                          <TrendingDown className="h-5 w-5 text-destructive" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{event.description}</p>
                        <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                      </div>
                    </div>
                    <div
                      className={`font-bold ${
                        event.type === "earn" ? "text-accent" : "text-destructive"
                      }`}
                    >
                      {event.amount > 0 ? "+" : ""}
                      {event.amount}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};