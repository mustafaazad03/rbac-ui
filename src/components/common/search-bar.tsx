'use client';
import Image from 'next/image'
import React from 'react'

interface SearchBarProps {
  placeholder?: string;
  handleSearch: (value: string) => void;
}

const SearchBar = ({placeholder, handleSearch}: SearchBarProps) => {
  return (
    <div className={`flex w-full h-12 items-start py-3 pl-4 pr-4`}>
      <div className="flex items-center justify-center gap-3">
      <Image src='/icons/Search.svg' width={20} height={20} alt='Search Icon' />
      <input
        type='text'
        placeholder={placeholder || 'Search for anything here'}
        className={`w-full h-full outline-none text-dark-blue bg-inherit placeholder:w-max`}
        onChange={(e) => handleSearch(e.target.value)}
      />
      </div>
    </div>
  )
}

export default SearchBar
