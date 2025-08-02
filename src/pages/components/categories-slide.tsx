'use client';

// import { CategoryType } from '@/utils/types/category';
import { Link } from 'react-router-dom';
import { useCategories } from '@/utils/hooks/categories';
import { motion } from 'framer-motion';

const CategorySlide = () => {
  const { categories, loading: loadingCategories } = useCategories();

  if (loadingCategories) return null;

  return (
    <motion.section className="flex overflow-x-scroll gap-2 py-4 bg-white scrollbar-hide items-center md:justify-center ">
      {categories.map((category, index) => (
        <Link
          to={`categories/${category.label
            .toLocaleLowerCase()
            .replace(' ', '-')}`}
          key={index}
          className="px-3 py-1 border whitespace-nowrap border-gray-300 rounded-full text-sm hover:bg-gray-100 transition"
        >
          {category.label}
        </Link>
      ))}
    </motion.section>
  );
};

export default CategorySlide;
