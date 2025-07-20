'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { socials } from '@/utils/data/social';

const features = [
  {
    title: 'Trendy Styles',
    icon: <Icon icon="mdi:tshirt-crew" className="w-6 h-6 text-primary/90" />,
    desc: 'We curate the latest fashion trends in streetwear and accessories.',
  },
  {
    title: 'Fast Delivery',
    icon: (
      <Icon icon="mdi:truck-fast-outline" className="w-6 h-6 text-primary/90" />
    ),
    desc: 'Swift nationwide delivery to keep you laced up on time.',
  },
  {
    title: 'Top Quality',
    icon: (
      <Icon
        icon="mdi:star-circle-outline"
        className="w-6 h-6 text-primary/90"
      />
    ),
    desc: 'Every item is hand-picked for its quality, durability, and vibe.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen container  text-black px-6 py-16">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4 text-primary">About Sneaks</h1>
      <p className="text-lg text-gray-700">
        At Sneaks, we live by one mission: to keep you one step ahead. What
        started as a passion for street style has grown into a movement for the
        bold and fashion-forward. We curate more than clothes — we deliver
        confidence, culture, and authenticity.
      </p>

      {/* Mission Section */}
      <p className="text-gray-600 text-md">
        We’re here to simplify your shopping experience while elevating your
        style. Our collection is handpicked to reflect the best in streetwear —
        from premium sneakers and baggy jeans to clean-cut cargos and everyday
        tees. Each piece is chosen to make sure you stand out, without the
        stress.
      </p>

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
            className="bg-white border border-primary/30 text-black shadow-lg"
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
        <h3 className="text-xl font-semibold text-primary/90">
          Be Part of the Sneaks Story
        </h3>

        <p className="text-gray-600 mt-2">
          Follow us on social to stay ahead of the game, discover new drops, and
          wear your attitude loud.
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
