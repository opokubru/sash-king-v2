'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';

const sections = [
  {
    title: 'Production Time',
    icon: 'mdi:clock-outline',
    content: (
      <p className="text-gray-700">
        All Sash King products are custom-made to order. Please allow up to 7
        days for your sash to be produced with the precision and quality that
        defines our brand. Each piece is carefully crafted to meet your
        specifications and ensure lasting performance.
      </p>
    ),
  },
  {
    title: 'Returns & Refunds',
    icon: 'mdi:refresh',
    content: (
      <div className="text-gray-700 space-y-4">
        <p>
          Your satisfaction is our priority.
        </p>
        <div>
          <h4 className="font-semibold mb-2">Eligibility:</h4>
          <p>
            Returns are accepted if a product is defective or damaged during
            production, or if there was an error in your order.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Non-Returnable Items:</h4>
          <p>
            Customized or personalized designs cannot be returned unless there
            is a verified defect.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Reporting Issues:</h4>
          <p>
            If a product arrives with defects or errors, please contact us
            immediately with photos or details. We will arrange a replacement or
            refund promptly.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Refund Process:</h4>
          <p>
            Approved refunds are processed within 7–10 business days to the
            original payment method.
          </p>
        </div>
      </div>
    ),
  },
];

const ProductionAndReturns = () => {
  return (
    <div className="min-h-screen container text-black px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Production & Returns
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          At Sash King, we combine precision craftsmanship with a commitment to
          customer satisfaction, so you can create your perfect sash with
          confidence.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
          >
            <Card className="bg-white border border-primary/30 text-black shadow-lg">
              <CardHeader className="flex items-center gap-4 pb-4">
                <Icon
                  icon={section.icon}
                  className="w-6 h-6 text-primary/90"
                />
                <h2 className="text-2xl font-semibold">{section.title}</h2>
              </CardHeader>
              <CardBody className="pt-0">{section.content}</CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductionAndReturns;

