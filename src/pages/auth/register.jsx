import Link from 'next/link'
import React from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiLock, FiUser } from 'react-icons/fi'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import axios from 'axios';
import { useRouter } from 'next/router';


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
        const token = req.session.token;

        if (token) {
            return {
                props: {
                    token
                }
            }
        }

        return {
            props: {},
        };
    },
    cookieConfig
);

function Register() {
    const [loading, setLoading] = React.useState(false)
    const [errMessage, setErrMessage] = React.useState('')
    const router = useRouter()
    const doRegister = async (e) => {
        setLoading(true)
        e.preventDefault()
        const { value: username } = e.target.username
        const { value: email } = e.target.email
        const { value: password } = e.target.password
        const form = new URLSearchParams({
            username, email, password
        })
        try {
            const { data } = await axios.post('/api/register', form.toString());
            console.log(data)
            setLoading(false);
            if (data?.results?.token) {
                router.push('/auth/login');
            }
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                setErrMessage(message)
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
                        <form onSubmit={doRegister} className='flex-col flex gap-10 mt-6'>
                            {/* Tampilkan pesan kesalahan di bagian bawah input */}
                            {errMessage && (
                                <div className='alert alert-error danger text-sm mt-1'>{errMessage}</div>
                            )}
                            <div>
                                <div className='flex justify-start items-center'>
                                    <div><FiUser size={25} /></div>
                                    <input name='username' type="text" placeholder="Enter your username" className=" input w-full max-w-xs outline-none" style={{ outline: 'none' }} />
                                </div>
                                <hr />
                            </div>
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
                            <div className='mt-10'>
                                <button disabled={loading} className='btn btn-primary normal-case w-full'>
                                    {loading && <span className="loading loading-spinner loading-xs"></span>}
                                    {!loading && 'Sign Up'}
                                </button>
                            </div>
                            <div className='flex items-center justify-center opacity-90'>
                                <div>Already have an account? Let’s
                                    <Link className='text-blue-800 font-semibold' href='/auth/login'> Login</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register