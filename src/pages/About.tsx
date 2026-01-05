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
    <main className="relative bg-[#FAF9F6] text-slate-900 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035] bg-[url('/grain.png')]" />

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative z-10 pt-44 pb-48 px-[8%] md:px-[10%]"
      >
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={fadeUp(isMobile)}
            className="block text-violet-600 font-black tracking-[0.45em] uppercase text-[11px] mb-10"
          >
            About Us
          </motion.span>

          <motion.h1
            style={{ y: headlineY, letterSpacing }}
            className="text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.82] mb-12"
          >
            World-Class Goods.
            <br />
            <span className="italic text-violet-600 font-light">
            World-Class Delivery.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl text-xl text-slate-600 leading-relaxed"
          >
            Headquartered in Alexandria, <b>Peroz Corp</b> operates as a premier wholesale 
            distributor and global importer, engineered to provide East Coast enterprises 
            with a non-interrupted conduit to world-class manufacturing. Utilizing our 
            strategically positioned logistical hubs in Virginia and Maryland, we 
            effectively eliminate the complexities of international trade, ensuring 
            the transition from global production to the domestic shelf is executed 
            with unrivaled precision.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= HERITAGE ================= */}
<section className="relative z-10 px-[8%] md:px-[10%] pb-40">
  <motion.div variants={container} initial="hidden" whileInView="visible">
    <motion.h2
      variants={fadeUp(isMobile)}
      className="text-5xl text-violet-500 font-black mb-6"
    >
      A Legacy of Global Access
    </motion.h2>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl text-lg text-slate-600 leading-relaxed"
    >
      Built upon a foundation of operational transparency and cross-border expertise, 
      Peroz Corp serves as a vital artery for international commerce. We do not simply 
      move goods; we curate resilient supply chains. By securing exclusive partnerships 
      with world-class manufacturers across Europe and Asia, we maintain a disciplined 
      portfolio, Spanning from premium agricultural staples and precision industrial 
      parts cleaning systems to essential pharmaceutical-grade consumables.
    </motion.p>
  </motion.div>
</section>

      {/* ================= WHY PARTNER ================= */}
<section className="relative z-10 px-[8%] md:px-[10%] pb-40">
  <motion.div variants={container} initial="hidden" whileInView="visible">
    <motion.h2
      variants={fadeUp(isMobile)}
      className="text-5xl text-violet-500 font-black mb-6"
    >
      The Strategic Advantage
    </motion.h2>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl text-lg text-slate-600 leading-relaxed"
    >
      As the primary gateway for high-demand Mediterranean and Middle Eastern staples 
      on the East Coast, we bridge the gap between world-class manufacturing and the 
      American retail landscape. From high-volume grocery chains to boutique hospitality 
      groups, we provide a supply chain engineered for absolute reliability. 
      Our hubs in Alexandria and Clarksburg serve as the tactical core of our 
      distribution network, ensuring seamless inventory flow across the Atlantic corridor.
    </motion.p>

    <motion.p
      variants={fadeUp(isMobile)}
      className="max-w-3xl mt-6 text-lg text-slate-600 leading-relaxed"
    >
      At Peroz Corp, we operate with a <span className="italic text-slate-900 font-medium">Zero-Loss Integrity</span> approach. 
      Partnering with us means gaining direct access to a curated master inventory, 
      backed by the personalized oversight and logistical precision of a master 
      distributor dedicated to your scale.
    </motion.p>
  </motion.div>
</section>

      {/* ================= LOCATIONS ================= */}
      <section className="relative z-10 px-[8%] md:px-[10%] pb-48">
        <motion.div variants={container} initial="hidden" whileInView="visible">
          <motion.h2
            variants={fadeUp(isMobile)}
            className="text-5xl text-violet-500 font-black mb-10"
          >
            Our Locations & Operations
          </motion.h2>

          <motion.div
            variants={fadeUp(isMobile)}
            className="grid md:grid-cols-2 gap-12 text-lg text-slate-600"
          >
            <div>
              <strong className="text-[#8A7A5E] font-semibold tracking-wide">
                Logistics Center
              </strong>
              <p>6304 Gravel Ave, Ste G-H, Alexandria, VA 22310</p>
              </div>

              <div>
              <strong className="text-[#8A7A5E] font-semibold tracking-wide">
                Regional Office
              </strong>
              <p>11808 Piedmont Road, Clarksburg, MD 20871</p>
              </div>

              <div>
              <strong className="text-[#8A7A5E] font-semibold tracking-wide">
                Operating Hours
              </strong>
              <p>Mon–Sat | 9:00 AM – 6:00 PM</p>
              </div>

              <div>
              <strong className="text-[#8A7A5E] font-semibold tracking-wide">
                Direct Contact
              </strong>
              <p>+1 301-305-8748</p>
              <p>Ali@PerozCorp.Com</p>
              </div>

          </motion.div>
        </motion.div>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="relative z-10 px-[8%] md:px-[10%] pb-20">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: luxuryEase }}
          className="max-w-4xl text-5xl font-black"
        >
          Connecting Global Quality To Local Businesses,
          <br />
          <span className="italic text-violet-600 font-light">
            One Direct Delivery At a Time.
          </span>
        </motion.p>
      </section>
    </main>
  );
}
