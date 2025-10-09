'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { socials } from '@/utils/data/social';

const features = [
  {
    title: 'Authentic Kente',
    icon: <Icon icon="mdi:tshirt-crew" className="w-6 h-6 text-primary/90" />,
    desc: 'Handwoven authentic Kente sashes crafted with traditional Ghanaian artistry.',
  },
  {
    title: 'Custom Design',
    icon: (
      <Icon icon="mdi:palette-outline" className="w-6 h-6 text-primary/90" />
    ),
    desc: 'Design your own unique sash or choose from our elegant templates.',
  },
  {
    title: 'Premium Quality',
    icon: (
      <Icon
        icon="mdi:star-circle-outline"
        className="w-6 h-6 text-primary/90"
      />
    ),
    desc: 'Every sash is crafted with attention to detail and cultural significance.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen container  text-black px-6 py-16">
      {/* Hero Section */}
      <h1 className="text-4xl font-bold mb-4 text-primary">About Sash King</h1>
      <p className="text-lg text-gray-700">
        At Sash King, we craft authentic Kente sashes for every occasion. Choose
        from our elegant templates or design your own from scratch – unique,
        stylish, and made just for you.
      </p>

      {/* Mission Section */}
      <p className="text-gray-600 text-md">
        We celebrate the rich heritage of Kente cloth while bringing it into
        modern celebrations. Whether it's graduation, cultural events, or
        special occasions, our handwoven sashes carry the stories and traditions
        of Ghana. Each piece is carefully crafted to honor both the past and
        your personal journey.
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
          Be Part of the Sash King Story
        </h3>

        <p className="text-gray-600 mt-2">
          Follow us on social to discover new Kente designs, learn about our
          cultural heritage, and celebrate your special moments with authentic
          style.
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
