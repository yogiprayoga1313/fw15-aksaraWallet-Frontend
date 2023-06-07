import Link from 'next/link'
import React from 'react'

function Login() {
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
                        Start Accessing Aksara Wallet to make your transactions eassier.
                        </div>
                        <div>
                            Transfering money is eassier than ever, you can access Aksara Wallet wherever you are.
                        </div>
                        <form className='flex-col flex gap-10 mt-6'>
                            <div>
                                <div></div>
                                <input type="text" placeholder="Enter your e-mail" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                <hr />
                            </div>
                            <div>
                                <div></div>
                                <input type="password" placeholder="Enter your password" className="input w-full max-w-xs" style={{ outline: 'none' }} />
                                <hr />
                            </div>
                            <Link href='' className='opacity-70 flex justify-end'>
                                <div>Forgot password?</div>
                            </Link>
                            <button className='btn btn-primary normal-case'>Login</button>
                            <div className='flex items-center justify-center opacity-90'>
                                <div>Don’t have an account? Let’s
                                    <Link className='text-blue-800 font-semibold' href='/auth/register'> Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login