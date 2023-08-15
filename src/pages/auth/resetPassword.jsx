import Link from 'next/link'
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import propTypes from 'prop-types'
import axios from 'axios';
import { useRouter } from 'next/router'


const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid'),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required')
});

const FormResetPassword = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
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
            {errMessage &&
                (<div>
                    <div className="alert alert-error danger text-[11px]">{errMessage}</div>
                </div>)}
            <div>
                <div className='flex justify-start items-center gap-5'>
                    <div><AiOutlineMail size={25} /></div>
                    <input
                        type='email'
                        name='email'
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
                        <span className="label-text-left text-error text-xs ">{errors.email}</span>
                    </label>
                    )}
            </div>
            <div>
                <div className='flex justify-start items-center gap-5'>
                    <div><FiLock size={25} /></div>
                    <input
                        name='newPassword'
                        type={typePassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className={`input w-full max-w-xs ${errors.newPassword && touched.newPassword ? 'error' : ''}`}
                        style={{ outline: 'none' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword} />
                    {/* <button type='button' onClick={handleInputPassword} className=' text-[#4c3f91]'>
                        {iconEye ? (
                            <i className=''>
                                <FiEye size={20} />
                            </i>
                        ) : (
                            <i className=''>
                                <FiEyeOff size={20} />
                            </i>
                        )}
                    </button> */}
                </div>
                <hr />
                {errors.newPassword && touched.newPassword && (
                    <label className="label">
                        <span className="label-text-left text-error text-xs ">{errors.newPassword}</span>
                    </label>
                )}
            </div>
            <div>
                <div className='flex justify-start items-center gap-5'>
                    <div><FiLock size={25} /></div>
                    <input
                        name='confirmPassword'
                        type={typePassword ? 'text' : 'password'}
                        placeholder="Enter confirm password"
                        className={`input w-full max-w-xs ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                        style={{ outline: 'none' }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword} />
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
                {errors.confirmPassword && touched.confirmPassword && (
                    <label className="label">
                        <span className="label-text-left text-error text-xs ">{errors.confirmPassword}</span>
                    </label>
                )}
            </div>
            <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary normal-case'
            >
                {isSubmitting && <span className="loading loading-spinner loading-xs"></span>}
                {!isSubmitting && 'Reset Password'}
            </button>
        </form>
    )
}

FormResetPassword.propTypes = {
    values: propTypes.string,
    errors: propTypes.string,
    touched: propTypes.string,
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}

function ResetPassword() {
    const router = useRouter()

    const doResetPassword = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true)

        try {
            const form = new URLSearchParams({
                email: values.email,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
            });
            const { data } = await axios.post('/api/resetPassword', form.toString())
            // console.log(data)
            setSubmitting(false)
            if (data) {
                router.push('/auth/login')
            }
        } catch (error) {
            const message = error.response?.data?.message;
            if (message) {
                setErrors({ errMessage: message });
              } else {
                setErrors({ errMessage: 'Login failed. Please try again.' });
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
                            Did You Forgot Your Password?
                            Don’t Worry, You Can Reset Your
                            Password In a Minutes.
                        </div>
                        <div>
                            Now you can create a new password for your FazzPay account. Type your password twice so we can confirm your new passsword.
                        </div>
                        <Formik
                            initialValues={{
                                email: '',
                                newPassword: '',
                                confirmPassword: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={doResetPassword}
                        >
                            {(props) => (
                                <FormResetPassword {...props} />
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword