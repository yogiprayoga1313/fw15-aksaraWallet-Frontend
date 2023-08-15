import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'
import { useDispatch, useSelector } from 'react-redux'
import { setRecipient as setRecipientAction } from '@/redux/reducers/transfer'
import { useRouter } from 'next/router'
import http from '@/helpers/http'


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

        const { data } = await Http(token).get('/profile')
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

function SearchReceiver({ token, user }) {
    const dispatch = useDispatch()
    const [search, setSearch] = React.useState('')
    const [recipient, setRecipient] = React.useState({})
    const router = useRouter()

    const getUsers = React.useCallback(async (page = 1, search = '') => {
        const { data } = await http(token).get('/users', {
            params: {
                page,
                search
            }
        })
        setRecipient(data)
    }, [token])

    React.useEffect(() => {
        getUsers()
    }, [getUsers])

    React.useEffect(() => {
        getUsers(1, search)
    }, [search, getUsers])

    const recipientRedux = useSelector(state => state.transfer.user)
    
    React.useEffect(()=>{
        if(recipientRedux){
            router.push('/home/inputAmount')
        }
    },[recipientRedux, router])
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
                                <div className='flex flex-col justify-between px-7 py-5 gap-4'>
                                    <div className='text-xl font-bold'>Search Receiver</div>
                                    <div className='bg-gray-200 rounded-xl px-3 flex justify-start items-center'>
                                        <div><AiOutlineSearch size={25} className='opacity-70' /></div>
                                        <input onChange={(e)=> setSearch(e.target.value)} 
                                        type="text" 
                                        placeholder="Search receiver here" 
                                        className="input max-w-xs w-full bg-transparent outline-none" 
                                        style={{ outline: 'none' }} />
                                    </div>
                                    <div>
                                        {recipient.results && (
                                            <>
                                                {recipient.results.map(item => (
                                                    <div key={`recipient-list-${item.id}`} className='flex justify-between px-7 py-6'>
                                                        <div  onClick={()=> dispatch(setRecipientAction(item))} className='cursor-pointer flex gap-2'>
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
                                                                    <div className='font-semibold'>{item?.fullName}</div>
                                                                    <div className='text-sm opacity-70'>{item.email}</div>
                                                                </div>
                                                            </>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className='flex gap-5 justify-center items-center'>
                                                    <button onClick={()=> getUsers(recipient.pageInfo.page - 1, search)} disabled={recipient.pageInfo.page <= 1} className='btn btn-primary normal-case'>prev</button>
                                                    <div className='font-bold'>{recipient.pageInfo.page} of {recipient.pageInfo.totalPage}</div>
                                                    <button onClick={()=> getUsers(recipient.pageInfo.page + 1, search)} disabled={recipient.pageInfo.page === recipient.pageInfo.totalPage} className='btn btn-primary normal-case'>next</button>
                                                </div>
                                            </>
                                        )}
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

export default SearchReceiver