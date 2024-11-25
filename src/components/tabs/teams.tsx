'use client';
import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import FilteringSection from '../common/filteringSection';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Button from '../buttons/button';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  lead: string;
  description: string;
  memberCount?: number;
  members: TeamMember[];
}

interface TeamsTabProps {
  initialData: Team[];
}

const TeamsTab = ({ initialData }: TeamsTabProps) => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filteredTeams, setFilteredTeams] = useState(initialData);
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    status?: string[];
    teams?: string[];
    type?: string[];
    size?: string[];
    department?: string[];
  }>({
    size: [],
    department: [],
  });

  // Search functionality
  const handleSearch = useCallback((term: string) => {
    const filtered = initialData.filter((team) =>
      team.name.toLowerCase().includes(term.toLowerCase()) ||
      team.members.some((member) =>
        member.name.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredTeams(filtered);
  }, [initialData]);

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev =>
      prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    );
  };

  return (
    <>
      <FilteringSection
        view={view}
        setView={setView}
        handlingSearch={handleSearch}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />

      {/* List View */}
      {view === 'list' && (
        <div className="mt-4 space-y-4">
          {filteredTeams.map((team) => (
            <div 
              key={team.id}
              className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleTeam(team.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {team.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-500">{team.memberCount} members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-10 h-10">
                          <Image src="/icons/more-vertical.svg" width={20} height={20} alt="More Icon" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Team</DropdownMenuItem>
                        <DropdownMenuItem>Manage Members</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {expandedTeams.includes(team.id) ? (
                      <Image src="/icons/arrow-down.svg" width={20} height={20} className='rotate-180' alt="Chevron Up" />
                    ) : (
                      <Image src="/icons/arrow-down.svg" width={20} height={20} alt="Chevron Down" />
                    )}
                  </div>
                </div>
              </div>

              {expandedTeams.includes(team.id) && (
                <div className="px-6 pb-4">
                  <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {team.members.map((member) => (
                          <tr key={member.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  {member.avatar ? (
                                    <Image
                                      width={40}
                                      height={40}
                                      className="h-10 w-10 rounded-full"
                                      src={member.avatar}
                                      alt=""
                                    />
                                  ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                      <span className="text-gray-500 font-medium">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {member.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {member.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {member.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="w-10 h-10">
                                    <Image src="/icons/more-vertical.svg" width={20} height={20} alt="More Icon" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Remove from Team
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
              )}
            </div>
          ))}
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <div 
              key={team.id} 
              className="rounded-lg border border-gray-200 bg-white shadow-sm hover:border-gray-400"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {team.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                      <p className="text-sm text-gray-500">{team.memberCount} members</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="w-10 h-10">
                        <Image src="/icons/more-vertical.svg" width={20} height={20} alt="More Icon" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Team</DropdownMenuItem>
                      <DropdownMenuItem>Manage Members</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Team
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {team.members.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        {member.avatar ? (
                          <Image
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            src={member.avatar}
                            alt=""
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-xs text-gray-500 font-medium">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          +{team.members.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TeamsTab;
