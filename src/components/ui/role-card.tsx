import Image from 'next/image'
import React from 'react'

interface Tag {
  label: string;
  isHighlighted?: boolean;
}

interface Manager {
  name: string;
  role: string;
  avatar: string;
}

interface RoleCardProps {
  title: string;
  description: string;
  teamMembers: (string | null)[];
  additionalMembers?: number;
  tags: Tag[];
  manager: Manager;
  className?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  teamMembers,
  additionalMembers = 0,
  tags,
  manager,
  className = '',
}) => {
  const MAX_VISIBLE_MEMBERS = 5;

  return (
    <div className={`w-full max-w-[538px] p-6 relative rounded-[15px] border border-[#eff1f4] ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-dark-blue text-lg font-black line-clamp-1">
            {title}
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {teamMembers.slice(0, MAX_VISIBLE_MEMBERS).filter(Boolean).map((member, index) => (
                member && <Image
                  key={index}
                  width={24}
                  height={24}
                  alt={`Team member ${index + 1}`}
                  className="w-6 h-6 rounded-full object-cover border border-white -ml-1 first:ml-0"
                  src={member}
                />
              ))}
              {(teamMembers.length > MAX_VISIBLE_MEMBERS || additionalMembers > 0) && (
                <div className="px-2 py-1 -ml-1 bg-[#f7e8ef] rounded-full border-2 border-white">
                  <span className="text-secondary-red text-xs font-medium font-['Inter']">
                    +{(teamMembers.length - MAX_VISIBLE_MEMBERS) + additionalMembers}
                  </span>
                </div>
              )}
              <div className="w-6 h-6 bg-white rounded-xl border border-[#cfd4dc] border-dashed justify-center items-center inline-flex ml-1">
                <div className="self-stretch p-1 rounded-xl justify-center items-center inline-flex">
                    <Image src="/icons/plus_gray.svg" width={16} height={16} alt="Add" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-3">
          <p className="text-[#667084] text-sm font-medium font-['Lato'] line-clamp-4">
            {description}
          </p>
          
          {/* Tags Section */}
          <div className="py-4 border-b flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <div
                key={index}
                className={`px-2 py-0.5 rounded-2xl ${
                  tag.isHighlighted ? 'bg-[#f7e8ef] text-secondary-red' : 'bg-[#f5f6f7] text-dark-blue'
                }`}
              >
                <span className="text-xs font-medium font-['Inter']">{tag.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Manager Section */}
        <div className="flex items-center gap-2">
          <Image
            width={34}
            height={34}
            alt={manager.name}
            className="rounded-full border border-white object-cover w-10 h-10"
            src={manager.avatar}
          />
          <div className="flex flex-col">
            <span className="text-[#0e2253] text-sm font-normal font-['Inter']">
              {manager.name}
            </span>
            <span className="text-[#909dad] text-sm font-normal">
              {manager.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoleCard
