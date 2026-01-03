import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Anchor, MapPin, Box } from 'lucide-react';
import {
  ShieldCheck,
  Globe,
  Zap,
  ArrowUpRight
} from "lucide-react";

/* -------------------- SLIDES -------------------- */
const SLIDE_IMAGES = [
  "/Hero_Section_1.png",
  "/Hero_Section_1.png",
  "/Hero_Section_1.png"
];

/* -------------------- MOTION -------------------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2
    }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#FAF9F6] min-h-screen font-sans text-[#1A1A1A] overflow-x-hidden">

      <section className="relative pt-16 md:pt-20 px-[5%] md:px-[9%] w-full">
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="flex flex-col relative"
  >
    {/* IMAGE SLIDE CONTAINER */}
    <div
      className="
        relative w-full overflow-hidden bg-slate-100
        pb-[100%]
        sm:pb-[60%]
        md:pb-[42%]
      "
    >
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
        backgroundImage: `url(${SLIDE_IMAGES[currentSlide]})`,
        backgroundSize: "contain", // Shows the full image
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "opacity",
        }}
      />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/10 to-transparent" />
    </div>

    {/* CTA BUTTON - Outside on mobile, Inside on desktop */}
    <div className="relative md:absolute md:bottom-0 md:left-0 z-20 w-full md:w-auto">
      <Link to="/products" className="group flex items-center">
        <div
          className="
            bg-orange-300/90 backdrop-blur-xl
            border-t border-r border-white/40
            px-6 py-5
            sm:px-8 sm:py-6
            md:px-10 md:py-8
            flex items-center justify-between md:justify-start gap-4
            hover:bg-indigo-200 transition w-full
          "
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase">
            Shop All Products
          </span>

          <div className="bg-orange-500 text-white p-2 rounded-full group-hover:rotate-45 transition">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
    </div>
  </motion.div>
</section>


      {/* ================= HERO ================= */}
      <section className="container mx-auto px-[10%] pt-12 pb-24 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
            <span className="text-black font-medium">Specializing in high-impact distribution across the East Coast,</span>{" "}
             Peroz Corp provides the direct transmission your business needs to stay ahead.
          </p>

          <div className="text-sm font-mono tracking-widest text-indigo-500 uppercase">
            <TypewriterText speed={60} />
          </div>
          <div className="mt-14 flex justify-center">
  <Link to="/products" className="group flex items-center">
    <div className="
      bg-orange-300/90 
      text-black 
      border border-white/40 
      px-10 py-5 
      flex items-center gap-4 
      backdrop-blur-xl 
      hover:bg-indigo-200
      transition-all duration-500"
      >
      <span className="text-xs font-bold tracking-[0.3em] uppercase">
        Shop All Products
      </span>
      <div className="bg-orange-500 text-white p-2 rounded-full group-hover:rotate-45 transition">
        <ArrowUpRight size={16} />
      </div>
    </div>
  </Link>
</div>

        </motion.div>
      </section>
      

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-24 px-[10%] bg-white">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Featured Products</h2>
          <Link
            to="/products"
            className="text-sm font-bold border-b-2 border-indigo-600 pb-1 hover:text-indigo-600 transition-colors"
          >
            VIEW ALL BRANDS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className={`relative bg-[#F3F3F3] aspect-[3/4] group overflow-hidden ${
                item % 2 === 0 ? "md:mt-12" : ""
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <img
                  src="/images/OKF/Okf_Farmers_Aloe_Vera_Drink_Original_Green.webp"
                  alt="Product"
                  className="max-h-full transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-white/90 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  OKF Beverage
                </p>
                <h4 className="text-lg font-bold">Aloe Vera Original</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PEROZ CORP VALUE PROPOSITION ================= */}
<section className="py-40 px-[10%] bg-[#0B0D11] text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.07),transparent_70%)]" />

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-28">
      <p className="text-xs tracking-[0.35em] uppercase text-blue-500 font-bold mb-6">
        The Peroz Standard
      </p>
      <h2 className="text-4xl md:text-6xl font-black tracking-tight">
        Direct Transmission,<br />
        <span className="italic font-serif font-light text-blue-400">Zero Detours.</span>
      </h2>
    </div>

    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-16"
    >
      {[
        {
          icon: Anchor, // Represents importing/stability
          title: "Sourcing Precision",
          desc: "Direct-from-manufacturer pipelines for premium rice, cleaning systems, and pharmaceuticals."
        },
        {
          icon: MapPin, // Represents their Alexandria/Maryland hubs
          title: "Strategic Hubs",
          desc: "Alexandria-based logistics engineered for rapid East Coast distribution and fulfillment."
        },
        {
          icon: Box, // Represents the diverse product range
          title: "Diverse Portfolio",
          desc: "Expertly handling complex international trade across food, medical, and industrial sectors."
        }
      ].map((item, i) => (
        <motion.div key={i} variants={cardVariant} className="relative group">
          <div className="absolute -inset-px bg-gradient-to-b from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition rounded-2xl" />
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

       {/* ================= 6. FINAL CTA ================= */}
      <section className="py-40 bg-indigo-600 text-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="container mx-auto px-4"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-12">
            RETAIL REDEFINED.
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-white text-indigo-600 hover:bg-stone-100 rounded-none px-16 py-8 text-xl font-bold shadow-2xl"
          >
            <Link to="/contact">REQUEST PARTNERSHIP</Link>
          </Button>
        </motion.div>
      </section>

    </main>
  );
};

export default Home;
