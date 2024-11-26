import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { User } from '../ui/user-chips';
import { FormField } from './dynamic-modal';

interface EditEmployeeModalProps {
  employee: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedEmployee: Partial<User>) => void;
  editFields: FormField[];
  roles?: string[];
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  employee,
  isOpen,
  onClose,
  onUpdate,
  editFields,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      const initialData: Record<string, string> = {};
      editFields.forEach(field => {
        initialData[field.id] = employee[field.id as keyof User] as string || '';
      });
      setFormData(initialData);
    }
  }, [isOpen, employee, editFields]);

  // Handle input changes
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
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    editFields.forEach(field => {
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
  };

  // Render form input based on field type
  const renderFormInput = (field: FormField) => {
    const value = formData[field.id] || '';
    const error = formErrors[field.id];

    switch (field.type) {
      case 'select':
        return (
          <div className="mb-4 justify-start items-start flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`w-full rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-red`}
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
      default:
        return (
          <div className="mb-4 justify-start items-start flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full rounded-md border ${
                error ? 'border-red-500' : 'border-gray-300'
              } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-red`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      onUpdate(formData);
      onClose();
    }
  };

  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md lg:max-w-lg p-8 h-fit flex flex-col gap-7">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 px-3 pt-2 pb-3 bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
              <div className="w-6 h-6 relative">
                <Image src="/icons/user.svg" width={24} height={24} alt="Edit Employee" />
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 relative bottom-20 left-20"
          >
            <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
          </button>
        </div>

        {/* Modal Title */}
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-[#15294b] text-[21px] font-semibold font-['Lato'] leading-7">
            Edit Employee Profile
          </div>
          <p className="text-gray-500 text-sm">
            Update the details for {employee.name}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {editFields.map(field => (
            <div key={field.id}>
              {renderFormInput(field)}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit} 
          className="w-full px-4 py-2 bg-secondary-red text-white rounded-md hover:bg-primary-red transition-colors"
        >
          Update Employee
        </button>
      </div>
    </div>
  );
};

export default EditEmployeeModal;