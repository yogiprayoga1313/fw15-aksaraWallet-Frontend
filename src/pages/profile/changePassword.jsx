import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import { FiLock } from 'react-icons/fi'
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'
import { useRouter } from 'next/router'
import axios from 'axios'
import http from '@/helpers/http'


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

        const { data } = await http(token).get('/profile')

        return {
            props: {
                token,
                user: data.results
            },
        };
    },
    cookieConfig
);

function ChangePassword({ token, user }) {
    const router = useRouter()
    const doChangePass = async (event) => {
        event.preventDefault()

        const { value: oldPassword } = event.target.oldPassword
        const { value: newPassword } = event.target.newPassword
        const { value: confirmPassword } = event.target.confirmPassword
        const form = new URLSearchParams({ oldPassword, newPassword, confirmPassword })
        const { data } = await http(token).patch('/profile/change-password', form.toString())
        // console.log(data)
        router.replace('/profile')

    }


    return (
        <div className='bg-gray-200 h-screen'>
            <div>
                <Headers token={token} user={user} />
            </div>
            <div className='mt-10 flex justify-center'>
                <div className='flex gap-4'>
                    <div className='bg-white w-[270px] h-[678px] rounded-2xl flex justify-center'>
                        <div className='flex flex-col gap-10 text-xl font-semibold'>
                            <div className='mt-14 flex justify-center items-center gap-3'>
                                <div><RxDashboard size={25} /></div>
                                <Link href='/home'><div>Dashboard</div></Link>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><AiOutlineArrowUp size={25} /></div>
                                <Link href='/home/searchReceiver'><div>Transfer</div></Link>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><AiOutlinePlus size={25} /></div>
                                <Link href=''><div>Top Up</div></Link>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><FiUser size={25} /></div>
                                <Link href='/profile'><div>Profile</div></Link>
                            </div>
                            <div className='mt-60 flex items-center gap-3'>
                                <div><FiLogOut size={25} /></div>
                                <Link href='/auth/logout'><div>Logout</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col gap-3 bg-white  h-auto rounded-xl '>
                        <div className='gap-10 w-[850px] flex flex-col p-7'>
                            <div className='flex flex-col gap-3'>
                                <div className='font-bold'>Change Password</div>
                                <div className='w-[342px] opacity-60'>
                                    You must enter your current password and then type your new password twice.
                                </div>
                            </div>
                        </div>
                        <form onSubmit={doChangePass} className='flex justify-center items-center flex-col gap-9 mt-16'>
                            <div className='w-[431px]'>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input
                                        type="password"
                                        placeholder="old password"
                                        className="input w-full max-w-xs outline-none" 
                                        style={{ outline: 'none' }}
                                        name='oldPassword' />
                                </div>
                                <hr />
                            </div>
                            <div className='w-[431px]'>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input
                                        type="password"
                                        placeholder="New password"
                                        className="input w-full max-w-xs"
                                        style={{ outline: 'none' }}
                                        name='newPassword' />
                                </div>
                                <hr />
                            </div>
                            <div className='w-[431px]'>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input
                                        type="password"
                                        placeholder="confirm password"
                                        className="input w-full max-w-xs"
                                        style={{ outline: 'none' }}
                                        name='confirmPassword' />
                                </div>
                                <hr />
                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary w-[431px] normal-case'>Change Password</button>
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

export default ChangePassword