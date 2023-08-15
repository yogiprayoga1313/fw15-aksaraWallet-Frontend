import React from 'react'
import Image from 'next/image'
import { BsBell } from 'react-icons/bs'
import { withIronSessionSsr } from "iron-session/next";
import Link from 'next/link';
import { FiUser } from 'react-icons/fi';

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
);

function Headers({ token, user }) {
  return (
    <>
      <div className='flex justify-around items-center bg-white h-24 rounded-b-3xl gap-8 shadow-lg  shadow-black/10'>
        <Link href='/'>
          <div className='font-bold text-3xl'>Aksara Wallet</div>
        </Link>
        <div className='flex justify-center items-center gap-7'>
          {!user.picture &&
            <div className='w-12 h-12 border rounded-lg flex justify-center items-center'>
              <FiUser size={30} />
            </div>}
          {user.picture &&
            <div className='w-12 h-12 border rounded-lg overflow-hidden'>
              <Image className='rounded object-fit ' src={user.picture} alt={user.fullName || user.email} width={100} height={100} />
            </div>}
          <div className='flex flex-col justify-center items-start'>
            <div className='font-semibold text-xl'>{user?.username}</div>
            <div>+62813938777946</div>
          </div>
          <div><BsBell size={25} /></div>
        </div>
      </div>
    </>
  )
}

export default Headers