'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CustomButton } from '@/components/shared/shared_customs';

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main hero content */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
            Elevate Your Style With
            <br />
            <span className="relative">Bold Fashion</span>
          </h1>
        </div>

        <div className="grid grid-cols-5 gap-4 h-[550px]">
          <section className="flex flex-col gap-2  justify-end">
            {/* 1st */}
            <div className="h-[70%] rounded-3xl overflow-hidden bg-primary p-4">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1374&auto=format&fit=crop"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="h-[30%] rounded-3xl overflow-hidden bg-secondary-gray p-4">
              <img
                src="https://placehold.co/400"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
          <section className="flex flex-col gap-2 pt-10">
            {/* second */}
            <div className="rounded-3xl h-full overflow-hidden bg-secondary p-4">
              <img
                src="https://placehold.co/400"
                alt="Model in green coat"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col gap-2 justify-end">
            {/* midle */}
            <div className=" rounded-3xl overflow-hidden  bg-yellow-300 p-4">
              <img
                src="https://placehold.co/400"
                alt="Model in yellow hat"
                className="w-full h-full object-cover"
              />
            </div>
            <CustomButton className=" bg-black bg-opacity-70 text-white px-4 py-8 rounded-lg  backdrop-blur-sm">
              Explore Collections{' '}
              <Icon icon="uil:arrow-right" className="inline" />
            </CustomButton>
          </section>

          <section className="flex flex-col gap-2 pt-10">
            {/* 4th */}
            <div className="h-full rounded-3xl overflow-hidden bg-secondary-gray p-4">
              <img
                src="https://placehold.co/400"
                alt="Model in white outfit"
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          <section className="flex flex-col gap-2  justify-end">
            {/* 5th */}
            <div className="h-[70%] rounded-3xl overflow-hidden bg-secondary-yellow p-4">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1374&auto=format&fit=crop"
                alt="Model in orange outfit"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="h-[30%] rounded-3xl overflow-hidden bg-secondary-gray p-4">
              <img
                src="https://placehold.co/400"
                alt="Model in green shirt"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
