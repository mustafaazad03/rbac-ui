import Image from 'next/image'
import React from 'react'

const SearchBar = () => {
  return (
    <div className={`flex w-full h-12 items-start py-3 pl-4 pr-10`}>
      <div className="flex items-center justify-center gap-3">
      <Image src='/icons/Search.svg' width={20} height={20} alt='Search Icon' />
      <input
        type='text'
        placeholder='Search for anything...'
        className={`w-full h-full outline-none text-lg text-dark-blue bg-inherit`}
      />
      </div>
    </div>
  )
}

export default SearchBar
