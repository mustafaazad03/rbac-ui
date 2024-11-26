import { FormField } from "@/components/modals/dynamic-modal";
import { Role } from "@/context/organization-context";

export const employeeCreationFields= (existingRoles: Role[]): FormField[] => [
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
    id: 'assign_existing_role',
    label: 'Assign Existing Role',
    type: 'select',
    placeholder: 'Select an existing role (optional)',
    options: existingRoles.map(role => ({
      value: role.label,
      label: role.label
    })),
    required: false
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
      { value: 'Associate', label: 'Associate' }
    ]
  }
];

export const roleCreationFields: FormField[] = [
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