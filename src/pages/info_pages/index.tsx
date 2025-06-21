'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { socials } from '@/utils/data/social';

const features = [
  {
    title: 'Trendy Styles',
    icon: <Icon icon="mdi:tshirt-crew" className="w-6 h-6 text-yellow-400" />,
    desc: 'We curate the latest fashion trends in streetwear and accessories.',
  },
  {
    title: 'Fast Delivery',
    icon: (
      <Icon icon="mdi:truck-fast-outline" className="w-6 h-6 text-yellow-400" />
    ),
    desc: 'Swift nationwide delivery to keep you laced up on time.',
  },
  {
    title: 'Top Quality',
    icon: (
      <Icon
        icon="mdi:star-circle-outline"
        className="w-6 h-6 text-yellow-400"
      />
    ),
    desc: 'Every item is hand-picked for its quality, durability, and vibe.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[rgba(197,195,195,0.165)] text-black px-6 py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-4 text-yellow-400">
          About SNEAKZ
        </h1>
        <p className="text-lg text-gray-700">
          SNEAKZ is more than just an online store — it’s a culture. We bring
          you a fresh mix of urban fashion, bold accessories, and a community
          that lives and breathes street style.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-20 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-black">Our Mission</h2>
        <p className="text-gray-600 text-md">
          To empower self-expression through authentic streetwear while making
          quality fashion accessible and exciting for everyone.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-20 grid gap-6 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
      >
        {features.map((feature, index) => (
          <Card
            key={index}
            className="bg-white border border-yellow-400 text-black shadow-lg"
          >
            <CardHeader className="flex items-center gap-4">
              <div>{feature.icon}</div>
              <h3 className="font-semibold">{feature.title}</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 text-sm">{feature.desc}</p>
            </CardBody>
          </Card>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-24 text-center"
      >
        <h3 className="text-xl font-semibold text-yellow-400">
          Join the SNEAKZ Movement
        </h3>
        <p className="text-gray-600 mt-2">
          Follow us on social, stay updated, and express your style boldly.
        </p>
        <div className="flex items-center justify-center mx-auto mt-3 gap-x-3">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              className="hover:opacity-80"
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
