import React from 'react'
import Image from 'next/image'
import { User } from './user-chips';
import DropdownModal from '../modals/dropdown-modal';

interface EmployeesListViewProps {
  employees: User[];
  onEditEmployee?: (employee: User) => void;
  onDeleteEmployee?: (employee: User) => void;
}

const EmployeesListView: React.FC<EmployeesListViewProps> = ({
  employees,
}) => {
  return (
    <div className="mt-4 flow-root">
      <div className="-my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 rounded-lg">
            <thead className='bg-[#FAFBFB] rounded-lg border border-gray-200'>
              <tr className='rounded-lg'>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark-blue">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark-blue">
                  Employee ID
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark-blue">
                  Role
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark-blue">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-dark-blue">
                  Teams
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {employee.avatar ? (
                          <Image
                            width={100}
                            height={100}
                            className="h-10 w-10 rounded-full object-cover"
                            src={employee.avatar}
                            alt="Avatar"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {employee.employeeId}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{employee.role}</span>
                      <span className="text-xs text-gray-400">{employee.type}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        employee.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      {employee.teams.slice(0, 2).map((team, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                        >
                          {team}
                        </span>
                      ))}
                      {employee.additionalCount && employee.additionalCount > 0 && (
                        <span className="text-xs text-gray-500">
                          +{employee.additionalCount}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <DropdownModal employee={employee} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default EmployeesListView