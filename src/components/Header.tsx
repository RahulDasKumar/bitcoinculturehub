import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import useAuthStore from "@/hooks/use-auth";

const ADMIN_EMAIL = "dasrkd3@gmail.com";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthStore();

  const isAdmin = isLoggedIn && user?.email === ADMIN_EMAIL;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-black text-white h-[70px] flex items-center px-6 md:px-12 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Logo + Nav */}
        <div className="flex items-center gap-10 lg:gap-16">
          <div
            onClick={() => navigate("/")}
            className="font-oswald text-xl tracking-[0.05em] uppercase cursor-pointer hover:opacity-80 transition-opacity"
          >
            Bitcoin Culture Hub
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink to="/opportunity" label="Opportunities" />
            <NavLink to="/orgs" label="Organizations" />
            <NavLink to="/awards" label="Pow Hub" />
            <NavLink to="/about" label="About" />
            {/* Admin-only link */}
            {isAdmin && <NavLink to="/admin" label="Admin" />}
          </nav>
        </div>

        {/* Right Side: Auth */}
        <div className="flex items-center gap-8">
          {!isLoggedIn ? (
            <>
              <Link
                to="/auth"
                className="text-[11px] font-bold tracking-[0.15em] uppercase hover:text-[#ff8000] transition-colors"
              >
                Log In
              </Link>

              <Link
                to="/auth?mode=signup"
                className="bg-[#ff8000] hover:bg-[#f37a00] px-8 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-all active:scale-95 shadow-sm"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 hover:text-[#ff8000] transition-colors"
                  title="Profile"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                    Profile
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleProfileClick} className="font-black uppercase">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="font-black uppercase">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => (
  <Link
    to={to}
    className="text-[11px] font-bold tracking-[0.15em] uppercase text-white hover:text-[#ff8000] transition-colors"
  >
    {label}
  </Link>
);  

export default Header