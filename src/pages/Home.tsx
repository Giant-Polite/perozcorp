import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Anchor, MapPin, Box, ShieldCheck, Globe, Zap, ArrowUpRight } from 'lucide-react';

/* -------------------- SLIDES -------------------- */
const SLIDE_IMAGES = [
  "/Hero_Section_1.png",
  "/Hero_Section_2.png",
  "/Hero_Section_3.png"
];
const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Laziz Fudge",
    brand: "Laziz",
    image: "/images/Laziz.jpeg",
  },
  {
    id: 2,
    name: "Alokozay Energy Drink",
    brand: "Beverage",
    image: "/images/alokozay_energy_drink.jpg", 
  },
  {
    id: 3,
    name: "Buldak Spicy Chicken Noodle Carbonara Flavor Ramen",
    brand: "Noodles",
    image: "/images/Buldak.jpeg", 
  },
  {
    id: 4,
    name: "Ginseng Energy Drink",
    brand: "Beverage",
    image: "/images/Ginseng_Energy.jpeg",
  },
];

/* -------------------- MOTION VARIANTS -------------------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2
    }
  }
};

const slideVariants: Variants = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    filter: "blur(0px)",
    transition: { duration: 1.5, ease: "easeInOut" as any }
  },
  exit: { 
    opacity: 0, 
    filter: "blur(10px)",
    transition: { duration: 1.5, ease: "easeInOut" as any } 
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
  }
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#FAF9F6] min-h-screen font-sans text-[#1A1A1A] overflow-x-hidden">
      
      {/* ================= HERO SLIDESHOW SECTION ================= */}
      <section className="relative pt-2 md:pt-20 px-[5%] md:px-[9%] w-full">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="flex flex-col relative"
        >
          <div className="relative w-full overflow-hidden bg-slate-100 rounded-2xl pb-[100%] sm:pb-[60%] md:pb-[42%]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={currentSlide}
                src={SLIDE_IMAGES[currentSlide]}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full object-contain"
                alt={`Peroz Corp Hero ${currentSlide + 1}`}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/[0.02] pointer-events-none z-10" />
            
            <div className="absolute bottom-0 left-0 z-20 hidden md:block">
              <Link to="/products" className="group flex items-center">
                <div className="relative overflow-hidden bg-orange-300/90 backdrop-blur-xl border-t border-r border-white/40 px-10 py-8 flex items-center gap-4 hover:bg-indigo-200 transition">
                  
                  {/* THE SHIMMER PULSE: Optimized for endless, constant motion */}
                  <motion.div
                    initial={{ x: '-150%' }}
                    animate={{ x: '350%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      repeatDelay: 1.5, 
                      ease: "linear", // Maintains constant speed so it doesn't "stick" at the end
                    }}
                    className="absolute inset-y-0 w-40 pointer-events-none" // Wider shimmer for a more premium catch
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(48, 40, 78, 0.4), transparent)',
                      skewX: '-25deg', // Slightly steeper angle to match the other high-end buttons
                    }}
                  />

                  <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase">
                    Shop All Products
                  </span>
                  
                  <div className="relative z-10 bg-orange-500 text-white p-2 rounded-full group-hover:rotate-45 transition">
                    <ArrowUpRight size={16} />
                  </div>
                  </div>
              </Link>
            </div>
          </div>

          <div className="flex gap-2 mt-6 justify-center md:justify-start">
            {SLIDE_IMAGES.map((_, index) => (
              <div 
                key={index}
                className={`h-1 transition-all duration-1000 rounded-full ${
                  currentSlide === index ? "w-12 bg-indigo-600" : "w-4 bg-slate-200"
                }`}
              />
            ))}
          </div>

          <div className="md:hidden mt-4">
            <Link to="/products" className="group flex items-center">
  <div className="relative overflow-hidden bg-orange-300/90 backdrop-blur-xl border border-white/40 px-6 py-5 flex items-center justify-between w-full">
    
    {/* THE SHIMMER PULSE: Extended range for a "never-ending" feel */}
    <motion.div
      initial={{ x: '-150%' }}
      animate={{ x: '350%' }} // Increased from 250% to ensure it clears the wide mobile button
      transition={{
        repeat: Infinity,
        duration: 2.5,   // Slightly slower to match the "luxury" feel you liked
        repeatDelay: 1.5, 
        ease: "linear",  // Linear prevents that "slowing down" at the end
      }}
      className="absolute inset-y-0 w-40 pointer-events-none" // Made the shimmer slightly wider (w-40)
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(48, 40, 78, 0.4), transparent)',
        skewX: '-25deg',
      }}
    />

    <span className="relative z-10 text-xs font-bold tracking-[0.3em] uppercase">
      Shop All Products
    </span>
    
    <div className="relative z-10 bg-orange-500 text-white p-2 rounded-full">
      <ArrowUpRight size={16} />
    </div>
  </div>
