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
import {
  addProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from '@/lib/db/products';
import { supabase } from '@/lib/supabaseClient';
import { Product } from '@/utils/types/product';
import { variables } from '@/utils/env';
import toast from 'react-hot-toast';
import { useCategories } from '@/utils/hooks/categories';
import { getCurrencySymbol, parseToMoney } from '@/utils/helper';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { categories: CATEGORIES } = useCategories();

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
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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

    return `${variables.VITE_SUPABASE_URL}/storage/v1/object/public/products/${data?.path}`;
  };

  const handleSubmit = async () => {
    let image_url = editingProduct?.image_url as string;

    if (form.image) {
      const uploaded = await handleUpload();
      if (!uploaded) return toast.error('Image upload failed.');
      image_url = uploaded;
    }

    const payload: Product = {
      name: form.name!,
      description: form.description!,
      price: form.price!,
      image_url,
      discount: form.discount || 0,
      category: form.category || '',
      in_stock: form.in_stock !== false,
    };

    if (editingProduct) {
      await updateProduct(editingProduct?.id as string, payload);
      toast.success('Product updated!');
    } else {
      await addProduct(payload);
      toast.success('Product added!');
    }

    onClose();
    setEditingProduct(null);
    setForm({
      name: '',
      description: '',
      price: 0,
      image: null,
      discount: 0,
      category: '',
      in_stock: true,
    });
    fetchAllProducts().then(setProducts);
  };

  useEffect(() => {
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen  text-black">
      <div className=" mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-yellow-500">
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
        <Table
          classNames={{
            base: 'bg-white border border-gray-300 text-black rounded-lg',
            tr: 'hover:bg-gray-50 transition-colors border-b ',
          }}
          isStriped
          removeWrapper
          aria-label="Product List"
        >
          <TableHeader>
            <TableColumn>ACTIONS </TableColumn>
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
                <TableCell className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setForm({
                        name: p.name,
                        description: p.description,
                        price: p.price,
                        image: null,
                        image_url: p.image_url,
                        discount: p.discount,
                        category: p.category,
                        in_stock: p.in_stock,
                      });
                      onOpen();
                    }}
                    className="text-blue-500 p-1 rounded-md ml-1 bg-blue-200"
                  >
                    <Icon icon="meteor-icons:pencil" />
                  </button>

                  <button
                    onClick={() => {
                      setProductToDelete(p);
                      onDeleteOpen();
                    }}
                    className="text-red-500 p-1 rounded-md ml-1 bg-red-200"
                  >
                    <Icon icon="material-symbols:delete-rounded" />
                  </button>
                </TableCell>

                <TableCell>
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    width={60}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>
                  {getCurrencySymbol('GHS')} {parseToMoney(p.price)}
                </TableCell>
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
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                    label={`Price ${getCurrencySymbol('GHS')}`}
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
                  {(form.image || editingProduct?.image_url) && (
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          form.image
                            ? URL.createObjectURL(form.image)
                            : editingProduct?.image_url
                        }
                        width={100}
                        className="border border-yellow-400 rounded-lg"
                      />
                      {form.image && (
                        <button
                          className="text-red-500 p-1 rounded-md ml-1 bg-red-200 flex justify-center items-center hover:text-red-700"
                          onClick={() => setForm({ ...form, image: null })}
                        >
                          <Icon icon="material-symbols:delete-rounded" />
                        </button>
                      )}
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
                    {editingProduct ? 'Save' : 'Add Product'}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
          <ModalContent>
            <ModalHeader className="text-red-500 font-bold">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete{' '}
                <strong>{productToDelete?.name}</strong>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  if (productToDelete) {
                    await deleteProduct(productToDelete?.id as string);
                    toast.success('Product deleted!');
                    setProductToDelete(null);
                    fetchAllProducts().then(setProducts);
                    onDeleteClose();
                  }
                }}
              >
                Yes, Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
