import Head from 'next/head';
import styles from '../styles/indexPage.module.css';

function test(){
  fetch('/api/test')
  .then((response) => response.json())
  .then((data) => console.log(data));
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Signin - Subs Feed Manager</title>
      </Head>
      <div className={styles.container}>
        <p>supp</p>
        <button onClick={test}>test backend (check console)</button>
      </div>
    </>
  )
}
