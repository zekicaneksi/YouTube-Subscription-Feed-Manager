import Head from 'next/head';
import style from '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
    return (
      <>
        <Head>
            <title>Subs Feed Manager</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }