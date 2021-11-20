
// From the in class exercise:

function queryArtist() {
    let params = (new URL(document.location)).searchParams;
    if (params.has('artist')) {
        let artistName = params.get('artist');
        let mbBaseURL = "https://musicbrainz.org/ws/2/";
        let mbResource = "artist?query=";
        let queryURL = mbBaseURL + mbResource + artistName;
        httpGet(queryURL, getMBID);
    }
}

function httpGet(theURL, cbFunction) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theURL);
    xmlHttp.send();
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cbFunction(this);
        }
    };
}

// modified from in class exercise
function getMBID(xhttp) {
    let retrievedData = xhttp.responseXML; 
    console.log(retrievedData);

    let artistData = retrievedData.getElementsByTagName('artist')[0];
    console.log(artistData);
    let artistName = artistData.getElementsByTagName('name')[0].innerHTML; 
    console.log(artistName);
    let artistMBID = artistData.id;
    console.log(artistMBID);

    queryAlbums(artistMBID);



function queryAlbums() {
       
        let mbBaseURL = 'https://musicbrainz.org/ws/2/';
        let mbResource = 'release-group?artist=';
        let mbType = '&type=album|ep';
        let queryURL = mbBaseURL + mbResource + artistMBID + mbType;
        httpGet(queryURL, getDisco);
    }
}


// retrieve and table 
function getDisco(xhttp) {
    let retrievedData = xhttp.responseXML;
    let albums = retrievedData.getElementsByTagName('release-group');

    let theList = '<tr><th>Album Name</th><th>First Release Date</th></tr>';
    let discoTable = document.getElementById('disco_table');
    

    for (i = 0; i < albums.length; i++){
    let albumCall = albums[i];
    let albumNames = albumCall.getElementsByTagName('title')[0].innerHTML;
    let releaseDates = albumCall.getElementsByTagName('first-release-date')[0].innerHTML;
    theList += `<tr><td>${albumNames}</td><td>${releaseDates}</td></tr>`;
}


discoTable.innerHTML=theList;


}


window.onload = queryArtist;
