import { supabase } from '../supabaseClient';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data as Category[];
};

export const addCategory = async (
  category: Omit<Category, 'id' | 'created_at'>
): Promise<Category[]> => {
  const { data, error } = await supabase.from('categories').insert([category]).select();
  if (error) throw error;
  return data as Category[];
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
  const { error } = await supabase.from('categories').update(data).eq('id', id);
  if (error) throw error;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
};

export const fetchCategoryOptions = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug, image_url");
  
    if (error) throw error;
  
    return data.map((cat) => ({
      id: cat.id,
      label: cat.name,
      value: cat.slug,
      image_url: cat.image_url,
      slug: cat.slug,
    }));
};
