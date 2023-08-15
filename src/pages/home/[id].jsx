import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import { BsCheckCircleFill, BsDownload } from 'react-icons/bs'
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'
import { withIronSessionSsr } from "iron-session/next";
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { setNotes, setAmount } from '@/redux/reducers/transfer'
import http from '@/helpers/http'
import moment from 'moment'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

        const { data } = await http(token).get('/profile')
        // console.log(data)

        return {
            props: {
                token,
                user: data.results
            },
        };
    },
    cookieConfig
);


function StatusTransfer({ token, user }) {
    const amount = useSelector(state => state.transfer.amount)
    const notes = useSelector(state => state.transfer.notes)
    const recipient = useSelector(state => state.transfer.user)
    const { query: { id } } = useRouter()
    const [data, setData] = React.useState({})
    const getData = React.useCallback(async () => {
        const { data } = await http(token).get('/transactions/' + id)
        console.log(data)
        setData(data.results)
    }, [id, token])

    React.useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className='bg-gray-200 h-min-screen'>
            <div>
                <div>
                    <Headers token={token} user={user} />
                </div>
                <div className='mt-10 flex justify-center'>
                    <div className='flex gap-5'>
                        <div className='bg-white w-[270px] h-[838px] rounded-2xl flex justify-center'>
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
                                <div className='flex flex-col justify-between px-7 py-3 gap-6'>
                                    <div className='flex flex-col justify-center items-center gap-5 py-6'>
                                        <div><BsCheckCircleFill size={50} color='green' /></div>
                                        <div className='font-bold text-xl'>Transfer Success</div>
                                    </div>
                                    <div className='flex flex-col gap-5'>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Amount</div>
                                            <div className='text-xl font-bold'>Rp{Number(data.amount).toLocaleString('id')}</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Balance Left</div>
                                            <div className='text-xl font-bold'>Rp{Number(user.balance - amount).toLocaleString('id')}</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Date & Time </div>
                                            <div className='text-xl font-bold'>{moment(new Date()).format('MMMM DD, YYYY - HH.mm')}</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Notes</div>
                                            <div className='text-xl font-bold'>{data.notes || '-'}</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className='text-md font-extrabold'>Transfer To</div>
                                       <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                            <div>
                                                {!data?.recipient?.picture &&
                                                    <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                        <FiUser size={30} />
                                                    </div>}
                                                {data?.recipient?.picture &&
                                                    <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                        <Image className='rounded object-fit ' src={data?.recipient?.picture} alt={data?.recipient?.fullName || data?.recipient?.email} width={100} height={100} />
                                                    </div>}
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <div className='font-semibold text-xl'>{data?.recipient?.fullName}</div>
                                                <div className='text-sm opacity-70'>{data?.recipient?.phoneNumber || data?.recipient?.email}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-end gap-4 mt-10 pb-5'>
                                        <button className='btn btn-default normal-case w-[170px] text-blue-700'><BsDownload size={20} />Download PDF</button>
                                        <Link href='/home'><label className='btn btn-primary normal-case w-[170px]'>Back to Home</label></Link>
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