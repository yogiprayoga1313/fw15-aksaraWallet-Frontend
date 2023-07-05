import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import { BsCheckCircleFill, BsDownload } from 'react-icons/bs'


function StatusTransfer() {
    return (
        <div className='bg-gray-200 h-min-screen'>
            <div>
                <div>
                    <Headers />
                </div>
                <div className='mt-10 flex justify-center'>
                    <div className='flex gap-5'>
                        <div className='bg-white w-[270px] h-[838px] rounded-2xl flex justify-center'>
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
                                <div className='mt-[440px] flex items-center gap-3'>
                                    <div><FiLogOut size={25} /></div>
                                    <div>Logout</div>
                                </div>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col'>
                            <div className='bg-white w-[850px] h-auto rounded-xl'>
                                <div className='flex flex-col justify-between px-7 py-3 gap-6'>
                                    <div className='flex flex-col justify-center items-center gap-5 py-6'>
                                        <div><BsCheckCircleFill size={50} color='green' /></div>
                                        <div className='font-bold text-xl'>Transfer Success</div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Amount</div>
                                            <div className='text-xl font-bold'>Rp100.000</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Balance Left</div>
                                            <div className='text-xl font-bold'>Rp20.000</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Date & Time </div>
                                            <div className='text-xl font-bold'>May 11, 2020 - 12.20</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Notes</div>
                                            <div className='text-xl font-bold'>For buying some socks</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='text-md font-extrabold'>Transfer To</div>
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
                                    <div className='flex justify-end items-end gap-4 mt-10 pb-5'>
                                        <button className='btn btn-default normal-case w-[170px] text-blue-700'><BsDownload size={20}/>Download PDF</button>
                                        <button className='btn btn-primary normal-case w-[170px]'>Back to Home</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default StatusTransfer