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

  // Persistence Logic
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

  // Auto-Scroll Logic
  useEffect(() => {
    if (window.location.hash === "#inquiry-form") {
      const element = document.getElementById("inquiry-form");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
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
      await emailjs.send("service_lbav6nz", "template_9pk6yuf", {
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
    // Changed bg-slate-50 to warm #FCF9F1 and selection colors to Amber
    <main className="min-h-screen bg-[#FCF9F1] text-stone-900 font-sans pt-32 selection:bg-amber-100 selection:text-amber-900">
      <div className="container mx-auto px-6 lg:px-[10%] pb-24">
        
        {/* ================= HEADER SECTION ================= */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp} 
          className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12"
        >
          <div className="max-w-4xl">
           <span className="inline-block text-amber-600 font-black tracking-[0.4em] uppercase text-[12px] mb-2 pb-2 border-b-2 border-amber-600">
             Elite Supply Chain Connectivity
           </span>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8 text-stone-900 uppercase">
              Partner <br /> <span className="text-amber-600 italic font-serif font-light lowercase">with us.</span>
            </h1>
          </div>
          <p className="max-w-xs border-l-2 border-amber-200 pl-6">
            <span className="block text-stone-900 font-black text-lg leading-tight mb-2">
              Global Vision.
            </span>
            <span className="block text-amber-700 italic font-serif font-medium text-lg leading-relaxed">
              Peroz Corp eliminates the distance between global manufacturers and the US 
              market with direct-conduit logistics.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* ================= LEFT: INFO BOXES ================= */}
          <div className="lg:col-span-5 space-y-12">
            <div className="grid grid-cols-1 gap-px bg-amber-100 border border-amber-100 shadow-xl shadow-amber-900/5">
              
              {/* Location Box */}
              <div className="bg-white p-10 hover:bg-amber-50/30 transition-colors group">
                <MapPin className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-4 text-stone-400">Tactical Hub</h3>
                <p className="text-stone-800 leading-relaxed font-bold text-lg">
                  6304 Gravel Ave. Suite G.<br />
                  Alexandria, Virginia 22310
                </p>
              </div>

              {/* Contact Box */}
              <div className="bg-white p-10 hover:bg-amber-50/30 transition-colors group">
                <Phone className="text-amber-600 mb-6 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-4 text-stone-400">Wholesale Desk</h3>
                <a href="tel:+13013058748" className="text-2xl font-black text-stone-900 hover:text-amber-600 transition-colors">
                  +1 301-305-8748
                </a>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase text-stone-400">
                   <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                   Operations: Mon – Sat / 9AM — 5PM EST
                </div>
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="hidden lg:block pt-12">
               <div className="h-px w-24 bg-amber-600 mb-8" />
               <p className="text-stone-400 font-serif italic text-3xl leading-snug">
                  "Operational sovereignty in every layer of distribution."
               </p>
            </div>
          </div>

          {/* ================= RIGHT: THE INQUIRY FORM ================= */}
          <div className="lg:col-span-7 scroll-mt-50" id="inquiry-form">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="relative bg-white rounded-[28px] px-10 py-14 md:px-14 md:py-20 shadow-[0_30px_70px_rgba(217,119,6,0.08)] border border-amber-50"
            >
              <div className="absolute top-8 right-10 text-[11px] tracking-[0.4em] font-black uppercase text-amber-600/60">
                Direct Inquiry
              </div>

              <form onSubmit={handleSubmit} className="space-y-14">
                {/* NAME */}
                <div className="group">
                  <Label htmlFor="name" className="block mb-4 text-[14px] font-black tracking-[0.3em] uppercase text-stone-800 transition-colors group-focus-within:text-amber-600">
                    Client Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="h-14 rounded-none border-0 border-b-2 border-stone-100 bg-transparent px-0 text-lg font-medium focus-visible:ring-0 focus:border-amber-600 transition-all placeholder:text-stone-300"
                  />
                </div>

                {/* EMAIL */}
                <div className="group">
                  <Label htmlFor="email" className="block mb-4 text-[14px] font-black tracking-[0.3em] uppercase text-stone-800 transition-colors group-focus-within:text-amber-600">
                    Corporate Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@organization.com"
                    className="h-14 rounded-none border-0 border-b-2 border-stone-100 bg-transparent px-0 text-lg font-medium focus-visible:ring-0 focus:border-amber-600 transition-all placeholder:text-stone-300"
                  />
                </div>

                {/* MESSAGE */}
                <div className="group">
                  <div className="flex justify-between items-center mb-4">
                    <Label htmlFor="message" className="text-[14px] font-black tracking-[0.3em] uppercase text-stone-800 transition-colors group-focus-within:text-amber-600">
                      Inventory Inquiry
                    </Label>

                    {currentCartCount > 0 && (
                      <button
                        type="button"
                        onClick={clearCart}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-700 hover:text-amber-900 transition"
                      >
                        <Trash2 size={12} />
                        Clear Selection ({currentCartCount})
                      </button>
                    )}
                  </div>

                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Please specify your wholesale requirements..."
                    className="rounded-none border-0 border-b-2 border-stone-100 bg-transparent px-0 py-4 text-lg text-red-600 font-medium focus-visible:ring-0 focus:border-amber-600 transition-all resize-none placeholder:text-stone-300"
                  />
                </div>

                {/* SUBMIT */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-xl bg-stone-950 text-white hover:bg-amber-600 transition-all duration-500 text-[12px] font-black tracking-[0.35em] uppercase flex items-center justify-center gap-4 shadow-xl shadow-amber-900/20"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        Transmit Inquiry
                        <ArrowUpRight size={18} />
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