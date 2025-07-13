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


export const fetchUnder100 = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .lte('price', 250)
    .order('price', { ascending: true })
    .limit(4);
  if (error) throw error;
  return data;
};


export const fetchNewArrivals = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);
  if (error) throw error;
  return data;
};

export const fetchTopDeals = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .gt('discount', 0)
    // .order('discount', { ascending: false })
    .limit(4);
  if (error) throw error;
  return data;
};

