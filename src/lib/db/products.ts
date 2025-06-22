import { Product } from '@/utils/types/product';
import { supabase } from '../supabaseClient';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data as Product[];
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Product;
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').insert([product]).select();
  if (error) throw error;
  return data as Product[];
};


export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const { error } = await supabase.from('products').update(data).eq('id', id);
  if (error) throw error;
};

