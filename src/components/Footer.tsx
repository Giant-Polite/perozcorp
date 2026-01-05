import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink, Clock, Sparkles } from "lucide-react";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const [statusText, setStatusText] = useState("");

  // 🕒 Business Hours Logic — Virginia time (Eastern Time)
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
    <footer className="relative bg-[#050506] text-slate-300 overflow-hidden border-t border-white/5 font-sans">
      {/* BACKGROUND ELEMENTS - Amethyst & Deep Rose Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-violet-600 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-fuchsia-600 rounded-full blur-[150px] pointer-events-none" 
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />

      <div className="container mx-auto px-8 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. COMPANY INFO */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg border border-white/10">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-4xl font-bold tracking-tight text-white italic">
  Peroz
  <span className="inline-block mx-2 text-violet-400 font-black">
    Corp
  </span>
</span>

            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A premier global importer and strategic distribution partner, powering East Coast supply chains with world-class products from our Alexandria logistical hub.
            </p>
            <div className="pt-2">
              <span
                className={`inline-block px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border ${
                  isOpen
                    ? "bg-violet-500/10 text-violet-400 border-violet-500/30 animate-pulse"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                }`}
              >
                {statusText}
              </span>
            </div>
          </div>

          {/* 2. QUICK LINKS (RESTORED FROM PREVIOUS) */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-violet-500 to-transparent" />
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
                        isActive ? "text-violet-400" : "text-slate-400 hover:text-violet-400"
                      }`
                    }
                  >
                    <div className="w-1 h-1 rounded-full bg-violet-500/50 group-hover:w-4 group-hover:bg-violet-500 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT INFO (UPDATED TO VIRGINIA) */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-violet-500 to-transparent" />
            </h3>
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm group">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-violet-500 mt-1 shrink-0" />
                  <div className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                    <p>6304 Gravel Ave. Suite G.</p>
                    <p>Alexandria, Virginia 22310</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm group">
                <a href="tel:+13013058748" className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-violet-500 shrink-0" />
                  <span className="text-sm text-slate-400 group-hover:text-slate-200 font-bold transition-colors">+1 301-305-8748</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-violet-500/30 transition-all duration-300 backdrop-blur-sm group">
                <a href="mailto:sales@perozcorp.com" className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                  <span className="text-sm text-slate-400 group-hover:text-slate-200 font-bold transition-colors">Ali@PerozCorp.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4. BUSINESS HOURS */}
          <div className="space-y-6">
            <h3 className="relative inline-block font-bold text-white tracking-widest text-sm uppercase">
              Business Hours
              <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-violet-500 to-transparent" />
            </h3>
            <div className="space-y-2 pt-2">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM", open: true },
                { day: "Saturday", hours: "9:00 AM – 4:00 PM", open: true },
                { day: "Sunday", hours: "Closed", open: false },
              ].map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 transition-all duration-300 text-xs"
                >
                  <span className="font-medium text-slate-400">{d.day}</span>
                  <span className={d.open ? "text-violet-400 font-bold" : "text-slate-600"}>
                    {d.hours}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 px-1 opacity-50 text-[10px] font-bold uppercase tracking-tighter text-violet-400">
                <Clock className="w-3 h-3" />
                <span>Eastern Standard Time (EST)</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © {currentYear} PEROZ CORPORATION. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;