import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import Link from 'next/link'
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'
import { withIronSessionSsr } from "iron-session/next";
import { useDispatch, useSelector } from 'react-redux'
import { setRecipient as setRecipientAction } from '@/redux/reducers/transfer'
import { useRouter } from 'next/router'
import { setNotes, setAmount } from '@/redux/reducers/transfer'
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


function InputAmount({ token, user }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const recipient = useSelector(state => state.transfer.user)
    const amount = useSelector(state => state.transfer.amount)

    React.useEffect(() => {
        if (!recipient) {
            router.replace('/home/searchReceiver')
        }
    }, [router, recipient])

    const checkAmount = (amount)=>{
        amount = parseInt(amount)
        if(amount > user.balance){
            return user.balance
        }
        return amount
    }

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
                                <div className='flex flex-col justify-between px-7 py-4 gap-6'>
                                    <div className='text-xl font-bold'>Transfer Money</div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        <div>
                                            {!recipient.picture &&
                                                <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                    <FiUser size={30} />
                                                </div>}
                                            {recipient.picture &&
                                                <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                    <Image className='rounded object-fit ' src={recipient.picture} alt={recipient.fullName || recipient.email} width={100} height={100} />
                                                </div>}
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>{recipient?.fullName}</div>
                                            <div className='text-sm opacity-70'>{recipient?.phoneNumber || recipient.email}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='w-[336px]'>
                                            Type the amount you want to transfer and then
                                            press continue to the next steps.
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center flex-col gap-10 p-16'>
                                    <div className='flex flex-col justify-center items-center gap-8'>
                                        <div className='text-center'>
                                            <input onChange={(e)=> dispatch(setAmount(checkAmount(e.target.value)))} type="number" placeholder="0.00" value={checkAmount(amount)} className="input max-w-xs bg-transparent  text-center outline-none text-4xl font-semibold opacity-50" style={{ outline: 'none' }} />
                                        </div>
                                        <div className='font-semibold text-xl'>Available Rp{Number(user?.balance).toLocaleString('id')}</div>
                                    </div>
                                    <div className='w-[343px]'>
                                        <div className='flex justify-start items-center'>
                                            <div><FiEdit2 size={25} /></div>
                                            <input onChange={(e)=> dispatch(setNotes(e.target.value))} type="text" placeholder="Add some notes" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                        </div>
                                        <hr />
                                    </div>
                                    <div className='flex justify-end'>
                                        <button onClick={()=> router.replace('/home/confirmationTransfer')} disabled={!(amount >= 10000)} className='btn btn-primary normal-case w-[170px]'>Continue</button>
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

export default InputAmount