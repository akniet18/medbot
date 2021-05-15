const router = require('express').Router();
const url = require('url');
let Doctor = require('../models/doctor.model');
let Spec = require('../models/specialization.model');
let Patient = require('../models/patient.model');
let Visit = require('../models/visit.model');
const week_days = require("../constants/days");
const moment = require('moment');
moment.locale('ru') 


router.get("/", async (req, res) => {
  console.log(req.query)
    try {
        
        let doctor = await Doctor.findOne({id:parseInt(req.query.doctor)})
        let patient = await Patient.findOne({chat_id:parseInt(req.query.user)})
        let spec = []
        let timetable = []

        const timetable_time = doctor.timetable_time.split('/')

        for(period of timetable_time){
          const days = period.split(' ')[0].split(',')
          const time = period.split(' ')[1]

          for(d of days){
            const dayOfWeek = week_days.find(({short_name})=>short_name===d).name
            timetable.push({
              time:time,
              day:dayOfWeek
            })
          } 
        }

        let nextWeek = []
        let thisWeek = []
        const currentTime = new Date().getTime()
        const today = moment(currentTime).format('dddd')
        const currentDayNumber = week_days.find(({name})=>name===today[0].toUpperCase()+today.slice(1)).number
        for(t of timetable){          
          const end = t.time.split('-')[1]
          const numberOfWeek = week_days.find(({name})=>name===t.day).number

          const b = moment().startOf('week').add(numberOfWeek,'days').toDate()
          b.setHours(end.split(':')[0],end.split(':')[1],0)
          
          if(currentDayNumber>=numberOfWeek){
              if(currentTime>=b.getTime()-600000){
                  nextWeek.push(numberOfWeek)
              }else{
                  thisWeek.push(numberOfWeek)
              }
          }else{
              thisWeek.push(numberOfWeek)
          }
          
        }
        const final_timetable =[]
        for(t of timetable){
          const start = t.time.split('-')[0]
          const end = t.time.split('-')[1]
          const startHours = parseInt(start.split(':')[0])
          const startMinutes = parseInt(start.split(':')[1])
          const numberOfWeek = week_days.find(({name})=>name===t.day).number
  
          const a = moment().startOf('week').add(numberOfWeek,'days').toDate()
          const b = moment().startOf('week').add(numberOfWeek,'days').toDate()
          a.setHours(start.split(':')[0],start.split(':')[1],0)
          b.setHours(end.split(':')[0],end.split(':')[1],0)
          const range = (b.getTime()-a.getTime())/1000/60
          let rangeArr = []
          for (let i = 0; i < range; i+=30) {
              rangeArr.push(i);
          }

          if(thisWeek.length>0 && thisWeek.includes(numberOfWeek)){
              let oneDay = await Promise.all(rangeArr.map(async (range)=>{
                //   let result = []
                  let temp =new Date()
                  let temp2 =new Date()
                  temp = moment().startOf('week').add(numberOfWeek,'days').toDate()
                  temp2 = moment().startOf('week').add(numberOfWeek,'days').toDate()
  
                  temp.setHours(startHours,startMinutes+range,0)
                  temp2.setHours(startHours,startMinutes+range+30,0)
  
                  let time,time2
                  if(currentTime<temp.getTime()){
                    //форматируем время взятое из даты под формат: 00:03, 12:08, 09:12, чтобы красиво отправить в кнопках
                    if(temp.getHours()<10 && temp.getMinutes()<10){
                        time = '0'+temp.getHours()+":0"+temp.getMinutes() 
                    }else if(temp.getHours()<10){
                        time = '0'+temp.getHours()+":"+temp.getMinutes() 
                    }else if(temp.getMinutes()<10){
                        time = temp.getHours()+":0"+temp.getMinutes() 
                    }else {
                        time = temp.getHours()+":"+temp.getMinutes() 
                    }
                    //форматируем время взятое из даты под формат: 00:03, 12:08, 09:12, чтобы красиво отправить в кнопках
                    if(temp2.getHours()<10 && temp2.getMinutes()<10){
                        time2 = '0'+temp2.getHours()+":0"+temp2.getMinutes() 
                    }else if(temp2.getHours()<10){
                        time2 = '0'+temp2.getHours()+":"+temp2.getMinutes() 
                    }else if(temp2.getMinutes()<10){
                        time2 = temp2.getHours()+":0"+temp2.getMinutes() 
                    }else {
                        time2 = temp2.getHours()+":"+temp2.getMinutes() 
                    }
                    // result.push(time+'-'+time2,t.day)
                    return {time:time+'-'+time2,day:t.day}
                  }
                  
              }));
              final_timetable.push(oneDay)
          }
          else if(thisWeek.length===0){
              let oneDay = await Promise.all(rangeArr.map(async (range)=>{
                //   let result = []
                  let temp =new Date()
                  let temp2 =new Date()
                  temp = moment().startOf('week').add(numberOfWeek+7,'days').toDate()
                  temp2 = moment().startOf('week').add(numberOfWeek+7,'days').toDate()
  
                  temp.setHours(startHours,startMinutes+range,0)
                  temp2.setHours(startHours,startMinutes+range+30,0)

                  let time,time2
                  if(currentTime<temp.getTime()){
                    //форматируем время взятое из даты под формат: 00:03, 12:08, 09:12, чтобы красиво отправить в кнопках
                    if(temp.getHours()<10 && temp.getMinutes()<10){
                        time = '0'+temp.getHours()+":0"+temp.getMinutes() 
                    }else if(temp.getHours()<10){
                        time = '0'+temp.getHours()+":"+temp.getMinutes() 
                    }else if(temp.getMinutes()<10){
                        time = temp.getHours()+":0"+temp.getMinutes() 
                    }else {
                        time = temp.getHours()+":"+temp.getMinutes() 
                    }
                    //форматируем время взятое из даты под формат: 00:03, 12:08, 09:12, чтобы красиво отправить в кнопках
                    if(temp2.getHours()<10 && temp2.getMinutes()<10){
                        time2 = '0'+temp2.getHours()+":0"+temp2.getMinutes() 
                    }else if(temp2.getHours()<10){
                        time2 = '0'+temp2.getHours()+":"+temp2.getMinutes() 
                    }else if(temp2.getMinutes()<10){
                        time2 = temp2.getHours()+":0"+temp2.getMinutes() 
                    }else {
                        time2 = temp2.getHours()+":"+temp2.getMinutes() 
                    }                    
                    // result.push(time+'-'+time2,t.day)
                    return {time:time+'-'+time2,day:t.day};
                  }
                  
              }));
              final_timetable.push(oneDay)

          }
        }
        var filtered = final_timetable.flat().filter(function (el) {
            return el != null;
          });

        for (var i = 0; i < doctor.specialization_ids.length; i++) {          
          let s = await Spec.findOne({id: parseInt(doctor.specialization_ids[i])});
          spec.push(s.name);
        }

        let visit_conf = await Visit.findOne({doctor_id: parseInt(req.query.doctor), user_id:parseInt(req.query.user), status: "confirmed"});
        let visit_not_conf = await Visit.findOne({doctor_id: parseInt(req.query.doctor), user_id:parseInt(req.query.user), status: "not confirmed"});
        // if (visit_conf){
        //   res.send({doctor:doctor,spec:spec, user: patient, visit: visit_conf});
        // }else if (visit_not_conf){
        //   res.send({doctor:doctor,spec:spec, user: patient, visit: visit_not_conf});
        // }else{
        //   res.send({doctor:doctor,spec:spec, user: patient});
        // }
        if (visit_conf || visit_not_conf){
          res.send({doctor:doctor,spec:spec.join(','), user: patient, visit: true, timetable:filtered});
        }else{
          res.send({doctor:doctor,spec:spec.join(','), user: patient, visit: false,timetable:filtered });
        }
      } catch (error) {parseInt(req.query.doctor)
        console.log(error)
        res.send(error);
      }
})













// router.route('/').get((req,res)=>{
//     Doctor.find({ parent: /^\/$/}, function (err, docs) {
//         res.json(docs)
//         })
// })

// router.route('/*').get((req,res)=>{
//     var path = url.parse(req.url).pathname;
//     path = path.slice(1);
//     specialization = path.split('/')[0];
//     id = path.split('/')[1];
//     let doc;
//     if(path.split('/').length == 1){
//         Doctor.find({ specialization_ids: new RegExp('^/' + specialization+'$' )}, function (err, docs) {
//         res.json(docs)
//         })
//     }
//     if(path.split('/').length == 2){
//         // Doctor.findOne({ id: id}, function (err, docs) {
//         // res.json(docs)
//         // console.log(docs)
//         // })
//         Doctor.findOne(function (err, docs) {
//         res.json(docs)
//         console.log(docs)
//         })
//     }
// })

// router.route('/addDoctor').post((req,res)=>{
//     const name = req.body.name;
//     const category = req.body.category;
//     const parent = req.body.parent
//     const newDoctor = new Doctor({name,parent,category})
//             newDoctor.save()
//             .then(()=>res.json('doctor added'))
//             .catch(err=>res.status(400).json('Error '+err))
// })

module.exports = router