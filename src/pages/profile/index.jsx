import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowRight } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import Link from 'next/link'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token
    checkCredentials(token, res, '/auth/login')

    const { data } = await Http(token).get('/profile')

    return {
      props: {
        token,
        user: data.results
      },
    };
  },
  cookieConfig
);



function SelfProfile({ token, user }) {
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
                <div>Profile</div>
              </div>
              <div className='mt-60 flex items-center gap-3'>
                <div><FiLogOut size={25} /></div>
                <Link href='/auth/logout'>
                  <div>Logout</div>
                </Link>
              </div>
            </div>
          </div>
          <div className='flex-1 flex flex-col gap-3 bg-white justify-center items-center h-auto rounded-xl '>
            <div className='gap-10 w-[850px] flex flex-col justify-center items-center p-7'>
              <div className='flex flex-col gap-1 justify-center items-center'>
                <div>
                  <Image
                    src="/asset/profile.jpg" alt="My Image" width={70} height={50} className='rounded-md'
                  />
                </div>
                <button className='btn btn-ghost normal-case opacity-50'><FiEdit2 />Edit</button>
                <div className='flex flex-col justify-center items-center gap-1'>
                  <div className='font-bold text-xl'>{user?.username}</div>
                  <div className='opacity-60'>+6281393877946</div>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div className='w-[433px] bg-gray-200 flex justify-between px-4 items-center rounded-xl'>
                  <div className='font-semibold'>Personal Information</div>
                  <button className='btn btn-ghost'><AiOutlineArrowRight size={20} className='opacity-50' /></button>
                </div>
                <div className='w-[433px] bg-gray-200 flex justify-between px-4 items-center rounded-xl'>
                  <div className='font-semibold'>Change Password</div>
                  <button className='btn btn-ghost'><AiOutlineArrowRight size={20} className='opacity-50' /></button>
                </div>
                <div className='w-[433px] bg-gray-200 flex justify-between px-4 items-center rounded-xl'>
                  <div className='font-semibold'>Change PIN</div>
                  <button className='btn btn-ghost'><AiOutlineArrowRight size={20} className='opacity-50' /></button>
                </div>
                <div className='bg-gray-300 w-full h-auto p-3 rounded-xl'>
                  <Link href='/auth/logout'>
                    <div className='font-bold'>Logout</div>
                  </Link>
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

export default SelfProfile