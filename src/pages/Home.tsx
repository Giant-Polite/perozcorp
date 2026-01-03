import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Anchor, MapPin, Box, ShieldCheck, Globe, Zap, ArrowUpRight } from 'lucide-react';

/* -------------------- SLIDES -------------------- */
// Fixed typo: cconst -> const
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
    image: "/images/Laziz.jpeg", // Replace with actual path
  },
  {
    id: 2,
    name: "Shafa Carbonated Pomegranate Drink",
    brand: "Beverage",
    image: "/images/Shafa_Carbonated_Pomegranate_Drink.jpeg", 
  },
  {
    id: 3,
    name: "Indomie Chicken Flavoured",
    brand: "Noodles",
    image: "/images/Indomie.jpeg", 
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
    transition: { duration: 1.5, ease: "easeInOut" as any } // Using 'as any' is a quick escape hatch if 'as const' fails
  },
  exit: { 
    opacity: 0, 
    filter: "blur(10px)",
    transition: { duration: 1.5, ease: "easeInOut" as any } 
  }
};

// Added missing cardVariant
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
      <section className="relative pt-16 md:pt-20 px-[5%] md:px-[9%] w-full">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="flex flex-col relative"
        >
          {/* IMAGE SLIDE CONTAINER */}
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

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/[0.02] pointer-events-none z-10" />
            
            {/* CTA BUTTON - Floating inside the image container on Desktop */}
            <div className="absolute bottom-0 left-0 z-20 hidden md:block">
              <Link to="/products" className="group flex items-center">
                <div className="bg-orange-300/90 backdrop-blur-xl border-t border-r border-white/40 px-10 py-8 flex items-center gap-4 hover:bg-indigo-200 transition">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase">Shop All Products</span>
                  <div className="bg-orange-500 text-white p-2 rounded-full group-hover:rotate-45 transition">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* SLIDE INDICATORS */}
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

          {/* MOBILE ONLY CTA BUTTON (shows below the slide) */}
          <div className="md:hidden mt-4">
            <Link to="/products" className="group flex items-center">
              <div className="bg-orange-300/90 backdrop-blur-xl border border-white/40 px-6 py-5 flex items-center justify-between w-full">
                <span className="text-xs font-bold tracking-[0.3em] uppercase">Shop All Products</span>
                <div className="bg-orange-500 text-white p-2 rounded-full">
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
    className="flex flex-col items-center" // Ensures everything stays centered
  >
    {/* MICRO-KERNED LOGOTYPE */}
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

    <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed mb-12">
      We source the best so you can serve the best.{" "}
      <span className="text-black font-medium">
        Specializing in high-impact distribution across the East Coast.
      </span>
    </p>

    <div className="text-sm font-mono tracking-widest text-indigo-500 uppercase mb-16">
      <TypewriterText speed={60} />
    </div>

    {/* THE REDESIGNED CTA BUTTON */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-20"
    >
      <Link to="/products" className="group flex items-center">
        <div
          className="
            bg-orange-300/90 backdrop-blur-xl
            border border-white/40
            px-12 py-6
            flex items-center gap-6
            hover:bg-indigo-600 hover:text-white transition-all duration-500
            shadow-xl shadow-orange-900/10
          "
        >
          <span className="text-xs font-black tracking-[0.4em] uppercase">
            Shop All Products
          </span>

          <div className="bg-orange-500 text-white p-3 rounded-full group-hover:rotate-45 group-hover:bg-white group-hover:text-indigo-600 transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </Link>
    </motion.div>

  </motion.div>
</section>
      
{/* ================= ULTRA-LUXURY FEATURED PRODUCTS ================= */}
<section className="py-32 px-[7%] bg-[#FDFDFD] relative overflow-hidden">
  {/* Sophisticated Background Element */}
  <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-1/2 pointer-events-none" />

  <div className="max-w-[1600px] mx-auto">
    {/* HEADER: Minimalist & Wide */}
    <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 border-b border-slate-100 pb-12">
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 mb-4">Curated Selection</p>
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-slate-900">
          The <span className="italic font-serif">Featured</span> Collection
        </h2>
      </div>
      
      <Link 
  to="/products" 
  className="group relative flex items-center justify-center mt-12 md:mt-0"
>
  {/* The Outer Animated Ring */}
  <div className="absolute inset-[-15px] rounded-full border border-slate-100 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-[0.16, 1, 0.3, 1]" />
  
  {/* The Main Button Body */}
  <div className="relative flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-white border border-slate-200 rounded-full shadow-sm group-hover:shadow-2xl group-hover:border-indigo-600 transition-all duration-700 ease-[0.16, 1, 0.3, 1] overflow-hidden">
    
    {/* Background Fill Animation */}
    <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />

    {/* Text Layer: Static (Black) */}
    <span className="relative z-10 text-[13px] font-black uppercase tracking-[0.3em] text-slate-900 group-hover:text-white transition-colors duration-500 text-center px-4">
      Explore <br /> <span className="italic font-serif normal-case text-xs tracking-normal">Entire</span> <br /> Catalog
    </span>

    {/* Floating Arrow Icon */}
    <div className="relative z-10 mt-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
      <ArrowUpRight size={16} className="text-white" />
    </div>
  </div>

  {/* Magnetic Label (Floating outside) */}
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="absolute inset-[-30px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
  >
     <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
        <text className="text-[8px] uppercase tracking-[0.8em] fill-indigo-300 font-bold">
           <textPath xlinkHref="#circlePath">
              Peroz Corp
           </textPath>
        </text>
     </svg>
  </motion.div>
</Link>

    </div>

    {/* GRID: Asymmetric & Modern */}
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

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Interaction Layer: Glassmorphism */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/5 transition-all duration-700" />
            
            {/* CTA Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1] z-30">
              <div className="bg-white/80 backdrop-blur-md p-6 border border-white/40 shadow-xl">
                 <Link to="/products" className="flex items-center justify-between group/link">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
          Explore More Products
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
      <section className="py-40 px-[10%] bg-[#0B0D11] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.07),transparent_70%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-28">
            <p className="text-xs tracking-[0.35em] uppercase text-blue-500 font-bold mb-6">The Peroz Standard</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Direct Transmission,<br /><span className="italic font-serif font-light text-blue-400">Zero Detours.</span></h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16"
          >
            {[
              { icon: Anchor, title: "Sourcing Precision", desc: "Direct-from-manufacturer pipelines for premium logistics." },
              { icon: MapPin, title: "Strategic Hubs", desc: "Alexandria-based logistics engineered for rapid distribution." },
              { icon: Box, title: "Diverse Portfolio", desc: "Expertly handling international trade across all food sectors." }
            ].map((item, i) => (
              <motion.div key={i} variants={cardVariant} className="relative group">
                <div className="relative bg-[#12151C] rounded-2xl p-12 border border-white/5">
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
      <section className="py-40 bg-indigo-600 text-white text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black mb-12">RETAIL REDEFINED.</h2>
          <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-stone-100 rounded-none px-16 py-8 text-xl font-bold shadow-2xl">
            <Link to="/contact">REQUEST PARTNERSHIP</Link>
          </Button>
        </motion.div>
      </section>

    </main>
  );
};

export default Home;