'use client';
import Image from 'next/image';
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: string;
  onclick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({ 
  variant = 'secondary',
  icon,
  onclick,
  children,
  className = ''
}: ButtonProps) => {
  const baseStyles = 'flex items-center gap-2 rounded-lg font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-purple-800 text-white hover:bg-purple-900',
    secondary: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-50'
  };

  return (
    <button
      onClick={onclick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="w-5 h-5">
        <Image 
          src={icon}
          width={50}
          height={50}
          alt="icon"
          className="w-full h-full"
        />
      </span>}
      {children}
    </button>
  );
};

export default Button;