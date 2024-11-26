'use client';
import React, { useState } from 'react';
import SearchBar from '../common/search-bar';
import Image from 'next/image';
import { useOrganization } from '@/context/organization-context';

const Nav = () => {
  const { roles, employees, teams } = useOrganization();
  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Handle search to search anything
  const handleSearch = (term: string) => {
    if (!term) {
      setFilteredItems([]);
      return;
    }
    const filteredEmployees = employees.filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    const filteredRoles = roles.filter((role) =>
      Object.values(role).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    const filteredTeams = teams.filter((team) =>
      Object.values(team).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );

    setFilteredItems([...filteredEmployees, ...filteredRoles, ...filteredTeams]);
  };

  return (
    <>
      <div className="flex justify-between items-center pl-5 pr-7 py-[22px] border-b border-fade-orange">
        <div className="w-full hidden lg:flex relative">
          <SearchBar handleSearch={handleSearch} />
          {filteredItems.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
              {/* Employees Section */}
              {filteredItems.some((item) => 'name' in item && 'role' in item) && (
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Employees</h3>
                  {filteredItems
                    .filter((item) => 'name' in item && 'role' in item)
                    .map((employee: any) => (
                      <div
                        key={employee.id}
                        onClick={() => setSelectedItem(employee)}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            {employee.avatar ? (
                              <Image
                                src={employee.avatar}
                                alt=""
                                width={28}
                                height={28}
                                className="rounded-full object-cover w-8 h-8"
                              />
                            ) : (
                              <span className="text-sm text-gray-500">
                                {employee.name.charAt(0)}
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{employee.name}</p>
                            <p className="text-xs text-gray-500">{employee.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* Roles Section */}
              {filteredItems.some((item) => 'label' in item) && (
                <div className="p-3 border-t">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Roles</h3>
                  {filteredItems
                    .filter((item) => 'label' in item)
                    .map((role: any) => (
                      <div
                        key={role.id}
                        onClick={() => setSelectedItem(role)}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      >
                        <span className="text-sm">{role.label}</span>
                      </div>
                    ))}
                </div>
              )}

              {/* Teams Section */}
              {filteredItems.some((item) => 'members' in item) && (
                <div className="p-3 border-t">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Teams</h3>
                  {filteredItems
                    .filter((item) => 'members' in item)
                    .map((team: any) => (
                      <div
                        key={team.id}
                        onClick={() => setSelectedItem(team)}
                        className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      >
                        <span className="text-sm">{team.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-5 justify-end w-full">
          <div className="gap-[14px] flex items-center">
            <Image src="/icons/settings.svg" width={20} height={20} alt="Settings Icon" />
            <Image src="/icons/bell.svg" width={20} height={20} alt="Notification Icon" />
          </div>
          <span className="relative inline-block">
            <Image
              alt="Avatar"
              width={50}
              height={50}
              src="/avatar.png"
              className="size-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 block size-2.5 rounded-full bg-green-400 ring-2 ring-white" />
          </span>
        </div>
      </div>
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md lg:max-w-lg p-8 h-fit flex flex-col gap-7">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 px-3 pt-2 pb-3 bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
                <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
                  <div className="w-6 h-6 relative">
                    <Image
                      src={
                        'name' in selectedItem
                          ? '/icons/user.svg'
                          : 'label' in selectedItem
                          ? '/icons/briefcaseColor.svg'
                          : '/icons/users.svg'
                      }
                      width={24}
                      height={24}
                      alt="Item Icon"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 relative"
              >
                <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-col justify-start items-start gap-4 inline-flex">
              <div className="text-[#15294b] text-[21px] font-semibold font-['Lato'] leading-7">
                {'name' in selectedItem
                  ? selectedItem.name
                  : 'label' in selectedItem
                  ? selectedItem.label
                  : selectedItem.name}
              </div>

              <div className="space-y-3">
                {'role' in selectedItem && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Role:</span>
                    <span className="text-gray-800">{selectedItem.role}</span>
                  </div>
                )}

                {'label' in selectedItem && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Permissions:</span>
                    <span className="text-gray-800">
                      {selectedItem.permissions?.length || 0}
                    </span>
                  </div>
                )}

                {'members' in selectedItem && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Members:</span>
                    <span className="text-gray-800">
                      {selectedItem.members?.length || 0}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="w-full px-4 py-2 bg-secondary-red text-white rounded-md hover:bg-primary-red transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;