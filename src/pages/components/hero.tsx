'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CustomButton } from '@/components/shared/shared_customs';
import { Image } from '@nextui-org/react';
import { useCategories } from '@/utils/hooks/categories';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onExploreClick: () => void;
}

const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const { categories, loading: loadingCategories } = useCategories();

  const displayedCategories = categories.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main hero content */}
        <div className="text-center mb-12 md:mb-16">
          {/* Adjusted font size for better responsiveness */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Style With
            <br />
            <span className="relative">Bold Fashion</span>
          </h1>
        </div>

        {/* Optimized Grid:
          - Mobile (default): 'grid-cols-2' for a compact view.
          - Large Screens ('lg'): 'lg:grid-cols-5' for the full desktop layout.
          - Height: 'lg:h-[550px]' applies the fixed height only on large screens.
        */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:h-[550px]">
          {/* Column 1 */}
          <section className="flex flex-col gap-2 justify-end">
            {/* Responsive Height:
              - Mobile: 'h-64' for a fixed, reasonable height.
              - Large Screens: 'lg:h-[70%]' for the original desktop layout.
            */}
            <div className="h-64 lg:h-[70%] rounded-3xl overflow-hidden bg-primary p-4">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1374&auto=format&fit=crop"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* Responsive Height */}
            <div className="h-48 lg:h-[30%] rounded-3xl overflow-hidden bg-secondary-gray ">
              <img
                src="https://www.cato.org/sites/cato.org/files/styles/optimized/public/2023-11/fast-fashion2.jpeg?itok=qCMa7eGV"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Column 2 */}
          {/* Responsive Spacing: 'lg:pt-10' applies padding only on large screens */}
          <section className="flex flex-col gap-2 lg:pt-10">
            <div className="rounded-xl h-full overflow-hidden bg-secondary p-2">
              <img
                src="https://i.pinimg.com/736x/6a/bf/e3/6abfe3a19ad0cc966eacaf2157633eea.jpg"
                alt="Model in green coat"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </section>

          {/* middle */}
          <section className="col-span-2 lg:col-span-1 flex flex-col gap-2 justify-end">
            <div className="rounded-3xl overflow-hidden bg-yellow-300 p-3">
              <img
                src="https://assets.ajio.com/medias/sys_master/root/20230623/ASZ9/64953f1fd55b7d0c63b6983a/-473Wx593H-464912406-blue-MODEL.jpg"
                alt="Model in yellow hat"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <CustomButton
              onClick={onExploreClick}
              className="bg-black bg-opacity-70 text-white px-4 py-8 rounded-lg backdrop-blur-sm"
            >
              Explore Collections{' '}
              <Icon icon="uil:arrow-right" className="inline" />
            </CustomButton>
          </section>

          {/* Column 4 */}
          {/* Responsive Spacing: 'lg:pt-10' applies padding only on large screens */}
          <section className="flex flex-col gap-2 lg:pt-10">
            <div className="h-full rounded-xl overflow-hidden bg-secondary-gray p-2">
              <img
                src="https://neckermanndirect.eu/535976-medium_default/summer-casual-two-piece-set-african-women-fashion-solid-round-neck-lace-up-short-top-wide-leg-pants-two-piece-suit-women.jpg"
                alt="Model in white outfit"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </section>

          {/* Column 5 */}
          <section className="flex flex-col gap-2 justify-end">
            {/* Responsive Height */}
            <div className="h-64 lg:h-[70%] rounded-3xl overflow-hidden bg-secondary-yellow p-4">
              <img
                src="https://media.boohoo.com/i/boohoo/fzz73911_natural_xl/female-natural-platform-retro-running-sneakers/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* Responsive Height */}
            <div className="h-48 lg:h-[30%] rounded-3xl overflow-hidden bg-secondary-gray border-1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh-TRCi8byOhEMtxPnovOGklTjazLOmSWhcg&s"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </div>
      </div>
      <div className="flex items-center gap-10 mt-4 max-w-7xl mx-auto">
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
      </div>
    </motion.section>
  );
};

export default HeroSection;
