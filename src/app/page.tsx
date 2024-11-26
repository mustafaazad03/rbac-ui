'use client';

import { useEffect, useMemo, useState } from 'react';
import { User } from '@/components/ui/user-chips';
import Header from '@/components/header';
import Tabs, { TabItem } from '@/components/tabs';
import AllEmployees from '@/components/tabs/all-employees';
import TeamsTab from '@/components/tabs/teams';
import Image from 'next/image';
import DynamicModal from '@/components/modals/dynamic-modal';
import { useOrganization } from '@/context/organization-context';
import { employeeCreationFields } from '@/constant/organization';

export default function Home() {
  const { 
    employees, 
    addEmployee,
    teams,
    roles,
    updateEmployee,
  } = useOrganization();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'export' | 'add' | 'edit' | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);

  const handleExport = () => {
    setModalType('export');
    setShowModal(true);
  };

  const handleAddEmployee = () => {
    setModalType('add');
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalType(null);
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

  const handleExportSubmit = () => {
    const data = JSON.stringify(employees, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'employees.json';
    link.click();
    handleModalClose();
  };

  const handleConfirmEmployeeAction = (
    selectedUsers: User[], 
    formData: Record<string, string>
  ) => {
    const isEmailUnique = !employees.some(emp => emp.email === formData.email);
    if (!isEmailUnique) {
      // Consider adding a toast or error notification
      throw new Error('Email already exists');
    }
    if (modalType === 'add') {
      // Create new employee using addEmployee method from context
      const newEmployeeData: User = {
        id: `emp${String(employees.length + 1).padStart(3, '0')}`,
        employeeId: `emp${String(employees.length + 1).padStart(3, '0')}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: 'Active',
        teams: [],
        type: formData.type as 'Full time' | 'Part time' | 'Contract' | 'Associate',
        avatar: ''
      };
      
      addEmployee(newEmployeeData);
    } else if (modalType === 'edit' && selectedEmployee) {
      const updatedEmployeeData: Partial<User> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        type: formData.type as 'Full time' | 'Part time' | 'Contract' | 'Associate',
      };
      
      updateEmployee(selectedEmployee.id, updatedEmployeeData);
    }
    
    // Close modal
    setShowModal(false);
    setModalType(null);
    setSelectedEmployee(null);
  };

  const tabs = useMemo(() => [
    {
      name: 'All Employees',
      href: '#all-employees',
      content: <AllEmployees initialData={employees} />,
    },
    {
      name: 'Teams',
      href: '#teams',
      content: <TeamsTab initialData={teams} />,
    }
  ], [employees, teams]);

  const handleTabChange = (tab: TabItem) => {
    if (typeof window !== 'undefined') window.history.pushState({}, '', tab.href);
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const matchingTab = tabs.find(tab => tab.href === hash);
    handleTabChange(matchingTab || tabs[0]);
  }, [tabs]);

  return (
    <>
      <Header
        title="Employees"
        count={employees.length}
        tooltipText="Manage your organization's employees"
        actions={headerActions}
      />
      <div className="mx-6 mr-4 lg:mx-[51px] py-6">
        <Tabs 
          tabs={tabs}
          defaultTab={tabs.find(tab => tab.href === window.location.hash)?.name || tabs[0].name}
          onTabChange={handleTabChange}
        />
      </div>
      <DynamicModal
        users={employees}
        isOpen={showModal && modalType === 'add'}
        onClose={handleModalClose}
        onConfirm={handleConfirmEmployeeAction}
        title="Add New Employee"
        description="Enter details for the new employee"
        actionLabel="Add Employee"
        isCreate={true}
        createFields={employeeCreationFields(roles)}
        isEmployee={true}
      />

      {showModal && modalType === 'export' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-8 h-fit flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 px-3 pt-2 pb-3 bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
                <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
                  <div className="w-6 h-6 relative">
                    <Image src="/icons/user.svg" width={24} height={24} alt="Export" />
                  </div>
                </div>
              </div>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700 relative sm:bottom-20 sm:left-20 bottom-20 left-8">
                <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
              </button>
            </div>
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-[#15294b] text-[21px] font-semibold font-['Lato'] leading-7">
                Export Employees
              </div>
              <div className="text-gray-500 mb-4">
                Are you sure you want to export all employee data?
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleModalClose} 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleExportSubmit} 
                className="flex-1 px-4 py-2 bg-secondary-red text-white rounded-md hover:bg-primary-red"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}