import {Mutex} from 'async-mutex';

const mutex = new Mutex();
let accessToken = '';
let errorCount = 0; // If reaches 2 it means server can't give valid access tokens, and relogin is needed.

function logout(){
    fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/logout', { mode: 'cors', credentials: 'include'})
    .then((response) => {window.location.replace('/')});
}

export async function getAccessToken(){
    await mutex.runExclusive(async () => {}); // Wait if mutex is in use
    return accessToken;
}

export async function renewAccessToken(){
    await mutex.runExclusive(async () => {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_ADDRESS+'/getAcessToken', { mode: 'cors', credentials: 'include'})
        .then(response => response.json()).then((data) => {
            if(data === 'error'){
                errorCount++;
                if(errorCount === 3){
                    logout();
                }
            }
            accessToken=data
        });
    });
    return accessToken;
}