import Image from 'next/image';
import React from 'react';

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => {
  return (
    <div className="group relative inline-block">
      <Image src='/icons/help-circle.svg' width={16} height={16} alt='Info Icon' />
      <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 top-full mt-4 px-3 py-2 bg-fade-blue text-dark-blue text-sm rounded-lg whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default InfoTooltip;