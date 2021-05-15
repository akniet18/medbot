const {authenticate} = require('./index')
const {google} = require('googleapis');
const {insertEvent,checkBusy} = require('./actions');


const ids = ['e34fh5nb0p90cskfeab5oim2rc@group.calendar.google.com', 'aau9gemftuj18l8fla1cokboqg@group.calendar.google.com']
async function createEvent(auth,calendar_id) {
    const event = {
        'summary': 'Habr Post Demo',
        'description': calendar_id,
        'start': {
            'dateTime': '2021-05-14T16:00:00+02:00',
            'timeZone': 'Asia/Almaty',
        },
        'end': {
            'dateTime': '2021-05-14T18:00:00+02:00',
            'timeZone': 'Asia/Almaty',
        }
    };

    let calendar = google.calendar('v3');
    await calendar.events.insert({
        auth: auth,
        calendarId: calendar_id,
        resource: event,
    });
}

ids.forEach(async id => {
    const auth = await authenticate()
    console.log(id)
    const isBusy = await checkBusy(auth,'2021-05-12T10:00:00.000Z','2021-05-12T12:00:00.000Z',id)
    console.log(isBusy);
    
    // insertEvent('kek','kek2','2021-05-12T16:00:00','2021-05-12T18:00:00',auth,id)
  })

//   2021-05-10T00:00:00.000Z


// for(let i=0 ;i<=id.length;i++){
//     const auth = await authenticate()
//     console.log(ids[i])
//     createEvent(auth,ids[i])
// }