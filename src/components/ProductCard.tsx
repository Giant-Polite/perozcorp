import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// This interface now matches the individual props you are passing in Home.tsx
interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price?: number;
  in_stock?: boolean;
}

export const ProductCard = ({ image, name, category, price, in_stock }: ProductCardProps) => {
  const navigate = useNavigate();

  const handleInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Pull existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]") as string[];
    
    // Add product if not already present
    if (!cart.includes(name)) {
      cart.push(name);
      localStorage.setItem("cartProducts", JSON.stringify(cart));
    }
    
    // Redirect to contact form
    navigate("/contact#inquiry-form");
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DCC8]/50"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-[#FAF7F2] relative flex items-center justify-center p-6">
        <motion.img
          src={image}
          alt={name}
          className="max-w-full max-h-full object-contain"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Out of Stock Overlay */}
        {in_stock === false && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-[#2C3E2F] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Restocking
            </span>
          </div>
        )}

        {/* Quick View Badge (Figma Style) */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm text-[#2C3E2F] p-2 rounded-full shadow-lg">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[10px] tracking-[0.2em] text-[#858566] uppercase font-bold mb-2">
          {category}
        </p>
        <h3 className="text-md mb-4 text-[#2C3E2F] font-serif leading-tight h-12 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-center justify-between border-t border-[#FAF7F2] pt-4">
          <span className="text-sm font-bold text-[#D4A574] tracking-tighter italic">
            {price && price > 0 ? `$${price.toFixed(2)}` : "Premium Import"}
          </span>
          
          <motion.button
            onClick={handleInquiry}
            disabled={in_stock === false}
            className={`p-3 rounded-full transition-all duration-300 ${
              in_stock === false 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-[#2C3E2F] text-white hover:bg-[#3d5440] shadow-md shadow-[#2C3E2F]/20"
            }`}
            whileHover={in_stock !== false ? { scale: 1.1 } : {}}
            whileTap={in_stock !== false ? { scale: 0.95 } : {}}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;