import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsDownload, BsTelephone } from 'react-icons/bs'
import { FiLock } from 'react-icons/fi'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Link from 'next/link'
import { withIronSessionSsr } from "iron-session/next";
import cookieConfig from '@/helpers/cookieConfig'
import checkCredentials from '@/helpers/checkCredentials'
import Http from '@/helpers/http'


export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token
    checkCredentials(token, res, '/auth/login')

    const { data } = await Http(token).get('/profile')
    return {
      props: {
        token,
        user: data.results
      },
    };
  },
  cookieConfig
);

const inter = Inter({ subsets: ['latin'] })

export default function Home({ token, user }) {
  return (
    <>
      {/* aksara header */}
      <div className='bg-violet-500 h-auto'>
        <div className='flex justify-around py-4'>
          <div className='text-3xl font-bold text-white'>Aksara Wallet</div>
          {token ?
            <Link href='/profile'>
              <div className='text-xl font-bold text-white'>{user?.username}</div>
            </Link> :
            <div className="flex justify-center items-center gap-5">
              <Link className="btn btn-outline btn-accent normal-case w-full" href='/auth/login'>Log In</Link>
              <Link className="btn normal-case w-full text-violet-700" href='/auth/register'>Sign Up</Link>
            </div>}
        </div>
        <div className='py-60'>
          <div className='flex flex-col justify-center items-center gap-7'>
            <div className='text-4xl font-extrabold w-[537px] text-center text-white'>
              Awesome App For Saving Time.
            </div>
            <div className='w-[428px] text-center opacity-70 text-white'>
              We bring you a mobile app for banking problems that oftenly wasting much of your times.
            </div>
            <button className='btn btn-default normal-case w-[173px] text-violet-700'>Try it Free</button>
          </div>
        </div>
      </div>

      {/* About aksara */}
      <div className='flex flex-col justify-center items-center gap-16 py-52 bg-gray-100'>
        <div className='text-center w-[633px] flex-col gap-4 flex'>
          <div className='text-4xl font-bold'>Why Choose Aksara?</div>
          <div className='opacity-70'>We have some great features from the application and it’s totally free to use by all users around the world.</div>
        </div>
        <div className='flex gap-14'>
          <div className='w-[266px] h-auto flex flex-col items-center justify-center text-center gap-5'>
            <div className='bg-violet-200 rounded-full w-12 h-12 flex justify-center items-center'>
              <BsTelephone size={20} />
            </div>
            <div className='font-bold'>24/7 Support</div>
            <div className='text-sm opacity-75'>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</div>
          </div>
          <div className='w-[266px] h-auto flex flex-col justify-center items-center text-center bg-white rounded-xl gap-5 p-7 shadow-lg shadow-gray/20'>
            <div className='bg-violet-200 rounded-full w-12 h-12 flex justify-center items-center'>
              <FiLock size={20} />
            </div>
            <div className='font-bold'>Data Privacy</div>
            <div className='text-sm opacity-75'>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</div>
          </div>
          <div className='w-[266px] h-auto flex flex-col justify-center items-center text-center gap-5'>
            <div className='bg-violet-200 rounded-full w-12 h-12 flex justify-center items-center'>
              <BsDownload size={20} />
            </div>
            <div className='font-bold'>Easy Download</div>
            <div className='text-sm opacity-75'>Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store.</div>
          </div>
        </div>
      </div>

      {/* Partner */}
      <div className='bg-violet-100'>
        <div className='flex items-center gap-20 justify-center p-10'>
          <div>
            <Image alt="logo 1" src='/asset/logo-1.png' width={70} height={50} />
          </div>
          <div>
            <Image alt="logo 2" src='/asset/logo-2.png' width={70} height={50} />
          </div>
          <div>
            <Image alt="logo 3" src='/asset/logo-3.png' width={70} height={50} />
          </div>
          <div>
            <Image alt="logo 4" src='/asset/logo-4.png' width={70} height={50} />
          </div>
          <div>
            <Image alt="logo 5" src='/asset/logo-5.png' width={70} height={50} />
          </div>
          <div>
            <Image alt="logo 6" src='/asset/logo-7.png' width={70} height={50} />
          </div>
        </div>
      </div>

      {/* Result transfer */}
      <div className='py-20'>
        <div className='flex flex-col justify-center items-center gap-10'>
          <div className='bg-violet-100 rounded-full p-4 w-[400px] h-auto text-center'>
            <div className='text-4xl text-violet-700 font-bold'>Rp. 390.736.500</div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='font-bold text-3xl text-center'>
              <span className='text-violet-700'>Money </span>
              has Been Transfered.</div>
            <div className='opacity-70 w-[567px] text-center'>That amount of money has been transfered from all users. We still counting and going strong! </div>
          </div>
        </div>
      </div>
      {/* Aksara future */}
      <div className='bg-violet-100'>
        <div className='flex gap-20'>
          <div>
            <Image alt="logo 6" src='/asset/banner-1.png' width={840} height={1050} />
          </div>
          <div className='flex flex-col gap-10 justify-center items-start'>
            <div className='w-[506px]'>
              <div className='text-6xl font-bold'>All The <span className='text-violet-700'>Great</span> Aksara Features.</div>
            </div>
            <div className='bg-white rounded-xl p-4 w-[620px] h-auto gap-2 flex flex-col'>
              <div className='font-bold text-xl'>
                <span className='text-violet-700'>1. </span>
                Small Fee
              </div>
              <div className='text-sm'>We only charge 5% of every success transaction done in Aksara Wallet app.</div>
            </div>
            <div className='bg-white rounded-xl p-4 w-[620px] h-auto gap-2 flex flex-col'>
              <div className='font-bold text-xl'>
                <span className='text-violet-700'>2. </span>
                Data Secured
              </div>
              <div className='text-sm'>All your data is secured properly in our system and it’s encrypted.</div>
            </div>
            <div className='bg-white rounded-xl p-4 w-[620px] h-auto gap-2 flex flex-col'>
              <div className='font-bold text-xl'>
                <span className='text-violet-700'>3. </span>
                User friendly
              </div>
              <div className='text-sm'>Aksara Wallet come up with modern and sleek design and not complicated.</div>
            </div>
          </div>
        </div>
      </div>

      {/* User saying */}
      <div className='bg-gray-100 flex flex-col justify-center items-center py-20'>
        <div className='flex flex-col justify-center items-center text-center gap-10 p-20'>
          <div className='flex flex-col gap-4'>
            <div className='text-5xl font-bold'>What Users are <span className='text-violet-700'>Saying.</span></div>
            <div className='w-[567px]'>
              We have some great features from the application and it’s totally free to use by all users around the world.
            </div>
          </div>
          <div className='flex justify-center items-center gap-7'>
            <div className='flex justify-center items-center'>
              <button className='btn btn-default'><AiOutlineArrowLeft size={20} /></button>
            </div>
            <div className='bg-white w-[988px] rounded-xl'>
              <div className='flex flex-col justify-center items-center p-10 gap-6'>
                <div>
                  <Image alt="logo 6" src='/asset/profile.jpg' width={70} height={50} className='rounded-xl' />
                </div>
                <div className='font-bold text-2xl'>Dewaonly</div>
                <div className='opacity-70'>Designer</div>
                <div className='text-center w-[869px]'>
                  “This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”
                </div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <button className='btn btn-default'><AiOutlineArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className='bg-violet-500 py-10'>
        <div className='text-white p-16 gap-3 flex flex-col'>
          <div className='flex flex-col gap-3'>
            <div className='text-3xl font-bold'>Aksara Wallet</div>
            <div className='w-[285px] opacity-70'>
              Simplify financial needs and saving much time in banking needs with one single app.
            </div>
          </div>
          <hr />
          <div className='flex justify-between opacity-70'>
            <div>2023 Aksara Wallet. All right reserved.</div>
            <div className='flex gap-6'>
              <div>+62 5637 8882 9901</div>
              <div>contact@AksaraWallet.com</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
