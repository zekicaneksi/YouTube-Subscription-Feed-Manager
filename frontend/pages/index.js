import { useEffect, useState } from 'react';
import styles from '../styles/page_index.module.css';
import Navbar from '../components/Navbar.js';
import FilterBox from '../components/FilterBox';
import { getAccessToken, renewAccessToken } from '../lib/accessToken';
import { getSubscriptionList } from '../lib/fetchData.js';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  function checkAuthenticated() {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + '/checkAuthenticated', { mode: 'cors', credentials: 'include' })
      .then((response) => {
        if (response.status === 401) {
          response.json().then((data) => {
            window.location.replace(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + data + '?return=' + encodeURIComponent(window.location.origin + window.location.pathname));
          });
        } else {
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (loading) {
    return (<p>Loading...</p>);
  }

  async function getSubs() {
    let test = await getSubscriptionList();
    console.log(test);
  }

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.contentContainer}>
          <div className={styles.filterDivContainer + (filterLoading ? ' '+ styles.disabledDiv : '')}>
            <FilterBox setFilterLoading={setFilterLoading}/>
            <FilterBox setFilterLoading={setFilterLoading}/>
          </div>
          <div className={styles.videosDivContainer}></div>
        </div>
      </div>
    </>
  )
}
