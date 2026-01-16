import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ValuePropCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ValuePropCard({ icon: Icon, title, description, index }: ValuePropCardProps) {
  return (
    <motion.div
      className="text-center p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8DCC8] mb-6"
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon className="w-7 h-7 text-[#2C3E2F]" />
      </motion.div>
      <h4 className="text-xl mb-3 text-[#2C3E2F]">{title}</h4>
      <p className="text-[#858566] leading-relaxed">{description}</p>
    </motion.div>
  );
}
