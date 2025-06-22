import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';

export const Section = ({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white p-6 rounded-2xl border border-yellow-300 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon icon={icon} className="text-yellow-400 w-5 h-5" />
      <h2 className="text-lg font-semibold text-yellow-500">{title}</h2>
    </div>
    <div className="text-gray-700 text-sm md:text-base leading-relaxed">
      {children}
    </div>
  </motion.div>
);
