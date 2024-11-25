'use client';

import Header from '@/components/header';
import Tabs, { TabItem } from '@/components/tabs';
import AllEmployees, { Employee } from '@/components/tabs/all-employees';
import { useEffect, useMemo } from 'react';

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

  const testEmployees = useMemo(() => [
    {
      id: "emp001",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      employeeId: "EMP-2024-001",
      role: "Senior Software Engineer",
      status: "Active",
      teams: ["Engineering", "Backend"],
      type: "Full time",
      avatar: ""
    },
    {
      id: "emp002",
      name: "Michael Chen",
      email: "michael.chen@company.com",
      employeeId: "EMP-2024-002",
      role: "Product Designer",
      status: "Active",
      teams: ["Design", "Mobile"],
      type: "Full time",
      avatar: ""
    },
    {
      id: "emp003",
      name: "Emily Rodriguez",
      email: "emily.r@company.com",
      employeeId: "EMP-2024-003",
      role: "Marketing Manager",
      status: "Active",
      teams: ["Marketing", "Brand"],
      type: "Full time"
    },
    {
      id: "emp004",
      name: "James Wilson",
      email: "james.w@company.com",
      employeeId: "EMP-2024-004",
      role: "Frontend Developer",
      status: "Active",
      teams: ["Engineering", "Frontend"],
      type: "Contract"
    },
    {
      id: "emp005",
      name: "Lisa Kim",
      email: "lisa.kim@company.com",
      employeeId: "EMP-2024-005",
      role: "UX Researcher",
      status: "Inactive",
      teams: ["Design", "Research"],
      type: "Part time"
    },
    {
      id: "emp006",
      name: "David Thompson",
      email: "david.t@company.com",
      employeeId: "EMP-2024-006",
      role: "Sales Director",
      status: "Active",
      teams: ["Sales", "Enterprise"],
      type: "Full time",
      avatar: ""
    },
    {
      id: "emp007",
      name: "Anna Martinez",
      email: "anna.m@company.com",
      employeeId: "EMP-2024-007",
      role: "Support Specialist",
      status: "Active",
      teams: ["Support", "Customer Success"],
      type: "Full time"
    },
    {
      id: "emp008",
      name: "Thomas Lee",
      email: "thomas.l@company.com",
      employeeId: "EMP-2024-008",
      role: "DevOps Engineer",
      status: "Active",
      teams: ["Engineering", "Infrastructure"],
      type: "Full time"
    },
    {
      id: "emp009",
      name: "Maria Garcia",
      email: "maria.g@company.com",
      employeeId: "EMP-2024-009",
      role: "Content Writer",
      status: "Active",
      teams: ["Marketing", "Content"],
      type: "Contract"
    },
    {
      id: "emp010",
      name: "Robert Taylor",
      email: "robert.t@company.com",
      employeeId: "EMP-2024-010",
      role: "Product Manager",
      status: "Active",
      teams: ["Product", "Mobile"],
      type: "Full time",
      avatar: ""
    },
    {
      id: "emp011",
      name: "Sophie Brown",
      email: "sophie.b@company.com",
      employeeId: "EMP-2024-011",
      role: "UI Designer",
      status: "Active",
      teams: ["Design", "Brand"],
      type: "Associate"
    },
    {
      id: "emp012",
      name: "Kevin Patel",
      email: "kevin.p@company.com",
      employeeId: "EMP-2024-012",
      role: "Backend Developer",
      status: "Inactive",
      teams: ["Engineering", "Backend"],
      type: "Full time"
    },
    {
      id: "emp013",
      name: "Rachel Green",
      email: "rachel.g@company.com",
      employeeId: "EMP-2024-013",
      role: "Sales Representative",
      status: "Active",
      teams: ["Sales", "SMB"],
      type: "Full time"
    },
    {
      id: "emp014",
      name: "Daniel Kim",
      email: "daniel.k@company.com",
      employeeId: "EMP-2024-014",
      role: "Data Analyst",
      status: "Active",
      teams: ["Product", "Analytics"],
      type: "Part time"
    },
    {
      id: "emp015",
      name: "Laura Silva",
      email: "laura.s@company.com",
      employeeId: "EMP-2024-015",
      role: "HR Manager",
      status: "Active",
      teams: ["HR", "Recruiting"],
      type: "Full time",
      avatar: ""
    },
    {
      id: "emp016",
      name: "Alex Wong",
      email: "alex.w@company.com",
      employeeId: "EMP-2024-016",
      role: "QA Engineer",
      status: "Active",
      teams: ["Engineering", "Quality"],
      type: "Contract"
    },
    {
      id: "emp017",
      name: "Jessica Adams",
      email: "jessica.a@company.com",
      employeeId: "EMP-2024-017",
      role: "Customer Success Manager",
      status: "Active",
      teams: ["Support", "Enterprise"],
      type: "Full time"
    },
    {
      id: "emp018",
      name: "Ryan Murphy",
      email: "ryan.m@company.com",
      employeeId: "EMP-2024-018",
      role: "Graphic Designer",
      status: "Inactive",
      teams: ["Design", "Marketing"],
      type: "Associate"
    },
    {
      id: "emp019",
      name: "Michelle Liu",
      email: "michelle.l@company.com",
      employeeId: "EMP-2024-019",
      role: "Technical Writer",
      status: "Active",
      teams: ["Engineering", "Documentation"],
      type: "Part time"
    },
    {
      id: "emp020",
      name: "John Davis",
      email: "john.d@company.com",
      employeeId: "EMP-2024-020",
      role: "Security Engineer",
      status: "Active",
      teams: ["Engineering", "Security"],
      type: "Full time",
      avatar: ""
    }
  ], []) as Employee[];

  const tabs = useMemo(() => [
    {
      name: 'All Employees',
      href: '#all-employees',
      content: <AllEmployees initialData={testEmployees} />,
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
  ], [testEmployees]);

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
        count={100}
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
    </>
  );
}
