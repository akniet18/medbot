const router = require('express').Router();
let Visit = require('../models/visit.model');
let Doctor = require('../models/doctor.model');
let Patient = require('../models/patient.model');

const { Telegraf } = require("telegraf");
const {getFormattedDate} = require("../controllers/dateformat");
const {authenticate} = require('../google_services/index')
const {google} = require('googleapis');
const week_days = require("../constants/days");
const {insertEvent,checkBusy} = require('../google_services/actions');
const moment = require('moment');
moment.locale('ru') 

let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {    
        const auth = await authenticate()
        const doctor = await Doctor.findOne({id:parseInt(req.body.doctor_id)})
        const patient = await Patient.findOne({chat_id:parseInt(req.body.user_id)})

        const calendar_id = doctor.calendar_id
        const name = patient.firstName + ' '+ patient.lastName
        const time = req.body.date_visit.time.split('-')
        const start_hour = time[0].split(':')[0];
        const finish_hour = time[1].split(':')[0];
        const start_minute = time[0].split(':')[1];
        const finish_minute = time[1].split(':')[1];

        const day = req.body.date_visit.day;
        const numberOfWeek = week_days.find(({name})=>name===day).number
        
        const startDate = moment().startOf('week').add(numberOfWeek,'days').toDate()
        const endDate = moment().startOf('week').add(numberOfWeek,'days').toDate()

        startDate.setHours(start_hour)
        startDate.setMinutes(start_minute)

        endDate.setHours(finish_hour)
        endDate.setMinutes(finish_minute)

        const isBusy = await checkBusy(auth,startDate,endDate,calendar_id)
        console.log(isBusy);

        if(isBusy){
            res.status(200).send({
                message:'На это время уже есть запись, пожалуйста выберите другое время'
            });
        }else{
            insertEvent(name,'',startDate,endDate,auth,calendar_id)

            const new_visit = new Visit({
                user_id: req.body.user_id,
                doctor_id: req.body.doctor_id,
                symptoms: req.body.symptoms,
                date_visit: startDate,
                predicted_diseases: req.body.disease,
            })
    
            new_visit.save((err, saved) => {
            if (err){
                console.log(err)
            }});

            let dt = getFormattedDate(startDate);

            MedBot.telegram.sendMessage(req.body.user_id, `Вы записались на ${dt}\nЕсли у Вас какие либо аллергии, хронические болезни или что-либо, что доктору важно знать?`);
            patient.all_ok = 2
            patient.save()

            res.status(200).send({
                message:'Вы успешно записаны!'
            });

        }
        
     
        // res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router