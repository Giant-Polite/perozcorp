import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Category {
  name: string;
  slug: string;
}

const ProductsLandingPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from("products").select("category");
      if (!data) return;

      const unique = Array.from(new Set(data.map(p => p.category)))
        .sort()
        .map(name => ({
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }));

      setCategories(unique);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Products | Afghan Dried Fruits, Nuts, Specialty Foods & Desserts| Peroz Corp</title>
        <meta name="description" content="Explore Peroz Corp's full catalog of authentic Afghan imports, including premium dried fruits, nuts, traditional confectionery, teas, desserts, and pantry staples." />
        <meta property="og:title" content="Our Products | Peroz Corp" />
        <meta property="og:description" content="Authentic Afghan food products and household essentials." />
        <link rel="canonical" href="https://www.perozcorp.com/products" />
      </Helmet>

      <main className="bg-[#FAF9F6] min-h-screen px-[6%] md:px-[8%] pt-24 pb-32">
        {/* ================= HEADER ================= */}
        <header className="relative max-w-[1600px] mx-auto mb-28">
          {/* Subtle background accent */}
          <div className="absolute -top-20 -left-24 w-[420px] h-[420px] bg-amber-400/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-10 bg-amber-600" />
              <span className="text-[10px] uppercase tracking-[0.45em] font-black text-amber-600">
                Curated Imports
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="
                text-5xl md:text-7xl lg:text-8xl
                font-black tracking-tight text-slate-900
                leading-[0.95]
              "
            >
              Product
              <span className="block italic font-serif font-light text-amber-700">
                Categories
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="
                mt-10 max-w-2xl
                text-stone-500
                text-base md:text-lg
                font-light italic font-serif
                leading-relaxed
              "
            >
              A Refined Selection of Global Imports, From Traditional Pantry Staples
              to Specialty Goods, Curated For Quality, Authenticity, and Scale.
            </motion.p>
          </div>
        </header>


        {/* CATEGORY GRID */}
        <section
          className="
            max-w-[1600px] mx-auto
            grid grid-cols-2 lg:grid-cols-3
            gap-10
          "
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              onClick={() => navigate(`/products/${cat.slug}`)}
              className="cursor-pointer"
            >
              {/* IMAGE CARD */}
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="
                  relative overflow-hidden rounded-[2.5rem]
                  bg-black shadow-xl
                  aspect-[4/5]
                "
              >
                <motion.img
                  src={`/images/categories/${cat.slug}.jpg`}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* DESKTOP OVERLAY */}
                <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="hidden lg:flex relative z-10 p-8 h-full flex-col justify-end">
                  <h2 className="text-3xl font-black text-white mb-4">
                    {cat.name}
                  </h2>

                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-black text-amber-400">
                    View Products
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.article>

              {/* MOBILE TITLE */}
              <div className="lg:hidden mt-5 text-center">
                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-amber-600">
                  View Products
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </main>
    </>
  );
};

export default ProductsLandingPage;
