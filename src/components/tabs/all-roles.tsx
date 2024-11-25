
import React, { useCallback, useState, useEffect } from 'react'
import FilteringSection from '../common/filteringSection';
import RoleCard from '../ui/role-card';

interface RoleManager {
  name: string;
  email: string;
  avatar: string;
}

interface RoleUser {
  avatar?: string;
  name: string;
  email: string;
}

interface Role {
  id?: string;
  label: string;
  description: string;
  badges: string[];
  manager: RoleManager;
  users: RoleUser[];
}

interface AllRolesProps {
  initialData: Role[];
}

const AllRoles = ({ initialData }: AllRolesProps) => {
  const [view, setView] = useState<'list' | 'grid'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState<Role[]>(initialData);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    department: [],
    access: [],
    status: []
  });

  // Update filtered roles when initial data changes
  useEffect(() => {
    setFilteredRoles(initialData);
  }, [initialData]);

  // Search handler
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    const filtered = initialData.filter((role) =>
      Object.values(role).some((value) =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredRoles(filtered);
  }, [initialData]);

  // Filter roles based on active filters
  useEffect(() => {
    let filtered = initialData;
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
    setFilteredRoles(filtered);
  }, [activeFilters, initialData]);

  return (
    <div className="px-6">
      <FilteringSection
        view={view}
        setView={setView}
        handlingSearch={handleSearch}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        AllowedFilters={['department', 'access', 'status']}
      />
      {view === 'grid' && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role.label}
              title={role.label}
              description={role.description}
              teamMembers={role.users.map(user => user.avatar || '')}
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
