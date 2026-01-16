import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  ArrowRight, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Truck, 
  Star, 
  Store, 
  ChefHat, 
  Factory, 
  ArrowUpRight, 
  Info, 
  X 
} from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Components
import { CategoryCard } from '@/components/CategoryCard';
import { ValuePropCard } from '@/components/ValuePropCard';

/* ---------------- TYPES ---------------- */
interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  price?: number;
}

interface Category {
  name: string;
  slug: string;
  image: string;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  /* 1. SCROLL LOCK FOR MODAL */
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  /* 2. DATA FETCHING */
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Categories
      const { data: catData } = await supabase.from("products").select("category");
      if (catData) {
        const unique = Array.from(new Set(catData.map(p => p.category)))
          .slice(0, 6)
          .map(name => ({
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            image: `/images/categories/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`
          }));
        setCategories(unique);
      }

      // Fetch Featured Products
      const { data: prodData } = await supabase.from("products").select("*").limit(8);
      if (prodData) setFeaturedProducts(prodData);
    };

    fetchData();
      }, []);

      /* 3. INQUIRY LOGIC */
      const handleInquiry = (productName: string) => {
      // 1. Get current cart from local storage
      const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
      
      // 2. Add product if it's not already there
      if (!cart.includes(productName)) {
        cart.push(productName);
        localStorage.setItem("cartProducts", JSON.stringify(cart));
      }

      // 3. IMPORTANT: Reset body overflow before navigating
      // This prevents the "frozen scroll" bug when moving from a modal to a new page
      document.body.style.overflow = ""; 
      
      // 4. Close modal and navigate to the form section
      setSelectedProduct(null);
      navigate("/contact#inquiry-form");
    };

  /* 4. CONTENT ARRAYS (The missing ValueProps) */
  const valueProps = [
    { icon: ShieldCheck, title: 'Authentic Sourcing', description: 'Every product carefully selected from trusted international suppliers' },
    { icon: Leaf, title: 'Quality Ingredients', description: 'Premium, natural ingredients with no artificial additives' },
    { icon: Heart, title: 'Trusted by Families', description: 'Bringing authentic flavors to homes since 2009' },
    { icon: Truck, title: 'Fast Delivery', description: 'Strategic logistics engineered for rapid distribution.' }
  ];

  const sectors = [
    {
      title: "Retailers",
      desc: "Bulk ordering for grocery chains and specialty markets.",
      icon: Store,
      img: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80"
    },
    {
      title: "Food Service",
      desc: "Reliable supply for restaurants and hospitality groups.",
      icon: ChefHat,
      img: "https://images.unsplash.com/photo-1550966841-3ee7adac166c?auto=format&fit=crop&q=80"
    },
    {
      title: "Manufacturers",
      desc: "Raw ingredients for large-scale food production.",
      icon: Factory,
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      
      {/* Section 1: Editorial Store Introduction */}
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Hero Background Image */}
  <div className="absolute inset-0">
    <img
      src="/hero-products.webp"
      alt="Premium Peroz Corp Products"
      className="w-full h-full object-cover"
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
    {/* Warm overlay for brand tone */}
    <div className="absolute inset-0 bg-[#2C3E2F]/20" />
  </div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="max-w-4xl mx-auto"
    >
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Star className="w-4 h-4 text-[#D4A574] fill-current" />
        <span className="text-white text-sm tracking-wider">Bringing Exceptional Global Flavors to America Since 2009</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Discover Authentic
        <br />
        <span className="text-[#D4A574]">Flavors from Around</span>
        <br />
        the World
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Curated selection of premium dried fruits, nuts, confectionery, beverages, 
        and specialty goods from trusted artisans worldwide
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Link to="/products">
          <motion.button
            className="bg-[#D4A574] text-white px-10 py-5 rounded-full text-lg font-medium flex items-center gap-3 shadow-2xl"
            whileHover={{ scale: 1.05, backgroundColor: '#c89563' }}
            whileTap={{ scale: 0.95 }}
          >
            Shop All Products
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
        
        <Link to="/products">
          <motion.button
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Categories
          </motion.button>
        </Link>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-8 border-t border-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="text-center">
          <p className="text-4xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>150+</p>
          <p className="text-sm text-white/70 uppercase tracking-widest">Products</p>
        </div>
        <div className="hidden sm:block h-12 w-[1px] bg-white/20" />
        <div className="text-center">
          <p className="text-4xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>50+</p>
          <p className="text-sm text-white/70 uppercase tracking-widest">Countries</p>
        </div>
        <div className="hidden sm:block h-12 w-[1px] bg-white/20" />
        <div className="text-center">
          <p className="text-4xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>10k+</p>
          <p className="text-sm text-white/70 uppercase tracking-widest">Happy Customers</p>
        </div>
      </motion.div>
    </motion.div>
  </div>

  {/* Scroll Indicator */}
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.4 }}
  >
    <motion.div
      className="flex flex-col items-center gap-2 text-white/60"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
    </motion.div>
  </motion.div>
