import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Globe } from "lucide-react";
import { SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { FaDiscord } from "react-icons/fa"



const Footer = () => {
  return (
    <footer className="bg-gray-950 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <img src="/images/08fc4c04-8697-4208-88bd-114b9a0d94cb.png" alt="" className="rounded-full"/>
              </div>
              <span className="text-xl font-bold text-white">Bitcoin Culture Hub</span>
            </div>
            <p className="text-gray-400 text-sm">The world’s leading community for lifelong learning with Bitcoin.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                {/* <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                                        About
                                    </Link> */}
                
              </li>
            </ul>
          </div>

          
         {/* Community */}
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <div className="flex items-center gap-6">
                <a
                  href="https://x.com/btcculturehub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <SiX className="w-5 h-5" />
                </a>
                <a
                  href="https://discord.gg/QDDdsmNx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors cursor-pointer"
                >
                  <FaDiscord className="w-5 h-5" />
                </a>
              </div>
            </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-orange-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg text-sm whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Bitcoin Culture Hub. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                                Terms
                            </Link>
                            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                                Privacy
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                                Contact
                            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;