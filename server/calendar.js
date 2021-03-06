const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

var feelings = ["happy", "great"];

var result = {
    "events": []
};

// Load client secrets from a local file.


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  return await new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, async (err, token) => {
      if (err) {
        resolve(await getAccessToken(oAuth2Client, callback));
        return;
      }
      oAuth2Client.setCredentials(JSON.parse(token));
      resolve(await callback(oAuth2Client));
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return await new Promise((resolve, reject) => {
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, async (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      resolve(await callback(oAuth2Client));
    });
  });
  });
}

function eventSentence(event) {
    var start = parseTime(event.start);
    var end = parseTime(event.end);
    var desc = event.description;
    var location = event.location == null ? "" : " at " + event.location.substring(0, event.location.indexOf(","));
    return "From " + start + " to " + end + ", I went to " + desc + " for " + timeDuration(event.start, event.end) + location + ". ";
}

function diaryParagraph(eventArray) {
    var paragraph = [];
    eventArray.forEach(function (item) {
        paragraph.push(eventSentence(item));
    });    

    console.log(eventArray);

    for(var i = 0; i < eventArray.length; ++i){
      if (eventArray[i].description === ('Presentation')) {
        paragraph.push("I feel nervous");
      }
    }

    paragraph.push(getRandomFeeling());
    return paragraph;
}

function getRandomFeeling() {
    var feeling = feelings[Math.floor(Math.random()*feelings.length)];
    return "I feel quite " + feeling + ". ";
}

function parseTime(time) {
    var tiempo = time.substring(11, 19);
    var hour = parseInt(tiempo.substring(0, 2));
    var minute = parseInt(tiempo.substring(3, 5));
    var suffix_string = "AM";
    if(hour >= 12){
        if(hour != 12) hour -= 12;
        suffix_string = "PM";
    }
    else if(hour == 0) hour = 12;
    var hour_string = hour.toString();
    var minute_string = minute.toString();
    if(minute_string.length < 2) minute_string = "0"+minute_string;
    return hour_string + ":" + minute_string + " " + suffix_string;
}

function timeDuration(timeOne, timeTwo) {
    var tiempoOne = timeOne.substring(11, 19);
    var hourOne = parseInt(tiempoOne.substring(0, 2));
    var minuteOne = parseInt(tiempoOne.substring(3, 5));

    var tiempoTwo = timeTwo.substring(11, 19);
    var hourTwo = parseInt(tiempoTwo.substring(0, 2));
    var minuteTwo = parseInt(tiempoTwo.substring(3, 5));

    var minutesTaken = (hourTwo-hourOne)*60+(minuteTwo-minuteOne);
    var hours = parseInt(minutesTaken/60);
    var minutes = minutesTaken%60;

    var nearestFifteen = parseInt((minutes+7)/15)*15;
    if(nearestFifteen == 60){
        nearestFifteen = 0;
        hours++;
    }
    minutes = nearestFifteen;

    if(hours == 0 && minutes == 0) return "5 minutes";
    else if(hours == 0) return minutes + " minutes";
    else if(minutes == 0) return hours + (hours == 1 ? " hour" : " hours");
    else return hours + (hours == 1 ? " hour" : " hours") + " and " + minutes + " minutes";
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  var today_midnight = new Date();
  today_midnight.setDate(today_midnight.getDate());
  today_midnight.setHours(0,0,0,0);
  return await new Promise((resolve, reject) => {
  calendar.events.list({
    calendarId: 'primary',
    timeMin: today_midnight.toISOString(),
    timeMax: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        const end = event.end.dateTime;
        var toAdd = {
            "start": start,
            "end": end,
            "description": event.summary,
            "location": event.location
        };
        result.events.push(toAdd);
      });
    } else {
      console.log('No upcoming events found.');
    }
    resolve(diaryParagraph(result.events));
  });
  });
}


module.exports = {
  main: async function() {
    result = {
      "events": []
    };
    return await new Promise((resolve, reject) => {
    fs.readFile('credentials.json', async (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        resolve(await authorize(JSON.parse(content), listEvents));
    });
    });
  }
}