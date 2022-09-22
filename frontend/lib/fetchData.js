import { getAccessToken, renewAccessToken } from "./accessToken";


export async function getSubscriptionList(){

    let pageToken = null;
    let toReturn = new Array;

    async function getPageOfSubs(pageToken){
        let nextPageToken;
        let accessToken = await getAccessToken();
        let url = "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxSize=10&mine=true"
        if(pageToken !== null) url += ("&pageToken="+pageToken);

        let response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if(response.status === 401 || response.status === 403) {
            await renewAccessToken();
        }
        else {
            response = await response.json();
            
            if(response.nextPageToken === undefined) nextPageToken = 'fin';
            else nextPageToken = response.nextPageToken;

            console.log(JSON.stringify(toReturn, null, 2));

            for(let i in response.items){
                let toPush = Object.create({});
                toPush.title = response.items[i].snippet.title;
                toPush.channelID = response.items[i].snippet.resourceId.channelId;
                console.log('to Push--');
                console.log(toPush);
                toReturn.push(toPush);
            }

            console.log('listgin array -- ');
            console.log(JSON.stringify(toReturn, null, 2));
            console.log('listing array end');

        }

        return nextPageToken;
    }

    
    while(true){
        pageToken = await getPageOfSubs(pageToken);
        if(pageToken === undefined) { // Means something went wrong, start over
            pageToken = null;
            toReturn = new Array;
        }
        else if (pageToken === 'fin') break;
    }

    return toReturn;
}