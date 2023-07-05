import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import http from '@/helpers/http'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

        const { data } = await http(token).get('/profile')
        console.log(data)

        return {
            props: {
                token,
                user: data.results
            },
        };
    },
    cookieConfig
);


function History({ token, user }) {
    const [trx, setTrx] = React.useState([])
    const getTransactions = React.useCallback(async () => {
        const { data } = await http(token).get('/transactions', { params: { limit: 6 } })
        setTrx(data.results)
    }, [token])

    React.useEffect(() => {
        getTransactions()
    }, [getTransactions])
    return (
        <div>
            <div className='bg-gray-200 h-screen'>
                <div>
                    <Headers token={token} user={user} />
                </div>
                <div className='mt-10 flex justify-center'>
                    <div className='flex gap-5'>
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
                        <div className='flex-1 flex flex-col'>
                            <div className='bg-white w-[850px] h-auto rounded-xl'>
                                <div className='flex justify-between px-6 py-4'>
                                    <div className='text-xl font-bold'>Transaction History</div>
                                    <div className="dropdown">
                                        <label tabIndex={0} className="btn m-1 normal-case">-- Select Filter --</label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a>Last Update</a></li>
                                            <li><a>A-Z</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='flex justify-between flex-col p-1'>
                                    {trx.map(item => (
                                        <div key={`trx-list-${item.id}`} className='flex justify-between px-7 py-6'>
                                            <div className='flex gap-2'>
                                                {item.type === "TRANSFER" && (
                                                    <>
                                                        {item.recipient.id !== user.id &&
                                                            <>
                                                                <div>
                                                                    {!item.recipient.picture &&
                                                                        <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                                            <FiUser size={30} />
                                                                        </div>}
                                                                    {item.recipient.picture &&
                                                                        <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                                            <Image className='rounded object-fit ' src={item.recipient.picture} alt={item.recipient.fullName || item.recipient.email} width={100} height={100} />
                                                                        </div>}
                                                                </div>
                                                                <div className='flex flex-col gap-1'>
                                                                    <div className='font-semibold'>{item.recipient.fullName || item.recipient.email}</div>
                                                                    <div className='text-sm opacity-70'>Outcome</div>
                                                                </div>
                                                            </>
                                                        }
                                                        {item.recipient.id === user.id &&
                                                            <>
                                                                <div>
                                                                    {!item.sender.picture &&
                                                                        <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                                            <FiUser size={30} />
                                                                        </div>}
                                                                    {item.sender.picture &&
                                                                        <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                                            <Image className='rounded object-fit ' src={item.sender.picture} alt={item.sender.fullName || item.sender.email} width={100} height={100} />
                                                                        </div>}
                                                                </div>
                                                                <div className='flex flex-col gap-1'>
                                                                    <div className='font-semibold'>{item.sender.fullName || item.sender.email}</div>
                                                                    <div className='text-sm opacity-70'>Outcome</div>
                                                                </div>
                                                            </>
                                                        }
                                                    </>
                                                )}
                                                {item.type === "TOP-UP" && (
                                                    <>
                                                        <div>
                                                            {!item.picture &&
                                                                <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                                    <FiUser size={30} />
                                                                </div>}
                                                            {item.picture &&
                                                                <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                                    <Image className='rounded object-fit ' src={item.picture} alt={item.fullName || item.email} width={100} height={100} />
                                                                </div>}
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <div className='font-semibold'>{item.recipient.fullName || item.recipient.email}</div>
                                                            <div className='text-sm opacity-70'>Income</div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                {item.type === "TOP-UP" && <div className='font-semibold text-green-500'>
                                                    Rp{Number(item.amount).toLocaleString('id')}</div>}
                                                {item.type === "TRANSFER" && (
                                                    item.recipient.id === user.id ? (
                                                        <div className='text-green-500'>Rp{Number(item.amount).toLocaleString('id')}</div>
                                                    ) : (
                                                        <div className='text-red-500'>Rp{Number(item.amount).toLocaleString('id')}</div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
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