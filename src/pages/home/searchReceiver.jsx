import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'


function SearchReceiver() {
    return (
        <div>
            <div className='bg-gray-200 h-screen'>
                <div>
                    <Headers />
                </div>
                <div className='mt-10 flex justify-center'>
                    <div className='flex gap-5'>
                        <div className='bg-white w-[270px] h-[678px] rounded-2xl flex justify-center'>
                            <div className='flex flex-col gap-10 text-xl font-semibold'>
                                <div className='mt-14 flex justify-center items-center gap-3'>
                                    <div><RxDashboard size={25} /></div>
                                    <div>Dashboard</div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div><AiOutlineArrowUp size={25} /></div>
                                    <div>Transfer</div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div><AiOutlinePlus size={25} /></div>
                                    <div>Top Up</div>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <div><FiUser size={25} /></div>
                                    <div>Profile</div>
                                </div>
                                <div className='mt-60 flex items-center gap-3'>
                                    <div><FiLogOut size={25} /></div>
                                    <div>Logout</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <div className='bg-white w-[850px] h-auto rounded-xl'>
                                <div className='flex flex-col justify-between px-7 py-5 gap-6'>
                                    <div className='text-xl font-bold'>Search Receiver</div>
                                    <div className='bg-gray-200 rounded-xl px-3 flex justify-start items-center'>
                                        <div><AiOutlineSearch size={25} className='opacity-70' /></div>
                                        <input type="text" placeholder="Search receiver here" className="input max-w-xs w-full bg-transparent outline-none" style={{ outline: 'none' }} />
                                    </div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={70} height={50} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>+62 813-8492-9994</div>
                                        </div>
                                    </div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={70} height={50} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>+62 813-8492-9994</div>
                                        </div>
                                    </div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={70} height={50} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>+62 813-8492-9994</div>
                                        </div>
                                    </div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={70} height={50} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>+62 813-8492-9994</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default SearchReceiver