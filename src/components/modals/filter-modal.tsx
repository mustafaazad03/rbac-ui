import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Button from '../buttons/button';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: {
    status: string[];
    teams: string[];
    type: string[];
  };
  setActiveFilters: (filters: {
    status: string[];
    teams: string[];
    type: string[];
  }) => void;
}

const FilterModal = ({ 
  isOpen, 
  onClose, 
  activeFilters, 
  setActiveFilters 
}: FilterModalProps) => {
  const [tempFilters, setTempFilters] = useState(activeFilters);

  const STATUS_OPTIONS = ['Active', 'Inactive'];
  const TYPE_OPTIONS = ['Full time', 'Part time', 'Contract', 'Associate'];
  const TEAM_OPTIONS = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Support'];

  const toggleFilter = (category: 'status' | 'teams' | 'type' , value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleApplyFilters = () => {
    setActiveFilters(tempFilters);
    onClose();
  };

  const handleClearFilters = () => {
    setTempFilters({
      status: [],
      teams: [],
      type: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 absolute top-[16%] right-[35%]">
            <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
          </button>
        </div>

        {/* Status Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Status</h3>
          <div className="space-y-2">
            {STATUS_OPTIONS.map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600"
                  checked={tempFilters.status.includes(status)}
                  onChange={() => toggleFilter('status', status)}
                />
                <span className="ml-2 text-sm">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Teams Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Teams</h3>
          <div className="grid grid-cols-2 gap-2">
            {TEAM_OPTIONS.map((team) => (
              <label key={team} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600"
                  checked={tempFilters.teams.includes(team)}
                  onChange={() => toggleFilter('teams', team)}
                />
                <span className="ml-2 text-sm">{team}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Employment Type Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Employment Type</h3>
          <div className="space-y-2">
            {TYPE_OPTIONS.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600"
                  checked={tempFilters.type.includes(type)}
                  onChange={() => toggleFilter('type', type)}
                />
                <span className="ml-2 text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button
            variant="ghost"
            onclick={handleClearFilters}
            className="text-gray-500"
          >
            Clear all
          </Button>
          <Button
            variant="ghost"
            className='px-4 py-2'
            onclick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className='px-4 py-2'
            onclick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;