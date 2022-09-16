import { getAccessToken, renewAccessToken } from "./accessToken";

export async function getSubscriptionList(){

    let pageToken = null;
    let toReturn = [];

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
            for(let i in response.items){
                toReturn.push(response.items[i].snippet.title);
            }
        }

        return nextPageToken;
    }

    
    while(true){
        pageToken = await getPageOfSubs(pageToken);
        if(pageToken === undefined) { // Means something went wrong, start over
            pageToken = null;
            toReturn = [];
        }
        else if (pageToken === 'fin') break;
    }

    return toReturn;
}