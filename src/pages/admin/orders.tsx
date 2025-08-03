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
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  useDisclosure,
  // Link,
} from '@nextui-org/react';
import { fetchOrders, updateOrder, Order } from '@/lib/db/orders';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [form, setForm] = useState<Partial<Order>>({});
  const [uploading, setUploading] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleEditClick = (order: Order) => {
    setEditingOrder(order);
    setForm({
      status: order.status,
      delivered_at: order.delivered_at || '',
    });
    onOpen();
  };

  const handleUpdate = async () => {
    if (!editingOrder) return;
    try {
      setUploading(true);
      await updateOrder(editingOrder.id, form);
      toast.success('Order updated');
      setEditingOrder(null);
      setForm({});
      onClose();
      loadOrders();
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen text-black p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">Orders</h2>

      <Table
        classNames={{
          base: 'bg-white border border-r-none border-gray-300 text-black rounded-lg',
          tr: 'hover:bg-gray-50 transition-colors border-b border-r-none ',
        }}
        isStriped
        removeWrapper
        aria-label="Order List"
      >
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>EMAIL</TableColumn>
          <TableColumn>PHONE</TableColumn>
          <TableColumn>LOCATION</TableColumn>
          <TableColumn>PRODUCTS</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ORDER DATE</TableColumn>
          <TableColumn>DELIVERED AT</TableColumn>
          <TableColumn>UPDATED AT</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="flex items-center gap-1 mt-5">
                <button
                  onClick={() => handleEditClick(order)}
                  className="text-blue-500 p-1 rounded-md ml-1 bg-blue-200"
                >
                  <Icon icon="meteor-icons:pencil" />
                </button>
                {/* <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-gray-500 p-1 rounded-md ml-1 bg-gray-200 text-xs"
                >
                  View
                </Link> */}
              </TableCell>
              <TableCell>
                {order.first_name} {order.last_name}
              </TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.tel}</TableCell>
              <TableCell>{order.location}</TableCell>
              <TableCell>
                {(order.items || []).map((item, i) => (
                  <div key={i} className="mb-1">
                    <span className="font-semibold">{item.name}</span> ×{' '}
                    {item.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>₵{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={
                    order.status === 'delivered'
                      ? 'success'
                      : order.status === 'pending'
                      ? 'warning'
                      : order.status === 'returned'
                      ? 'secondary'
                      : 'danger'
                  }
                  size="sm"
                >
                  {order.status || 'pending'}
                </Chip>
              </TableCell>
              <TableCell>
                {new Date(order.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(order.updated_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {order.delivered_at
                  ? new Date(order.delivered_at).toLocaleString()
                  : '—'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal
        onClose={() => {
          onClose();
          setEditingOrder(null);
          setForm({});
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
      >
        <ModalContent>
          <ModalHeader>Edit Order Status</ModalHeader>
          <ModalBody>
            <Select
              label="Order Status"
              selectedKeys={form.status ? [form.status] : []}
              onChange={(e) =>
                setForm((prev: any) => ({ ...prev, status: e.target.value }))
              }
              fullWidth
            >
              <SelectItem key="pending" value="pending">
                Pending
              </SelectItem>
              <SelectItem key="delivered" value="delivered">
                Delivered
              </SelectItem>
              <SelectItem key="returned" value="returned">
                Returned
              </SelectItem>
              <SelectItem key="cancelled" value="cancelled">
                Cancelled
              </SelectItem>
            </Select>

            {form.status === 'delivered' && (
              <p className="flex flex-col gap-1">
                <p>Date Delivered</p>

                <input
                  type="datetime-local"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={
                    form.delivered_at
                      ? new Date(form.delivered_at).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      delivered_at: new Date(e.target.value).toISOString(),
                    }))
                  }
                />
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="light">
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleUpdate}
              isLoading={uploading}
              isDisabled={!form.status}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
