// pages/admin.tsx
import { useState, useEffect } from 'react';
import { Input, Button, Textarea, Image } from '@nextui-org/react';
import { addProduct, fetchProducts } from '@/lib/db/products';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/utils/types/product';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<
    Partial<Omit<Product, 'id' | 'created_at'>> & { image: File | null }
  >({
    name: '',
    description: '',
    price: 0,
    image: null,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (!form.image) return null;
    setUploading(true);
    const { data, error } = await supabase.storage
      .from('products')
      .upload(`images/${form.image.name}`, form.image, { upsert: true });
    setUploading(false);
    if (error) throw error;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${data.path}`;
  };

  const handleSubmit = async () => {
    const image_url = await handleUpload();
    await addProduct({
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image_url,
    });
    setForm({ name: '', description: '', price: '', image: null });
    fetchProducts().then(setProducts);
  };

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold">Add Product</h2>
      <Input
        name="name"
        label="Name"
        onChange={handleChange}
        value={form.name}
      />
      <Textarea
        name="description"
        label="Description"
        onChange={handleChange}
        value={form.description}
      />
      <Input
        name="price"
        label="Price"
        type="number"
        onChange={handleChange}
        value={form.price}
      />
      <Input type="file" onChange={handleImageChange} />
      {form.image && (
        <Image src={URL.createObjectURL(form.image)} width={100} />
      )}
      <Button isLoading={uploading} onClick={handleSubmit}>
        Add Product
      </Button>

      <h2 className="text-xl font-bold mt-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-2 rounded">
            <Image src={p.image_url} width={100} />
            <p>{p.name}</p>
            <p>GH₵ {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
