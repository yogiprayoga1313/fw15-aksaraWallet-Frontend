import Link from 'next/link'
import React, { use } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'
import axios from 'axios';
import { useRouter } from 'next/router';
import { Formik } from "formik";
import * as Yup from 'yup';
import propTypes from 'prop-types'
import { saveEmail } from '@/redux/reducers/auth';
import { useDispatch } from 'react-redux';




const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid'),
    password: Yup.string().required('Password is invalid')
})

const FormSignUp = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        setErrMessage('');
    }, [values]);

    const [iconEye, setIconEye] = React.useState(false)
    const [typePassword, setTypePassword] = React.useState(false)

    const handleInputPassword = () => {
        setIconEye(!typePassword)
        setTypePassword(!iconEye)
    }

    return (
        <form onSubmit={handleSubmit} className='flex-col flex gap-10 mt-6'>
            {errMessage && (
                <div className='alert alert-error danger text-sm mt-1'>{errMessage}</div>
            )}
            <div>
                <div className='flex justify-start items-center gap-5'>
                    <div><FiUser size={25} /></div>
                    <input
                        name='username'
                        type="text"
                        placeholder="Enter your username"
                        className=" input w-full max-w-xs outline-none"
                        style={{ outline: 'none' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username} />
                </div>
                <hr />
            </div>
            <div>
                <div className='flex justify-start items-center gap-5'>
                    <div><AiOutlineMail size={25} /></div>
                    <input
                        name='email'
                        type="email"
                        placeholder="Enter your e-mail"
                        className={`input w-full max-w-xs outline-none ${errors.email && touched.email}`}
                        style={{ outline: 'none' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                </div>
                <hr />
                {errors.email && touched.email &&
                    (<label className="label">
                        <span className="label-text-left text-error text-xs outline-none">{errors.email}</span>
                    </label>
                    )}
            </div>
            <div className=''>
                <div className='flex justify-start items-center gap-5'>
                    <div><FiLock size={25} /></div>
                    <input
                        name='password'
                        type={typePassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className={`input w-full max-w-xs ${errors.password && touched.password}`}
                        style={{ outline: 'none' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password} />
                <button type='button' onClick={handleInputPassword} className=' text-[#4c3f91]'>
                    {iconEye ? (
                        <i className=''>
                            <FiEye size={20} />
                        </i>
                    ) : (
                        <i className=''>
                            <FiEyeOff size={20} />
                        </i>
                    )}
                </button>
                </div>
                <hr />
                {errors.password && touched.password && (
                    <label className="label">
                        <span className="label-text-left text-error text-xs ">{errors.password}</span>
                    </label>
                )}
            </div>
            <div className='mt-10'>
                <button type='submit' disabled={isSubmitting} className='btn btn-primary normal-case w-full'>
                    {isSubmitting && <span className="loading loading-spinner loading-xs"></span>}
                    {!isSubmitting && 'Sign Up'}
                </button>
            </div>
            <div className='flex items-center justify-center opacity-90'>
                <div>Already have an account? Let’s
                    <Link className='text-blue-800 font-semibold' href='/auth/login'> Login</Link>
                </div>
            </div>
        </form>
    )
}

FormSignUp.propTypes = {
    values: propTypes.string,
    errors: propTypes.string,
    touched: propTypes.string,
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}

function Register() {
    const dispatch = useDispatch()
    const router = useRouter()
    const doRegister = async (values, { setSubmitting, setErrMessage }) => {
        setSubmitting(true)

        try {
            const form = new URLSearchParams({
                username: values.username,
                email: values.email,
                password: values.password
            });
            const { data } = await axios.post('/api/register', form.toString());
            // console.log(data)
            dispatch(saveEmail(values.email))
            setSubmitting(false);
            if (data.results.token) {
                router.push('/auth/pin')
            }
        } catch (err) {
            const message = err?.response?.data?.message
            if (message) {
                setErrMessage(message)
            }
            setSubmitting(false)
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
                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={doRegister}
                        >
                            {(props) => (
                                <FormSignUp {...props} />
                            )}

                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register