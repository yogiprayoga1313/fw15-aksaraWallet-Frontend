import React from 'react'
import Headers from '../components/headers'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineArrowUp, AiOutlinePlus, AiOutlineArrowRight, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FiUser, FiLogOut, FiEdit2 } from 'react-icons/fi'
import Footer from '../components/footer'
import Image from 'next/image'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import Link from 'next/link'
import checkCredentials from '@/helpers/checkCredentials'
import http from '@/helpers/http'
import { Formik } from 'formik'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req, res }) {
        const token = req.session?.token
        checkCredentials(token, res, '/auth/login')

        const { data } = await http(token).get('/profile')

        return {
            props: {
                token,
                user: data.results
            },
        };
    },
    cookieConfig
);



function EditProfile({ token, user }) {
    const [selectedPicture, setSelectedPicture] = React.useState(false)
    const [openModal, setOpenModal] = React.useState(false)
    const [pictureURI, setPictureURI] = React.useState('')
    const [profile, setProfile] = React.useState({})

    const getProfile = React.useCallback(async () => {
        const { data } = await http(token).get('/profile')
        console.log(data)
        setProfile(data.results)
    }, [token])


    const updateDisplay = () => {
        dispatch(getProfileAction(token))
    };

    const handleShow = () => {
        setShow(!show)
    }
    const fileToDataUrl = (file) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPictureURI(reader.result)
        })
        reader.readAsDataURL(file)
    }

    const changePicture = (e) => {
        const file = e.target.files[0]
        setSelectedPicture(file)
        fileToDataUrl(file)
    }

    React.useEffect(() => {

    }, [selectedPicture])

    const editProfile = async (values) => {
        setOpenModal(true)
        const form = new FormData()
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                form.append(key, values[key])
            }
        })
        if (selectedPicture) {
            form.append('picture', selectedPicture)
        }
        try {
            await http(token).patch('/profile', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch (err) {
            console.log(err)
        }
        setOpenModal(false)
        updateDisplay()
        setProfile(data.results)
    }

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
                                <div>
                                    <RxDashboard size={25} />
                                </div>
                                <Link href='/home'>
                                    <span>Dashboard</span>
                                </Link>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><AiOutlineArrowUp size={25} /></div>
                                <Link href='/home/searchReceiver'>
                                    Transfer
                                </Link>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><AiOutlinePlus size={25} /></div>
                                <div>Top Up</div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div><FiUser size={25} /></div>
                                <Link href='/profile'>Profile</Link>
                            </div>
                            <div className='mt-60 flex items-center gap-3'>
                                <div><FiLogOut size={25} /></div>
                                <Link href='/auth/logout'>
                                    <div>Logout</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            username: user?.username,
                            fullName: user?.fullName,
                            email: user?.email
                        }}
                        onSubmit={editProfile}
                        enableReinitialize>

                        {({ handleSubmit, handleChange, handleBlur, values }) => (
                            <form onSubmit={handleSubmit} className='flex-1 flex flex-col gap-3 bg-white justify-center items-center h-auto rounded-xl '>
                                <div className='font-bold text-xl'>Edit Profile</div>
                                <div className='gap-10 w-[850px] flex flex-col justify-center items-center p-7'>
                                    <div className='flex flex-col gap-1 justify-center items-center'>
                                        <div>
                                            {!selectedPicture &&
                                                <div className='w-28 h-28 border rounded-lg flex justify-center items-center'>
                                                    <Image className='rounded object-fit bg-cover' src={user.picture} alt='profile' width={200} height={200} />
                                                </div>}
                                            {selectedPicture &&
                                                <div className='w-28 h-28 border rounded-lg overflow-hidden'>
                                                    <Image className='rounded object-fit bg-cover' src={pictureURI} alt='profile' width={200} height={200} />
                                                </div>}
                                        </div>
                                        <div>
                                            <label className='btn btn-ghost text-blue-500 normal-case text-lg'>
                                                <span className='text-sm'>Choose profile picture</span>
                                                <input onChange={changePicture} name='picture' type="file" className='hidden' />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-semibold text-sm' htmlFor="username">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                name='username'
                                                placeholder='Input New Username'
                                                className="input input-bordered w-full max-w-xs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.username} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-semibold text-sm' htmlFor='email'>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name='email'
                                                className="input input-bordered w-full max-w-xs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='font-semibold text-sm' htmlFor='fullName'>
                                                Fullname
                                            </label>
                                            <input
                                                type="text"
                                                name='fullName'
                                                placeholder='Input New Fullname'
                                                className="input input-bordered w-full max-w-xs"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.fullName} />
                                        </div>
                                    </div>
                                    <button type='submit' className='btn btn-ghost text-primary font-bold cursor-pointer capitalize hover:text-cyan-700'>Save Change</button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
            <input type="checkbox" id="loading" className="modal-toggle" checked={openModal} />
            <div className="modal">
                <div className="modal-box bg-transparent shadow-none">
                    <div className='justify-center flex '>
                        <AiOutlineLoading3Quarters className='animate-spin ' color='white' size={60} />
                    </div>
                </div>
            </div>
            {/* <div className='pt-24'>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div> */}
            <div>
                <Footer />
            </div>
        </div >
    )
}

export default EditProfile