'use client';

import Header from "@/components/header";
import Tabs, { TabItem } from "@/components/tabs";
import AllRoles from "@/components/tabs/all-roles";
import PermissionsWithFilters from "@/components/tabs/permissions";
import { useEffect, useMemo, useState } from "react";
import { User } from "@/components/ui/user-chips";
import DynamicModal from "@/components/modals/dynamic-modal";
import { Permission, Role, useOrganization } from "@/context/organization-context";
import { roleCreationFields } from "@/constant/organization";

// Define default permissions outside component
const DEFAULT_PERMISSIONS = [
  { id: 'perm1', name: 'View Dashboard', description: 'View the dashboard and analytics', isGranted: true },
  { id: 'perm2', name: 'Manage Users', description: 'Add, edit, and remove users', isGranted: false },
  { id: 'perm3', name: 'Manage Roles', description: 'Create, edit, and remove roles', isGranted: true },
  { id: 'perm4', name: 'Manage Permissions', description: 'Create, edit, and remove permissions', isGranted: false },
  { id: 'perm5', name: 'Manage Settings', description: 'Update application settings', isGranted: true },
];

export default function Roles() {
  const { roles, employees, addRole, assignUsersToRole, updateRolePermissions } = useOrganization();
  
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [AssignedRole, setAssignedRole] = useState<Role>();
  const [selectedRole, setSelectedRole] = useState<Role>();
  const [isEditPermissionsMode, setIsEditPermissionsMode] = useState(false);
  const [permissionsToEdit, setPermissionsToEdit] = useState<Permission[]>([]);
  const [currentHash, setCurrentHash] = useState('#all-roles');
  const [currentTab, setCurrentTab] = useState('All Roles');
  const [mounted, setMounted] = useState(false);

  // Event handlers
  const handleAssignRole = (assignRole?: Role) => {
    setIsCreateMode(false);
    setAssignedRole(assignRole);
    setIsModalOpen(true);
  };

  const handleNewRole = () => {
    setIsCreateMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCreateMode(false);
    setIsEditPermissionsMode(false);
    setAssignedRole(undefined);
    setSelectedRole(undefined);
    setPermissionsToEdit([]);
  };

  const handleEditPermissions = (role: Role) => {
    setSelectedRole(role);
    setPermissionsToEdit(role.permissions || DEFAULT_PERMISSIONS);
    setIsEditPermissionsMode(true);
    setIsModalOpen(true);
  };

  const handleTabChange = (tab: TabItem) => {
    setCurrentHash(tab.href);
    setCurrentTab(tab.name);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', tab.href);
    }
  };

  const tabs = useMemo(() => [
    {
      name: 'All Roles',
      href: '#all-roles',
      content: (
        <AllRoles 
          initialData={roles} 
          setSelectedRole={setSelectedRole} 
          handleAssignRole={handleAssignRole} 
          handleEditPermissions={handleEditPermissions} 
        />
      ),
    },
    {
      name: 'Permissions',
      href: '#permissions',
      content: <PermissionsWithFilters initialPermissions={DEFAULT_PERMISSIONS} />,
    }
  ], [roles]);

  // Initialize after mount
  useEffect(() => {
    setMounted(true);
    const hash = window?.location?.hash || '#all-roles';
    setCurrentHash(hash);
  }, []);

  // Update tab name when hash changes
  useEffect(() => {
    if (mounted) {
      const tabName = tabs.find(tab => tab.href === currentHash)?.name || 'All Roles';
      setCurrentTab(tabName);
    }
  }, [currentHash, mounted, tabs]);

  const handleConfirmRoleAssignment = (
    selectedUsers: User[], 
    formData?: Record<string, string>
  ) => {
    if (isCreateMode && formData) {
      const newRole = {
        label: formData['role_name'],
        description: formData['role_description'],
        badges: formData['roleBadges']?.split(',').map(badge => badge.trim()) || [],
        manager: selectedUsers.find(user => user.role === 'Manager') || selectedUsers[0],
        users: selectedUsers,
        permissions: []
      };
      addRole(newRole);
    } else if (isEditPermissionsMode && selectedRole) {
      updateRolePermissions(selectedRole.label, permissionsToEdit);
    } else if (selectedRole) {
      assignUsersToRole(selectedRole.label, selectedUsers);
    }
    handleCloseModal();
  };

  const headerActions = [
    {
      label: 'New Role',
      icon: '/icons/plus.svg',
      onclick: handleNewRole,
      variant: 'primary' as const
    }
  ];

  if (!mounted) {
    return null; // Prevent SSR flash
  }

  return (
    <>
      <Header
        title="Roles"
        count={roles.length}
        tooltipText="Manage, Create your role"
        actions={headerActions}
      />
      <div className="mx-6 mr-4 lg:mx-[51px] py-6">
        <Tabs 
          tabs={tabs}
          defaultTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>

      <DynamicModal 
        users={employees}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmRoleAssignment}
        title={
          isCreateMode
            ? "Create New Role" 
            : isEditPermissionsMode
            ? "Edit Role Permissions" 
            : "Assign Role"
        }
        description={
          isCreateMode
            ? "Enter details for the new role" 
            : isEditPermissionsMode
            ? "Modify permissions for this role"
            : "Select employees to assign to this role"
        }
        actionLabel={
          isCreateMode
            ? "Create Role" 
            : isEditPermissionsMode
            ? "Update Permissions" 
            : "Assign Role"
        }
        isCreate={isCreateMode}
        createFields={isEditPermissionsMode ? [] : roleCreationFields}
        selectedRole={AssignedRole}
        initialSelectedUsers={selectedRole?.users || []}
        isEditPermissionsMode={isEditPermissionsMode}
        permissions={permissionsToEdit}
        onPermissionChange={setPermissionsToEdit}
      />
    </>
  );
}