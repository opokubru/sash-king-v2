'use client';

import { motion } from 'framer-motion';
// import { ProductCard } from '@/components/ProductCard';
import { ThreeDSashes } from '@/lib/3d-sash';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '@/components/shared/shared_customs';

export const ThreeDSashesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Design Your Sash in 3D!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Step into the future of sash design! Our cutting-edge 3D platform
              gives you complete creative control. Position logos, customize
              text, and see your vision come to life in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ThreeDSashes.map((stole, index) => (
              <Link to={`/product/3d/${stole.id}`} key={index} className="px-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={stole.image}
                      alt={stole.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                      {stole.name}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                      {getCurrencySymbol('GHS') + parseToMoney(stole.price)}
                    </p>
                    <CustomButton
                      className="w-full text-sm font-medium bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors"
                      onPress={() => navigate(`/product/3d/${stole.id}`)}
                    >
                      Use
                    </CustomButton>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why 3D Design Changes Everything
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Pixel-Perfect Precision',
                description:
                  'Place every element exactly where you want it. Our advanced positioning system gives you complete creative freedom.',
                icon: '🎯',
              },
              {
                title: 'Infinite Possibilities',
                description:
                  "Mix, match, and customize to your heart's content. With unlimited design options, your creativity is the only limit.",
                icon: '🎨',
              },
              {
                title: 'Craftsmanship Excellence',
                description:
                  'Every sash is handcrafted with premium materials and meticulous attention to detail. Quality you can feel.',
                icon: '⭐',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-sm"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
