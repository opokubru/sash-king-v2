/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../supabaseClient';

export interface OrderItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  location: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'delivered' | 'returned' | 'lost';
  ordered_at: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}


export const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
};

// Fetch orders by customer email
export const fetchOrdersByUser = async (email: string): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as Order[];
};

// Fetch one order by ID
export const getOrderById = async (id: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as Order;
};

// Add new order
export async function addOrder(order: {
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  location: string;
  items: any[];
  total: number;
  created_at?: string;
  updated_at?: string;
}) {
  const { data, error } = await supabase.from('orders').insert([order]);
  if (error) {
    console.error('Failed to save order:', error);
    throw new Error('Order creation failed');
  }
  return data;
}


// Update order (status, delivery time, etc.)
export async function updateOrder(id: string, updates: Partial<Order>) {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}


// Delete an order
export const deleteOrder = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
