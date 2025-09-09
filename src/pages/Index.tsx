import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
      <div className="text-center text-primary-foreground px-6">
        <h1 className="text-6xl font-bold mb-6">
          Welcome
        </h1>
        <p className="text-xl mb-8 opacity-90">
          Learn about our community platform
        </p>
        
        <Link to="/about">
          <Button 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-300 hover:shadow-glow group"
          >
            View About Section
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
