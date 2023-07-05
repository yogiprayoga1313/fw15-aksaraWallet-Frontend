import '@/styles/globals.css'
import { Nunito } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/redux/store'


const nunito = Nunito({
  weight: '300',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <main className={nunito.className}>
        <Component {...pageProps} />
      </main>
    </Provider>

  )
}
