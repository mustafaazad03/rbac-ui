'use client';

import Header from "@/components/header";
import Tabs, { TabItem } from "@/components/tabs";
import AllRoles, { Role } from "@/components/tabs/all-roles";
import PermissionsWithFilters from "@/components/tabs/permissions";
import { useEffect, useMemo, useState } from "react";
import employee from '@/data/employee.json';
import { User } from "@/components/ui/user-chips";
import DynamicModal, { FormField } from "@/components/modals/dynamic-modal";

export default function Roles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const testEmployees = useMemo(() => employee, []) as User[];
  const [AssignedRole, setAssignedRole] = useState<Role>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [rolesData, setRolesData] = useState([
    {
      label: "Engineering Lead",
      description: "Technical leadership and architecture decisions",
      badges: ["Engineering", "Architecture", "Team Leadership"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Engineering")))
    },
    {
      label: "Product Manager",
      description: "Product strategy and roadmap planning",
      badges: ["Product Strategy", "Roadmap", "Stakeholder Management"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.role.includes("Product"))
    },
    {
      label: "Marketing Director",
      description: "Brand strategy and marketing campaigns",
      badges: ["Marketing", "Brand Strategy", "Communications"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Marketing")))
    },
    {
      label: "HR Director",
      description: "Human resources and talent management",
      badges: ["HR", "Talent Management", "Employee Relations"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("HR")))
    },
    {
      label: "Security Manager",
      description: "Information security and compliance",
      badges: ["Security", "Compliance", "Risk Management"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Security")))
    },
    {
      label: "Finance Director",
      description: "Financial planning and analysis",
      badges: ["Finance", "Analytics", "Budget Management"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Finance")))
    },
    {
      label: "Design Lead",
      description: "UX/UI design leadership and design systems",
      badges: ["Design", "UX", "UI"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("Design")))
    },
    {
      label: "DevOps Manager",
      description: "Infrastructure and deployment management",
      badges: ["DevOps", "Infrastructure", "Cloud"],
      manager: testEmployees.find(e => e.role === "Manager") || testEmployees[0],
      users: testEmployees.filter(e => e.teams.some(team => team.includes("DevOps")))
    }
  ]);

  const handleAssignRole = (assignRole?: Role) => {
    setIsCreateMode(false);
    setAssignedRole(assignRole);
    setIsModalOpen(true);
  }

  const handleNewRole = () => {
    setIsCreateMode(true);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCreateMode(false);
  }

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
      content: <AllRoles initialData={rolesData} setSelectedRole={(role: Role) => setSelectedRole(role)} handleAssignRole={(AssignedRole: Role) => handleAssignRole(AssignedRole)} />,
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

  const handleConfirmRoleAssignment = (
    selectedUsers: User[], 
    formData?: Record<string, string>
  ) => {
    if (isCreateMode && formData) {
      // if not manager seleted assign best suite manager from the employee
      const bestManager = selectedUsers.find(user => user.role === 'Manager') || selectedUsers[0];
      const bestBadge = selectedUsers.find(user => user.teams) || selectedUsers[0];
      // Create new role
      const newRole = {
        label: formData['role_name'],
        description: formData['role_description'],
        badges: formData['roleBadges']?.split(',').map(badge => badge.trim()) || bestBadge.teams.map(team => team.trim()),
        manager: bestManager,
        users: selectedUsers
      };
      setRolesData(prev => [...prev, newRole]);
    } else if (selectedRole) {
      // Assign selected users to an existing role
      setRolesData(prev => prev.map(role => {
        if (role.label === selectedRole.label) {
          // Merge existing users with newly selected users
          const updatedUsers = [
            ...role.users, 
            ...selectedUsers.filter(newUser => 
              !role.users.some(existingUser => existingUser.id === newUser.id)
            )
          ];
          return { ...role, users: updatedUsers };
        }
        return role;
      }));
    }
  }

  const handleTabChange = (tab: TabItem) => {
    if (typeof window !== 'undefined') window.history.pushState({}, '', tab.href);
  };
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const matchingTab = tabs.find(tab => tab.href === hash);
    handleTabChange(matchingTab || tabs[0]);
  }, [tabs]);

  const roleCreationFields: FormField[] = [
    {
      id: 'role_name',
      label: 'Role Name',
      type: 'text',
      required: true,
      placeholder: 'Enter role name',
      validation: (value: string) => 
        value.length < 3 ? 'Role name must be at least 3 characters' : null
    },
    {
      id: 'role_description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe the role responsibilities',
    }
  ];

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

      <DynamicModal 
          users={testEmployees}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={(selectedUsers: User[], formData: Record<string, string>) => handleConfirmRoleAssignment(selectedUsers, formData)}
          title={isCreateMode ? "Create New Role" : "Assign Role"}
          description={isCreateMode 
            ? "Enter details for the new role" 
            : "Select employees to assign to this role"}
          actionLabel={isCreateMode ? "Create Role" : "Assign Role"}
          isCreate={isCreateMode}
          createFields={roleCreationFields}
          selectedRole={AssignedRole}
          initialSelectedUsers={selectedRole?.users || []}
        />
    </>
  );
}