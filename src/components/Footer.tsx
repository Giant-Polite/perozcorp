import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink, Clock, Sparkles } from "lucide-react";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    const updateStatus = () => {
      const now = DateTime.now().setZone("America/New_York");
      const day = now.weekday; 
      const hour = now.hour;

      let open = false;
      let nextOpen = "";

      if (day >= 1 && day <= 5) {
        open = hour >= 9 && hour < 17;
        nextOpen = "9:00 AM – 5:00 PM";
      } else if (day === 6) {
        open = hour >= 9 && hour < 16;
        nextOpen = "9:00 AM – 4:00 PM";
      } else {
        open = false;
        nextOpen = "Opens Monday at 9:00 AM";
      }

      setIsOpen(open);
      setStatusText(open ? "Open Now" : nextOpen);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Background changed to a warm Espresso
    <footer className="relative bg-[#141110] text-stone-300 overflow-hidden border-t border-amber-900/20 font-sans">
      
      {/* BACKGROUND ELEMENTS - Warm Saffron & Terracotta Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-amber-600 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-orange-800 rounded-full blur-[150px] pointer-events-none" 
      />
      
      {/* Grid Pattern Overlay with warm tint */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#4a3728 1px, transparent 1px), linear-gradient(90deg, #4a3728 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      <div className="container mx-auto px-8 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. COMPANY INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {/* Icon container changed to Amber/Orange gradient */}
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-700 rounded-xl flex items-center justify-center shadow-lg border border-amber-400/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-4xl font-bold tracking-tight text-white italic">
                Peroz
                <span className="inline-block mx-2 text-amber-500 font-black">
                  Corp
                </span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              A premier global importer and strategic distribution partner, powering East Coast supply chains with world-class products from our Alexandria logistical hub.
            </p>
            <div className="pt-2">
              <span
                className={`inline-block px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border ${
                  isOpen
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30 animate-pulse"
                    : "bg-orange-500/10 text-orange-400 border-orange-500/30"
                }`}
              >
                {statusText}
              </span>
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Navigation
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
            </h3>
            <ul className="space-y-3 pt-2">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Admin Portal", path: "/login" },
              ].map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    end={link.path === "/"}
                    className={({ isActive }) =>
                      `group flex items-center space-x-2 text-sm font-medium transition-all duration-300 ${
                        isActive ? "text-amber-500" : "text-stone-400 hover:text-amber-500"
                      }`
                    }
                  >
                    <div className="w-1 h-1 rounded-full bg-amber-500/50 group-hover:w-4 group-hover:bg-amber-500 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
            </h3>
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-900/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm group">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <div className="text-sm text-stone-400 group-hover:text-stone-200 transition-colors">
                    <p>6304 Gravel Ave. Suite G.</p>
                    <p>Alexandria, Virginia 22310</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-900/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm group">
                <a href="tel:+13013058748" className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-200 font-bold transition-colors">+1 301-305-8748</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-amber-900/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm group">
                <a href="mailto:Ali@PerozCorp.com" className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-200 font-bold transition-colors">Ali@PerozCorp.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4. BUSINESS HOURS */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Operations
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-amber-500 to-transparent" />
            </h3>
            <div className="space-y-2 pt-2">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM", open: true },
                { day: "Saturday", hours: "9:00 AM – 4:00 PM", open: true },
                { day: "Sunday", hours: "Closed", open: false },
              ].map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 rounded-xl bg-white/[0.02] border border-amber-900/10 hover:border-amber-500/20 transition-all duration-300 text-xs"
                >
                  <span className="font-medium text-stone-400">{d.day}</span>
                  <span className={d.open ? "text-amber-500 font-bold" : "text-stone-600"}>
                    {d.hours}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 px-1 opacity-50 text-[10px] font-bold uppercase tracking-tighter text-amber-600">
                <Clock className="w-3 h-3" />
                <span>Eastern Standard Time (EST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-4 pt-2 border-t border-amber-900/20 text-center text-stone-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © {currentYear} PEROZ CORPORATION. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;