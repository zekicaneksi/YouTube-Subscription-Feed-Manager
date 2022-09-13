import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar(props){

    const [userInfo, setUserInfo] = useState(null);

    function getUserInfo(){
        fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/getUserInfo', {mode: 'cors', credentials: 'include'})
        .then((response) => response.json()).then((data) => {setUserInfo(data)});
    }

    function logout(){
        fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/logout', { mode: 'cors', credentials: 'include'})
        .then((response) => {window.location.replace('/')});
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return(
        <div className={styles.container}>
           {userInfo && (
            <>
                <div className={styles.flexDivColumn}>
                    <div className={styles.flexDiv}>
                        <p className={styles.name}>{userInfo.name}</p>
                        <img className={styles.image} src={userInfo.picture} referrerPolicy="no-referrer"/>
                    </div>
                    <div className={styles.dropDown}>
                        <p className={[styles.textCenter, styles.dropDownItem].join(' ')}
                        onClick={logout}>Logout</p>
                    </div>
                </div>
            </>
           )} 
        </div>
    );
}