import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { Variants } from "framer-motion";


interface Category {
  name: string;
  slug: string;
}

/* ---------------- MOTION VARIANTS ---------------- */

const containerVariants = {
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
        <title>Product Categories | Peroz Corp</title>
      </Helmet>

      <main className="bg-[#FAF9F6] min-h-screen px-[8%] pt-24 pb-32 overflow-hidden">
        {/* HEADER */}
        <header className="max-w-[1600px] mx-auto mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-tight text-slate-900"
          >
            Our Product Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-xl text-stone-500 italic font-serif"
          >
            Curated global imports across premium categories.
          </motion.p>
        </header>

        {/* CATEGORY GRID */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {categories.map(cat => (
            <motion.article
              key={cat.slug}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              onClick={() => navigate(`/products/${cat.slug}`)}
              className="group relative rounded-[2.75rem] overflow-hidden cursor-pointer bg-black aspect-[4/5] shadow-xl"
            >
              {/* IMAGE */}
              <motion.img
                src={`/images/categories/${cat.slug}.jpg`}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1.18 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* GLASS SWEEP */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute -left-full top-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 animate-[shine_1.8s_ease-out]" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <motion.h2
                  initial={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-3xl md:text-4xl font-black text-white mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  {cat.name}
                </motion.h2>


                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] font-black text-amber-400"
                >
                  View Products
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </main>
    </>
  );
};

export default ProductsLandingPage;
