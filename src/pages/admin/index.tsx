'use client';

import { Tabs, Tab } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import AdminProducts from './products'; // adjust path if needed
import AdminCategories from './categories';

export default function AdminDashboard() {
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

  return (
    <div className="min-h-screen bg-[rgba(197,195,195,0.165)] text-black px-4 py-10">
      <h1 className="text-3xl font-bold text-yellow-500 text-center mb-10">
        Admin Dashboard
      </h1>
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
    </div>
  );
}
