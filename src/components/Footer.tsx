import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Phone, MapPin, Sparkles } from "lucide-react";
import { DateTime } from "luxon";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const now = DateTime.now().setZone("America/New_York");
      const day = now.weekday; 
      const hour = now.hour;
      const open = (day >= 1 && day <= 5 && hour >= 9 && hour < 17) || (day === 6 && hour >= 9 && hour < 16);
      setIsOpen(open);
    };
    updateStatus();
  }, []);

  return (
    <footer className="bg-[#2C3E2F] text-stone-200 border-t border-[#D4A574]/20 py-10 font-sans">
      <div className="container mx-auto px-6">
        
        {/* MAIN ROW: Logo and Quick Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-white/10">
          
          {/* BRANDING */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#D4A574] rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-6xl font-bold tracking-tight text-white italic font-serif leading-none">
                Peroz
                <span className="inline-block ml-3 text-[#D4A574] font-black not-italic font-sans text-4xl">
                  Corp
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">Global Logistics Hub</span>
            </div>
          </div>

          {/* COMPACT NAV */}
          <div className="flex flex-wrap gap-x-4 gap-y-3">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Admin", path: "/login" },
            ].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[12px] font-bold uppercase tracking-wider hover:bg-[#D4A574] hover:text-white transition-all"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* STATUS & CONTACT QUICK-LINK */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/60">
                {isOpen ? "Alexandria HQ Open" : "HQ Closed"}
              </span>
            </div>
            <a href="mailto:Ali@PerozCorp.com" className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[12px] font-bold uppercase tracking-wider hover:bg-[#D4A574] hover:text-white transition-all">
              Inquire Now
            </a>
          </div>
        </div>

        {/* SECONDARY ROW: Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-stone-400">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm">6304 Gravel Ave. Suite G. Alexandria, VA 22310</span>
          </div>
          <div className="flex items-center gap-3 md:justify-center">
            <Phone className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm font-bold">+1 301-305-8748</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <Mail className="w-4 h-4 text-[#D4A574]" />
            <span className="text-sm font-bold">Ali@PerozCorp.com</span>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] font-black uppercase tracking-[0.4em] text-white/20">
            © {currentYear} PEROZ CORPORATION
          </p>
          <p className="text-[12px] font-bold uppercase tracking-widest text-white/20">
            Quality Imported Goods • East Coast Distribution
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;