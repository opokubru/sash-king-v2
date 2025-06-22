'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const adItems = [
  {
    title: 'Top Selling',
    description: 'Our most popular picks of the month.',
    icon: 'mdi:fire',
    color: 'bg-white',
  },
  {
    title: 'New Arrivals',
    description: 'Fresh drops just in!',
    icon: 'mdi:shoe-sneaker',
    color: 'bg-white',
  },
  {
    title: 'Limited Edition',
    description: 'Exclusive styles, limited stock.',
    icon: 'mdi:star-circle',
    color: 'bg-white',
  },
];

export default function AdGrid() {
  return (
    <div className="h-[30vh] ">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
        {adItems.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className={`rounded-2xl p-5 flex flex-col ${item.color} shadow-md border border-yellow-300`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon icon={item.icon} className="text-yellow-500 w-6 h-6" />
              <h3 className="font-bold text-lg text-black">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
