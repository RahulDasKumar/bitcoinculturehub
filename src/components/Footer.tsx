import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Bitcoin Culture Hub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building durable, scalable Bitcoin culture through Houses, Archetypes, and decentralized governance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/manifesto" className="block text-muted-foreground hover:text-foreground transition-colors">
                Manifesto
              </Link>
              <Link to="#houses" className="block text-muted-foreground hover:text-foreground transition-colors">
                Houses
              </Link>
              <Link to="#archetypes" className="block text-muted-foreground hover:text-foreground transition-colors">
                Archetypes
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground">Community</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Join a House
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Discover Your Archetype
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Community Guidelines
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                Events & Rituals
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-foreground">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>contact@bitcoinculturehub.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Bitcoin Culture Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;