</Link>
          </div>
        </motion.div>
      </section>

      {/* ================= BRAND INTRO ================= */}
      <section className="container mx-auto px-[10%] pt-24 pb-24 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-8 flex justify-center items-baseline">
            <span className="inline-flex">
              <span className="mr-[0.04em]">P</span>
              <span className="mr-[0.02em]">E</span>
              <span className="mr-[0.01em]">R</span>
              <span className="-mr-[0.01em]">O</span>
              <span className="ml-[0.06em]">Z</span>
            </span>
            <span className="ml-4 text-indigo-600 italic font-serif font-light tracking-normal">
              Corp.
            </span>
          </h1>

          <div className="flex justify-center mb-8">
            <div className="h-px w-24 bg-indigo-600" />
          </div>

          <div className="relative max-w-4xl mx-auto py-12 px-8">
            {/* Elegant Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-[1px] bg-indigo-600" />
            <div className="absolute top-0 left-0 w-[1px] h-8 bg-indigo-600" />
            
            <p className="text-xl md:text-3xl text-stone-500 font-light leading-snug text-left md:pl-12">
              Connecting global manufacturers <br className="hidden md:block" />
              to the <span className="italic font-serif text-slate-900">American Palate.</span>
              
              <span className="block mt-8 text-sm md:text-lg text-black font-medium tracking-tight border-l-2 border-indigo-600 pl-6">
                Exclusive importers and master distributors for high-demand <br className="hidden md:block" />
                Mediterranean and Middle Eastern staples across the East Coast.
              </span>
            </p>
          </div>

          <div className="text-sm font-mono tracking-widest text-indigo-500 uppercase mb-16">
            <TypewriterText speed={60} />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative z-20"
          >
            <Link to="/products" className="group flex items-center">
  <div className="relative overflow-hidden bg-orange-300/90 backdrop-blur-xl border border-white/40 px-12 py-6 flex items-center gap-6 hover:bg-indigo-600 hover:text-white transition-all duration-500 shadow-xl shadow-orange-900/10">
    
    {/* THE LUXURY SWEEP: Pulsing light effect */}
    <motion.div
      initial={{ x: '-150%' }}
      animate={{ x: '250%' }}
      transition={{
        repeat: Infinity,
        duration: 2.5,
        repeatDelay: 2, // Keeps the animation sophisticated rather than frantic
        ease: "easeInOut",
      }}
      className="absolute inset-y-0 w-32 pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(48, 40, 78, 0.4), transparent)',
        skewX: '-25deg',
      }}
    />

    <span className="relative z-10 text-xs font-black tracking-[0.4em] uppercase">
      Shop All Products
    </span>
    
    <div className="relative z-10 bg-orange-500 text-white p-3 rounded-full group-hover:rotate-45 group-hover:bg-white group-hover:text-indigo-600 transition-all duration-500">
      <ArrowUpRight size={20} />
    </div>
  </div>
</Link>
          </motion.div>
        </motion.div>
      </section>


              {/* ================= REFINED TONAL MARQUEE ================= */}
