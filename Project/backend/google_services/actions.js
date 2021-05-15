const {google} = require('googleapis');

async function checkBusy(auth, startDate, endDate,calendar_id){
    // let calendar = google.calendar('v3');
    let calendar = google.calendar( {version: 'v3', auth:auth});
   
    return new Promise(function(resolve, reject) {
        calendar.freebusy.query({
            // auth: auth,
            // calendarId:calendar_id,
            resource:{
                timeZone:'Asia/Almaty',
                timeMin:startDate,
                timeMax:endDate,
                items:[{ id: calendar_id}]
            },
        },(err,res)=>{
            if(err) return console.log('free busy query :' + err)

            const eventsArr = res.data.calendars[calendar_id].busy
            let isBusy
            if(eventsArr.length===0){
                isBusy = false
            }else{
                isBusy = true
            }

            resolve(isBusy)
    
            // console.log("TIME IS BUSY")
            // console.log(eventsArr)
            // return true
        })
      });   
}

function insertEvent(name,description,startDate,endDate,auth,calendar_id){
    const event ={
        summary:name,
        description:description,
        start:{
            dateTime:startDate,
            timeZone: 'Asia/Almaty'
        },
        end:{
            dateTime:endDate,
            timeZone: 'Asia/Almaty'
        },
        colorId:1,
    }

    let calendar = google.calendar('v3');
    calendar.events.insert(
        {
            auth: auth,
            calendarId:calendar_id,
            resource:event
        },
        err=>{
            if(err) return console.log('error in inserting event :'+ err)

            return console.log('Event is created ')
        }
    )

}


module.exports = {
    checkBusy,
    insertEvent
};