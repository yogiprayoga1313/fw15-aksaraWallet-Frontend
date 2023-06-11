import axios from 'axios'
import React from 'react'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import { useRouter } from 'next/router';

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    req.session.destroy()
    return {
      props: {}
    }
  },
  cookieConfig
)

function Logout() {
  const router = useRouter()
  React.useEffect(()=>{
    router.replace('/auth/login')
  },[router])
  return (
    <div></div>
  )
}

export default Logout