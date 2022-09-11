import Axios from 'axios';

export default async function handler(req, res) {

    let responseToReturn='';
    
    await Axios.get(process.env.BACKEND_ADDRESS + '/test')
    .then(function (response) {
        // handle success
        responseToReturn = response.data;
    })
    .catch(function (error) {
        // handle error
        console.log("server is not responding" + error);
    })
    .then(function () {
        // always executed
    });

    res.end(JSON.stringify(responseToReturn));
}