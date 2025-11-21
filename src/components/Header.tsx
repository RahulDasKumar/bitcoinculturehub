import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import useAuthStore from "@/hooks/use-auth";

const ADMIN_EMAIL = "dasrkd3@gmail.com";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isLoggedIn, logout } = useAuthStore();

  const logoHandler = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  // Check if the logged-in user is admin
  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;
  console.log(isAdmin)
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
            {/* About conditional behavior */}
            {location.pathname === "/about" ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/about" || location.pathname === "/manifesto"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  About
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/about">About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/manifesto">Manifesto</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/about"
                className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/about"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                About
              </Link>
            )}

            {/* Explore */}
            <Link
              to="/explore"
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/explore"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              Explore

            </Link>
            <Link
              to="/opportunity"
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/opportunity"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              Opportunity Engine

            </Link>
            {/* Admin Link (only for admin) */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/admin"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                Admin
              </Link>
            )}

            {/* 👤 Profile / Login */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full transition ${isLoggedIn
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "hover:bg-accent"
                    }`}
                  title={isLoggedIn ? "Profile" : "Login"}
                >
                  <User className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </DropdownMenuTrigger>

              {isLoggedIn && (
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
