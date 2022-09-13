import { useEffect, useState } from 'react';
import styles from '../styles/page_index.module.css';
import Navbar from '../components/Navbar.js';

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

  useEffect(() => {
    checkAuthenticated();
  },[]);

  if(loading){
    return (<p>Loading...</p>);
  }

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <p>Hello</p>
      </div>
    </>
  )
}
