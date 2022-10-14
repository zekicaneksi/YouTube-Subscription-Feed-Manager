import { useEffect, useState } from 'react';
import styles from '../styles/page_index.module.css';
import Navbar from '../components/Navbar.js';
import FilterBox from '../components/FilterBox';
import { getPageOfSubs } from '../lib/fetchData.js';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);
  const [subsData, setSubsData] = useState({uncheckedData: [], checkedData: []});
  const [categoriesData, setCategoriesData] = useState({uncheckedData: [], checkedData: []});


  async function getSubscriptionList() {
    let values = [];
    let response = {nextPageToken: null, values: new Array};

    while (true) {
      response = await getPageOfSubs(response.nextPageToken);
      if (response.nextPageToken === undefined) { // Means something went wrong, start over
        response.nextPageToken = null;
      }
      else {
        // prepare the data for FilterBox
        for (let i = 0; i < response.values.length; i++) {
          response.values[i].value = response.values[i].title;
          response.values[i].checked = false;
          values.push(response.values[i]);
        }
        setSubsData((before) => {
          let after = { ...before };
          after.uncheckedData = values;
          return after;
        });
      }
      
      if (response.nextPageToken === 'fin') break;
    }

    return values;
    
  }

  async function getData(){
    
    let subsList = await getSubscriptionList();
    getDummyData2();
    setFilterLoading(false);
  }

  function checkAuthenticated() {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + '/checkAuthenticated', { mode: 'cors', credentials: 'include' })
      .then((response) => {
        if (response.status === 401) {
          response.json().then((data) => {
            window.location.replace(process.env.NEXT_PUBLIC_BACKEND_ADDRESS + data + '?return=' + encodeURIComponent(window.location.origin + window.location.pathname));
          });
        } else {
          setLoading(false);
          getData();
        }
      });
  }

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (loading) {
    return (<p>Loading...</p>);
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

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.contentContainer}>
          <div className={styles.filterDivContainer + (filterLoading ? ' '+ styles.disabledDiv : '')}>
            <FilterBox data={subsData} setData={setSubsData}/>
            <FilterBox data={categoriesData} setData={setCategoriesData}/>
          </div>
          <div className={styles.videosDivContainer}></div>
        </div>
      </div>
    </>
  )
}
