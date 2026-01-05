import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePremiumToast } from "@/hooks/usePremiumToast";
import { ToastContainer } from "@/components/PremiumToast";
import { Search, ShoppingBag, ArrowUp, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";

/* ---------------- TYPES & HELPERS ---------------- */
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

  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

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
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- SEARCH & FILTER LOGIC ---------------- */
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

  /* ---------------- SCROLL & NAV LOGIC ---------------- */
  const scrollToCategory = (slug: string) => {
    const el = categoryRefs.current[slug];
    if (!el) return;
    // Offset to account for both Search Capsule and Category Nav
    const offset = 280; 
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const pos = window.scrollY + 300; // Adjusted detection point

      for (const [slug, el] of Object.entries(categoryRefs.current)) {
        if (!el) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveCategory(slug);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [productsByCategory]);

  const handleRequestQuote = (name: string) => {
    if (addToCart(name)) {
      showToast({
        title: "Added to inquiry",
        description: `${name} added to contact form.`,
        variant: "success",
        duration: 3000,
      });
    }
    navigate("/contact");
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="bg-[#FAF9F6] min-h-screen pb-20">
        
        {/* ================= 1. LUXURY HEADER ================= */}
        <section className="relative pt-40 pb-20 px-[8%] bg-white overflow-hidden">
          <div className="absolute top-10 left-0 text-[14rem] font-black text-slate-50/80 select-none pointer-events-none tracking-[-0.05em] uppercase" 
          style={{ fontFamily: '"Inter", sans-serif', fontStretch: '150%' }}>
             · INVENTORY ·
          </div>

          <div className="max-w-[1600px] mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-600" />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-600">
                  World-Class Curation
                </p>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85]">
                Global <br />
                <span className="italic font-serif font-light text-indigo-600/90 underline decoration-indigo-100 underline-offset-[12px] decoration-1">Collection</span>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* ================= 2. STICKY SEARCH CAPSULE ================= */}
        <section className="sticky top-0 z-[60] py-6 px-[8%] bg-gradient-to-b from-white via-white/90 to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-full px-8 py-5 shadow-2xl shadow-indigo-900/5 group-focus-within:border-indigo-400 transition-all duration-500">
              <Search className="text-slate-400 mr-6 group-focus-within:text-indigo-600 transition-colors" size={24} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search our master inventory..."
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-xl font-light tracking-tight text-slate-900 placeholder:text-slate-300"
              />
              <div className="hidden md:flex items-center gap-3 pl-6 border-l border-slate-100">
                <Filter size={14} className="text-slate-300" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Filter Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. STICKY CATEGORY NAV ================= */}
        <nav className="sticky top-[104px] z-[50] py-4 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-slate-200/50 overflow-x-auto whitespace-nowrap px-[8%] scrollbar-hide">
          <div className="flex gap-4 max-w-[1600px] mx-auto">
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => scrollToCategory(cat.slug)}
                className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 ${
                  activeCategory === cat.slug
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                    : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
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
              <section key={cat.slug} ref={el => (categoryRefs.current[cat.slug] = el)} className="mb-40 scroll-mt-60">
                <div className="flex items-baseline gap-6 mb-16 border-b border-slate-200 pb-8">
                  <h2 className="text-5xl font-light italic font-serif text-slate-900">{cat.name}</h2>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{items.length} Products</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {items.map(p => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10 }}
                      className="group bg-white rounded-sm border border-slate-100 p-6 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer"
                      onClick={() => setSelectedProduct(p)}
                    >
                      <div className="aspect-[4/5] flex items-center justify-center bg-slate-50 mb-8 overflow-hidden rounded-sm relative">
                        <img src={p.image} className="max-h-[80%] group-hover:scale-110 transition-transform duration-1000" />
                        {!p.in_stock && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white px-4 py-2 border border-slate-200">Sold Out</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-slate-900 leading-tight">{p.name}</h3>
                        </div>
                        <p className="text-xs text-stone-400 font-light line-clamp-2 leading-relaxed italic font-serif">
                          {p.description || "Premium international import."}
                        </p>
                        
                        <Button
                          onClick={(e) => { e.stopPropagation(); handleRequestQuote(p.name); }}
                          className="w-full h-12 bg-slate-900 hover:bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-none transition-all"
                        >
                          Inquire for Bulk Pricing
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* NO RESULTS STATE */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-40">
              <p className="text-2xl font-serif italic text-slate-300">No inventory found for "{searchTerm}"</p>
              <button onClick={() => setSearchTerm("")} className="mt-6 text-indigo-600 font-black uppercase text-[10px] tracking-widest underline">Reset Search</button>
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
              className="fixed bottom-10 right-10 z-[70] w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-slate-900 transition-colors"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[9999] flex items-center justify-center p-6" onClick={() => setSelectedProduct(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-none p-12 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-slate-50 p-8 flex items-center justify-center rounded-sm">
                  <img src={selectedProduct.image} className="max-h-64 object-contain" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">{selectedProduct.name}</h3>
                  <Badge className="bg-indigo-50 text-indigo-600 border-none mb-6 rounded-none px-4 py-1 text-[10px] uppercase tracking-widest">{selectedProduct.category}</Badge>
                  <p className="text-stone-500 font-light leading-relaxed mb-8">{selectedProduct.description || "Exclusive import sourced by Peroz Corp."}</p>
                  <Button className="w-full h-14 bg-indigo-600 hover:bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-none transition-all" onClick={() => handleRequestQuote(selectedProduct.name)}>Inquire for Bulk Pricing</Button>
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