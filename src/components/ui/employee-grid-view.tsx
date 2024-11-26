import React from 'react'
import Image from 'next/image'
import { User } from './user-chips';
import DropdownModal from '../modals/dropdown-modal';

interface EmployeesGridViewProps {
  employees: User[];
}

const EmployeesGridView: React.FC<EmployeesGridViewProps> = ({ employees }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">
            {employee.avatar ? (
              <Image
                width={100}
                height={100}
                className="h-10 w-10 rounded-full object-cover"
                src={employee.avatar}
                alt=""
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500 font-medium">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{employee.name}</p>
              <p className="truncate text-sm text-gray-500">{employee.role}</p>
            </a>
          </div>
          <div className="relative whitespace-nowrap text-right text-sm font-medium">
            <DropdownModal employee={employee} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default EmployeesGridView