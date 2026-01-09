import {
  motion,
  useScroll,
  useTransform,
  Variants,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ================= UTIL ================= */

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ================= MOTION SYSTEM ================= */

const luxuryEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.16 },
  },
};

const fadeUp = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, y: isMobile ? 24 : 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMobile ? 0.7 : 1.1, ease: luxuryEase },
  },
});

/* ================= PAGE ================= */

export default function About() {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, isMobile ? 20 : 80]
  );

  const letterSpacing = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile || reduceMotion ? ["-0.01em", "-0.01em"] : ["-0.02em", "0.06em"]
  );

  return (
    // Background changed to warm Alabaster/Cream
    <main className="relative bg-[#FCF9F1] text-stone-900 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] bg-[url('/grain.png')]" />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative z-10 pt-44 pb-48 px-[8%] md:px-[10%]"
      >
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={fadeUp(isMobile)}
            // Changed violet-600 to amber-600
            className="block text-amber-600 font-black tracking-[0.45em] uppercase text-[11px] mb-10"
          >
            About Us
          </motion.span>

          <motion.h1
            style={{ y: headlineY, letterSpacing }}
            className="text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.82] mb-12 tracking-tighter"
          >
            World-Class Goods.
            <br />
            {/* Changed italic text to amber-600 */}
            <span className="italic text-amber-600 font-serif font-light">
            World-Class Delivery.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl text-xl text-stone-600 leading-relaxed font-light"
          >
            Headquartered in Alexandria, <b className="text-stone-900">Peroz Corp</b> operates as a premier wholesale 
            distributor and global importer, engineered to provide East Coast enterprises 
            with a non-interrupted conduit to world-class manufacturing. Utilizing our 
            strategically positioned logistical hubs in Virginia and Maryland, we 
            effectively eliminate the complexities of international trade.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= HERITAGE ================= */}
<section className="relative z-10 px-[8%] md:px-[10%] pb-40">
  <motion.div variants={container} initial="hidden" whileInView="visible">
    <motion.h2
      variants={fadeUp(isMobile)}
      // Changed violet-500 to amber-700 for a more "legacy/bronze" feel
      className="text-5xl text-amber-700 font-bold tracking-tighter mb-6"
    >
      A Legacy of Global Access
    </motion.h2>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl text-lg text-stone-600 leading-relaxed"
    >
      Built upon a foundation of operational transparency and cross-border expertise, 
      Peroz Corp serves as a vital artery for international commerce. We do not simply 
      move goods; we curate resilient supply chains. By securing exclusive partnerships 
      with world-class manufacturers across Europe and Asia, we maintain a disciplined 
      portfolio.
    </motion.p>
  </motion.div>
</section>

      {/* ================= WHY PARTNER ================= */}
<section className="relative z-10 px-[8%] md:px-[10%] pb-40">
  <motion.div variants={container} initial="hidden" whileInView="visible">
    <motion.h2
      variants={fadeUp(isMobile)}
      className="text-5xl text-amber-700 font-bold tracking-tighter mb-6"
    >
      The Strategic Advantage
    </motion.h2>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl text-lg text-stone-600 leading-relaxed"
    >
      As the primary gateway for high-demand Mediterranean and Middle Eastern staples 
      on the East Coast, we bridge the gap between world-class manufacturing and the 
      American retail landscape. Our hubs in Alexandria and Clarksburg serve as the tactical core of our 
      distribution network.
    </motion.p>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl mt-6 text-lg text-stone-600 leading-relaxed"
    >
      At Peroz Corp, we operate with a <span className="italic text-amber-900 font-medium font-serif">Zero-Loss Integrity</span> approach. 
      Partnering with us means gaining direct access to a curated master inventory, 
      backed by the personalized oversight of a master distributor.
    </motion.p>
  </motion.div>
</section>

      {/* ================= LOCATIONS ================= */}
      <section className="relative z-10 px-[8%] md:px-[10%] pb-48">
        <motion.div variants={container} initial="hidden" whileInView="visible">
          <div className="h-px w-full bg-amber-200 mb-20" />
          
          <motion.h2
            variants={fadeUp(isMobile)}
            className="text-5xl text-amber-700 font-bold tracking-tighter mb-10"
          >
            Our Locations & Operations
          </motion.h2>

          <motion.div
            variants={fadeUp(isMobile)}
            className="grid md:grid-cols-2 gap-12 text-lg text-stone-600"
          >
            <div className="p-8 bg-white/40 border border-amber-100 rounded-2xl backdrop-blur-sm hover:border-amber-400 transition-colors duration-500">
              <strong className="text-amber-800 font-bold uppercase text-xs tracking-widest block mb-4">
                Logistics Center
              </strong>
              <p className="text-stone-900 font-medium">6304 Gravel Ave, Ste G-H,</p>
              <p>Alexandria, VA 22310</p>
            </div>

            <div className="p-8 bg-white/40 border border-amber-100 rounded-2xl backdrop-blur-sm hover:border-amber-400 transition-colors duration-500">
              <strong className="text-amber-800 font-bold uppercase text-xs tracking-widest block mb-4">
                Regional Office
              </strong>
              <p className="text-stone-900 font-medium">11808 Piedmont Road,</p>
              <p>Clarksburg, MD 20871</p>
            </div>

            <div className="p-8 bg-white/40 border border-amber-100 rounded-2xl backdrop-blur-sm hover:border-amber-400 transition-colors duration-500">
              <strong className="text-amber-800 font-bold uppercase text-xs tracking-widest block mb-4">
                Operating Hours
              </strong>
              <p className="text-stone-900 font-medium">Mon–Sat</p>
              <p>9:00 AM – 6:00 PM</p>
            </div>

            <div className="p-8 bg-amber-600 text-white rounded-2xl shadow-xl shadow-amber-900/10">
              <strong className="text-amber-100 font-bold uppercase text-xs tracking-widest block mb-4">
                Direct Contact
              </strong>
              <p className="text-xl font-bold">+1 301-305-8748</p>
              <p className="opacity-90">Ali@PerozCorp.Com</p>
            </div>

          </motion.div>
        </motion.div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="relative z-10 px-[8%] md:px-[10%] pb-32">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: luxuryEase }}
          className="max-w-4xl text-5xl md:text-6xl font-black tracking-tighter"
        >
          Connecting Global Quality To Local Businesses,
          <br />
          <span className="italic text-amber-600 font-serif font-light">
            One Direct Delivery At a Time.
          </span>
        </motion.p>
      </section>
    </main>
  );
}