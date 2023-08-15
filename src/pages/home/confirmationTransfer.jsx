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
import { withIronSessionSsr } from "iron-session/next";
import { useDispatch, useSelector } from 'react-redux'
import { clearTransferState, setRecipient as setRecipientAction } from '@/redux/reducers/transfer'
import { useRouter } from 'next/router'
import { setNotes, setAmount } from '@/redux/reducers/transfer'
import http from '@/helpers/http'
import moment from 'moment/moment'
import PinInput from '../components/PinInput'

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


function ConfirmationTransfer({ token, user }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const recipient = useSelector(state => state.transfer.user)
    const amount = useSelector(state => state.transfer.amount)
    const notes = useSelector(state => state.transfer.notes)
    const [pin, setPin] = React.useState('')
    const processTransfer = async () => {
        const form = new URLSearchParams({
            recipientId: recipient.id,
            notes,
            amount,
            pin
        }).toString()
        const { data } = await http(token).post('/transactions/transfer', form)
        // console.log(data)
        dispatch(clearTransferState())
        router.replace('/home/'+data.results.id)
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
                                <div className='flex flex-col justify-between px-7 py-3 gap-6'>
                                    <div className='text-xl font-bold'>Transfer To</div>
                                    <div className='shadow-lg shadow-gray-500/20 flex justify-start items-center gap-5 p-5 rounded-xl'>
                                        {!recipient.picture &&
                                            <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
                                                <FiUser size={30} />
                                            </div>}
                                        {recipient.picture &&
                                            <div className='w-12 h-12 border rounded-lg overflow-hidden'>
                                                <Image className='rounded object-fit ' src={recipient.picture} alt={recipient.fullName || recipient.email} width={100} height={100} />
                                            </div>}
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold text-xl'>{recipient.fullName}</div>
                                            <div className='text-sm opacity-70'>{recipient?.phoneNumber || recipient.email}</div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        <div>
                                            <div className='w-[336px] font-bold text-xl'>Details</div>
                                        </div>
                                        <div className='shadow-lg shadow-gray-500/20 flex flex-col justify-center items-start p-3 rounded-xl'>
                                            <div className='text-sm opacity-60'>Amount</div>
                                            <div className='text-xl font-bold'>Rp{Number(amount).toLocaleString('id')}</div>
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
                                            <div className='text-xl font-bold'>{notes || '-'}</div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end items-end'>
                                        <label htmlFor='pinInput' className='btn btn-primary normal-case w-[170px]'>Continue</label>
                                    </div>
                                    <input type="checkbox" id="pinInput" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Enter PIN to Transfer</h3>
                                            <p className="py-4">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
                                            <div>
                                                <PinInput onChangePin={setPin} />
                                            </div>
                                            <div className="modal-action">
                                                <button onClick={processTransfer} disabled={!(pin.length >= 6)} className="btn btn-primary normal-case">Continue</button>
                                            </div>
                                        </div>
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

export default ConfirmationTransfer