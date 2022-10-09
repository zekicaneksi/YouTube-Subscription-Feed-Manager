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

            let channels = Object.values(response.items).map(({ snippet }) => ({
                title: snippet.title,
                channelID: snippet.resourceId.channelId
            }));

            for(let index in channels){
                toReturn.push(channels[index]);
            }

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