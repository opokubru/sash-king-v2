import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';

export const Section = ({
  icon,
  title,
  children,
}: {
  icon?: string;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="bg-white p-6 rounded-2xl border border-primary/30 shadow-sm"
  >
    <div className="flex items-center gap-3 mb-2">
      {icon && <Icon icon={icon} fontSize={30} className="text-primary" />}
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
    </div>
    <div className="text-gray-700 text-sm md:text-base leading-relaxed">
      {children}
    </div>
  </motion.div>
);