<section className="py-24 bg-[#FAF9F6] border-y border-slate-200/60 overflow-hidden">
  <div className="container mx-auto px-4 mb-12 text-center">
    <div className="flex items-center justify-center gap-4">
      <div className="h-[1px] w-8 bg-indigo-600/20" />
      <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-800">
        Global Distribution Network
      </p>
      <div className="h-[1px] w-8 bg-indigo-600/20" />
    </div>
  </div>

  <div className="relative flex overflow-hidden">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ 
        duration: 40, // Slower is more luxury
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="flex whitespace-nowrap items-center"
    >
      {[...Array(2)].map((_, outerIndex) => (
        <div key={outerIndex} className="flex items-center">
          {[
            { name: "Laziz", style: "font-serif italic font-light" },
            { name: "SHAFA", style: "font-black tracking-tighter uppercase" },
            { name: "Indomie", style: "font-sans font-medium tracking-tight" },
            { name: "BEHROUZ NIK", style: "font-serif tracking-widest uppercase text-xs" },
            { name: "Ginseng", style: "font-serif italic" },
            { name: "PEROZNIK", style: "font-black uppercase" }
          ].map((brand, i) => (
            <div key={i} className="flex items-center">
              {/* The Brand Name */}
              <span 
                className={`
                  text-4xl md:text-6xl px-12 transition-all duration-1000 cursor-default
                  text-slate-400 hover:text-indigo-600 hover:scale-105
                  ${brand.style}
                `}
              >
                {brand.name}
              </span>
              
              {/* Luxury Diamond Divider */}
              <div className="w-1.5 h-1.5 rotate-45 bg-indigo-200" />
            </div>
          ))}
        </div>
      ))}
    </motion.div>

    {/* Deep Gradient Masking for a "Vogue" Fade */}
    <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10" />
  </div>
