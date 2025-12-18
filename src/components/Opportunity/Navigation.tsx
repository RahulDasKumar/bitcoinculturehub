import { Button } from "@/components/ui/button";
import { Home, User, Building, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">
              Bitcoin Opportunity House
            </span>
            <span className="font-bold text-lg sm:hidden">BOH</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Feed</span>
              </Link>
            </Button>
            <Button
              variant={isActive("/profile") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/profile">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </Button>
            <Button
              variant={isActive("/orgs") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/orgs">
                <Building className="w-4 h-4" />
                <span className="hidden sm:inline">Orgs</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
