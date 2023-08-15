import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup';
import propTypes from 'prop-types'
import { useRouter } from 'next/router';
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig';
import axios from 'axios';




const validationSchema = Yup.object({
    email: Yup.string().email('Email is invalid')
})

const FormForgotPassword = ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        setErrMessage('');
    }, [values]);

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
            <button
                type='submit'
                disabled={isSubmitting}
                className='btn btn-primary normal-case'
            >
                {isSubmitting && <span className="loading loading-spinner loading-xs"></span>}
                {!isSubmitting && 'Confirm'}
            </button>
        </form>
    )
}

FormForgotPassword.propTypes = {
    values: propTypes.string,
    errors: propTypes.string,
    touched: propTypes.string,
    handleBlur: propTypes.func,
    handleChange: propTypes.func,
    handleSubmit: propTypes.func,
    isSubmitting: propTypes.bool,
}


function ForgotPassword() {
    const router = useRouter()

    const doForgotPassword = async (values, { setSubmitting, setErrors }) => {
        setSubmitting(true)

        try {
            const form = new URLSearchParams({
                email: values.email
            });
            const { data } = await axios.post('/api/forgotPassword', form.toString())
            // console.log(data)
            setSubmitting(false)
            if (data) {
                router.push('/auth/resetPassword')
            }
        } catch (error) {
            const message = error.response?.data?.message;
            if (message) {
                setErrors(message)
            } else {
                setErrors('Login failed. Please try again.');
            }
            setSubmitting(false)
        }
    }

    return(
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
                            To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.
                        </div>
                        <Formik
                            initialValues={{
                                email: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={doForgotPassword}
                        >
                            {(props) => (
                                <FormForgotPassword {...props} />
                            )}

                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword