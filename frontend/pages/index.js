import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/page_index.module.css';

export default function Home() {

  const [loading, setLoading] = useState(true);

  function checkAuthenticated(){
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/checkAuthenticated', { mode: 'cors', credentials: 'include'})
    .then((response) => {
      if(response.status === 401){
        response.json().then((data) => {
          window.location.replace(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+ data+'?return='+ encodeURIComponent(window.location.origin + window.location.pathname));
        });
      } else {
        setLoading(false);
      }
    });
  }

  function logout(){
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/logout', { mode: 'cors', credentials: 'include'})
    .then((response) => {window.location.replace('/')});
  }

  useEffect(() => {
    checkAuthenticated();
  },[]);

  if(loading){
    return (<p>Loading...</p>);
  }

  return (
    <>
      <Head>
        <title>Subs Feed Manager</title>
      </Head>
      <div className={styles.container}>
        <p>Hello</p>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  )
}
