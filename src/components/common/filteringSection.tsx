import React, { useState } from 'react'
import SearchBar from './search-bar'
import Image from 'next/image'
import Button from '../buttons/button'
import FilterModal from '../modals/filter-modal';

type View = 'list' | 'grid';

interface FilteringSectionProps {
  view: View;
  setView: (view: View) => void;
  handlingSearch: (value: string) => void;
  activeFilters: {
    status?: string[];
    teams?: string[];
    type?: string[];
    size?: string[];
    department?: string[];
  };
  setActiveFilters: React.Dispatch<React.SetStateAction<{
    status?: string[];
    teams?: string[];
    type?: string[];
    size?: string[];
    department?: string[];
  }>>;
}

const FilteringSection = ({view, setView, handlingSearch,   activeFilters, setActiveFilters}: FilteringSectionProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Get active filter count
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, filters) => count + filters.length,
    0
  );
  
  return (
    <>
      <div className='flex items-center justify-between w-full'>
        <div className="w-2/5">
          <SearchBar 
            placeholder='Search Employee by name, role, ID or any related keywords' 
            handleSearch={handlingSearch} 
          />
        </div>
        <div className="flex items-center gap-[14px]">
          <div className="flex items-center">
            {/* Filter Button */}
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-4 py-[10px] border border-gray-200 rounded-lg"
              onclick={() => setIsFilterModalOpen(true)}
            >
              <Image src='/icons/Filters lines.svg' width={20} height={20} alt='Filter Icon' />
              <span className="text-sm text-gray-700">
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 rounded-full bg-indigo-100 px-2 text-xs text-indigo-600">
                    {activeFilterCount}
                  </span>
                )}
              </span>
            </Button>
          </div>
          
          <div className="flex items-center rounded-lg gap-1">
            <Button
              variant={view === 'list' ? 'secondary' : 'ghost'}
              className={`w-10 h-10 p-1 pl-[7px] ${view === 'list' ? 'bg-gray-200' : ''}`}
              onclick={() => setView('list')}
            >
              <Image src='/icons/List_Unordered.svg' width={24} height={24} alt='List Icon' />
            </Button>
            <Button
              variant={view === 'grid' ? 'secondary' : 'ghost'}
              className={`w-10 h-10 p-1 pl-[9px] ${view === 'grid' ? 'bg-gray-200' : ''}`}
              onclick={() => setView('grid')}
            > 
              <Image src='/icons/element-3.svg' width={20} height={20} alt='Grid Icon' />
            </Button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
    </>
  )
}

export default FilteringSection
