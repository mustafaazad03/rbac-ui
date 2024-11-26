'use client';

import { useEffect, useMemo, useState } from 'react';
import employee from '@/data/employee.json';
import { User } from '@/components/ui/user-chips';
import Header from '@/components/header';
import Tabs, { TabItem } from '@/components/tabs';
import AllEmployees from '@/components/tabs/all-employees';
import TeamsTab, { Team } from '@/components/tabs/teams';
import Image from 'next/image';
import DynamicModal, { FormField } from '@/components/modals/dynamic-modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'export' | 'add' | null>(null);
  const [employeeData, setEmployeeData] = useState<User[]>(employee as User[]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: '',
    department: ''
  });

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
    setNewEmployee({ name: '', email: '', role: '', department: '' });
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
    const data = JSON.stringify(employeeData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'employees.json';
    link.click();
    handleModalClose();
  };

  const employeeCreationFields: FormField[] = [
    {
      id: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name',
      validation: (value: string) => 
        value.length < 2 ? 'Name must be at least 2 characters' : null
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
      placeholder: 'Enter email address',
      validation: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
      }
    },
    {
      id: 'role',
      label: 'Role',
      type: 'text',
      required: true,
      placeholder: 'Enter employee role',
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select',
      required: true,
      options: [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'HR', label: 'HR' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Support', label: 'Support' },
        { value: 'Product', label: 'Product' }
      ]
    },
    {
      id: 'type',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Full time', label: 'Full Time' },
        { value: 'Part time', label: 'Part Time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Freelance', label: 'Freelance' }
      ]
    }
  ];

  const handleConfirmEmployeeAction = (
    selectedUsers: User[], 
    formData: Record<string, string>
  ) => {
    if (modalType === 'add') {
      // Create new employee
      const validTypes = ['Full time', 'Contract', 'Part time', 'Associate'] as const;
      type EmployeeType = typeof validTypes[number];
      
      const isValidType = (type: string): type is EmployeeType => 
        validTypes.includes(type as EmployeeType);
      
      const newEmployeeData: User = {
        id: `emp${String(employeeData.length + 1).padStart(3, '0')}`,
        employeeId: `emp${String(employeeData.length + 1).padStart(3, '0')}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: 'Active',
        teams: [],
        type: isValidType(formData.type) ? formData.type : 'Full time',
        avatar: ''
      };
      
      setEmployeeData(prev => [...prev, newEmployeeData]);
    }
    handleModalClose();
  };

  const testTeams = useMemo(() => [
    {
      id: "team001",
      name: "Engineering",
      members: [
        employeeData.find(e => e.id === "emp001")!,
        employeeData.find(e => e.id === "emp002")!,
        employeeData.find(e => e.id === "emp004")!,
        employeeData.find(e => e.id === "emp008")!,
        employeeData.find(e => e.id === "emp012")!,
        employeeData.find(e => e.id === "emp016")!,
        employeeData.find(e => e.id === "emp020")!
      ],
      lead: "Sarah Johnson",
      description: "Handles all engineering tasks and development."
    },
    {
      id: "team002",
      name: "Design",
      members: [
        employeeData.find(e => e.id === "emp002")!,
        employeeData.find(e => e.id === "emp005")!,
        employeeData.find(e => e.id === "emp011")!,
        employeeData.find(e => e.id === "emp018")!
      ],
      lead: "Michael Chen",
      description: "Responsible for designing user interfaces and experiences."
    },
    {
      id: "team003",
      name: "Marketing",
      members: [
        employeeData.find(e => e.id === "emp003")!,
        employeeData.find(e => e.id === "emp009")!,
        employeeData.find(e => e.id === "emp018")!
      ],
      lead: "Emily Rodriguez",
      description: "Manages marketing strategies and campaigns."
    },
    {
      id: "team004",
      name: "Sales",
      members: [
        employeeData.find(e => e.id === "emp006")!,
        employeeData.find(e => e.id === "emp013")!
      ],
      lead: "David Thompson",
      description: "Focuses on sales and client acquisitions."
    },
    {
      id: "team005",
      name: "Support",
      members: [
        employeeData.find(e => e.id === "emp007")!,
        employeeData.find(e => e.id === "emp017")!
      ],
      lead: "Anna Martinez",
      description: "Provides customer support and success."
    },
    {
      id: "team006",
      name: "Product",
      members: [
        employeeData.find(e => e.id === "emp010")!,
        employeeData.find(e => e.id === "emp014")!
      ],
      lead: "Robert Taylor",
      description: "Oversees product development and management."
    },
    {
      id: "team007",
      name: "HR",
      members: [
        employeeData.find(e => e.id === "emp015")!
      ],
      lead: "Laura Silva",
      description: "Handles human resources and recruitment."
    },
    {
      id: "team008",
      name: "Quality Assurance",
      members: [
        employeeData.find(e => e.id === "emp016")!
      ],
      lead: "Alex Wong",
      description: "Ensures product quality and testing."
    },
    {
      id: "team009",
      name: "Research",
      members: [
        employeeData.find(e => e.id === "emp005")!
      ],
      lead: "Lisa Kim",
      description: "Conducts market and product research."
    },
    {
      id: "team010",
      name: "Infrastructure",
      members: [
        employeeData.find(e => e.id === "emp008")!,
        employeeData.find(e => e.id === "emp020")!
      ],
      lead: "Thomas Lee",
      description: "Manages IT infrastructure and deployments."
    },
    {
      id: "team011",
      name: "Analytics",
      members: [
        employeeData.find(e => e.id === "emp014")!,
        employeeData.find(e => e.id === "emp019")!
      ],
      lead: "Daniel Kim",
      description: "Handles data analysis and insights."
    },
    {
      id: "team012",
      name: "Documentation",
      members: [
        employeeData.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Creates and maintains product documentation."
    },
    {
      id: "team013",
      name: "Customer Success",
      members: [
        employeeData.find(e => e.id === "emp007")!,
        employeeData.find(e => e.id === "emp017")!
      ],
      lead: "Jessica Adams",
      description: "Ensures customer satisfaction and retention."
    },
    {
      id: "team014",
      name: "Backend",
      members: [
        employeeData.find(e => e.id === "emp001")!,
        employeeData.find(e => e.id === "emp012")!,
        employeeData.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains backend systems."
    },
    {
      id: "team015",
      name: "Frontend",
      members: [
        employeeData.find(e => e.id === "emp004")!,
        employeeData.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains frontend interfaces."
    },
    {
      id: "team016",
      name: "Security",
      members: [
        employeeData.find(e => e.id === "emp020")!
      ],
      lead: "John Davis",
      description: "Oversees security protocols and measures."
    },
    {
      id: "team017",
      name: "Brand",
      members: [
        employeeData.find(e => e.id === "emp011")!,
        employeeData.find(e => e.id === "emp018")!,
        employeeData.find(e => e.id === "emp003")!
      ],
      lead: "Rachel Green",
      description: "Manages brand strategy and identity."
    },
    {
      id: "team018",
      name: "Mobile",
      members: [
        employeeData.find(e => e.id === "emp002")!,
        employeeData.find(e => e.id === "emp010")!
      ],
      lead: "Thomas Lee",
      description: "Develops and maintains mobile applications."
    },
    {
      id: "team019",
      name: "Enterprise",
      members: [
        employeeData.find(e => e.id === "emp006")!,
        employeeData.find(e => e.id === "emp017")!
      ],
      lead: "David Thompson",
      description: "Handles enterprise-level projects and clients."
    },
    {
      id: "team020",
      name: "Documentation",
      members: [
        employeeData.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Maintains all project documentation and guides."
    }
  ], [employeeData]) as Team[];

  const tabs = useMemo(() => [
    {
      name: 'All Employees',
      href: '#all-employees',
      content: <AllEmployees initialData={employeeData} />,
    },
    {
      name: 'Teams',
      href: '#teams',
      content: <TeamsTab initialData={testTeams} />,
    }
  ], [employeeData, testTeams]);

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
        count={employeeData.length}
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
        users={employeeData}
        isOpen={showModal && modalType === 'add'}
        onClose={handleModalClose}
        onConfirm={handleConfirmEmployeeAction}
        title="Add New Employee"
        description="Enter details for the new employee"
        actionLabel="Add Employee"
        isCreate={true}
        createFields={employeeCreationFields}
        isEmployee={true}
      />

      {showModal && modalType === 'export' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-8 h-fit flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 px-3 pt-2 pb-3 bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
                <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
                  <div className="w-6 h-6 relative">
                    <Image src="/icons/briefcaseColor.svg" width={24} height={24} alt="Export" />
                  </div>
                </div>
              </div>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700 relative bottom-20 left-20">
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