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
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
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

      setProducts(
        data.filter(
          p =>
            p.category
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-") === categorySlug
        )
      );
    };
    fetchProducts();
  }, [categorySlug]);

  /* ---------------- SEARCH ---------------- */
  const filteredProducts = useMemo(() => {
    const t = searchTerm.toLowerCase();
    return !t
      ? products
      : products.filter(
          p =>
            p.name.toLowerCase().includes(t) ||
            p.description?.toLowerCase().includes(t)
        );
  }, [products, searchTerm]);

  /* ---------------- INQUIRY ---------------- */
  const handleRequestQuote = (name: string) => {
    addToCart(name);
    showToast({
      title: "Added to inquiry",
      description: `${name} added to contact form.`,
      variant: "success",
      duration: 3000,
    });
    setSelectedProduct(null);
    navigate("/contact#inquiry-form");
  };

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <main className="bg-[#FAF9F6] min-h-screen pb-32">
        {/* BACK */}
        <div className="px-[8%] pt-24">
          <button
            onClick={() => navigate("/products")}
            className="text-[10px] uppercase tracking-widest font-black text-amber-600"
          >
            ← Back to Categories Page
          </button>
        </div>

        {/* HEADER */}
        <header className="px-[8%] max-w-[1600px] mx-auto mt-12 mb-16">
          <h1 className="text-4xl md:text-6xl font-black italic font-serif text-amber-700">
            {products[0]?.category}
          </h1>
        </header>

        {/* SEARCH */}
        <section className="sticky top-[80px] z-40 px-[8%] pb-6 bg-[#FAF9F6]/95 backdrop-blur">
          <div className="max-w-3xl mx-auto flex items-center bg-[#1A1412] rounded-2xl px-6 py-4">
            <Search className="text-stone-400 mr-4" />
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search this category..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-stone-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")}>
                <X className="text-stone-400" />
              </button>
            )}
          </div>
        </section>

        {/* PRODUCTS */}
        <motion.section
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="px-[8%] mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto"
        >
          {filteredProducts.map(p => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition"
            >
              <div
                onClick={() => setSelectedProduct(p)}
                className="cursor-pointer"
              >
                <div className="aspect-[4/5] flex items-center justify-center bg-[#FCF9F1] rounded-2xl mb-5">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="max-h-[75%] object-contain"
                  />
                </div>
                    <h3
                    className="
                        font-serif
                        font-semibold
                        text-[15px] sm:text-lg
                        leading-snug
                        tracking-tight
                        text-[#3B2A20]
                        transition-colors
                        group-hover:text-amber-700
                    "
                    >
                    {p.name}
                    </h3>



                <p className="text-xs italic text-stone-500 line-clamp-2">
                  {p.description}
                </p>
              </div>

              {/* CARD BUTTON */}
              <Button
                onClick={() => handleRequestQuote(p.name)}
                className="mt-4 w-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
              >
                Inquire for Pricing
              </Button>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-xl max-h-[90vh] rounded-3xl flex flex-col overflow-hidden"
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between items-center">
                <h3
                    className="
                        font-serif
                        font-semibold
                        text-[15px] sm:text-lg
                        leading-snug
                        tracking-tight
                        text-[#3B2A20]
                        transition-colors
                        group-hover:text-amber-700
                    "
                    >{selectedProduct.name}</h3>
                <button onClick={() => setSelectedProduct(null)}>
                  <X />
                </button>
              </div>

              {/* SCROLLABLE CONTENT */}
              <div className="p-6 overflow-y-auto flex-1">
                <img
                  src={selectedProduct.image}
                  className="max-h-60 mx-auto mb-6 object-contain"
                />

                <Badge className="mb-4">{selectedProduct.category}</Badge>

                <p className="italic text-stone-600">
                  {selectedProduct.description}
                </p>
              </div>

              {/* STICKY FOOTER */}
              <div className="p-4 border-t">
                <Button
                  onClick={() =>
                    handleRequestQuote(selectedProduct.name)
                  }
                  className="w-full h-14 bg-amber-600 text-white font-black uppercase tracking-widest rounded-xl"
                >
                  Inquire for Pricing <ArrowUpRight />
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
