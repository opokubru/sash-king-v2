import { supabase } from '../supabaseClient';

export interface Order {
  id: string;
  user_email: string;
  product_id: string;
  quantity: number;
  total_amount: number;
  color?: string;
  size?: string;
  payment_status?: 'pending' | 'paid' | 'failed';
  created_at?: string;
  updated_at?: string;
}

// Fetch all orders (latest first)
export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
};

// Fetch orders by user email
export const fetchOrdersByUser = async (email: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_email', email)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
};

// Fetch a single order by ID
export const fetchOrderById = async (id: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Order;
};

// Create new order
export const addOrder = async (
  order: Omit<Order, 'id' | 'created_at' | 'updated_at'>
): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select();
  if (error) throw error;
  return data as Order[];
};

// Update an order (e.g. payment_status or delivery)
export const updateOrder = async (
  id: string,
  update: Partial<Order>
): Promise<void> => {
  const { error } = await supabase
    .from('orders')
    .update(update)
    .eq('id', id);
  if (error) throw error;
};

// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
