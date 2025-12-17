import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coins, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TipButtonProps {
  recipientUsername: string;
  onTip?: (amount: number) => void;
  size?: 'sm' | 'default';
  variant?: 'ghost' | 'default' | 'outline';
}

export const TipButton = ({ 
  recipientUsername, 
  onTip,
  size = 'sm',
  variant = 'ghost'
}: TipButtonProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('1000');
  const { toast } = useToast();

  const quickAmounts = [500, 1000, 5000, 10000, 21000];

  const handleTip = () => {
    const sats = parseInt(amount);
    if (isNaN(sats) || sats <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number of sats",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "⚡ Tip sent!",
      description: `${sats.toLocaleString()} sats sent to ${recipientUsername}`,
    });

    onTip?.(sats);
    setOpen(false);
    setAmount('1000');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className="hover:text-bitcoin-orange transition-colors"
        >
          <Zap className="h-3 w-3 mr-1 fill-current" />
          Tip
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-bitcoin-gold" />
            Tip {recipientUsername}
          </DialogTitle>
          <DialogDescription>
            Send sats to show appreciation for great content
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (sats)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((amt) => (
              <Button
                key={amt}
                variant="outline"
                size="sm"
                onClick={() => setAmount(amt.toString())}
                className="hover:border-bitcoin-orange hover:text-bitcoin-orange"
              >
                {amt.toLocaleString()}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleTip}
            className="w-full bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-bitcoin-dark font-semibold"
          >
            <Zap className="h-4 w-4 mr-2 fill-current" />
            Send {parseInt(amount).toLocaleString() || '0'} sats
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
