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
  Switch,
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
import { AVAILABLE_COLORS, AVAILABLE_SIZES } from './data/data';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { categories: CATEGORIES } = useCategories();

  const [form, setForm] = useState<
    Partial<Omit<Product, 'id' | 'created_at'>> & {
      image: File | null;
      extra_images: File[];
      sizes?: string[];
      colors?: string[];
    }
  >({
    name: '',
    description: '',
    price: 0,
    image: null,
    discount: 0,
    category: '',
    in_stock: true,
    extra_images: [],
    sizes: [],
    colors: [],
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'price' || name === 'discount' ? parseFloat(value) : value,
    });
  };

  const handleImageChange = (e: any) => {
    console.log('files', e.target.files);
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

  const uploadMultipleImages = async () => {
    const urls: string[] = [];

    for (const img of form.extra_images || []) {
      const fileName = `${Date.now()}_${img.name}`;
      const { data, error } = await supabase.storage
        .from('products')
        .upload(`extras/${fileName}`, img, { upsert: true });

      if (error) {
        toast.error(`Failed to upload ${img.name}`);
        continue;
      }

      urls.push(
        `${variables.VITE_SUPABASE_URL}/storage/v1/object/public/products/${data.path}`,
      );
    }

    return urls;
  };

  const handleSubmit = async () => {
    let image_url = editingProduct?.image_url as string;

    if (form.image) {
      const uploaded = await handleUpload();
      if (!uploaded) return toast.error('Image upload failed.');
      image_url = uploaded;
    }

    const extra_image_urls = await uploadMultipleImages();

    const payload: Product = {
      name: form.name!,
      description: form.description!,
      price: form.price!,
      image_url,
      discount: form.discount || 0,
      category: form.category || '',
      in_stock: form.in_stock !== false,
      extra_image_urls, // optional
      sizes: form.sizes || [],
      colors: form.colors || [],
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
      extra_images: [],
      colors: [],
      sizes: [],
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
          <h2 className="md:text-3xl font-bold text-primary/80">
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
        <div className="w-full overflow-x-auto bg-white">
          <Table
            classNames={{
              base: 'bg-white border border-r-none border-gray-300 text-black rounded-lg',
              tr: 'hover:bg-gray-50 transition-colors border-b border-r-none ',
              table: 'border-r-none',
              tbody: 'border-r-none',
            }}
            isStriped
            removeWrapper
            aria-label="Product List"
          >
            <TableHeader>
              <TableColumn>ACTIONS </TableColumn>
              <TableColumn>STOCK</TableColumn>
              <TableColumn>IMAGE</TableColumn>
              <TableColumn>EXTRA IMAGES</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>PRICE</TableColumn>
              <TableColumn>DISCOUNT</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>COLORS</TableColumn>
              <TableColumn>SIZES</TableColumn>
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
                          sizes: p.sizes || [],
                          extra_images: [],
                          colors: [],
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
                    <Switch
                      size="sm"
                      isSelected={p.in_stock}
                      onValueChange={async (checked) => {
                        await updateProduct(p.id as string, {
                          ...p,
                          in_stock: checked,
                        });
                        toast.success('Stock status updated');
                        const updated = await fetchAllProducts();
                        setProducts(updated);
                      }}
                      color={p.in_stock ? 'success' : 'danger'}
                      classNames={{
                        base: 'text-xs font-semibold flex flex-col md:flex-row',
                        thumb: 'bg-white',
                      }}
                    >
                      <span className="text-xs">
                        {p.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </Switch>
                  </TableCell>

                  <TableCell>
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      width={60}
                      className="rounded-lg cursor-pointer"
                      onClick={() => setPreviewUrl(p.image_url)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap w-[20%] h-[20%]">
                      {p.extra_image_urls?.map((url, i) => (
                        <Image
                          key={i}
                          src={url}
                          width={40}
                          height={40}
                          onClick={() => setPreviewUrl(url)}
                          className="rounded border border-gray-300 cursor-pointer"
                          alt={`extra-${i}`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>
                    {getCurrencySymbol('GHS')} {parseToMoney(p.price)}
                  </TableCell>
                  <TableCell>{p.discount ? `${p.discount}%` : '-'}</TableCell>
                  <TableCell>{p.category || '-'}</TableCell>
                  <TableCell>
                    <div className="grid grid-cols-4 gap-4 md:gap-2">
                      {(p.colors || []).map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="grid grid-cols-4 gap-4 md:gap-2">
                      {p.sizes?.join(', ') || '-'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Modal */}
        <Modal
          onClose={() => {
            onClose();
            setEditingProduct(null);
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="xl"
        >
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
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Main Image</p>
                    {/* <Input
                      key={isOpen ? 'main-image-open' : 'main-image-closed'}
                      type="file"
                      accept=".webp,image/webp"
                      onChange={handleImageChange}
                    /> */}
                    <input
                      key={
                        isOpen
                          ? 'main-image-native-open'
                          : 'main-image-native-closed'
                      }
                      type="file"
                      accept=".webp,image/webp"
                      onChange={handleImageChange}
                      className="border rounded p-1 text-sm"
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
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Extra Images</p>
                    <input
                      key={isOpen ? 'extra-image-open' : 'extra-image-closed'}
                      type="file"
                      multiple
                      accept=".webp,image/webp"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          extra_images: Array.from(e.target.files || []),
                        })
                      }
                    />

                    {form?.extra_images?.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {form.extra_images.map((file, i) => (
                          <Image
                            key={i}
                            src={URL.createObjectURL(file)}
                            width={80}
                            className="border border-yellow-400 rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <Select
                    label="Colors"
                    selectionMode="multiple"
                    selectedKeys={new Set(form.colors)}
                    onSelectionChange={(keys) =>
                      setForm({ ...form, colors: Array.from(keys) as string[] })
                    }
                  >
                    {AVAILABLE_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Sizes"
                    selectionMode="multiple"
                    selectedKeys={new Set(form.sizes)}
                    onSelectionChange={(keys) =>
                      setForm({ ...form, sizes: Array.from(keys) as string[] })
                    }
                  >
                    {AVAILABLE_SIZES.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </Select>

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

        {/* delete modal */}
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

      {previewUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setPreviewUrl(null)}
        >
          <img
            src={previewUrl}
            alt="Full Preview"
            className="max-h-[90%] max-w-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
