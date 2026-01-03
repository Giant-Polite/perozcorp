import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; // Fixed this line
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
      className="sticky top-0 z-[100] bg-slate-950/90 backdrop-blur-xl border-b border-white/5 py-2 shadow-2xl"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Peroz Corp" 
                className="w-11 h-11 rounded-full object-cover border-2 border-slate-800 group-hover:border-slate-500 transition-all duration-300 shadow-lg" 
              />
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-tight text-white italic">
  Peroz
  <span className="inline-block mx-2 text-violet-400 font-black">
    Corp
  </span>
</span>

              <div className="flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-slate-500" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-slate-500 font-bold">Verified Supplier</span>
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
                    ? "text-white bg-white/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            <div className="h-6 w-[1px] bg-slate-800 mx-4" />

            <Link to="/login">
              <Button 
                variant="outline" 
                className="border-slate-700 bg-transparent text-slate-300 hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-500 rounded-full px-8 text-xs font-black uppercase tracking-widest"
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
              className="text-white hover:bg-white/10 rounded-xl"
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
              className="md:hidden overflow-hidden bg-slate-900 border border-white/5 rounded-2xl mb-4 shadow-3xl"
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
                        ? "bg-white/10 text-white" 
                        : "text-slate-400 hover:bg-white/5"
                      }`
                    }
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 opacity-30" />
                  </NavLink>
                ))}
                <Link to="/login" onClick={toggleMenu} className="pt-4">
                  <Button className="w-full bg-white text-slate-950 hover:bg-slate-200 font-black uppercase tracking-widest rounded-xl h-12 shadow-xl shadow-white/5">
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