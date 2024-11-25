'use client';

import Header from '@/components/header';
import Tabs, { TabItem } from '@/components/tabs';
import AllEmployees, { Employee } from '@/components/tabs/all-employees';
import Teams, { Team } from '@/components/tabs/teams';
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

  const testTeams = useMemo(() => [
    {
      id: "team001",
      name: "Engineering",
      members: [
        testEmployees.find(e => e.id === "emp001")!,
        testEmployees.find(e => e.id === "emp002")!,
        testEmployees.find(e => e.id === "emp004")!,
        testEmployees.find(e => e.id === "emp008")!,
        testEmployees.find(e => e.id === "emp012")!,
        testEmployees.find(e => e.id === "emp016")!,
        testEmployees.find(e => e.id === "emp020")!
      ],
      lead: "Sarah Johnson",
      description: "Handles all engineering tasks and development."
    },
    {
      id: "team002",
      name: "Design",
      members: [
        testEmployees.find(e => e.id === "emp002")!,
        testEmployees.find(e => e.id === "emp005")!,
        testEmployees.find(e => e.id === "emp011")!,
        testEmployees.find(e => e.id === "emp018")!
      ],
      lead: "Michael Chen",
      description: "Responsible for designing user interfaces and experiences."
    },
    {
      id: "team003",
      name: "Marketing",
      members: [
        testEmployees.find(e => e.id === "emp003")!,
        testEmployees.find(e => e.id === "emp009")!,
        testEmployees.find(e => e.id === "emp018")!
      ],
      lead: "Emily Rodriguez",
      description: "Manages marketing strategies and campaigns."
    },
    {
      id: "team004",
      name: "Sales",
      members: [
        testEmployees.find(e => e.id === "emp006")!,
        testEmployees.find(e => e.id === "emp013")!
      ],
      lead: "David Thompson",
      description: "Focuses on sales and client acquisitions."
    },
    {
      id: "team005",
      name: "Support",
      members: [
        testEmployees.find(e => e.id === "emp007")!,
        testEmployees.find(e => e.id === "emp017")!
      ],
      lead: "Anna Martinez",
      description: "Provides customer support and success."
    },
    {
      id: "team006",
      name: "Product",
      members: [
        testEmployees.find(e => e.id === "emp010")!,
        testEmployees.find(e => e.id === "emp014")!
      ],
      lead: "Robert Taylor",
      description: "Oversees product development and management."
    },
    {
      id: "team007",
      name: "HR",
      members: [
        testEmployees.find(e => e.id === "emp015")!
      ],
      lead: "Laura Silva",
      description: "Handles human resources and recruitment."
    },
    {
      id: "team008",
      name: "Quality Assurance",
      members: [
        testEmployees.find(e => e.id === "emp016")!
      ],
      lead: "Alex Wong",
      description: "Ensures product quality and testing."
    },
    {
      id: "team009",
      name: "Research",
      members: [
        testEmployees.find(e => e.id === "emp005")!
      ],
      lead: "Lisa Kim",
      description: "Conducts market and product research."
    },
    {
      id: "team010",
      name: "Infrastructure",
      members: [
        testEmployees.find(e => e.id === "emp008")!,
        testEmployees.find(e => e.id === "emp020")!
      ],
      lead: "Thomas Lee",
      description: "Manages IT infrastructure and deployments."
    },
    {
      id: "team011",
      name: "Analytics",
      members: [
        testEmployees.find(e => e.id === "emp014")!,
        testEmployees.find(e => e.id === "emp019")!
      ],
      lead: "Daniel Kim",
      description: "Handles data analysis and insights."
    },
    {
      id: "team012",
      name: "Documentation",
      members: [
        testEmployees.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Creates and maintains product documentation."
    },
    {
      id: "team013",
      name: "Customer Success",
      members: [
        testEmployees.find(e => e.id === "emp007")!,
        testEmployees.find(e => e.id === "emp017")!
      ],
      lead: "Jessica Adams",
      description: "Ensures customer satisfaction and retention."
    },
    {
      id: "team014",
      name: "Backend",
      members: [
        testEmployees.find(e => e.id === "emp001")!,
        testEmployees.find(e => e.id === "emp012")!,
        testEmployees.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains backend systems."
    },
    {
      id: "team015",
      name: "Frontend",
      members: [
        testEmployees.find(e => e.id === "emp004")!,
        testEmployees.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains frontend interfaces."
    },
    {
      id: "team016",
      name: "Security",
      members: [
        testEmployees.find(e => e.id === "emp020")!
      ],
      lead: "John Davis",
      description: "Oversees security protocols and measures."
    },
    {
      id: "team017",
      name: "Brand",
      members: [
        testEmployees.find(e => e.id === "emp011")!,
        testEmployees.find(e => e.id === "emp018")!,
        testEmployees.find(e => e.id === "emp003")!
      ],
      lead: "Rachel Green",
      description: "Manages brand strategy and identity."
    },
    {
      id: "team018",
      name: "Mobile",
      members: [
        testEmployees.find(e => e.id === "emp002")!,
        testEmployees.find(e => e.id === "emp010")!
      ],
      lead: "Thomas Lee",
      description: "Develops and maintains mobile applications."
    },
    {
      id: "team019",
      name: "Enterprise",
      members: [
        testEmployees.find(e => e.id === "emp006")!,
        testEmployees.find(e => e.id === "emp017")!
      ],
      lead: "David Thompson",
      description: "Handles enterprise-level projects and clients."
    },
    {
      id: "team020",
      name: "Documentation",
      members: [
        testEmployees.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Maintains all project documentation and guides."
    }
  ], [testEmployees]) as Team[];

  const tabs = useMemo(() => [
    {
      name: 'All Employees',
      href: '#all-employees',
      content: <AllEmployees initialData={testEmployees} />,
    },
    {
      name: 'Teams',
      href: '#teams',
      content: <Teams initialData={testTeams} />,
    }
  ], [testEmployees, testTeams]);

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
