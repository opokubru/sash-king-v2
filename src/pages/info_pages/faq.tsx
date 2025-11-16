'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';

const faqs = [
  {
    question: 'What is Sash King?',
    answer:
      'Sash King is a creative design platform that allows you to customize, visualize, and create unique designs using our elegant templates or by starting completely from scratch. Our intuitive 3D tools help you bring your ideas to life with precision and ease.',
  },
  {
    question: 'Where is Sash King based?',
    answer:
      'We are proudly based in Kumasi, Ghana, serving clients locally and beyond with a commitment to quality, innovation, and creative freedom.',
  },
  {
    question: 'Do I need design experience to use Sash King?',
    answer:
      'Not at all. Sash King is built for everyone — from first-time users to experienced designers. Our tools are simple, interactive, and easy to use, even if you have no prior design background.',
  },
  {
    question: 'Can I customize existing templates?',
    answer:
      'Yes! You can select from our range of elegant, ready-made templates and personalize every detail — from colors and dimensions to layout and finish — to match your unique style.',
  },
  {
    question: 'Can I design from scratch?',
    answer:
      'Absolutely. Sash King gives you the freedom to start from a blank canvas. Our 3D design features let you create something completely original and visualize it in real time.',
  },
  {
    question: 'What makes Sash King different?',
    answer:
      'We combine cutting-edge 3D design technology with a commitment to quality and customization. Every design tool and feature is made to help you create faster, easier, and with professional-level precision.',
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen container text-black px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Frequently Asked Questions (FAQs)
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Find answers to common questions about Sash King and our design
          platform.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
          >
            <Card className="bg-white border border-primary/30 text-black shadow-lg">
              <CardHeader className="flex items-start gap-4 pb-2">
                <Icon
                  icon="mdi:help-circle-outline"
                  className="w-6 h-6 text-primary/90 mt-1 flex-shrink-0"
                />
                <h3 className="font-semibold text-lg">{faq.question}</h3>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-gray-700">{faq.answer}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;

