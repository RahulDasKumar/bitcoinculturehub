import { Bitcoin, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-bitcoin-orange to-bitcoin-gold shadow-orange">
                <Bitcoin className="h-6 w-6 text-bitcoin-dark" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-bitcoin-orange to-bitcoin-gold bg-clip-text text-transparent">
                BitForum
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search threads, users, topics..."
                className="pl-10 bg-surface border-border/50 focus:border-bitcoin-orange transition-smooth"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative hover:bg-surface-bright transition-smooth">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-bitcoin-orange" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-surface-bright transition-smooth">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
