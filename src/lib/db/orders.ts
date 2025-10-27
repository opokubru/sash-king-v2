/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase, supabaseAdmin } from '../supabaseClient';

export interface OrderItem {
  image: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  isCustom?: boolean;
  customImage?: string;
  customTextLeft?: string;
  customTextRight?: string;
  uploadedImageLeft?: string;
  uploadedImageRight?: string;
  size?: string | null;
  color?: string | null;
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

// Upload image to Supabase storage bucket "orders"
export async function uploadOrderImage(
  imageUrl: string,
  fileName: string,
): Promise<string> {
  try {
    let blob: Blob;
    
    if (imageUrl.startsWith('blob:')) {
      // Handle blob URL - fetch the blob directly
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch blob URL');
      }
      blob = await response.blob();
      console.log('Converted blob URL to blob');
    } else if (imageUrl.startsWith('data:image')) {
      // Convert data URL to blob
      const base64Data = imageUrl.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const mimeType = imageUrl.split(';')[0].split(':')[1];
      blob = new Blob([byteArray], { type: mimeType });
      console.log('Converted data URL to blob');
    } else {
      // Fetch image if it's a URL
      const response = await fetch(imageUrl);
      blob = await response.blob();
      console.log('Fetched image from URL');
    }

    console.log(`Uploading ${fileName} to Supabase Storage...`);
    
    // Upload to Supabase storage using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('orders')
      .upload(`${fileName}`, blob, {
        contentType: blob.type || 'image/png',
        upsert: true, // Replace if exists
      });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      throw error;
    }

    console.log('✓ Upload successful, data:', data);

    // Get public URL (can use regular client for this)
    const { data: urlData } = supabaseAdmin.storage
      .from('orders')
      .getPublicUrl(data.path);

    console.log('✓ Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
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
export async function addOrder(orderData: {
  customer: string; // Combined first_name and last_name
  order: any[]; // Array of order items
  total_amount: number;
}) {
  const { data, error } = await supabase
    .from('orders')
    .insert([{
      customer: orderData.customer,
      order: orderData.order,
      total_amount: orderData.total_amount,
    }])
    .select();

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
