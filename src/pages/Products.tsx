import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePremiumToast } from "@/hooks/usePremiumToast";
import { ToastContainer } from "@/components/PremiumToast";
import { Search, ShoppingBag, ArrowUp, X, Filter, PackageOpen, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";
import { Helmet } from 'react-helmet-async';

/* ---------------- TYPES ---------------- */
interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  in_stock: boolean;
}

interface Category {
  name: string;
  slug: string;
}

const addToCart = (productName: string) => {
  const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
  if (!cart.includes(productName)) {
    cart.push(productName);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    return true;
  }
  return false;
};

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { toasts, showToast, removeToast } = usePremiumToast();
  const navigate = useNavigate();
  
  // REFS
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const navContainerRef = useRef<HTMLElement>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
        const unique = Array.from(new Set(data.map(p => p.category)))
          .sort()
          .map(name => ({
            name,
            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          }));
        setCategories(unique);
        if (unique.length > 0) setActiveCategory(unique[0].slug);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- SEARCH & FILTER ---------------- */
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {};
    filteredProducts.forEach(p => {
      const slug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (!grouped[slug]) grouped[slug] = [];
      grouped[slug].push(p);
    });
    return grouped;
  }, [filteredProducts]);

  /* ---------------- THE CENTERING ENGINE ---------------- */
  
  const centerActiveButton = () => {
    const activeBtn = categoryButtonRefs.current[activeCategory];
    const container = navContainerRef.current;

    if (activeBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();

      // Find the distance from the left of the container to the left of the button
      const btnLeftRelativeToContainer = btnRect.left - containerRect.left;
      
      // Calculate how much we need to scroll to put the button's center in the container's center
      const scrollTarget = container.scrollLeft + btnLeftRelativeToContainer - (containerRect.width / 2) + (btnRect.width / 2);

      container.scrollTo({
        left: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  // Center when the active category changes
  useEffect(() => {
    requestAnimationFrame(() => {
      centerActiveButton();
    });
  }, [activeCategory]);

  /* ---------------- SCROLL SPY & SCROLLING ---------------- */
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      
      // Detection offset
      const pos = window.scrollY + 280; 

      for (const [slug, el] of Object.entries(categoryRefs.current)) {
        if (!el) continue;
        const { offsetTop, offsetHeight } = el;
        if (pos >= offsetTop && pos < offsetTop + offsetHeight) {
          if (activeCategory !== slug) setActiveCategory(slug);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, activeCategory]);

  const scrollToCategory = (slug: string) => {
    const el = categoryRefs.current[slug];
    if (!el) return;
    const offset = 240; 
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveCategory(slug);
  };

  const handleRequestQuote = (name: string) => {
    if (addToCart(name)) {
      showToast({
        title: "Added to inquiry",
        description: `${name} added to contact form.`,
        variant: "success",
        duration: 3000,
      });
    }
    navigate("/contact#inquiry-form");
  };

  return (
    <>
      <Helmet>
        <title>Premium Imports Catalog | Peroz Corp</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> 
      </Helmet>
      
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="bg-[#FAF9F6] min-h-screen pb-20 selection:bg-amber-200">
        
        {/* ================= 1. HEADER ================= */}
        <section className="relative pt-16 pb-12 px-[8%] bg-[#FCF9F1] border-b border-amber-50"> 
          <div className="absolute top-[64px] right-0 w-[40vw] h-[40vw] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-[1600px] mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-amber-600" />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-600">World-Class Curation</p>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85]">
                Global <br />
                <span className="italic font-serif font-light text-amber-700 underline decoration-amber-100 underline-offset-[12px] decoration-1">Collection</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. STICKY SEARCH ================= */}
        <section className="sticky top-[80px] z-[50] pt-1 pb-4 px-[8%] bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-amber-50/50"> 
          <div className="max-w-4xl mx-auto relative group">
            <div className="relative flex items-center bg-[#1A1412] rounded-2xl px-5 md:px-8 py-4 md:py-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-stone-800 group-focus-within:border-amber-600/50 transition-all duration-500">
              <Search className="text-stone-500 group-focus-within:text-amber-500 mr-4" size={20} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search inventory..."
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-lg md:text-xl font-light text-white placeholder:text-stone-600"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="ml-2 p-2 hover:bg-stone-800 rounded-full text-stone-500 transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ================= 3. ADAPTIVE STICKY NAV ================= */}
        <nav 
          ref={navContainerRef}
          className="sticky top-[162px] md:top-[152px] z-[90] py-4 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-amber-100/50 px-[8%] overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <div className="flex gap-3 max-w-[1600px] mx-auto">
            {categories.map(cat => (
              <button
                key={cat.slug}
                ref={(el) => (categoryButtonRefs.current[cat.slug] = el)}
                onClick={() => scrollToCategory(cat.slug)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 flex-shrink-0 ${
                  activeCategory === cat.slug
                    ? "bg-amber-600 text-white shadow-xl shadow-amber-600/20 scale-105"
                    : "bg-white text-stone-500 border border-amber-100 hover:bg-amber-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </nav>

        {/* ================= 4. PRODUCT FEED ================= */}
        <div className="px-[8%] mt-20 max-w-[1600px] mx-auto">
          {categories.length > 0 && categories.map(cat => {
            const items = productsByCategory[cat.slug];
            if (!items?.length) return null;

            return (
              <section 
                key={cat.slug} 
                ref={el => (categoryRefs.current[cat.slug] = el)} 
                className="mb-24 md:mb-40 scroll-mt-[300px]"
              >
                <div className="flex items-baseline gap-6 mb-12 border-b border-amber-100 pb-8">
                  <h2 className="text-4xl md:text-6xl font-light italic font-serif text-slate-900">{cat.name}</h2>
                  <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{items.length} Products</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                  {items.map(p => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group bg-white rounded-3xl border border-amber-50 p-5 md:p-6 shadow-sm hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-700 cursor-pointer"
                      onClick={() => setSelectedProduct(p)}
                    >
                      <div className="aspect-[4/5] flex items-center justify-center bg-[#FCF9F1] mb-6 overflow-hidden rounded-2xl relative">
                        <img src={p.image} className="max-h-[75%] group-hover:scale-110 transition-transform duration-1000 object-contain p-4" alt={p.name} />
                        {!p.in_stock && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white px-4 py-2 border border-slate-200">Sold Out</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-amber-700 transition-colors">{p.name}</h3>
                        <p className="text-xs text-stone-400 font-light line-clamp-2 leading-relaxed italic font-serif">
                          {p.description || "Exclusive import sourced by Peroz Corp."}
                        </p>
                        <Button
                          onClick={(e) => { e.stopPropagation(); handleRequestQuote(p.name); }}
                          className="w-full h-12 bg-stone-900 hover:bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-orange-600/20"
                        >
                          Inquire Now
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-40">
              <PackageOpen className="mx-auto text-amber-200 mb-6" size={64} strokeWidth={1} />
              <p className="text-2xl font-serif italic text-stone-400">No inventory found for "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* SCROLL TOP */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-10 right-10 z-[110] w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-stone-900 transition-colors"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4" 
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-amber-100" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-20 text-stone-400 hover:text-stone-900 bg-stone-100 p-2 rounded-full transition-colors">
                <X size={20} />
              </button>
              <div className="overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-[#FCF9F1] p-10 flex items-center justify-center">
                    <img src={selectedProduct.image} className="max-h-64 w-full object-contain" alt={selectedProduct.name} />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col">
                    <Badge className="bg-amber-50 text-amber-700 border-none mb-4 rounded-full px-4 py-1 text-[10px] uppercase tracking-widest w-fit">
                      {selectedProduct.category}
                    </Badge>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 leading-tight">{selectedProduct.name}</h3>
                    <p className="text-stone-500 font-light mb-10 italic font-serif">
                      {selectedProduct.description || "Exclusive premium import curated for bulk distribution by Peroz Corp."}
                    </p>
                    <div className="mt-auto">
                      <Button className="w-full h-14 bg-amber-600 hover:bg-stone-950 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center gap-3" onClick={() => handleRequestQuote(selectedProduct.name)}>
                        Inquire for Pricing <ArrowUpRight size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;