import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { User, UserChip } from '../ui/user-chips';
import { Role } from '../tabs/all-roles';

interface DynamicModalProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selectedUsers: User[], formData: Record<string, string>) => void;
  title?: string;
  description?: string;
  actionLabel?: string;
  selectedRole?: Role;
  isCreate: boolean;
  createFields?: FormField[];
  initialSelectedUsers?: User[];
  isEmployee?: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (value: string) => string | null;
  defaultValue?: string;
}

const DynamicModal = ({users ,isOpen, onClose, onConfirm, title="Assign this role", description="Select one or multiple employees to assign to this role", actionLabel="Confirm", selectedRole, isCreate = false, createFields = [], initialSelectedUsers, isEmployee = false}: DynamicModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    initialSelectedUsers && initialSelectedUsers?.length > 0 
      ? users.map(user => ({
          ...user, 
          selected: initialSelectedUsers?.some(selectedUser => selectedUser.id === user.id)
        }))
      : users.map(user => ({...user, selected: false}))
  );
  const handleSelect = (userId: string) => {
    setSelectedUsers(
      selectedUsers.map(user =>
        user.id === userId ? { ...user, selected: !user.selected } : user
      )
    )
  }

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen && initialSelectedUsers) {
      // Reset selected users when modal opens
      const initialState = users.map(user => ({
        ...user, 
        selected: initialSelectedUsers.some(selectedUser => selectedUser.id === user.id)
      }));
      setSelectedUsers(initialState);

      // Set default values for create fields
      const defaultFormData = createFields.reduce((acc, field) => {
        if (field?.defaultValue) {
          acc[field.id] = field?.defaultValue;
        }
        return acc;
      }, {} as Record<string, string>);
      setFormData(defaultFormData);
    }
  }, [isOpen, users, initialSelectedUsers, createFields]);

  const filteredUsers = selectedUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.teams.some(team => team.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle form input change
  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear any existing error for this field
    if (formErrors[fieldId]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  }

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    createFields?.forEach(field => {
      const value = formData[field.id] || '';
      
      // Check if required field is empty
      if (field.required && !value.trim()) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      // Custom validation
      if (field.validation) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.id] = validationError;
        }
      }
    });

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Render form input based on field type
  const renderFormInput = (field: FormField) => {
    const value = formData[field.id] || '';
    const error = formErrors[field.id];

    switch (field.type) {
      case 'select':
        return (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`mt-1 block w-full rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm py-2 px-3`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
      case 'textarea':
        return (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`mt-1 block w-full rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm py-2 px-3`}
              rows={1}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
      default:
        return (
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`mt-1 block w-full rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } shadow-sm py-2 px-3`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
    }
  }

  // Handle confirmation of selected users
  const handleConfirm = () => {
    // Validate form if in create mode
    if (isCreate && !validateForm()) {
      return;
    }

    const filteredSelectedUsers = selectedUsers.filter(user => user.selected);
    onConfirm(filteredSelectedUsers, formData);
    const unSelectedUsers = selectedUsers.map(user => ({ ...user, selected: false }));
    setSelectedUsers(unSelectedUsers);
    onClose();
  }

  // If modal is not open, return null
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-8 h-fit flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 px-3 pt-2 pb-3 bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
              <div className="w-6 h-6 relative">
                <Image src="/icons/briefcaseColor.svg" width={24} height={24} alt="Heart" />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 relative bottom-20 left-20">
            <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
          </button>
        </div>
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#15294b] text-[21px] font-semibold font-['Lato'] leading-7">{title}</div>
          {isCreate && (
          <div className="mb-3 w-full">
            {createFields.map(field => <div key={field.id}>{renderFormInput(field)}</div>)}
          </div>
        )}
        {!isEmployee && (
          <div className="flex items-center gap-2 text-gray-400">
            {description} <span className="text-secondary-red text-sm font-bold font-['Inter'] leading-tight max-w-[200px] inline-block overflow-hidden text-ellipsis whitespace-nowrap">
            &quot; {(selectedRole?.label || formData['role_name'])?.length > 15 
                ? `${(selectedRole?.label || formData['role_name']).substring(0, 15)}...` 
                : (selectedRole?.label || formData['role_name'])}&quot;
            </span>
          </div>
        )}
        </div>
        {!isEmployee && (
          <div className="flex flex-col gap-[10px]">
            <div className={`flex w-full h-12 items-center justify-between py-3 px-2 border border-gray-border rounded-lg`}>
              <div className="flex items-center gap-2">
                <Image src='/icons/search.svg' width={20} height={20} alt='Search Icon' />
                <input
                  type='text'
                  placeholder={'Search for an individual or team'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full h-full outline-none text-dark-blue bg-inherit`}
                />
              </div>
              <Image src='/icons/help-circle.svg' width={20} height={20} alt='Help Icon' />
            </div>
              <div className={`${isCreate ? "h-64" : "h-80"} overflow-y-scroll w-full space-y-1`}>
                {filteredUsers.map((user: User) => (
                  <UserChip key={user.id} user={user} onSelect={(userId: string) => handleSelect(userId)} />
                ))}
              </div>
          </div>
        )}
        <button 
            onClick={handleConfirm} 
            className="px-4 py-2 bg-secondary-red text-white rounded-md hover:bg-primary-red mt-2 "
          >
            {actionLabel}
        </button>
      </div>
    </div>
  )
}

export default DynamicModal
