import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"  
import useAuthStore from "@/hooks/use-auth"
const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()


  const { user, isLoggedIn, login, logout, updateProfile } = useAuthStore();

  const logoHandler = () => {
    navigate("/")
  }

  const logoutHandler = () =>{
    logout()
    navigate("/")
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
            {/* About conditional behavior */}
            {location.pathname === "/about" ? (
              // On About page → dropdown
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === "/about" || location.pathname === "/manifesto"
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
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/about"
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
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/explore"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Explore
            </Link>

            {/* 👤 Profile / Login Icon */}
            {!isLoggedIn ? (
              <button
                onClick={() => navigate("/login")}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                title="Login"
              >
                <User className="w-6 h-6 text-muted-foreground hover:text-foreground" />
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition"
                    title="Profile"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                    <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}


          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
