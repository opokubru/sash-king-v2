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
  Image,
  useDisclosure,
} from '@nextui-org/react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  Category,
} from '@/lib/db/categories';
import { supabase } from '@/lib/supabaseClient';
import { variables } from '@/utils/env';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Partial<Category> & { image: File | null }>({
    name: '',
    slug: '',
    image: null,
  });

  const [uploading, setUploading] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

      setForm((prev) => ({
        ...prev,
        name: value,
        slug: slug,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: any) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleUpload = async (): Promise<string | null> => {
    if (!form.image) {
      toast.error('No image selected.');
      return null;
    }

    setUploading(true);
    const fileName = `${Date.now()}_${form.image.name}`;

    const { data, error } = await supabase.storage
      .from('categories')
      .upload(`images/${fileName}`, form.image, { upsert: true });

    setUploading(false);

    if (error) {
      console.error('Upload error:', error.message);
      toast.error('Image upload failed.');
      return null;
    }

    return `${variables.VITE_SUPABASE_URL}/storage/v1/object/public/categories/${data?.path}`;
  };

  const handleSubmit = async () => {
    let image_url = editingCategory?.image_url || '';

    if (form.image) {
      const uploaded = await handleUpload();
      if (!uploaded) return;
      image_url = uploaded;
    }

    const payload = {
      name: form.name!,
      slug: form.slug!,
      image_url,
    };

    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, payload);
        toast.success('Category updated!');
      } else {
        await addCategory(payload);
        toast.success('Category added!');
      }
      onClose();
      fetchCategories().then(setCategories);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred.');
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setForm({ name: '', slug: '', image: null });
  };

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="min-h-screen text-black">
      <div className="mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-primary/80">
            Category Manager
          </h2>
          <Button
            color="primary"
            className="bg-yellow-400 text-black"
            onPress={onOpen}
          >
            <Icon icon="mdi:plus" className="mr-2" /> Add Category
          </Button>
        </div>

        <Table
          classNames={{
            base: 'bg-white border border-gray-300 text-black rounded-lg',
            tr: 'hover:bg-gray-50 transition-colors border-b ',
          }}
          isStriped
          aria-label="Category List"
        >
          <TableHeader>
            <TableColumn>ACTIONS</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>SLUG</TableColumn>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      setEditingCategory(cat);
                      setForm({ name: cat.name, slug: cat.slug, image: null });
                      onOpen();
                    }}
                    className="text-blue-500 p-1 rounded-md bg-blue-200"
                  >
                    <Icon icon="meteor-icons:pencil" />
                  </button>
                  <button
                    onClick={() => {
                      setCategoryToDelete(cat);
                      onDeleteOpen();
                    }}
                    className="text-red-500 p-1 rounded-md bg-red-200"
                  >
                    <Icon icon="material-symbols:delete-rounded" />
                  </button>
                </TableCell>
                <TableCell>
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    width={60}
                    className="rounded-lg"
                  />
                </TableCell>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.slug}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add/Edit Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-yellow-400 font-bold">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </ModalHeader>
                <ModalBody className="grid grid-cols-1 gap-4">
                  <Input
                    name="name"
                    label="Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                  <Input
                    name="slug"
                    label="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    isDisabled
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {(form.image || editingCategory?.image_url) && (
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          form.image
                            ? URL.createObjectURL(form.image)
                            : editingCategory?.image_url
                        }
                        width={100}
                        className="border border-yellow-400 rounded-lg"
                      />
                      {form.image && (
                        <button
                          className="text-red-500 p-1 rounded-md bg-red-200 hover:text-red-700"
                          onClick={() => setForm({ ...form, image: null })}
                        >
                          <Icon icon="material-symbols:delete-rounded" />
                        </button>
                      )}
                    </div>
                  )}
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
                    {editingCategory ? 'Update' : 'Add'}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
          <ModalContent>
            <ModalHeader className="text-red-500 font-bold">
              Confirm Delete
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete{' '}
                <strong>{categoryToDelete?.name}</strong>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onDeleteClose}>
                Cancel
              </Button>
              <Button
                color="danger"
                onClick={async () => {
                  if (categoryToDelete) {
                    await deleteCategory(categoryToDelete.id);
                    toast.success('Category deleted!');
                    fetchCategories().then(setCategories);
                    setCategoryToDelete(null);
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