</section>


      
      {/* ================= ULTRA-LUXURY FEATURED PRODUCTS ================= */}
      <section className="py-12 px-[7%] bg-[#FDFDFD] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 border-b border-slate-100 pb-12">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-4">Best Sellers</p>
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-slate-900">
                Our <span className="italic font-serif">Featured</span> Collection
              </h2>
            </div>
            
            {/* RESPONSIVE LUXURY CTA BUTTON */}
            <div className="relative flex items-center justify-center mt-8 md:mt-0 p-2 md:p-4">
              <Link to="/products" className="relative group">
                {/* Desktop Version - Stays exactly the same */}
                <div className="hidden md:flex relative flex-col items-center justify-center w-40 h-40 bg-indigo-600 border border-indigo-600 rounded-full shadow-2xl overflow-hidden group-hover:scale-105 group-hover:shadow-indigo-500/40 transition-all duration-500">
                  <span className="relative z-10 text-[13px] font-black uppercase tracking-[0.3em] text-white text-center px-4 leading-tight group-hover:tracking-[0.4em] transition-all duration-500">
                    Explore <br /> <span className="italic font-serif normal-case text-xs tracking-normal">Entire</span> <br /> Catalog
                  </span>
                  <div className="relative z-10 mt-2 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight size={16} className="text-white" />
                  </div>
                </div>

                {/* Mobile Version - Luxury Animated Pill with High-Visibility Shimmer */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.02, 1], // Breathing effect
                    boxShadow: [
                      "0 4px 20px rgba(0,0,0,0.05)",
                      "0 4px 25px rgba(79, 70, 229, 0.2)", 
                      "0 4px 20px rgba(0,0,0,0.05)"
                    ]
                  }}
                  transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="md:hidden relative flex items-center gap-4 bg-white border border-slate-200 px-8 py-4 rounded-full overflow-hidden"
                >
                  {/* High-Contrast Shimmer Sweep */}
                  <motion.div
                    animate={{ x: ["-150%", "150%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2.5, 
                      repeatDelay: 1, // Sweeps every second
                      ease: "easeInOut" 
                    }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent)",
                      width: "50%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      skewX: "-20deg"
                    }}
                  />

                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">
                    Explore <span className="italic font-serif font-light text-indigo-600 ml-1">Entire</span> Catalog
                  </span>

                  <div className="relative z-10 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </motion.div>

                {/* Rotating Label (Desktop Only) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="hidden md:block absolute inset-[-30px] pointer-events-none opacity-100 group-hover:scale-110 transition-transform duration-500"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path id="circlePath" d="M 50, 50 m 0, -37 a 37,37 0 1,1 0,74 a 37,37 0 1,1 0,-74" fill="transparent" />
                      <text className="text-[10px] uppercase tracking-[0.8em] fill-indigo-300 font-bold group-hover:fill-indigo-400 transition-colors duration-500">
                        <textPath xlinkHref="#circlePath">• Peroz Corp •</textPath>
                      </text>
                  </svg>
                </motion.div>
              </Link>
            </div>
          </div>

          {/* GRID: Asymmetric & Modern with Light-Catch Effect */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-20">
  {FEATURED_PRODUCTS.map((product, index) => (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className={`relative group ${index % 2 !== 0 ? "md:translate-y-24" : ""}`}
    >
      {/* Card Frame */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.1)] rounded-sm">
        
        {/* LUXURY SHINE SWEEP: Triggers on scroll/view */}
        <motion.div
          initial={{ x: "-150%" }}
          whileInView={{ x: "150%" }}
          viewport={{ once: false }}
          transition={{ 
            duration: 2.5, 
            delay: 0.5 + (index * 0.1), 
            ease: [0.43, 0.13, 0.23, 0.96],
            repeat: Infinity,
            repeatDelay: 8
          }}
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
        />

        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center p-10">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
          />
        </div>

        {/* Interaction Layer: Very subtle darkening on hover */}
        <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-all duration-700 z-10" />
        
        {/* CTA Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] z-30">
          <div className="bg-white/80 backdrop-blur-md p-6 border border-white/40 shadow-xl">
             <Link to="/products" className="flex items-center justify-between group/link">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Explore More
                </span>
                <ArrowUpRight size={14} className="group-hover/link:rotate-45 transition-transform" />
             </Link>
          </div>
        </div>
      </div>

      {/* Product Info below the frame */}
      <div className="mt-8 space-y-2 px-2">
        <div className="flex justify-between items-baseline">
          <h4 className="text-lg font-medium text-slate-900 tracking-tight italic font-serif">
            {product.name}
          </h4>
          <div className="h-px flex-1 mx-4 bg-slate-100" />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {product.brand}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* ================= VALUE PROPOSITION ================= */}
      <section className="py-32 px-[8%] bg-[#0B0D11] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.07),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-28">
            <p className="text-xs tracking-[0.35em] uppercase text-blue-500 font-bold mb-6">The Peroz Standard</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Direct Transmission,<br /><span className="italic font-serif font-light text-blue-400">Zero Detours.</span></h2>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Anchor, title: "Sourcing Precision", desc: "Direct-from-manufacturer pipelines for premium logistics." },
              { icon: MapPin, title: "Strategic Hubs", desc: "Alexandria-based logistics engineered for rapid distribution." },
              { icon: Box, title: "Diverse Portfolio", desc: "Expertly handling international trade across all food sectors." }
            ].map((item, i) => (
              <motion.div key={i} variants={cardVariant} className="relative group">
                <div className="relative bg-[#12151C] rounded-2xl p-12 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <item.icon size={36} strokeWidth={1.5} className="text-blue-500 mb-8" />
                  <h3 className="text-xl font-black mb-4 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative py-16 bg-[#FAF9F6] border-t border-slate-100 overflow-hidden">
        <div className="absolute -bottom-10 -right-10 text-[20rem] font-serif italic text-slate-200/20 pointer-events-none select-none">P</div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-6 bg-indigo-600/30" />
            <span className="text-[10px] tracking-[0.6em] uppercase text-stone-400 font-semibold">Peroz Corp</span>
            <div className="h-[1px] w-6 bg-indigo-600/30" />
          </div>
          <h2 className="text-4xl md:text-5xl tracking-tight text-slate-900 mb-12 leading-tight">
            <span className="block mb-2 font-black uppercase tracking-tighter">Global Logistics.</span>
            <span className="block italic font-serif font-light text-indigo-600/80">Personal Precision.</span>
          </h2>
          <div className="flex justify-center">
            <Link to="/contact" className="group relative inline-flex items-center gap-4 px-10 py-4 border border-slate-300 rounded-full overflow-hidden hover:border-indigo-600 transition-all duration-500">
            {/* The Background Layer: Now with a permanent pulse animation */}
            <motion.div 
              className="absolute inset-0 bg-indigo-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }} // Desktop behavior
              animate={{
                // Mobile behavior: Create a subtle "shimmer" pulse
                x: ["-100%", "-90%", "-100%"],
              }}
              transition={{
                x: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                // Hover transition remains snappy
                duration: 0.5 
              }}
            />
            
            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-900 group-hover:text-white transition-colors duration-500">
              Partner with Peroz. Contact Us
            </span>
            <ArrowUpRight size={16} className="relative z-10 text-slate-900 group-hover:text-white transition-colors duration-500" />
          </Link>
          </div>
          <p className="mt-8 text-[13px] font-serif italic tracking-[0.2em] text-stone-500">Established 2009</p>
        </motion.div>
      </section>
    </main>
  );
};

export default Home;