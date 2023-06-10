import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'


function History() {
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
                                <div className='flex justify-between px-7 py-4'>
                                    <div className='text-xl font-bold'>Transaction History</div>
                                    <div className="dropdown">
                                        <label tabIndex={0} className="btn m-1 normal-case">-- Select Filter --</label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a>Item 1</a></li>
                                            <li><a>Item 2</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
                                    </div>
                                </div>
                                <div className='flex justify-between p-6'>
                                    <div className='flex gap-2'>
                                        <div>
                                            <Image
                                                src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Dewaonly</div>
                                            <div className='text-sm opacity-70'>Accept</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='font-semibold text-green-600'>+Rp50.000</div>
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

export default History