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
            Direct transmission.
            <br />
            <span className="italic text-violet-600 font-light">
              Global precision.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl text-xl text-slate-600 leading-relaxed"
          >
            Peroz Corp is an Alexandria-based wholesale distributor and global
            importer dedicated to providing East Coast businesses with a direct
            line to world-class products. From our strategically located
            logistical hubs in Virginia and Maryland, we bridge the gap between
            international manufacturers and the domestic market with unrivaled
            precision.
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
            Our Heritage of Excellence
          </motion.h2>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl text-lg text-slate-600 leading-relaxed"
          >
            Built on a foundation of reliability and community-focused values,
            Peroz Corp is more than just a logistical provider — we are a partner
            in your growth. We specialize in sourcing high-quality goods from
            trusted global partners across Asia and Europe, including premium
            rice varieties, cleaning systems, and specialized pharmaceutical
            supplies.
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
            Why Partner With Us
          </motion.h2>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl text-lg text-slate-600 leading-relaxed"
          >
            As a key distributor for the East Coast, we are committed to
            supporting local businesses — from grocery stores and restaurants to
            industrial service providers — with a supply chain that never stops.
            Our operations in Alexandria and Clarksburg are designed for speed,
            ensuring that our partners receive essential goods exactly when they
            need them.
          </motion.p>

          <motion.p
            variants={fadeUp(isMobile)}
            className="max-w-3xl mt-6 text-lg text-slate-600 leading-relaxed"
          >
            At Peroz Corp, we believe in a transparent,{" "}
            <span className="italic">direct transmission</span> approach. When
            you work with us, you are engaging with a team that treats your
            logistical needs with the same care and attention as a family
            business.
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
          className="max-w-4xl text-4xl font-black"
        >
          Connecting global quality to local businesses,
          <br />
          <span className="italic text-violet-600 font-light">
            one direct delivery at a time.
          </span>
        </motion.p>
      </section>
    </main>
  );
}
