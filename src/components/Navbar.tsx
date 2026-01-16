import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Shield, ShoppingCart, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const logo = "/logo.webp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
      setCartCount(cart.length);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-[#E8DCC8] py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* LOGO & NAME SECTION */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src={logo} 
              alt="Peroz" 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#E8DCC8] shadow-sm transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold italic font-serif text-[#2C3E2F] leading-none tracking-tight">
                Peroz
                <span className="inline-block ml-1.5 text-[#D4A574] font-black not-italic font-sans text-xl md:text-2xl">
                  Corp
                </span>
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Shield className="w-2.5 h-2.5 text-[#2C3E2F]/40" />
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.25em] text-[#2C3E2F]/50 font-bold">Verified Supplier</span>
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full border ${
                    isActive 
                    ? "bg-[#2C3E2F] text-white border-[#2C3E2F] shadow-md" 
                    : "text-[#2C3E2F] border-[#E8DCC8] hover:border-[#2C3E2F] hover:bg-[#FAF7F2]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Admin Pill (Desktop) */}
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full border flex items-center gap-2 ${
                  isActive 
                  ? "bg-[#D4A574] text-white border-[#D4A574]" 
                  : "text-[#D4A574] border-[#D4A574]/30 hover:bg-[#D4A574] hover:text-white"
                }`
              }
            >
              <User className="w-3 h-3" />
              Admin
            </NavLink>
            
            {/* Desktop Cart */}
            <Link to="/contact#inquiry-form" className="relative p-2.5 ml-2 bg-[#FAF7F2] rounded-full border border-[#E8DCC8] hover:border-[#2C3E2F] transition-all group">
              <ShoppingCart className="w-5 h-5 text-[#2C3E2F] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A574] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE NAVIGATION */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Products Oval (Mobile) */}
            <Link 
              to="/products" 
              className={`px-3 py-2 text-[9px] font-black uppercase tracking-widest rounded-full border transition-all ${
                location.pathname === '/products' 
                ? 'bg-[#2C3E2F] text-white border-[#2C3E2F]' 
                : 'text-[#2C3E2F] border-[#E8DCC8]'
              }`}
            >
              Shop
            </Link>

            {/* Cart (Mobile) */}
            <Link to="/contact#inquiry-form" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-[#2C3E2F]" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#D4A574] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Menu (Mobile) */}
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 text-[#2C3E2F]">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden mt-4 bg-white border border-[#E8DCC8] rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-5 space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `px-6 py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest transition-all ${
                        isActive ? "bg-[#FAF7F2] text-[#2C3E2F]" : "text-[#858566]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                
                {/* Mobile Admin Link */}
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-6 py-4 rounded-2xl text-[12px] font-bold uppercase tracking-widest transition-all border ${
                      isActive ? "bg-[#D4A574] text-white" : "border-[#D4A574]/20 text-[#D4A574]"
                    }`
                  }
                >
                  Admin Portal
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;