import React from 'react'
import PinInput from '../components/PinInput'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import axios from 'axios'
import { clearAuthState } from '@/redux/reducers/auth'

function Pin() {
    const router = useRouter()
    const dispatch = useDispatch()
    const email = useSelector(state => state.auth.email)
    const [pin, setPin] = React.useState('')
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        if (!email) {
            router.back()
        }
    }, [email, router])

    const submitPin = async (e) => {
        try {
            e.preventDefault()
            const form = new URLSearchParams({
                email,
                pin
            }).toString()

            const { data } = await axios.post('/api/pin', form.toString())
            console.log(data)
            // dispatch(clearAuthState())
            router.replace('/auth/login')
        } catch (err) {
            setErrMessage('Duplicate Pin')
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
                            Secure Your Account, Your Wallet,
                            and Your Data With 6 Digits PIN
                            That You Created Yourself.
                        </div>
                        <div>
                            Create 6 digits pin to secure all your money and your data in Aksara Wallet. Keep it secret and don’t tell anyone about your Wallet account password and the PIN.
                        </div>
                        <form onSubmit={submitPin} className='flex flex-col gap-10 mt-6 items-center'>
                            {errMessage && <div className='alert alert-error'>{errMessage}</div>}
                            <PinInput onChangePin={setPin} />
                            <div className='w-full'>
                                <button type='submit' className='btn btn-primary w-full normal-case'>Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pin