import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Search } from "lucide-react";
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

/* ---------------- CART ---------------- */
const addToCart = (productName: string) => {
  const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
  if (!cart.includes(productName)) {
    cart.push(productName);
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    return true;
  }
  return false;
};

/* ---------------- MOTION ---------------- */
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 1, 0.3, 1] },
  },
};

const CategoryProductsPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { toasts, showToast, removeToast } = usePremiumToast();

  /* SCROLL LOCK */
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedProduct]);

  /* FETCH PRODUCTS */
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

  /* SEARCH FILTER */
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

  /* INQUIRY */
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

  /* SWIPE MODAL CLOSE */
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const currentY = e.touches[0].clientY;
    const delta = currentY - touchStart.current;
    if (delta > 80) {
      setSelectedProduct(null);
    }
  }, []);

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* MAIN */}
      <main
        className="min-h-screen pb-24"
        style={{
          backgroundColor: "#F9F6F1",
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAH+wMKS9ZhUgAAAABJRU5ErkJggg==')",
          backgroundSize: "300px",
          backgroundBlendMode: "soft-light",
        }}
      >
        {/* BACK */}
        <div className="px-[8%] pt-24">
          <button
            onClick={() => navigate("/products")}
            className="text-[10px] uppercase tracking-widest font-black text-amber-700"
          >
            ← Back to Categories Page
          </button>
        </div>

        {/* HEADER */}
        <header className="px-[8%] max-w-[1600px] mx-auto mt-12 mb-10">
          <h1 className="text-4xl md:text-6xl font-black italic font-serif text-[#B08D57]">
            {products[0]?.category}
          </h1>
        </header>

        {/* SEARCH */}
        <section className="sticky top-[80px] z-40 px-[8%] pb-6 bg-[#F9F6F1]/90 backdrop-blur">
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

        {/* GRID */}
        <motion.section
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="
            px-[8%] mt-12
            grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4
            gap-8
            max-w-[1800px] mx-auto
          "
        >
          {filteredProducts.map(p => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              onClick={() => setSelectedProduct(p)}
              className="
                cursor-pointer group flex flex-col
                transition-all duration-300
                border border-transparent
                hover:border-[#B08D57]/40
                hover:shadow-[0_12px_32px_rgba(176,141,87,0.20)]
                rounded-2xl
                p-3
                bg-white/40 backdrop-blur-sm
              "
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="
                  w-full
                  h-64
                  object-contain
                  rounded-xl
                  bg-transparent
                "
              />
              <h3
                className="
                  font-serif font-semibold mt-3 text-center
                  text-[15px] sm:text-[17px]
                  tracking-tight text-[#B08D57]
                "
              >
                {p.name}
              </h3>
            </motion.div>
          ))}
        </motion.section>
      </main>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 touch-pan-y"
            onClick={() => setSelectedProduct(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              className="
                bg-white w-full max-w-xl max-h-[92vh]
                rounded-3xl flex flex-col overflow-hidden
              "
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              {/* HEADER */}
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-serif text-lg text-[#B08D57] font-semibold">
                  {selectedProduct.name}
                </h3>
                <button onClick={() => setSelectedProduct(null)}>
                  <X />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 overflow-y-auto flex-1">
                <img
                  src={selectedProduct.image}
                  className="w-full max-h-72 object-contain rounded-xl mb-4"
                />
                <Badge className="mb-3">{selectedProduct.category}</Badge>
                <p className="italic text-stone-600">
                  {selectedProduct.description}
                </p>
              </div>

              {/* FOOTER */}
              <div className="p-4 border-t">
                <Button
                  onClick={() => handleRequestQuote(selectedProduct.name)}
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
