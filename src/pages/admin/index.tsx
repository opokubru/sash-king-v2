'use client';

import { Tabs, Tab, useDisclosure } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AdminProducts from './products'; // adjust path if needed
import AdminCategories from './categories';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CustomModal from '@/components/shared/modal';
import { useNavigate } from 'react-router-dom';
import { onLogout } from '@/store/features/auth';
import { signOut } from '@/lib/db/auth';
import { CustomButton } from '@/components/shared/shared_customs';

export default function AdminDashboard() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const logoutControl = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tabs = [
    {
      id: 'products',
      label: 'Products',
      icon: 'mdi:shoe-sneaker',
      component: <AdminProducts />,
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: 'material-symbols:category',
      component: <AdminCategories />,
    },
    // Add more tabs as needed
  ];

  const handleLogout = async () => {
    dispatch(onLogout());
    await signOut();
    logoutControl.onClose();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[rgba(197,195,195,0.165)] text-black px-0 md:px-4 py-10">
      <p className="flex justify-between px-5">
        <h1 className="md:text-3xl font-bold text-primary text-center mb-5 md:mb-10">
          Admin Dashboard
        </h1>
        <button
          onClick={logoutControl.onOpen}
          className="flex gap-2 items-center text-red-500"
        >
          <Icon icon="ic:twotone-logout" /> Log out
        </button>
      </p>
      {!isAuthenticated ? (
        <div className="flex items-center justify-center">
          Not authenticated
        </div>
      ) : (
        <>
          <Tabs
            aria-label="Admin Tabs"
            variant="underlined"
            color="primary"
            className="max-w-6xl mx-auto"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                title={
                  <div className="flex items-center space-x-2">
                    <Icon icon={tab.icon} />
                    <span>{tab.label}</span>
                  </div>
                }
              >
                <section className="px-4">{tab.component}</section>
              </Tab>
            ))}
          </Tabs>
        </>
      )}
      <CustomModal
        isOpen={logoutControl.isOpen}
        onOpenChange={logoutControl.onOpenChange}
        header={<h3 className="text-lg font-semibold">Confirm Logout</h3>}
        body={
          <p className="container">
            Are you sure you want to log out of your account?
          </p>
        }
        footer={
          <div className="flex gap-4 justify-end">
            <CustomButton
              className="border  bg-transparent text-black rounded-md"
              onPress={logoutControl.onClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              className=" bg-red-500 text-white rounded-md"
              onPress={handleLogout}
            >
              Log Out
            </CustomButton>
          </div>
        }
        size="md"
      />{' '}
    </div>
  );
}
