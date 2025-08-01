'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
// import { CustomButton } from '@/components/shared/shared_customs';
// import { Image } from '@nextui-org/react';
// import { useCategories } from '@/utils/hooks/categories';
import { Link } from 'react-router-dom';

// interface HeroSectionProps {
//   onExploreClick: () => void;
// }

const HeroSection = () => {
  // const { categories, loading: loadingCategories } = useCategories();

  // const displayedCategories = categories.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Style With
            <br />
            <span className="relative">Bold Fashion</span>
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:h-[550px]">
          <section className="flex flex-col gap-2 justify-end">
            <Link
              to="/categories/jacket"
              className="h-64 lg:h-[70%] rounded-3xl overflow-hidden bg-primary p-4 cursor-pointer"
            >
              <img
                src="/images/jacket.jpeg"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </Link>
            <Link
              to="/categories/tees"
              className="h-48 lg:h-[30%] rounded-3xl overflow-hidden bg-secondary-gray cursor-pointer"
            >
              <img
                src="/images/tees.webp"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </Link>
          </section>

          <section className="flex flex-col gap-2 lg:pt-10">
            <Link
              to="/categories/cargo-pants"
              className="rounded-xl h-full overflow-hidden bg-secondary p-2 cursor-pointer"
            >
              <img
                src="/images/cargo_pants.jpeg"
                alt="Model in green coat"
                className="w-full h-full object-cover rounded-md"
              />
            </Link>
          </section>

          {/* middle */}
          <section className="col-span-2 lg:col-span-1 flex flex-col gap-2 justify-end">
            <Link
              to="/categories/hat"
              className="rounded-3xl overflow-hidden bg-yellow-300 p-3 cursor-pointer"
            >
              <img
                src="/images/hats.webp"
                alt="Model in yellow hat"
                className="w-full h-full object-cover rounded-md"
              />
            </Link>
            <Link
              to="/categories"
              // onClick={onExploreClick}
              className="bg-black bg-opacity-70 text-white px-4 py-6 flex items-center justify-center rounded-lg backdrop-blur-sm"
            >
              More Categories <Icon icon="uil:arrow-right" className="inline" />
            </Link>
          </section>

          <section className="flex flex-col gap-2 lg:pt-10">
            <Link
              to="/categories/baggy-jeans"
              className="h-full rounded-xl overflow-hidden bg-secondary-gray p-2 cursor-pointer"
            >
              <img
                src="/images/baggy_jeans.jpeg"
                alt="Model in white outfit"
                className="w-full h-full object-cover rounded-md"
              />
            </Link>
          </section>

          <section className="flex flex-col gap-2 justify-end">
            <Link
              to="/categories/joggers"
              className="h-64 lg:h-[70%] rounded-3xl overflow-hidden bg-secondary-yellow p-4 cursor-pointer"
            >
              <img
                src="/images/joggers.jpeg"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </Link>
            <Link
              to="/categories/sneaker"
              className="h-48 lg:h-[30%] rounded-3xl overflow-hidden bg-secondary-gray border-1 cursor-pointer"
            >
              <img
                src="/images/sneakers (1).webp"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </Link>
          </section>
        </div>
      </div>
      {/* <div className=" items-center gap-10 mt-4 max-w-7xl mx-auto ">
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-4">
            Shop by Category
            {!loadingCategories && categories.length > 6 && (
              <div className=" text-center">
                <Link
                  to="categories"
                  className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                >
                  See All <Icon icon="si:arrow-right-line" />
                </Link>
              </div>
            )}
          </h2>
          <div className="grid grid-cols-6 items-center gap-6">
            {!loadingCategories &&
              displayedCategories.map((cat) => (
                <Link
                  to={`categories/${cat.label.toLowerCase()}`}
                  key={cat.value}
                  className="flex flex-col gap-2 items-center w-24 h-24 hover:scale-105 transition-all cursor-pointer"
                >
                  <Image
                    src={cat.image_url}
                    alt={cat.label}
                    width={60}
                    height={60}
                    className="rounded-full shadow-sm"
                  />
                  <h2 className="text-sm font-medium mt-2 text-center text-primary">
                    {cat.label}
                  </h2>
                </Link>
              ))}
          </div>
        </div>
      </div> */}
    </motion.section>
  );
};

export default HeroSection;
