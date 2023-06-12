import Link from 'next/link'
import React from 'react'
import PinInput from '../components/PinInput'

function Pin() {
    const [pin, setPin] = React.useState('')
    const [showAlert, setShowAlert] = React.useState(false)
    
    const submitPin = () => {
        // kirim data ke backend
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
                        <div className='flex flex-col gap-10 mt-6 items-center'>
                            {/* {showAlert && <div className='alert alert-sucess' >Pin has 6 digits</div>} */}
                            <PinInput onChangePin={setPin} />
                            <div className='w-full'>
                                <button onClick={submitPin} type='submit' className='btn btn-primary w-full normal-case'>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pin