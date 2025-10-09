'use client';

import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { TemplatedSash } from '@/lib/templated-sash';
import { useNavigate } from 'react-router-dom';
export const TemplatedSashesPage = () => {
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
              All Templated Sashes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of authentic Kente sashes. Each
              template is carefully crafted with traditional Ghanaian artistry
              and can be customized to your preferences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {TemplatedSash.map((sash, index) => (
              <motion.div
                key={sash.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={sash} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Something Custom?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Don't see exactly what you're looking for? We can create a
              completely custom sash tailored to your specific needs and
              preferences.
            </p>
            <button
              onClick={() => navigate('/design-your-own')}
              className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
            >
              Design Your Own
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
