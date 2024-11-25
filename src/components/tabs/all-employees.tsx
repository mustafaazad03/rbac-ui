'use client';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import FilteringSection from '../common/filteringSection'
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Button from '../buttons/button';

export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  status: 'Active' | 'Inactive';
  teams: string[];
  type: 'Full time' | 'Part time' | 'Contract' | 'Associate';
  avatar?: string;
  additionalCount?: number;
}

interface AllEmployeesProps {
  initialData: Employee[];
}

const AllEmployees = ({initialData}: AllEmployeesProps) => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    status: [] as string[],
    teams: [] as string[],
    type: [] as string[],
    size: [] as string[],
    department: [] as string[]
  });

  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  // Handle select all checkbox
  useLayoutEffect(() => {
    const isIndeterminate = 
      selectedEmployees.length > 0 && selectedEmployees.length < filteredEmployees.length;
    setChecked(selectedEmployees.length === filteredEmployees.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedEmployees, filteredEmployees]);

  // Search functionality
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const filtered = initialData.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredEmployees(filtered);
  }, [initialData]);

  // Filter functionality
  const applyFilters = useCallback(() => {
    let filtered = initialData;

    // Apply status filter
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter((emp) => 
        activeFilters.status.includes(emp.status)
      );
    }

    // Apply team filter
    if (activeFilters.teams.length > 0) {
      filtered = filtered.filter((emp) =>
        emp.teams.some((team) => activeFilters.teams.includes(team))
      );
    }

    // Apply type filter
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter((emp) =>
        activeFilters.type.includes(emp.type)
      );
    }

    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter((employee) =>
        Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredEmployees(filtered);
  }, [activeFilters, initialData, searchTerm]);

  useLayoutEffect(() => {
    applyFilters();
  }, [activeFilters, searchTerm, applyFilters]);

  // Select all functionality
  const toggleAll = () => {
    setSelectedEmployees(checked || indeterminate ? [] : filteredEmployees);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };
  return (
    <>
      <FilteringSection view={view} setView={(view) => setView(view)} handlingSearch={(value: string) => handleSearch(value)} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      {view === 'list' && (
        <div className="mt-4 flow-root">
          <div className="-my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle overflow-hidden rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 rounded-lg">
                <thead className='bg-[#FAFBFB] rounded-lg border border-gray-200'>
                  <tr className='rounded-lg'>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6 rounded-lg">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-fade-blue text-primary-red focus:ring-secondary-red"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
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
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className={selectedEmployees.includes(employee) ? 'bg-gray-50' : undefined}
                    >
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedEmployees.includes(employee) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={selectedEmployees.includes(employee)}
                          onChange={(e) =>
                            setSelectedEmployees(
                              e.target.checked
                                ? [...selectedEmployees, employee]
                                : selectedEmployees.filter((p) => p !== employee)
                            )
                          }
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            {employee.avatar ? (
                              <Image
                                width={100}
                                height={100}
                                className="h-10 w-10 rounded-full"
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className='w-10 h-10'>
                              <Image src='/icons/more-vertical.svg' width={20} height={20} alt='More Icon' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            >
              <div className="flex-shrink-0">
                {employee.avatar ? (
                  <Image
                    width={100}
                    height={100}
                    className="h-10 w-10 rounded-full"
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className='w-10 h-10'>
                    <Image src='/icons/more-vertical.svg' width={20} height={20} alt='More Icon' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default AllEmployees
