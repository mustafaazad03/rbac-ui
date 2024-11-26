'use client';
import React, { useCallback, useLayoutEffect, useState } from 'react'
import FilteringSection from '../common/filteringSection'
import EmployeesListView from '../ui/list-view-cards';
import { User } from '../ui/user-chips';
import EmployeesGridView from '../ui/employee-grid-view';

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
  initialData: User[];
}

const AllEmployees = ({initialData}: AllEmployeesProps) => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    status: [] as string[],
    teams: [] as string[],
    type: [] as string[],
    size: [] as string[],
    department: [] as string[]
  });

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

  const AllowedFilters = ["status", "teams", "type"];
  return (
    <>
      <FilteringSection view={view} setView={(view) => setView(view)} handlingSearch={(value: string) => handleSearch(value)} activeFilters={activeFilters} setActiveFilters={setActiveFilters} AllowedFilters={AllowedFilters} />
      {view === 'list' && (
        <EmployeesListView 
          employees={filteredEmployees}
        />
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <EmployeesGridView 
        employees={filteredEmployees}
      />
      )}
    </>
  )
}

export default AllEmployees
