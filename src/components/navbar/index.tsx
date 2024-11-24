import React from 'react'
import SearchBar from '../common/search-bar'
import Image from 'next/image'

const Nav = () => {
  return (
    <div className='flex justify-between items-center pl-5 pr-7 py-[22px] border-b border-fade-orange'>
      <div className="w-2/5 hidden lg:flex">
        <SearchBar/>
      </div>
      <div className="flex items-center gap-5 justify-end w-full">
        <div className="gap-[14px] flex items-center">
          <Image src='/icons/settings.svg' width={20} height={20} alt='Settings Icon' />
          <Image src='/icons/bell.svg' width={20} height={20} alt='Notification Icon' />
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
  )
}

export default Nav
