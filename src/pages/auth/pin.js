import Link from 'next/link'
import React from 'react'

function Pin() {
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
                            Secure Your Account, Your Wallet,
                            and Your Data With 6 Digits PIN
                            That You Created Yourself.
                        </div>
                        <div>
                        Create 6 digits pin to secure all your money and your data in Aksara Wallet. Keep it secret and don’t tell anyone about your FazzPay account password and the PIN.
                        </div>
                        <form className='flex flex-col gap-10 mt-6 items-center'>
                            <div className='flex gap-3 items-center justify-center'>
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                                <input type="text" className="text-center input input-bordered w-full max-w-xs" />
                            </div>
                            <button className='btn btn-primary w-full normal-case'>Confirm</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pin