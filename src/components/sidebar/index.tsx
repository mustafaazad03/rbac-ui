'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LogoDisplay from './logo-display';
import LinkWithLogo from './link-with-logo';
import Image from 'next/image';

type NavigationItems = {
  link: string;
  icon: string;
  title: string;
  nesting?: {
    link: string;
    title: string;
  }[];
}

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigationItems = [
    {
      link: '/',
      icon: '/icons/home.svg',
      title: 'Dashboard'
    },
    {
      link: '/roles',
      icon: '/icons/briefcase.svg',
      title: 'Roles'
    },
    // {
    //   link: '/employees',
    //   icon: '/icons/3 User.svg',
    //   title: 'Employees',
    //   nesting: [
    //     {
    //       link: '/employees/all',
    //       title: 'All Employees'
    //     },
    //     {
    //       link: '/employees/recent',
    //       title: 'Recent hires'
    //     }
    //   ]
    // }
  ] as NavigationItems[];

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 px-2 rounded-full bg-white shadow-lg  hover:bg-gray-50 transition-colors duration-200 flex items-center"
        >
          {!isOpen && (
            <div className="flex items-center justify-between">
              <LogoDisplay logo={true} />
            </div>
          )}
          <Image 
              src={'/icons/arrow-outlined.svg'} 
              width={50}
              height={50}
              alt="Arrow Icon"
              className={`w-4 h-4 transition-colors duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
        </button>
      </div>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static
        flex flex-col 
        w-64 min-h-screen 
        bg-white border-r
        transition-transform duration-300 ease-in-out
        z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col py-8 gap-[34px] flex-1 px-[14px]">
          <div className="flex items-center justify-between">
            <LogoDisplay />
          </div>
          
          <nav className="space-y-[14px] p-2">
            {navigationItems.map((item) => (
              <LinkWithLogo
                key={item.link}
                link={item.link}
                icon={item.icon}
                title={item.title}
                nesting={item?.nesting}
                isActive={pathname === item.link || pathname?.startsWith(`${item.link}/`)}
              />
            ))}
          </nav>
        </div>
        <div className="flex flex-col py-8 gap-[34px] px-[14px]">
          <LinkWithLogo
            link="/logout"
            icon="/icons/Logout.svg"
            title="Logout"
            isActive={false}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;