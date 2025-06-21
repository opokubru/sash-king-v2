/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Input,
  Textarea,
  Image,
  useDisclosure,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { addProduct, fetchProducts } from '@/lib/db/products';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/utils/types/product';
import { CATEGORIES } from '@/utils/data/categories';
import { variables } from '@/utils/env';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<
    Partial<Omit<Product, 'id' | 'created_at'>> & { image: File | null }
  >({
    name: '',
    description: '',
    price: 0,
    image: null,
    discount: 0,
    category: '',
    in_stock: true,
  });

  const [uploading, setUploading] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'price' || name === 'discount' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (!form.image) {
      toast.error('No image selected.');
      return null;
    }

    setUploading(true);
    const fileName = `${Date.now()}_${form.image.name}`;

    const { data, error } = await supabase.storage
      .from('products')
      .upload(`images/${fileName}`, form.image, { upsert: true });

    setUploading(false);

    if (error) {
      console.error('Upload error:', error.message);
      toast.error('Image upload failed. Check console for details.');
      return null;
    }

    return `${variables.SUPABASE_URL}/storage/v1/object/public/products/${data?.path}`;
  };

  const handleSubmit = async () => {
    const image_url = (await handleUpload()) as string;

    if (!image_url) {
      // Don't proceed if image upload failed
      toast.error('Product not added because image upload failed.');
      return;
    }

    await addProduct({
      name: form.name!,
      description: form.description!,
      price: form.price!,
      image_url,
      discount: form.discount || 0,
      category: form.category || '',
      in_stock: form.in_stock !== false,
    });
    onClose();
    setForm({
      name: '',
      description: '',
      price: 0,
      image: null,
      discount: 0,
      category: '',
      in_stock: true,
    });
    fetchProducts().then(setProducts);
  };

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-[rgba(197,195,195,0.165)] text-black px-6 py-16">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            Product Inventory
          </h2>
          <Button
            color="primary"
            className="bg-yellow-400 text-black"
            onPress={onOpen}
          >
            <Icon icon="mdi:plus" className="mr-2" /> Add Product
          </Button>
        </div>

        {/* Table */}
        <Table isStriped removeWrapper aria-label="Product List">
          <TableHeader>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>DISCOUNT</TableColumn>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>STOCK</TableColumn>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    width={60}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>GHS {p.price.toFixed(2)}</TableCell>
                <TableCell>{p.discount ? `${p.discount}%` : '-'}</TableCell>
                <TableCell>{p.category || '-'}</TableCell>
                <TableCell>
                  {p.in_stock ? (
                    <span className="text-green-600 font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">Out</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-yellow-400 font-bold">
                  Add New Product
                </ModalHeader>
                <ModalBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Product Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Input
                    name="price"
                    label="Price (GHS)"
                    type="number"
                    value={String(form.price)}
                    onChange={handleChange}
                  />
                  <Input
                    name="discount"
                    label="Discount (%)"
                    type="number"
                    value={String(form.discount)}
                    onChange={handleChange}
                  />
                  <Select
                    label="Category"
                    selectedKeys={[form.category || '']}
                    onSelectionChange={(keys) =>
                      setForm({
                        ...form,
                        category: Array.from(keys)[0] as string,
                      })
                    }
                  >
                    {CATEGORIES.map((cat) => (
                      <SelectItem
                        key={cat.value}
                        value={cat.value}
                        // startContent={
                        //   <Icon
                        //     icon={cat.icon}
                        //     className="text-yellow-400 w-5 h-5"
                        //   />
                        // }
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    type="file"
                    accept=".webp,image/webp"
                    onChange={handleImageChange}
                  />
                  {form.image && (
                    <div className="flex items-center gap-4">
                      <Image
                        src={URL.createObjectURL(form.image)}
                        width={100}
                        className="border border-yellow-400 rounded-lg"
                      />
                      <button
                        className="text-red-500 p-1 rounded-md ml-1 bg-red-200 flex justify-center items-center hover:text-red-700"
                        onClick={() => setForm({ ...form, image: null })}
                      >
                        <Icon
                          icon="material-symbols:delete-rounded"
                          className=""
                        />
                      </button>
                    </div>
                  )}

                  <Textarea
                    name="description"
                    label="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="md:col-span-2"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    isLoading={uploading}
                    onClick={handleSubmit}
                    className="bg-yellow-400 text-black"
                  >
                    Add Product
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
