'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { socials } from '@/utils/data/social';

const About = () => {
  return (
    <div className="min-h-screen container text-black px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-primary">
          About Sash King
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          At Sash King, we believe creativity should have no limits.
        </p>
        <p className="text-lg text-gray-700 mb-8">
          We empower designers, creators, and dreamers to transform ideas into
          stunning realities. Whether you're personalizing one of our elegant
          templates or designing from scratch, our advanced 3D tools make it
          simple to bring your vision to life.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <p className="text-gray-700 text-lg mb-4">
          Based in Kumasi, Ghana, Sash King is built on innovation, precision,
          and excellence. Our mission is to make professional-grade design
          accessible to everyone — combining modern technology with timeless
          craftsmanship to deliver results that inspire confidence and
          creativity.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          We don't just offer design tools — we provide a platform for
          imagination. Every product, project, and experience we deliver
          reflects our commitment to quality, customization, and user
          empowerment.
        </p>
        <p className="text-gray-700 text-lg font-semibold">
          At Sash King, we help you create without limits — because your vision
          deserves to be nothing less than extraordinary.
        </p>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-semibold text-primary/90 mb-4">
          Be Part of the Sash King Story
        </h3>

        <p className="text-gray-600 mb-6">
          Follow us on social to discover new designs, learn about our creative
          process, and celebrate your special moments with authentic style.
        </p>

        <div className="flex items-center justify-center mx-auto gap-x-3">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Icon icon={item.icon} fontSize={30} />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
