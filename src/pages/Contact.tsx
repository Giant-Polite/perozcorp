import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Trash2, ArrowUpRight, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- LOGIC: Persistence & Inquiry Items ---
  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedForm = localStorage.getItem("contactFormData");
    if (savedForm) setFormData(JSON.parse(savedForm));

    const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
    if (cart.length > 0) {
      const cartSummary = `\n\nInterested in: ${cart.join(", ")}`;
      setFormData((prev) => ({
        ...prev,
        message: prev.message.includes("Interested in:") ? prev.message : prev.message + cartSummary,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearCart = () => {
    localStorage.removeItem("cartProducts");
    setFormData((prev) => ({
      ...prev,
      message: prev.message.replace(/\n\nInterested in:.*$/s, ""),
    }));
    toast.info("Inquiry items removed.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Using your specific EmailJS credentials from the provided code
      await emailjs.send("service_lbav6nz", "template_kk7hr85", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, "4A16-a1r2QNyqkRSx");

      toast.success("Message Sent Successfully!");
      setFormData({ name: "", email: "", message: "" });
      localStorage.removeItem("cartProducts");
      localStorage.removeItem("contactFormData");
    } catch (error) {
      toast.error("Failed to transmit message.");
    } finally { setIsSubmitting(false); }
  };

  const currentCartCount = JSON.parse(localStorage.getItem("cartProducts") || "[]").length;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-32 selection:bg-violet-100 selection:text-violet-900">
      <div className="container mx-auto px-6 lg:px-[10%] pb-24">
        
        {/* ================= HEADER SECTION (Architecture Look) ================= */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp} 
          className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12"
        >
          <div className="max-w-4xl">
           <span className="inline-block text-violet-600 font-black tracking-[0.4em] uppercase text-[12px] mb-2 pb-2 border-b-2 border-violet-600">
  No detours in our service or our communication
</span>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8 text-slate-900">
              PARTNER <br /> <span className="text-violet-600 italic">WITH US.</span>
            </h1>
          </div>
         <p className="max-w-xs border-l-2 border-violet-200 pl-6">

  {/* Primary line (matches “PARTNER”) */}
  <span className="block text-slate-900 font-black text-lg leading-tight mb-2">
    Connecting Markets.
  </span>

  {/* Secondary line (matches “WITH US.”) */}
  <span className="block text-violet-600 italic font-medium text-lg leading-relaxed">
    Peroz Corp links international manufacturers from Asia and Europe with the US
    market, utilizing our key distribution hubs to ensure timely and reliable
    product delivery.
  </span>
</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ================= LEFT: INFO (The Protocol Look) ================= */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 gap-px bg-slate-200 border border-slate-200 shadow-xl shadow-slate-200/50">
              
              {/* Location Box */}
              <div className="bg-white p-10 hover:bg-slate-50 transition-colors group">
                <MapPin className="text-violet-600 mb-6 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-4 text-slate-400">Headquarters</h3>
                <p className="text-slate-800 leading-relaxed font-bold text-lg">
                  6304 Gravel Ave. Suite G.<br />
                  Alexandria, Virginia 22310
                </p>
              </div>

              {/* Contact Box */}
              <div className="bg-white p-10 hover:bg-slate-50 transition-colors group">
                <Phone className="text-violet-600 mb-6 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-4 text-slate-400">Inquiries</h3>
                <a href="tel:+13013058748" className="text-2xl font-black text-slate-900 hover:text-violet-600 transition-colors">
                  +1 301-305-8748
                </a>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase text-slate-400">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Mon – Sat: 9:00 AM — 5:00 PM EST
                </div>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="hidden lg:block pt-12">
               <div className="h-px w-24 bg-violet-600 mb-8" />
               <p className="text-slate-400 font-serif italic text-3xl leading-snug">
                  "Uncompromising integrity in every distribution layer."
               </p>
            </div>
          </div>

          {/* ================= RIGHT: THE FORM (REDESIGNED – LUXURY LIGHT) ================= */}
<div className="lg:col-span-7">
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
    className="relative bg-white rounded-[28px] px-10 py-14 md:px-14 md:py-20 shadow-[0_30px_70px_rgba(0,0,0,0.08)]"
  >
    {/* subtle decorative mark */}
    <div className="absolute top-8 right-10 text-[11px] tracking-[0.4em] font-black uppercase text-slate-200">
      Secure Form
    </div>

    <form onSubmit={handleSubmit} className="space-y-14">
      {/* NAME */}
      <div>
        <Label
          htmlFor="name"
          className="block mb-4 text-[18px] font-black tracking-[0.3em] uppercase text-slate-800"
        >
          Full Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className="h-14 rounded-xl border border-slate-200 bg-slate-50 px-5 text-lg font-medium
                     focus-visible:ring-0 focus:border-violet-500 transition-all
                     placeholder:text-slate-300"
        />
      </div>

      {/* EMAIL */}
      <div>
        <Label
          htmlFor="email"
          className="block mb-4 text-[18px] font-black tracking-[0.3em] uppercase text-slate-800"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="email@company.com"
          className="h-14 rounded-xl border border-slate-200 bg-slate-50 px-5 text-lg font-medium
                     focus-visible:ring-0 focus:border-violet-500 transition-all
                     placeholder:text-slate-300"
        />
      </div>

      {/* MESSAGE */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <Label
            htmlFor="message"
            className="text-[18px] font-black tracking-[0.3em] uppercase text-slate-800"
          >
            Inquiry Details
          </Label>

          {currentCartCount > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="flex items-center gap-1 text-[10px] font-bold uppercase
                         text-rose-500 hover:text-rose-700 transition"
            >
              <Trash2 size={12} />
              Remove Items ({currentCartCount})
            </button>
          )}
        </div>

        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="How can our distribution team assist you?"
          className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-medium
                     focus-visible:ring-0 focus:border-violet-500 transition-all resize-none
                     placeholder:text-slate-300"
        />
      </div>

      {/* SUBMIT */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-16 rounded-xl bg-slate-900 text-white
                     hover:bg-violet-600 transition-all duration-300
                     text-[12px] font-black tracking-[0.35em] uppercase
                     flex items-center justify-center gap-4"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Send Inquiry
              <ArrowUpRight />
            </>
          )}
        </Button>
      </div>
    </form>
  </motion.div>
</div>

        </div>
      </div>
    </main>
  );
};

export default Contact;