import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/hooks/use-auth"
const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const logoHandler = () => {
    navigate("/")
  }

  const { user, isLoggedIn, login, logout, updateProfile } = useAuthStore();


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

            {/* Home
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              Home
            </Link>
            
            {/* Join */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/login"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  Login
                </Link>

                <Link
                  to="/quiz"
                  className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/quiz"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                >
                  Join
                </Link>
              </>
            ) : (
              // If logged in → show dropdown with user info + logout
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="px-4 py-2 rounded-lg transition-colors bg-primary text-primary-foreground"
                >
                  {user?.username ?? "Account"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
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
