import Link from 'next/link'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import axios from 'axios';
import { useRouter } from 'next/router';


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session.token;

        if (token) {
            res.setHeader('Location', '/')
            res.statusCode = 302
            res.end()
            return {
                props: {}
            }
        }

        return {
            props: {},
        };
    },
    cookieConfig
);


function Login() {
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()
    const [errMessage, setErrMessage] = React.useState('')

    const doLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const { value: email } = e.target.email
            const { value: password } = e.target.password
            const form = new URLSearchParams({
                email, password
            })
            const { data } = await axios.post('/api/login', form.toString())
            console.log(data)
            setLoading(false)
            if (data?.results?.token) {
                router.push('/')
            }
        } catch (err) {
            const message = err.response?.data?.message
            if (message) {
                setErrMessage(message)
            } else {
                setErrMessage('Login failed. Please try again.');
            }
        }
    }
    return (
        <>
            <div className='flex'>
                <div className='flex-1 bg-blue-400 h-screen flex justify-center'>
                    <div className='flex justify-center items-center text-white font-bold text-4xl'>
                        <div>AKSARA WALLET</div>
                    </div>
                </div>
                <div className='h-ful w-[600px] flex justify-center items-center'>
                    <div className='w-[443px] h-full flex gap-5 flex-col justify-center'>
                        <div className='text-3xl font-bold'>
                            Start Accessing Aksara Wallet to make your transactions eassier.
                        </div>
                        <div>
                            Transfering money is eassier than ever, you can access Aksara Wallet wherever you are.
                        </div>
                        <form onSubmit={doLogin} className='flex-col flex gap-10 mt-6'>
                            {errMessage && (<div>
                                <div className="alert alert-error danger text-[11px]">{errMessage}</div>
                            </div>)}
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div><AiOutlineMail size={25} /></div>
                                    <input name='email' type="email" placeholder="Enter your e-mail" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                </div>
                                <hr />
                            </div>
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div><FiLock size={25} /></div>
                                    <input name='password' type="password" placeholder="Enter your password" className="input w-full max-w-xs" style={{ outline: 'none' }} />
                                </div>
                                <hr />
                            </div>
                            <Link href='/auth/forgotPassword' className='opacity-70 flex justify-end'>
                                <div>Forgot password?</div>
                            </Link>
                            <button type='submit' disabled={loading} className='btn btn-primary normal-case'>
                                {loading && <span className="loading loading-spinner loading-xs"></span>}
                                {!loading && 'login'}
                            </button>
                            <div className='flex items-center justify-center opacity-90'>
                                <div>Don’t have an account? Let’s
                                    <Link className='text-blue-800 font-semibold' href='/auth/register'> Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login