import React from 'react'
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
import Http from '@/helpers/http'


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token
    checkCredentials(token, res, '/auth/login')

    const { data } = await Http(token).get('/profile')
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
                <div>Transfer</div>
              </div>
              <div className='flex items-center gap-3'>
                <div><AiOutlinePlus size={25} /></div>
                <div>Top Up</div>
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
          <div className='flex-1 flex flex-col gap-7'>
            <div className='bg-blue-400 w-[850px] h-auto rounded-xl text-white flex justify-between px-10'>
              <div className='flex flex-col gap-5 py-6'>
                <div className='opacity-70'>Balance</div>
                <div className='text-4xl font-bold'>Rp120.000</div>
                <div className='opacity-70'>+62 813-9387-7946</div>
              </div>
              <div className='flex flex-col py-6 gap-5'>
                <Link href='/home/searchReceiver'>
                  <div className='flex gap-3 justify-center items-center bg-white/20 w-[162px] h-[57px] rounded-xl border'>
                    <div><AiOutlineArrowUp size={25} className='opacity-50' /></div>
                    <div className='text-xl'>Transfer</div>
                  </div>
                </Link>
                <div className='flex gap-3 justify-center items-center bg-white/20 w-[162px] h-[57px] rounded-xl border'>
                  <div><AiOutlinePlus size={25} className='opacity-50' /></div>
                  <div className='text-xl'>Top Up</div>
                </div>
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
                    <div className='text-sm opacity-80 text-blue-400'>See all</div>
                  </div>
                  <div className='flex justify-between px-7 py-6'>
                    <div className='flex gap-2'>
                      <div>
                        <Image
                          src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <div className='font-semibold'>Dewaonly</div>
                        <div className='text-sm opacity-70'>Accept</div>
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-green-600'>+Rp50.000</div>
                    </div>
                  </div>
                  <div className='flex justify-between px-7 py-6'>
                    <div className='flex gap-2'>
                      <div>
                        <Image
                          src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <div className='font-semibold'>Dewaonly</div>
                        <div className='text-sm opacity-70'>Accept</div>
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-red-600'>+Rp50.000</div>
                    </div>
                  </div>
                  <div className='flex justify-between px-7 py-6'>
                    <div className='flex gap-2'>
                      <div>
                        <Image
                          src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <div className='font-semibold'>Dewaonly</div>
                        <div className='text-sm opacity-70'>Accept</div>
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-green-600'>+Rp50.000</div>
                    </div>
                  </div>
                  <div className='flex justify-between px-7 py-6 '>
                    <div className='flex gap-2'>
                      <div>
                        <Image
                          src="/asset/profile.jpg" alt="My Image" width={50} height={30} className='rounded-md'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <div className='font-semibold'>Dewaonly</div>
                        <div className='text-sm opacity-70'>Accept</div>
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold text-red-600'>+Rp50.000</div>
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
  )
}

export default Dashboard