</section>

      {/* SECTION 2: SHOP BY CATEGORY */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A574] mb-4">Collections</h2>
          <h3 className="text-4xl md:text-5xl text-[#2C3E2F] font-serif italic mb-16">Shop by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div key={cat.slug} className="cursor-pointer" onClick={() => navigate(`/products/${cat.slug}`)}>
                <CategoryCard name={cat.name} image={cat.image} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TONAL MARQUEE */}
      <section className="py-24 bg-[#FAF9F6] border-y border-[#E8DCC8]/40 overflow-hidden">
      <div className="container mx-auto px-4 mb-12 text-center">
    <div className="flex items-center justify-center gap-4">
      <div className="h-[1px] w-8 bg-amber-600/20" />
      <p className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-800">
        Global Distribution Network
      </p>
      <div className="h-[1px] w-8 bg-amber-600/20" />
    </div>
  </div>

  <div className="relative flex overflow-hidden">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }} 
          className="flex whitespace-nowrap items-center"
        >
          {[...Array(2)].map((_, outerIdx) => (
            <div key={outerIdx} className="flex items-center">
              {["Buldak", "SHAFA", "Indomie", "LAZIZ", "Ginseng", "LEZAT"].map((brand, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-4xl md:text-6xl px-16 
                                  text-transparent stroke-[#2C3E2F]/40 
                                  [ -webkit-text-stroke-width:1px ] 
                                  hover:text-[#D4A574] hover:stroke-transparent
                                  transition-all duration-300 font-serif italic">

                    {brand}
                  </span>
                  <div className="w-2 h-2 rotate-45 bg-[#D4A574]/30" />
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

      {/* SECTION 5: FEATURED PRODUCTS */}
      <section className="py-24 px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A574] mb-4">Inventory</h2>
              <h3 className="text-4xl font-serif italic text-[#2C3E2F]">Featured Imports</h3>
            </div>
            <Link to="/products" className="text-xs font-bold border-b border-[#2C3E2F] pb-1 uppercase tracking-widest">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((p) => (
              <div key={p.id} className="bg-white p-3 rounded-[2rem] border border-[#E8DCC8] hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div 
                  onClick={() => setSelectedProduct(p)}
                  className="aspect-square bg-[#FAF7F2] rounded-[1.6rem] mb-6 flex items-center justify-center p-6 cursor-pointer overflow-hidden relative group"
                >
                  <img src={p.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt="" />
                </div>
                <div className="px-4 pb-4 flex-1">
                  <span className="text-[9px] text-[#D4A574] font-bold uppercase tracking-widest">{p.category}</span>
                  <h4 onClick={() => setSelectedProduct(p)} className="text-xl font-serif text-[#2C3E2F] mb-6 line-clamp-1 cursor-pointer hover:text-[#D4A574] transition-colors">
                    {p.name}
                  </h4>
                  <div className="flex gap-2">
                    <button onClick={() => handleInquiry(p.name)} className="flex-1 bg-[#2C3E2F] text-white py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#D4A574] transition-colors">
                      Add to Inquiry
                    </button>
                    <button onClick={() => setSelectedProduct(p)} className="w-10 h-10 flex items-center justify-center border border-[#E8DCC8] rounded-full hover:bg-stone-50 transition-colors">
                      <Info className="w-4 h-4 text-[#2C3E2F]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: BRAND SPOTLIGHT (From your original code) */}
      <section className="py-24 px-6 lg:px-8 bg-[#E8DCC8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/logo.webp" alt="Peroz Logo" className="rounded-[3rem] shadow-2xl w-full h-[550px] object-contain bg-white/20 p-12" />
            </motion.div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl text-[#2C3E2F] font-serif italic leading-tight">The Peroz Standard</h2>
              <p className="text-lg text-[#858566] leading-relaxed">
                Since 2009, we have bridged continents by sourcing excellence. 
                Our Alexandria-based logistics are engineered for rapid distribution 
                across the entire East Coast.
              </p>
              <Link to="/about">
                <motion.button className="bg-[#2C3E2F] text-white px-10 py-5 rounded-full text-lg font-medium flex items-center gap-3" whileHover={{ scale: 1.05 }}>
                  Our Story <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY CHOOSE US */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C3E2F] font-serif italic">Why Choose Peroz Corp</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <ValuePropCard key={index} icon={prop.icon} title={prop.title} description={prop.description} index={index} />
          ))}
        </div>
      </section>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-[#2C3E2F]/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative p-8 border-b border-[#E8DCC8]">
                <h3 className="font-serif italic text-2xl text-[#2C3E2F]">{selectedProduct.name}</h3>
                <button onClick={() => setSelectedProduct(null)} className="absolute right-8 top-8 p-2 hover:bg-stone-100 rounded-full">
                  <X className="w-5 h-5 text-[#2C3E2F]" />
                </button>
              </div>
              <div className="p-8">
                <div className="bg-[#FAF7F2] rounded-[2rem] p-10 mb-6 flex justify-center border border-[#E8DCC8]/30">
                  <img src={selectedProduct.image} className="max-h-64 object-contain" alt="" />
                </div>
                <p className="text-[#858566] text-sm leading-relaxed mb-8 italic">
                  {selectedProduct.description || "Premium imported goods. Inquire for full wholesale specifications and East Coast availability."}
                </p>
                <button 
                  onClick={() => handleInquiry(selectedProduct.name)}
                  className="w-full h-14 bg-[#2C3E2F] hover:bg-[#D4A574] text-white font-bold uppercase tracking-widest rounded-full transition-all"
                >
                  Add to Inquiry List
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Home;