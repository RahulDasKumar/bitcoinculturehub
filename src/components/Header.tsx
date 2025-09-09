import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate() 

  const logoHandler = ()=>{
    navigate("/home")
  }
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4" onClick={logoHandler}>
            <img 
              src="/images/08fc4c04-8697-4208-88bd-114b9a0d94cb.png" 
              alt="Bitcoin Culture Hub Logo" 
              className="w-12 h-12 rounded-full transition-transform duration-300 hover:scale-110 hover:cursor-pointer"
            />
            <h1 className="text-2xl font-bold text-foreground">
              Bitcoin Culture Hub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              About
            </Link>
            <Link
              to="/manifesto"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/manifesto"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Manifesto
            </Link>
            <Link
              to="/home"
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/intro"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              Home
            </Link>
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/intro"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              Sign In/Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;