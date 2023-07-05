import React, { useRef } from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowDown } from 'react-icons/ai'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import http from '@/helpers/http'
import { useRouter } from 'next/router'


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

function Dashboard({ token, user }) {
  const router = useRouter()
  const [trx, setTrx] = React.useState([])
  const getTransactions = React.useCallback(async () => {
    const { data } = await http(token).get('/transactions', { params: { limit: 4 } })
    setTrx(data.results)
  }, [token])

  React.useEffect(() => {
    getTransactions()
  }, [getTransactions])


 

  const topUp = async (event) => {
    event.preventDefault()
    try {
      const { value: amount } = event.target.elements.amount
      const form = new URLSearchParams({ amount })
      const { data } = await http(token).post('/transactions/topup', form.toString())
      console.log(data)
      router.reload('/home')
    } catch (err) {
      console.error(err)
    }
  }
  return (
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
                <div>Dashboard</div>
              </div>
              <div className='flex items-center gap-3'>
                <div><AiOutlineArrowUp size={25} /></div>
                <Link href='/home/searchReceiver'>Transfer</Link>
              </div>
              <div className='flex items-center gap-3'>
                <div><AiOutlinePlus size={25} /></div>
                <div>Top Up</div>
              </div>
              <div className='flex items-center gap-3'>
                <div><FiUser size={25} /></div>
                <Link href='/profile'>Profile</Link>
              </div>
              <div className='mt-60 flex items-center gap-3'>
                <div><FiLogOut size={25} /></div>
                <Link href='/auth/logout'>Logout</Link>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-7'>
            <div className='bg-blue-400 w-[850px] h-auto rounded-xl text-white flex justify-between px-10'>
              <div className='flex flex-col gap-5 py-6'>
                <div className='opacity-70'>Balance</div>
                <div className='text-4xl font-bold'>{user?.balance ? `Rp ${Number(user?.balance).toLocaleString('id')}` : `Rp-0`}</div>
                <div className='opacity-70'>{user?.email}</div>
              </div>
              <div className='flex flex-col py-6 gap-5'>
                <Link href='/home/searchReceiver'>
                  <span className='flex gap-3 justify-center items-center bg-white/20 w-[162px] h-[57px] rounded-xl border'>
                    <span><AiOutlineArrowUp size={25} className='opacity-50' /></span>
                    <span href='/home/searchReceiver' className='text-xl'>Transfer</span>
                  </span>
                </Link>
                <span className='flex gap-3 justify-center items-center bg-white/20 w-[162px] h-[57px] rounded-xl border'>
                  <div><AiOutlinePlus size={25} className='opacity-50' /></div>
                  <label htmlFor='topUp' className='text-xl cursor-pointer'>Top Up</label>
                </span>
                <input type="checkbox" id="topUp" className="modal-toggle" />
                <form onSubmit={topUp} className="modal">
                  <div className="modal-box text-black">
                    <h3 className="font-bold text-lg">Top Up</h3>
                    <p className="py-4">Enter the amount of money, and click submit</p>
                    <div className='flex justify-center items-center'>
                      <input
                        type="number"
                        name='amount'
                        placeholder="Input Balance"
                        className="input text-center input-bordered w-full max-w-xs" />
                    </div>
                    <div className="modal-action">
                      <button type='submit' className="btn btn-primary normal-case">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='flex gap-5'>
              <div className='bg-white rounded-xl w-[463px] h-auto'>
                <div className='flex justify-between p-7'>
                  <div className='flex flex-col gap-3'>
                    <div><AiOutlineArrowDown size={25} color='green' /></div>
                    <div className='text-sm opacity-70'>Income</div>
                    <div className='text-xl font-semibold'>Rp2.120.000</div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div><AiOutlineArrowUp size={25} color='red' /></div>
                    <div className='text-sm opacity-70'>Expense</div>
                    <div className='text-xl font-semibold'>Rp1.560.000</div>
                  </div>
                </div>
              </div>
              <div className='bg-white rounded-xl w-[367px] h-auto'>
                <div>
                  <div className='flex justify-between p-6'>
                    <div className='font-bold text-md'>Transaction History</div>
                    <Link href='/home/history'><div className='text-sm opacity-80 text-blue-400 hover:text-red-300'>See all</div></Link>
                  </div>
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
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard