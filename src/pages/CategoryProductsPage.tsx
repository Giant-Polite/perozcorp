import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePremiumToast } from "@/hooks/usePremiumToast";
import { ToastContainer } from "@/components/PremiumToast";
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

/* ---------------- CART HELPER ---------------- */
const addToCart = (productName: string) => {
  const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
  if (!cart.includes(productName)) {
    cart.push(productName);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    return true;
  }
  return false;
};

/* ---------------- MOTION VARIANTS ---------------- */

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const, // ✅ FIX
    },
  },
};

const CategoryProductsPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { toasts, showToast, removeToast } = usePremiumToast();

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");

      if (!data) return;

      const filtered = data.filter(
        p =>
          p.category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-") === categorySlug
      );

      setProducts(filtered);
    };

    fetchProducts();
  }, [categorySlug]);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return products;

    return products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        (p.description && p.description.toLowerCase().includes(term))
    );
  }, [products, searchTerm]);

  /* ---------------- INQUIRY HANDLER ---------------- */
  const handleRequestQuote = (name: string) => {
    if (addToCart(name)) {
      showToast({
        title: "Added to inquiry",
        description: `${name} added to contact form.`,
        variant: "success",
        duration: 3000,
      });
    }

    setSelectedProduct(null);
    navigate("/contact#inquiry-form");
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="bg-[#FAF9F6] min-h-screen pb-32">
        {/* BACK */}
        <div className="px-[8%] pt-24">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate("/products")}
            className="mb-12 text-[10px] uppercase tracking-widest font-black text-amber-600"
          >
            ← Back to Categories
          </motion.button>
        </div>

        {/* HEADER */}
        <header className="px-[8%] max-w-[1600px] mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-black capitalize text-slate-900"
          >
            {products[0]?.category}
          </motion.h1>
        </header>

        {/* SEARCH BAR */}
<section className="sticky top-[80px] z-[50] pt-1 pb-6 px-[8%] bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-amber-50/50">
  <div className="max-w-3xl mx-auto">
    <div className="relative flex items-center bg-[#1A1412] rounded-2xl px-6 py-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-stone-800 focus-within:border-amber-600/50 transition-all">
      <Search className="text-stone-500 mr-4" size={20} />

      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search In This Category..."
        className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-lg font-light text-white placeholder:text-stone-600"
      />

      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="ml-2 p-2 hover:bg-stone-800 rounded-full text-stone-500 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  </div>
</section>


        {/* PRODUCTS GRID */}
        <motion.section
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="px-[8%] mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto"
        >
          {filteredProducts.map(p => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedProduct(p)}
              className="group bg-white rounded-3xl border border-amber-50 p-6 shadow-sm hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-700 cursor-pointer"
            >
              <div className="aspect-[4/5] bg-[#FCF9F1] mb-6 overflow-hidden rounded-2xl flex items-center justify-center relative">
                <motion.img
                  src={p.image}
                  alt={p.name}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 1 }}
                  className="max-h-[75%] object-contain p-4"
                />

                {!p.in_stock && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white px-4 py-2 border border-slate-200">
                      Sold Out
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-bold text-lg text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                {p.name}
              </h3>

              <p className="text-xs text-stone-400 font-light italic font-serif line-clamp-2">
                {p.description || "Exclusive import sourced by Peroz Corp."}
              </p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-amber-100"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 text-stone-400 hover:text-stone-900 bg-stone-100 p-2 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#FCF9F1] p-10 flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    className="max-h-64 w-full object-contain"
                    alt={selectedProduct.name}
                  />
                </div>

                <div className="p-8 md:p-12 flex flex-col">
                  <Badge className="bg-amber-50 text-amber-700 mb-4 rounded-full px-4 py-1 text-[10px] uppercase tracking-widest w-fit">
                    {selectedProduct.category}
                  </Badge>

                  <h3 className="text-3xl font-black text-slate-900 mb-6">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-stone-500 font-light mb-10 italic font-serif">
                    {selectedProduct.description}
                  </p>

                  <Button
                    className="mt-auto h-14 bg-amber-600 hover:bg-stone-950 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl"
                    onClick={() => handleRequestQuote(selectedProduct.name)}
                  >
                    Inquire for Pricing <ArrowUpRight size={18} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CategoryProductsPage;
