import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePremiumToast } from "@/hooks/usePremiumToast";
import { ToastContainer } from "@/components/PremiumToast";
import TypewriterText from "@/components/TypewriterText";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, ArrowUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "../supabaseClient";

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
  const navBarRef = useRef<HTMLDivElement>(null);
  const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /* ---------------- FETCH ---------------- */
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

  /* ---------------- FILTER ---------------- */
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
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

  /* ---------------- SCROLL LOGIC ---------------- */
  const scrollToCategory = (slug: string) => {
    const el = categoryRefs.current[slug];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveCategory(slug);
  };

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const pos = window.scrollY + 160;

      for (const [slug, el] of Object.entries(categoryRefs.current)) {
        if (!el) continue;
        if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveCategory(slug);
          return;
        }
      }
      setActiveCategory("");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [productsByCategory]);

  /* ---------------- ACTION ---------------- */
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

      <main className="bg-[#FAF9F6] min-h-screen pt-28 px-[8%]">
        {/* HEADER */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="text-indigo-600 italic">Products</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-500 text-lg">
            Carefully sourced international brands delivered through Peroz Corp’s
            East Coast distribution network.
          </p>
        </section>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="pl-12 py-6 rounded-xl bg-white shadow"
            />
          </div>
        </div>

        {/* CATEGORY NAV */}
        <div
          ref={navBarRef}
          className="sticky top-20 z-50 flex gap-3 overflow-x-auto bg-white/90 backdrop-blur rounded-xl p-3 shadow mb-16"
        >
          {categories.map(cat => (
            <button
              key={cat.slug}
              ref={el => (categoryButtonRefs.current[cat.slug] = el)}
              onClick={() => scrollToCategory(cat.slug)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                activeCategory === cat.slug
                  ? "bg-indigo-600 text-white"
                  : "bg-stone-100 hover:bg-indigo-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        {categories.map(cat => {
          const items = productsByCategory[cat.slug];
          if (!items?.length) return null;

          return (
            <section
              key={cat.slug}
              ref={el => (categoryRefs.current[cat.slug] = el)}
              className="mb-32 scroll-mt-32"
            >
              <div className="flex justify-between mb-10">
                <h2 className="text-3xl font-bold">{cat.name}</h2>
                <Badge>{items.length} items</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.map(p => (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="aspect-square flex items-center justify-center bg-slate-50">
                      <img src={p.image} className="max-h-full" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                      <p className="text-sm text-stone-500 mb-4 line-clamp-2">
                        {p.description}
                      </p>
                      <Badge
                        className={`mb-4 ${
                          p.in_stock
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>

                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestQuote(p.name);
                        }}
                        className="w-full"
                      >
                        <ShoppingBag className="mr-2 w-4 h-4" />
                        Request Quote
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        {/* SCROLL TOP */}
        {showScrollTop && (
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 rounded-full"
          >
            <ArrowUp />
          </Button>
        )}
      </main>

      {/* MODAL (UNCHANGED LOGIC) */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                onClick={() => setSelectedProduct(null)}
              >
                <X />
              </Button>

              <img src={selectedProduct.image} className="mb-6 rounded-xl" />
              <h3 className="text-2xl font-bold mb-4">
                {selectedProduct.name}
              </h3>
              <p className="mb-6 text-stone-500">
                {selectedProduct.description}
              </p>

              <Button
                className="w-full py-6"
                onClick={() => handleRequestQuote(selectedProduct.name)}
              >
                Request Bulk Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsPage;
