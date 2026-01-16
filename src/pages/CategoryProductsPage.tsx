import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Search, Info, ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToastContainer } from "@/components/PremiumToast";
import { usePremiumToast } from "@/hooks/usePremiumToast";
import { supabase } from "../supabaseClient";
import type { Variants } from "framer-motion";

/* ---------------- TYPES ---------------- */
interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  in_stock: boolean;
}

/* ---------------- CART LOGIC ---------------- */
const addToCart = (productName: string) => {
  const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
  if (!cart.includes(productName)) {
    cart.push(productName);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    return true;
  }
  return false;
};

/* ---------------- ANIMATION VARIANTS ---------------- */
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const CategoryProductsPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { toasts, showToast, removeToast } = usePremiumToast();

  /* SCROLL LOCK FOR MODAL */
  useEffect(() => {
    document.body.style.overflow = selectedProduct ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProduct]);

  /* FETCH DATA */
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (!data) return;
      setProducts(
        data.filter(p => p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categorySlug)
      );
    };
    fetchProducts();
  }, [categorySlug]);

  /* SEARCH */
  const filteredProducts = useMemo(() => {
    const t = searchTerm.toLowerCase();
    return !t ? products : products.filter(p => p.name.toLowerCase().includes(t));
  }, [products, searchTerm]);

  /* INQUIRY HANDLER */
  const handleRequestQuote = (name: string) => {
  addToCart(name); // Uses your existing helper function
  
  // Reset overflow and close modal
  document.body.style.overflow = ""; 
  setSelectedProduct(null);
  
  // Optional: show a toast before navigating
  showToast({
    title: "Added to inquiry",
    description: "Redirecting you to the inquiry form...",
    variant: "success",
    duration: 2000,
  });
  
  // Navigate to contact form
  setTimeout(() => {
    navigate("/contact#inquiry-form");
  }, 1200); // Small delay to let the toast be seen
};

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="min-h-screen pb-24 bg-[#FAF7F2]">
        
        {/* TOP NAVIGATION / BACK BUTTON */}
        <div className="px-[6%] pt-32">
          <button
            onClick={() => navigate("/products")}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-[#2C3E2F]/60 hover:text-[#D4A574] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Categories
          </button>
        </div>

        {/* HEADER SECTION */}
        <header className="px-[6%] max-w-7xl mx-auto mt-12 mb-16 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4A574] mb-4">Collection</h2>
              <h1 className="text-5xl md:text-7xl font-serif italic text-[#2C3E2F]">
                {products[0]?.category || "Category"}
              </h1>
            </div>
            
            {/* SEARCH BAR - Styled like B2B Portal */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C3E2F]/40" />
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#E8DCC8] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#D4A574]/20 transition-all shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* PRODUCT GRID - Matches Home Page Styled Featured Section */}
        <motion.section
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="px-[6%] max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map(p => (
          <motion.div
            key={p.id}
            variants={cardVariants}
            className="bg-white p-3 rounded-[2rem] border border-[#E8DCC8] hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
          >
            {/* 1. IMAGE CONTAINER - ADDED onClick HERE */}
            <div 
              onClick={() => setSelectedProduct(p)} // This activates the popup
              className="aspect-square bg-[#FAF7F2] rounded-[1.6rem] mb-6 overflow-hidden relative flex items-center justify-center p-6 cursor-pointer"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Visual Cue: Hover Zoom Icon */}
              <div className="absolute inset-0 bg-[#2C3E2F]/0 group-hover:bg-[#2C3E2F]/5 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-[#2C3E2F]" />
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-[#2C3E2F] border border-[#E8DCC8]/50 shadow-sm">
                Peroz
              </div>
            </div>

            {/* ... rest of the card content (Title, SKU, Buttons) remains the same ... */}
            <div className="px-4 pb-4 flex flex-col flex-1">
              <span className="text-[9px] text-[#D4A574] font-bold uppercase tracking-widest mb-1">{p.category}</span>
              <h3 
                onClick={() => setSelectedProduct(p)} // Optional: Clicking the title also opens the popup
                className="text-xl font-serif text-[#2C3E2F] mb-6 line-clamp-2 leading-tight flex-1 cursor-pointer hover:text-[#D4A574] transition-colors"
              >
                {p.name}
              </h3>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the popup when clicking the button
                    handleRequestQuote(p.name);
                  }}
                  className="flex-1 bg-[#2C3E2F] text-white py-3.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#D4A574] transition-all flex items-center justify-center gap-2"
                >
                  Add to Inquiry
                </button>
                <button 
                  onClick={() => setSelectedProduct(p)}
                  className="w-11 h-11 flex items-center justify-center border border-[#E8DCC8] rounded-full hover:bg-[#FAF7F2] transition-colors"
                >
                  <Info className="w-4 h-4 text-[#2C3E2F]" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        </motion.section>
      </main>

      {/* MODAL - Updated Styling to match Mediterranean Green/Gold */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-[#2C3E2F]/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              className="bg-white w-full max-w-xl rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="relative p-8 border-b border-[#E8DCC8]">
                <h3 className="font-serif italic text-2xl text-[#2C3E2F] pr-8">
                  {selectedProduct.name}
                </h3>
                <button 
                   onClick={() => setSelectedProduct(null)}
                   className="absolute right-8 top-8 p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#2C3E2F]" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <div className="bg-[#FAF7F2] rounded-[2rem] p-10 mb-8 flex justify-center border border-[#E8DCC8]/30">
                  <img src={selectedProduct.image} className="max-h-64 object-contain mix-blend-multiply" alt="" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-[#D4A574] fill-[#D4A574]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A574]">Product Specifications</span>
                  </div>
                  <p className="text-[#858566] leading-relaxed text-sm">
                    {selectedProduct.description || "Inquire for detailed product specifications, wholesale pricing, and availability."}
                  </p>
                </div>
              </div>

              <div className="p-8 bg-[#FAF7F2] border-t border-[#E8DCC8]">
                <Button
                  onClick={() => handleRequestQuote(selectedProduct.name)}
                  className="w-full h-14 bg-[#2C3E2F] hover:bg-[#D4A574] text-white font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-3"
                >
                  Confirm Inquiry <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryProductsPage;