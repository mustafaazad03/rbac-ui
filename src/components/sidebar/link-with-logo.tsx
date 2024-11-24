'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type NestedItem = {
  link: string;
  title: string;
  icon?: string;
};

type LinkWithLogoProps = {
  link: string;
  icon?: string;
  title: string;
  nesting?: NestedItem[];
  isActive?: boolean;
};

const LinkWithLogo: React.FC<LinkWithLogoProps> = ({
  link,
  icon,
  title,
  nesting,
  isActive = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNesting = (e: React.MouseEvent) => {
    if (nesting && nesting.length > 0) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (isActive && nesting && nesting.length > 0) {
      setIsOpen(true);
    }
  }, [isActive, nesting]);

  return (
    <div className="w-full">
      <Link
        href={link}
        onClick={toggleNesting}
        className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100 w-full
          ${isActive ? 'bg-primary-red text-white hover:bg-secondary-red rounded-3xl rounded-tl-none' : 'text-gray-700'}
          ${nesting && nesting.length > 0 ? 'justify-between' : ''}`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex items-center justify-center w-5 h-5">
              <Image 
                src={icon} 
                width={50}
                height={50}
                alt={title}
                className={`w-full h-full
                  ${isActive ? 'brightness-0 invert' : ''}`}
              />
            </span>
          )}
          
          <span className={`${isActive ? 'font-medium' : ''}`}>{title}</span>
        </div>

        {nesting && nesting.length > 0 && (
          <span className="ml-auto">
            <Image 
              src={isOpen ? '/icons/arrow-down.svg' : '/icons/arrow-right.svg'} 
              width={50}
              height={50}
              alt="Arrow Icon"
              className={`w-4 h-4 transition-colors duration-200
                ${isActive ? 'brightness-0 invert' : ''}`}
            />
          </span>
        )}
      </Link>

      {nesting && nesting.length > 0 && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {nesting.map((item, index) => (
            <div className='flex items-center' key={`${item.link}-${index}`}>
            <div className="w-1 h-1 rounded-full bg-primary-red"></div>
            <Link
              href={item.link}
              className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 hover:bg-gray-100
                ${item.link === window?.location?.pathname ? 'text-primary-red font-semibold' : 'text-gray-600'}`}
            >
              {item.icon && (
                <span className="mr-3 flex items-center justify-center w-5 h-5">
                  <Image 
                    src={item.icon} 
                    width={50}
                    height={50}
                    alt=""
                    className="w-full h-full" 
                  />
                </span>
              )}
              {item.title}
            </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkWithLogo;