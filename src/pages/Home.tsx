import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Changed from 'motion/react' for compatibility
import { ArrowRight, ShieldCheck, Leaf, Heart, Truck, Star, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Components
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { ValuePropCard } from '@/components/ValuePropCard';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number; // Added if your DB has it, otherwise defaults to $0.00
}

interface Category {
  name: string;
  slug: string;
  image: string;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Categories (Derived from Products table as per your landing page logic)
      const { data: catData } = await supabase.from("products").select("category");
      if (catData) {
        const unique = Array.from(new Set(catData.map(p => p.category)))
          .slice(0, 6) // Limit to top 6 for Figma layout
          .map(name => ({
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            // Using your existing local folder structure for category images
            image: `/images/categories/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`
          }));
        setCategories(unique);
      }

      // 2. Fetch Featured Products
      const { data: prodData } = await supabase.from("products").select("*").limit(8);
      if (prodData) setFeaturedProducts(prodData);
    };

    fetchData();
  }, []);

  const valueProps = [
    { icon: ShieldCheck, title: 'Authentic Sourcing', description: 'Every product carefully selected from trusted international suppliers' },
    { icon: Leaf, title: 'Quality Ingredients', description: 'Premium, natural ingredients with no artificial additives' },
    { icon: Heart, title: 'Trusted by Families', description: 'Bringing authentic flavors to homes since 2009' },
    { icon: Truck, title: 'Fast Delivery', description: 'Strategic logistics engineered for rapid distribution.' }
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
        <span className="text-white text-sm tracking-wider">Premium International Foods Since 2009</span>
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

      {/* Section 2: Shop by Category */}
      <section className="py-20 px-6 lg:px-8 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-[#2C3E2F] font-serif">Shop by Category</h2>
            <p className="text-lg text-[#858566]">Explore our diverse selection of premium products</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <div key={cat.slug} onClick={() => navigate(`/products/${cat.slug}`)}>
                <CategoryCard name={cat.name} image={cat.image} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= REFINED TONAL MARQUEE ================= */}
<section className="py-24 bg-[#FAF9F6] border-y border-[#E8DCC8]/40 overflow-hidden">
  <div className="container mx-auto px-4 mb-12 text-center">
    <div className="flex items-center justify-center gap-4">
      <div className="h-[1px] w-12 bg-[#D4A574]/30" />
      <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#2C3E2F]">
        Global Distribution Network
      </p>
      <div className="h-[1px] w-12 bg-[#D4A574]/30" />
    </div>
  </div>

  <div className="relative flex overflow-hidden">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }}
      transition={{ 
        duration: 50, // Slightly slower for that ultra-luxury feel
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="flex whitespace-nowrap items-center"
    >
      {[...Array(2)].map((_, outerIndex) => (
        <div key={outerIndex} className="flex items-center">
          {[
            { name: "Buldak", style: "font-serif italic font-light" },
            { name: "SHAFA", style: "font-sans font-black tracking-tighter uppercase" },
            { name: "Indomie", style: "font-sans font-medium tracking-tight" },
            { name: "LAZIZ", style: "font-serif tracking-widest uppercase text-xs" },
            { name: "Ginseng", style: "font-serif italic" },
            { name: "LEZAT", style: "font-sans font-black uppercase" }
          ].map((brand, i) => (
            <div key={i} className="flex items-center">
              <span 
                className={`
                  text-5xl md:text-7xl px-16 transition-all duration-1000 cursor-default
                  text-[#2C3E2F]/20 hover:text-[#D4A574] hover:scale-105
                  ${brand.style}
                `}
              >
                {brand.name}
              </span>
              
              {/* Luxury Diamond Divider using your brand gold */}
              <div className="w-2 h-2 rotate-45 bg-[#D4A574]/30" />
            </div>
          ))}
        </div>
      ))}
    </motion.div>

    {/* Deep Gradient Masking for a "Vogue" Fade - Matches your cream background */}
    <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10" />
    <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent z-10" />
  </div>
</section>



      {/* Section 3: Featured Products */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4 text-[#2C3E2F] font-serif">Featured Products</h2>
            <p className="text-lg text-[#858566]">Direct-from-manufacturer pipelines</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                image={product.image}
                name={product.name}
                category={product.category}
                price={0} // Your current DB doesn't show price, defaults to 0
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Brand Spotlight */}
      <section className="py-20 px-6 lg:px-8 bg-[#E8DCC8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/logo.webp" alt="Peroz Logo" className="rounded-3xl shadow-2xl w-full h-[500px] object-contain bg-white/20 p-10" />
            </motion.div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl text-[#2C3E2F] font-serif">The Peroz Standard</h2>
              <p className="text-lg text-[#858566] leading-relaxed">
                Since 2009, we have bridged continents by sourcing excellence. 
                Our Alexandria-based logistics are engineered for rapid distribution 
                across all food sectors.
              </p>
              <Link to="/about">
                <motion.button className="bg-[#2C3E2F] text-white px-8 py-4 rounded-full text-lg flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  Our Story <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Why Choose Us */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-[#2C3E2F] font-serif">Why Choose Peroz Corp</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <ValuePropCard key={index} icon={prop.icon} title={prop.title} description={prop.description} index={index} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;