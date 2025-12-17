import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Copy, QrCode } from "lucide-react";
import { useState } from "react";

export const TipCard = () => {
  const [copied, setCopied] = useState(false);
  const lightningAddress = "satoshi@bch.network";

  const handleCopy = () => {
    navigator.clipboard.writeText(lightningAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-surface to-surface-elevated border-border top-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-bitcoin-orange">
          <Zap className="w-5 h-5" />
          <h3 className="font-bold text-lg">Tip & Support</h3>
        </div>

        {/* QR Code Placeholder */}
        <div className="aspect-square bg-foreground rounded-xl p-4 flex items-center justify-center">
          <QrCode className="w-full h-full text-background" />
        </div>

        {/* Lightning Address */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            Lightning Address
          </p>
          <div className="flex items-center gap-2 bg-background/50 rounded-lg p-2">
            <code className="text-xs flex-1 truncate">{lightningAddress}</code>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-6 px-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
          {copied && (
            <p className="text-xs text-bitcoin-orange">Copied!</p>
          )}
        </div>

        {/* Quick Tip Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button variant="secondary" size="sm" className="text-xs">
            100
          </Button>
          <Button variant="secondary" size="sm" className="text-xs">
            1k
          </Button>
          <Button variant="secondary" size="sm" className="text-xs">
            10k
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Support this Bitcoiner's work
        </p>
      </div>
    </Card>
  );
};
