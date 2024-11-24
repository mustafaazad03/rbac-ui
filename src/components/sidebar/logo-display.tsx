import Image from 'next/image'
import React from 'react'
import siteLogo from '../../assets/logo.png'

const LogoDisplay = ({logo}: {logo?: boolean}) => {
  return (
    <div className={`flex items-center gap-1 ${logo ? "w-32 py-1": "w-48 py-3 pr-7 justify-center"}`}>
      <Image src={siteLogo} width={48} height={50} className={`object-cover ${logo ? "w-9 h-9": ""}`} alt='Site Logo' />
      <strong className={`${logo ? "text-base" :"text-[22px]"} font-bold text-dark-blue`}>RBAC</strong>
    </div>
  )
}

export default LogoDisplay
