import React from 'react'
import Image from 'next/image'
import {BsBell} from 'react-icons/bs'

function Headers() {
  return (
    <>
      <div className='flex justify-around items-center bg-white h-24 rounded-b-3xl gap-8 shadow-lg  shadow-black/10'>
        <div className='font-bold text-3xl'>Aksara Wallet</div>
        <div className='flex justify-center items-center gap-7'>
          <Image
            src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
          />
          <div className='flex flex-col justify-center items-start'>
            <div className='font-semibold text-xl'>Dewaonly</div>
            <div>+62813938777946</div>
          </div>
          <div><BsBell size={25}/></div>
        </div>
      </div>
    </>
  )
}

export default Headers