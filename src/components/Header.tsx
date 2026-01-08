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

              <Link
                to="/about"
              className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/about"
                  ? "bg-black text-white"
                  : "text-muted-foreground hover:text-white hover:bg-black"
                  }`}
              >
                About
              </Link>
            

            {/* Explore */}
            {/* <Link
              to="/explore"
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/explore"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
            >
              Explore

            </Link> */}
            <Link
              to="/opportunity"
              className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/opportunity"
                ? "bg-black text-white"
                : "text-muted-foreground hover:text-white hover:bg-black"
                }`}
            >
              Opportunity Engine

            </Link>
            {/* <Link
              to="/events"
              className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/events"
                ? "bg-black text-white"
                : "text-muted-foreground hover:text-white hover:bg-black"
                }`}
            >
              Events

            </Link> */}

            <Link
              to="/awards"
              className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/awards"
                ? "bg-black text-white"
                : "text-muted-foreground hover:text-white hover:bg-black"
                }`}
            >
              Awards

            </Link>
            <Link
              to="/organization-auth"
              className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/organization-auth"
                ? "bg-black text-white"
                : "text-muted-foreground hover:text-white hover:bg-black"
                }`}
            >
              Org
            </Link>
            {/* Admin Link (only for admin) */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`font-black uppercase px-4 py-2 rounded-lg transition-colors ${location.pathname === "/admin"
                  ? "bg-black text-white"
                  : "text-muted-foreground hover:text-white hover:bg-black"
                  }`}
              >
                Admin
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full transition ${isLoggedIn
                    ? "bg-white text-primary-foreground hover:opacity-90"
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
                    <Link to="/profile" className="font-black uppercase">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler} className="font-black uppercase">
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
