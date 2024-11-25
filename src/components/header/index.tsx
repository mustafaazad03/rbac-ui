import React from 'react';
import InfoTooltip from '../ui/InfoTooltip';
import Button from '../buttons/button';

interface HeaderAction {
  label: string;
  icon?: string;
  onclick: () => void;
  variant?: 'primary' | 'secondary';
}

interface HeaderProps {
  title: string;
  count: number;
  tooltipText?: string;
  actions?: HeaderAction[];
}

const Header = ({
  title,
  count,
  tooltipText,
  actions = []
}: HeaderProps) => {
  return (
    <header className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-0 lg:justify-between py-5 lg:mx-[51px] mx-6 mr-2 bg-white">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {tooltipText && <InfoTooltip text={tooltipText} />}
        {count > 0 && (
          <span className="px-2 py-1 text-sm bg-fade-primary-red-2 text-primary-red rounded-full">
            {count}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            icon={action.icon}
            onclick={action.onclick}
            className='px-4 py-2'
          >
            {action.label}
          </Button>
        ))}
      </div>
    </header>
  );
};

export default Header;