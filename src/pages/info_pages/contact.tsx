'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import PageWrapper from '@/components/shared/page-wrapper';

const contactInfo = [
  {
    label: 'Email',
    value: 'info@sneaksofficial.com',
    icon: 'mdi:email-outline',
  },
  {
    label: 'Phone',
    value: '+233 55 861 9235',
    icon: 'mdi:phone-outline',
  },
  // {
  //   label: 'Location',
  //   value: 'Accra, Ghana (Online Only)',
  //   icon: 'mdi:map-marker-outline',
  // },
  // {
  //   label: 'Working Hours',
  //   value: 'Mon - Sat: 9:00am – 6:00pm GMT',
  //   icon: 'mdi:clock-outline',
  // },
];

const Contact = () => {
  return (
    <PageWrapper title="Contact Us">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-700 max-w-2xl mx-auto"
      >
        Got questions, feedback, or just want to say what’s up? We’re always
        happy to hear from the SNEAKZ fam. Reach out through any of the channels
        below.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12"
      >
        {contactInfo.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg border border-yellow-300"
          >
            <div className="mt-1">
              <Icon icon={item.icon} className="text-yellow-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-md font-semibold text-black">{item.label}</h3>
              <p className="text-gray-700 text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </PageWrapper>
  );
};

export default Contact;
