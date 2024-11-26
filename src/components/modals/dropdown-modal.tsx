import React, { useState } from 'react'
import Button from '../buttons/button'
import Image from 'next/image'
import { User } from '../ui/user-chips'
import { useOrganization } from '@/context/organization-context'
import EditEmployeeModal from './edit-employee-modal'
import { employeeCreationFields } from '@/constant/organization'

const DropdownModal = ({employee}: {employee: User}) => {
  const [open, setOpen] = useState(false)
  const { removeEmployee, roles, updateEmployee } = useOrganization();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteEmployee = (employee: User) => {
    const confirmDelete = typeof window !== "undefined" && window.confirm(`Are you sure you want to delete ${employee.name}?`);
    if (confirmDelete) {
      removeEmployee(employee.id);
    }
  }

  const handleEditEmployee = () => {
    setIsEditModalOpen(true);
    setOpen(false);
  }

  const handleUpdateEmployee = (updatedData: Partial<User>) => {
    updateEmployee(employee.id, updatedData);
  }
  
  return (
    <>
    <div className="relative">
      <Button variant="ghost" className='w-10 h-10' onclick={() => setOpen(!open)}>
        <Image src='/icons/more-vertical.svg' width={20} height={20} alt='More Icon' />
      </Button>
      {open && (
        <div
          className="absolute right-4 w-fit p-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
        >
          <div className="py-1 flex flex-col gap-2">
            <button
                onClick={handleEditEmployee}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Edit Profile
            </button>
            <button
              onClick={() => handleDeleteEmployee(employee)}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              Delete User
            </button>
          </div>
        </div>
      )}
    </div>

    <EditEmployeeModal
        employee={employee}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateEmployee}
        editFields={employeeCreationFields(roles)}
        roles={roles.map(role => role.label)}
      />
    </>
  )
}

export default DropdownModal
