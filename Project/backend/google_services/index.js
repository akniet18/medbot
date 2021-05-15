const fs = require('fs');
const {google} = require('googleapis');

const KEYFILE = __dirname+'/../config/keys.json'; // path to JSON with private key been downloaded from Google
const SCOPE_CALENDAR = 'https://www.googleapis.com/auth/calendar'; // authorization scopes
const SCOPE_EVENTS = 'https://www.googleapis.com/auth/calendar.events';

async function authenticate() {
    const content = fs.readFileSync(KEYFILE);
    key = JSON.parse(content.toString());
    const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        [SCOPE_CALENDAR, SCOPE_EVENTS]
    );
    await jwtClient.authorize();
    return jwtClient;
}

module.exports = {
    authenticate
};

// async function run() {
//     // INNER FUNCTIONS
//     async function readPrivateKey() {
//         const content = fs.readFileSync(KEYFILE);
//         return JSON.parse(content.toString());
//     }

//     async function authenticate(key) {
//         const jwtClient = new google.auth.JWT(
//             key.client_email,
//             null,
//             key.private_key,
//             [SCOPE_CALENDAR, SCOPE_EVENTS]
//         );
//         await jwtClient.authorize();
//         return jwtClient;
//     }

//     async function createEvent(auth) {
//         const event = {
//             'summary': 'Habr Post Demo',
//             'description': 'Тест Google Calendar API.',
//             'start': {
//                 'dateTime': '2021-05-14T16:00:00+02:00',
//                 'timeZone': 'Asia/Almaty',
//             },
//             'end': {
//                 'dateTime': '2021-05-14T18:00:00+02:00',
//                 'timeZone': 'Asia/Almaty',
//             }
//         };

//         let calendar = google.calendar('v3');
//         await calendar.events.insert({
//             auth: auth,
//             calendarId: CALENDAR_ID,
//             resource: event,
//         });
//     }

//     // MAIN
//     try {
//         const key = await readPrivateKey();
//         const auth = await authenticate(key);
//         // await createEvent(auth);
//     } catch (e) {
//         console.log('Error: ' + e);
//     }
// };
