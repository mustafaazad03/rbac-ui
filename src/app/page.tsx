'use client';

import Header from '@/components/header';
import Tabs, { TabItem } from '@/components/tabs';

export default function Home() {
  const handleExport = () => {
    console.log('Exporting...');
  };

  const handleAddEmployee = () => {
    console.log('Adding new employee...');
  };

  const headerActions = [
    {
      label: 'Export',
      icon: '/icons/Download.svg',
      onclick: handleExport,
      variant: 'secondary' as const
    },
    {
      label: 'New Employee',
      icon: '/icons/plus.svg',
      onclick: handleAddEmployee,
      variant: 'primary' as const
    }
  ];

  const tabs = [
    {
      name: 'All Employees',
      href: '#all-employees',
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">All Employees</h2>
        </div>
      ),
    },
    // Teams
    {
      name: 'Teams',
      href: '#teams',
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">Teams</h2>
        </div>
      ),
    },
    // Roles
    {
      name: 'Roles',
      href: '#roles',
      content: (
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-medium">Roles</h2>
        </div>
      ),
    },
  ];

  const handleTabChange = (tab: TabItem) => {
    if (typeof window !== 'undefined') window.history.pushState({}, '', tab.href);
    console.log(`Switched to ${tab.name} tab`);
  };

  return (
    <>
      <Header
        title="Employees"
        count={100}
        tooltipText="Manage your organization's employees"
        actions={headerActions}
      />
      <div className="mx-6 mr-4 lg:mx-[51px] py-6">
      <Tabs 
        tabs={tabs}
        defaultTab="Team Members"
        onTabChange={handleTabChange}
      />
    </div>
    </>
  );
}
