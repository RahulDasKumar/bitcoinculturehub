import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  userKarma: number;
  onNominateClick: () => void;
}

export const Header = ({ userKarma, onNominateClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Categories", href: "#categories" },
    { label: "How Voting Works", href: "#how-it-works" },
    { label: "My Karma", href: "#karma" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Award className="h-5 w-5 text-foreground" strokeWidth={2.5} />
          <span className="text-base font-display tracking-wider uppercase">Proof of Work Awards</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.label === "My Karma") {
                  window.dispatchEvent(new CustomEvent("open-karma-drawer"));
                } else {
                  const element = document.querySelector(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Karma Badge */}
          <div className="px-4 py-2 bg-accent text-accent-foreground flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-medium">Karma</span>
            <span className="text-sm font-bold">{userKarma.toLocaleString()}</span>
          </div>

          {/* CTA */}
          <Button
            onClick={onNominateClick}
            size="sm"
            variant="default"
            className="hidden md:flex"
          >
            Nominate
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <nav className="container py-6 flex flex-col gap-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === "My Karma") {
                      window.dispatchEvent(new CustomEvent("open-karma-drawer"));
                    } else {
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => {
                  onNominateClick();
                  setMobileMenuOpen(false);
                }}
                size="sm"
                className="w-full"
              >
                Nominate
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};