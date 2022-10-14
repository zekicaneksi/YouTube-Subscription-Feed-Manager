import { useEffect, useState } from 'react';
import styles from '../styles/page_index.module.css';
import Navbar from '../components/Navbar.js';
import FilterBox from '../components/FilterBox';
import { getSubscriptionList } from '../lib/fetchData.js';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [subsData, setSubsData] = useState({uncheckedData: [], checkedData: []});
  const [categoriesData, setCategoriesData] = useState({uncheckedData: [], checkedData: []});

  function checkAuthenticated() {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + '/checkAuthenticated', { mode: 'cors', credentials: 'include' })
      .then((response) => {
        if (response.status === 401) {
          response.json().then((data) => {
            window.location.replace(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + data + '?return=' + encodeURIComponent(window.location.origin + window.location.pathname));
          });
        } else {
          setLoading(false);

          getDummyData();
          getDummyData2();
        }
      });
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (loading) {
    return (<p>Loading...</p>);
  }

  async function getDummyData() {
    let toReturn = [];
    for (let i = 0; i < 50; i++) {
      let toPush = Object.create({});
      toPush.value = "data" + i;
      toPush.checked = false;
      toReturn.push(toPush);
    }

    setSubsData((before) => {
      let after = { ...before };
      after.uncheckedData = toReturn;
      return after;
    });
  }
  
  async function getDummyData2() {
    let toReturn = [];
    for (let i = 0; i < 50; i++) {
      let toPush = Object.create({});
      toPush.value = "data" + i;
      toPush.checked = false;
      toReturn.push(toPush);
    }

    setCategoriesData((before) => {
      let after = { ...before };
      after.uncheckedData = toReturn;
      return after;
    });
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
            <FilterBox setFilterLoading={setFilterLoading} data={subsData} setData={setSubsData}/>
            <FilterBox setFilterLoading={setFilterLoading} data={categoriesData} setData={setCategoriesData}/>
          </div>
          <div className={styles.videosDivContainer}></div>
        </div>
      </div>
    </>
  )
}
