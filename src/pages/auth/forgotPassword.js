import Link from 'next/link'
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
                            To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
                        </div>
                        <form className='flex-col flex gap-10 mt-6'>
                            <div>
                                <div></div>
                                <input type="text" placeholder="Enter your e-mail" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                <hr />
                            </div>
                            <button className='btn btn-primary normal-case'>Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword