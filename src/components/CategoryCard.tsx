import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

// This interface must match the props you pass in Home.tsx
interface CategoryCardProps {
  name: string;
  image: string;
  index: number;
}

export const CategoryCard = ({ name, image, index }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group rounded-3xl overflow-hidden cursor-pointer h-80 md:h-96"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E2F]/80 via-[#2C3E2F]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <motion.h3
          className="text-white text-3xl md:text-4xl mb-4 font-serif italic"
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h3>

        <motion.div
          className="flex items-center gap-2 text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm tracking-wider uppercase font-sans font-bold">Explore</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-white/0 rounded-3xl pointer-events-none"
        animate={{ borderColor: isHovered ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default CategoryCard;