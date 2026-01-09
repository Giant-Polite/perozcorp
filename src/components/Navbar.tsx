import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const logo = "/logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav 
      // Changed bg to a warm dark brown-charcoal and border to a subtle amber/gold tint
      className="sticky top-0 z-[100] bg-[#1a1412]/95 backdrop-blur-xl border-b border-amber-900/20 py-2 shadow-2xl"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Peroz Corp" 
                // Border changed to a warm bronze/amber
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-900/50 group-hover:border-amber-500 transition-all duration-300 shadow-lg" 
              />
              <div className="absolute inset-0 rounded-full bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-tight text-white italic">
                Peroz
                {/* Highlight changed from violet to a warm saffron/amber */}
                <span className="inline-block mx-2 text-amber-500 font-black">
                  Corp
                </span>
              </span>

              <div className="flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-amber-700/60" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-amber-700/60 font-bold">Verified Supplier</span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-5 py-2 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                    isActive 
                    // Active state now uses a warm white/amber glow
                    ? "text-amber-50 bg-amber-500/20 shadow-inner" 
                    : "text-stone-400 hover:text-amber-200 hover:bg-amber-950/30"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="h-6 w-[1px] bg-amber-900/30 mx-4" />

            <Link to="/login">
              <Button 
                variant="outline" 
                // Button now has an amber/gold hover state
                className="border-amber-900/50 bg-transparent text-amber-200 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-500 transition-all duration-500 rounded-full px-8 text-xs font-black uppercase tracking-widest"
              >
                Admin Portal
              </Button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-amber-100 hover:bg-amber-500/10 rounded-xl"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#241b19] border border-amber-900/20 rounded-2xl mb-4 shadow-3xl"
            >
              <div className="flex flex-col p-4 space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between p-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                        isActive 
                        ? "bg-amber-500/20 text-amber-200" 
                        : "text-stone-400 hover:bg-amber-950/50"
                      }`
                    }
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-amber-500 opacity-50" />
                  </NavLink>
                ))}
                <Link to="/login" onClick={toggleMenu} className="pt-4">
                  <Button className="w-full bg-amber-500 text-stone-950 hover:bg-amber-400 font-black uppercase tracking-widest rounded-xl h-12 shadow-xl shadow-amber-900/20">
                    Admin Portal
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;