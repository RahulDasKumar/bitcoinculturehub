import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">₿ Opportunity Hub</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                About
              </Button>
            </Link>
            <Link to="/post">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Sign in to Post
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
