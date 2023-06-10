import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import { FiLock } from 'react-icons/fi'


function NewPin() {
    return (
        <div className='bg-gray-200 h-screen'>
            <div>
                <Headers />
            </div>
            <div className='mt-10 flex justify-center'>
                <div className='flex gap-4'>
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
                    <div className='flex-1 flex flex-col gap-3 bg-white  h-auto rounded-xl '>
                        <div className='gap-10 w-[850px] flex flex-col p-7'>
                            <div className='flex flex-col gap-3'>
                                <div className='font-bold'>Change PIN</div>
                                <div className='w-[342px] opacity-60'>
                                Type your new 6 digits security PIN to use in Aksara Wallet.
                                </div>
                            </div>
                        </div>
                        <form className='flex justify-center items-center flex-col gap-9 mt-16'>
                            
                            <div>
                                <button className='btn btn-default w-[431px] normal-case'>Change PIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default NewPin