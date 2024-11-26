
import React, { useCallback, useState, useEffect, useMemo } from 'react'
import FilteringSection from '../common/filteringSection';
import RoleCard from '../ui/role-card';
import Image from 'next/image';
import { User } from '../ui/user-chips';

interface Tab {
  name: string;
  content: Role[];
}

export type Role = {
  id?: string;
  label: string;
  description: string;
  badges: string[];
  manager: User;
  users: User[];
  permissions?: string[];
}

interface AllRolesProps {
  initialData: Role[];
  setSelectedRole: (role: Role) => void;
  handleAssignRole?: (selectedRole: Role) => void;
}

const AllRoles = ({ initialData, setSelectedRole, handleAssignRole }: AllRolesProps) => {
  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState<Role[]>(initialData);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    department: [],
    access: [],
    status: []
  });

  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedTabContent, setSelectedTabContent] = useState<Role[]>(initialData);

  const handleAssignRoleFn = (role: Role) => {
    if (handleAssignRole) {
      handleAssignRole(role);
    }
  }

  // Update filtered roles when initial data changes
  useEffect(() => {
    setFilteredRoles(initialData);
  }, [initialData]);

  // Search handler
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const filtered = initialData.filter((role) =>
      Object.values(role).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRoles(filtered);
  }, [initialData, searchTerm]);

  const tabs = useMemo(() => [
    {
      name: 'All',
      content: initialData ,
    },
    {
      name:'Product',
      content: initialData.filter(role => (role.badges.includes('Product') || role.badges.includes('Product Manager') || role.badges.includes('Product Designer'))),
    },
    {
      name: 'Engineering',
      content:  initialData.filter(role => (role.badges.includes('Engineering') || role.badges.includes('Engineer'))),
    },
    {
      name: 'Design',
      content: initialData.filter(role => (role.badges.includes('Design') || role.badges.includes('Designer'))),
    },
    {
      name: 'Marketing',
      content: initialData.filter(role => (role.badges.includes('Marketing') || role.badges.includes('Marketer'))),
    },
    {
      name: 'Sales',
      content: initialData.filter(role => (role.badges.includes('Sales') || role.badges.includes('Salesperson'))),
    },
    {
      name: 'Support',
      content: initialData.filter(role => (role.badges.includes('Support') || role.badges.includes('Support Engineer'))),
    }
  ], [initialData]);

  const handleTabChange = (tab: Tab): void => {
    setSelectedTab(tab.name);
    setSelectedTabContent(tab.content);
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const matchingTab = tabs.find(tab => tab.name === selectedTab);
    handleTabChange(matchingTab || tabs[0]);
  }, [selectedTab, tabs]);

  // Filter roles based on active filters and selected tab
  useEffect(() => {
    // First filter by selected tab
    let filtered = selectedTabContent;

    // Then apply active filters
    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue.length > 0) {
        filtered = filtered.filter((role) => {
          if (filterKey === 'department' || filterKey === 'access' || filterKey === 'status') {
            return role.badges.some(badge => filterValue.includes(badge));
          }
          return true;
        });
      }
    });

    // Apply search term if exists
    if (searchTerm) {
      filtered = filtered.filter((role) =>
        Object.values(role).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredRoles(filtered);
  }, [activeFilters, selectedTabContent, searchTerm]);

  return (
    <div className="">
      <FilteringSection
        view={view}
        setView={setView}
        handlingSearch={handleSearch}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        AllowedFilters={['department', 'access', 'status']}
      />
      <div className="hidden sm:block mt-4">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href="#"
                className={`
                  ${tab.name === selectedTab
                    ? 'border-secondary-red text-secondary-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                aria-current={tab.name === selectedTab ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(tab);
                }}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {view === 'list' && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tags</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Manager</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Team Members</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRoles.map((role) => (
                    <tr key={role.label} onClick={() => setSelectedRole(role)}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{role.label}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{role.description}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <div className="flex gap-2 flex-wrap">
                          {role.badges.map(badge => (
                            <span key={badge} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100">
                              {badge}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Image width={100} height={100} className="h-8 w-8 rounded-full object-cover" src={role.manager.avatar} alt="" />
                          <div>
                            <div className="font-medium text-gray-900">{role.manager.name}</div>
                            <div className="text-gray-500">Manager</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm">
                        <div className="flex -space-x-2">
                          {role.users.slice(0, 3).map((user, idx) => (
                            <Image
                              width={100}
                              height={100}
                              key={idx}
                              className="h-8 w-8 rounded-full ring-2 object-cover ring-white"
                              src={user.avatar || '/avatar.png'}
                              alt=""
                            />
                          ))}
                          {role.users.length > 3 && (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-2 ring-white">
                              <span className="text-xs font-medium text-gray-500">+{role.users.length - 3}</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {view === 'grid' && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRoles.map((role, idx) => (
            <RoleCard
              onClick={() => setSelectedRole(role)}
              onAssign={() => handleAssignRoleFn(role)}
              key={idx}
              title={role.label}
              description={role.description}
              teamMembers={role.users as User[]}
              tags={role.badges.map(badge => ({ label: badge }))}
              manager={{
                name: role.manager.name,
                role: 'Manager',
                avatar: role.manager.avatar
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllRoles