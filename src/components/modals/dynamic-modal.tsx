import Image from 'next/image'
import React from 'react'
import { User, UserChip } from '../ui/user-chips';

interface DynamicModalProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const DynamicModal = ({users ,setUsers}: DynamicModalProps) => {
  const handleSelect = (userId: string) => {
    setUsers((prevUsers: User[]) =>
      prevUsers.map((user: User) =>
        user.id === userId ? { ...user, selected: !user.selected } : user
      )
    )
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md p-10 h-3/5 flex flex-col gap-[30px]">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 px-3 pt-[10.50px] pb-[13.50px] bg-[#ffe6ef] rounded-[28px] border-8 border-[#feeeed] justify-center items-center inline-flex">
            <div className="grow shrink basis-0 h-6 justify-center items-center inline-flex">
              <div className="w-6 h-6 relative">
                <Image src="/icons/briefcaseColor.svg" width={24} height={24} alt="Heart" />
              </div>
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 relative bottom-12 left-16">
            <Image src="/icons/cross.svg" width={20} height={20} alt="Close" />
          </button>
        </div>
        <div className="flex-col justify-start items-start gap-2 inline-flex">
          <div className="self-stretch text-[#15294b] text-[21px] font-semibold font-['Lato'] leading-7">Assign this role</div>
          <div className="self-stretch"><span className="text-[#667084] text-sm font-normal font-['Inter'] leading-tight">Select one or multiple employees to assign to this role </span><span className="text-secondary-red text-sm font-bold font-['Inter'] leading-tight">“ Senior Design Lead “</span></div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className={`flex w-full h-12 items-center justify-between py-3 px-4`}>
            <div className="flex items-center gap-2">
              <Image src='/icons/search.svg' width={20} height={20} alt='Search Icon' />
              <input
                type='text'
                placeholder={'Search for an individual or team'}
                className={`w-full h-full outline-none text-dark-blue bg-inherit`}
              />
            </div>
            <Image src='/icons/help-circle.svg' width={20} height={20} alt='Help Icon' />
          </div>
          <div className="h-3/5 overflow-y-scroll w-full space-y-2">
          {users.map((user: User) => (
            <UserChip key={user.id} user={user} onSelect={handleSelect} />
          ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicModal
