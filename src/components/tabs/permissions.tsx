"use client"

import React, { useCallback, useState } from 'react'
import Image from 'next/image';
import FilteringSection from '../common/filteringSection';

export interface Permission {
  id: string;
  name: string;
  description: string;
  isGranted: boolean;
}


interface PermissionsProps {
  initialPermissions: Permission[];
}

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
    {children}
  </div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <h3 className={className}>
    {children}
  </h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">
    {children}
  </div>
);

const PermissionsWithFilters: React.FC<PermissionsProps> = ({ initialPermissions }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPermissions, setFilteredPermissions] = useState(initialPermissions)
  const [view, setView] = useState<'list' | 'grid'>('grid');

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    const filteredPerms = initialPermissions.filter((permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPermissions(filteredPerms)
  }, [initialPermissions, searchTerm])

  const renderPermission = (permission: Permission) => (
    <Card key={permission.id}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{permission.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground mb-2">{permission.description}</p>
        {permission.isGranted ? (
          <div
            className="text-xs text-white bg-dark-blue w-fit px-2 py-1 rounded-xl flex items-center gap-1"
          ><Image src='/icons/tick.svg' alt="Check" width={12} height={12} /> Granted</div>
        ) : (
          <div 
            className="text-xs text-secondary-red bg-fade-primary-red-2 w-fit px-2 py-1 rounded-xl flex items-center gap-1"
          >
            <Image src="/icons/cross.svg" alt="close" width={12} height={12} className="mr-1" /> Denied</div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      <FilteringSection view={view} setView={(view) => setView(view)} handlingSearch={(value: string) => handleSearch(value)}  />

      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredPermissions.map(renderPermission)}
        </div>
      )}
      {view === 'list' && (
        <div className="space-y-4">
          {filteredPermissions.map(renderPermission)}
        </div>
      )}
    </div>
  )
}

export default PermissionsWithFilters

