import Link from 'next/link'
import { FiLock } from 'react-icons/fi'
import React from 'react'

function ResetPassword() {
    return (
        <>
            <div className='flex'>
                <div className='flex-1 bg-blue-400 h-screen flex justify-center'>
                    <div className='flex justify-center items-center text-white font-bold text-4xl'>
                        <div>AKSARA WALLET</div>
                    </div>
                </div>
                <div className='h-ful w-[600px] flex justify-center items-center'>
                    <div className='w-[443px] h-full flex gap-5 flex-col justify-center'>
                        <div className='text-3xl font-bold'>
                            Did You Forgot Your Password?
                            Don’t Worry, You Can Reset Your
                            Password In a Minutes.
                        </div>
                        <div>
                            Now you can create a new password for your FazzPay account. Type your password twice so we can confirm your new passsword.
                        </div>
                        <form className='flex-col flex gap-10 mt-6'>
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input type="password" placeholder="Create new password" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input type="password" placeholder="Create new password" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                </div>
                                <hr />
                            </div>
                            <button className='btn btn-primary normal-case'>Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword