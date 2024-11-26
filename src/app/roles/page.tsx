'use client';

import Header from "@/components/header";
import Tabs, { TabItem } from "@/components/tabs";
import AllRoles from "@/components/tabs/all-roles";
import PermissionsWithFilters from "@/components/tabs/permissions";
import { useEffect, useMemo } from "react";

export default function Roles() {

  const handleAssignRole = () => {
    console.log('Assign role');
  }

  const handleNewRole = () => {
    console.log('New role');
  }
  const testEmployees = Array(20).fill(null).map((_, index) => ({
    id: `emp${(index + 1).toString().padStart(3, '0')}`,
    name: ["Sarah Johnson", "John Smith", "Emily Chen", "Michael Brown", "Lisa Wong", 
          "David Park", "Rachel Garcia", "James Wilson", "Anna Lee", "Robert Taylor",
          "Maria Rodriguez", "Thomas Anderson", "Jennifer Kim", "William Davis", "Michelle Patel",
          "Kevin Zhang", "Laura Martinez", "Steven Clark", "Jessica Wong", "Daniel Lee"][index],
    email: `employee${index + 1}@company.com`,
    employeeId: `EMP-2024-${(index + 1).toString().padStart(3, '0')}`,
    role: ["Senior Software Engineer", "Product Manager", "Marketing Specialist", "UX Designer", 
          "Data Scientist", "DevOps Engineer", "Content Strategist", "Project Manager", 
          "Quality Assurance", "Frontend Developer", "Backend Developer", "Sales Manager",
          "HR Manager", "Financial Analyst", "Customer Success", "Systems Architect",
          "Business Analyst", "Security Engineer", "Technical Writer", "UI Designer"][index],
    status: "Active",
    teams: [
      [["Engineering", "Backend"], ["Product", "Strategy"], ["Marketing", "Content"],
        ["Design", "UX"], ["Data", "Analytics"], ["DevOps", "Infrastructure"],
        ["Marketing", "Content"], ["Product", "Management"], ["QA", "Testing"],
        ["Engineering", "Frontend"], ["Engineering", "Backend"], ["Sales", "Business"],
        ["HR", "Operations"], ["Finance", "Analytics"], ["Customer", "Support"],
        ["Engineering", "Architecture"], ["Business", "Analytics"], ["Security", "Engineering"],
        ["Documentation", "Technical"], ["Design", "UI"]][index]
    ],
    type: "Full time",
    avatar: "/avatar.png"
  }));

  const rolesData = useMemo(() => [
    {
      label: "Engineering Lead",
      description: "Technical leadership and architecture decisions",
      badges: ["Engineering", "Architecture", "Team Leadership"],
      manager: { name: "Mike Chen", email: "mike.chen@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Engineering")))
    },
    {
      label: "Product Manager",
      description: "Product strategy and roadmap planning",
      badges: ["Product Strategy", "Roadmap", "Stakeholder Management"],
      manager: { name: "Lisa Wong", email: "lisa.wong@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.role.includes("Product"))
    },
    {
      label: "Marketing Director",
      description: "Brand strategy and marketing campaigns",
      badges: ["Marketing", "Brand Strategy", "Communications"],
      manager: { name: "David Smith", email: "david.smith@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Marketing")))
    },
    {
      label: "HR Director",
      description: "Human resources and talent management",
      badges: ["HR", "Talent Management", "Employee Relations"],
      manager: { name: "Jennifer Lee", email: "jennifer.lee@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("HR")))
    },
    {
      label: "Security Manager",
      description: "Information security and compliance",
      badges: ["Security", "Compliance", "Risk Management"],
      manager: { name: "Robert Chen", email: "robert.chen@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Security")))
    },
    {
      label: "Finance Director",
      description: "Financial planning and analysis",
      badges: ["Finance", "Analytics", "Budget Management"],
      manager: { name: "Maria Garcia", email: "maria.garcia@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Finance")))
    },
    {
      label: "Design Lead",
      description: "UX/UI design leadership and design systems",
      badges: ["Design", "UX", "UI"],
      manager: { name: "Sarah Park", email: "sarah.park@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Design")))
    },
    {
      label: "DevOps Manager",
      description: "Infrastructure and deployment management",
      badges: ["DevOps", "Infrastructure", "Cloud"],
      manager: { name: "James Wilson", email: "james.wilson@company.com", avatar: "/avatar.png" },
      users: testEmployees.filter(e => e.teams.some(team => team.includes("DevOps")))
    }
  ], [testEmployees]);

  const headerActions = [
    {
      label: 'Assign',
      icon: '/icons/plus_gray.svg',
      onclick: handleAssignRole,
      variant: 'secondary' as const,
    },
    {
      label: 'New Role',
      icon: '/icons/plus.svg',
      onclick: handleNewRole,
      variant: 'primary' as const
    }
  ];

  const tabs = useMemo(() => [
    {
      name: 'All Roles',
      href: '#all-roles',
      content: <AllRoles initialData={rolesData} />,
    },
    {
      name: 'Permissions',
      href: '#permissions',
      content: <PermissionsWithFilters initialPermissions={[
        { id: 'perm1', name: 'View Dashboard', description: 'View the dashboard and analytics', isGranted: true },
        { id: 'perm2', name: 'Manage Users', description: 'Add, edit, and remove users', isGranted: false },
        { id: 'perm3', name: 'Manage Roles', description: 'Create, edit, and remove roles', isGranted: true },
        { id: 'perm4', name: 'Manage Permissions', description: 'Create, edit, and remove permissions', isGranted: false },
        { id: 'perm5', name: 'Manage Settings', description: 'Update application settings', isGranted: true },
      ]} />,
    }
  ], [rolesData]);

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
        title="Roles"
        count={100}
        tooltipText="Roles"
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