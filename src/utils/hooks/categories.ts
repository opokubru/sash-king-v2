import { useEffect, useState } from 'react';
import { fetchCategoryOptions } from '@/lib/db/categories';
import { CategoryType } from '@/utils/types/category';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryOptions()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories:', err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};
