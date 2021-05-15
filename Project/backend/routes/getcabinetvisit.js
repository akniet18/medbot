const router = require('express').Router();
let Visit = require('../models/visit.model');
let Patient = require('../models/patient.model');
const week_days = require("../constants/days");
const moment = require('moment');
moment.locale('ru') 

router.get("/", async (req, res) => {
    try {

      var start = new Date();
      start.setHours(6,0,0,0);
    
      var end = new Date();
      end.setHours(29,59,59,999);

      let today_visit_conf = await Visit.find({date_visit: {$gte: start, $lt: end} , doctor_id: parseInt(req.query.doctor) , status: "confirmed"})
      let today_visit_done = await Visit.find({date_visit: {$gte: start, $lt: end} , doctor_id: parseInt(req.query.doctor) , status: "done"})
      let visit_not_conf = await Visit.find({doctor_id: parseInt(req.query.doctor) , status: "not confirmed"})

      let v_n_c = []
      for(v of visit_not_conf){
        const patient = await Patient.findOne({chat_id:v.user_id})
        const visit_day = moment(v.date_visit).format('dddd')
        const visit_time = moment(v.date_visit).format('LT')

        v_n_c.push({
          visit_status:v.status,
          symptoms:v.symptoms,
          visit_day:visit_day,
          visit_time:visit_time,
          patient_comment:v.patient_comment,
          patient_name:patient.firstName,
          patient_surname:patient.lastName,
          patient_age:patient.age,
          patient_sex:patient.sex,
          patient_id:patient.chat_id,
        })
      }

      let t_v_c = []
      for(v of today_visit_conf){
        const patient = await Patient.findOne({chat_id:v.user_id})
        const visit_day = moment(v.date_visit).format('dddd')
        const visit_time = moment(v.date_visit).format('LT')

        t_v_c.push({
          visit_status:v.status,
          visit_day:visit_day,
          visit_time:visit_time,
          patient_name:patient.firstName,
          patient_surname:patient.lastName,
          patient_id:patient.chat_id,
        })
      }
     
      let t_v_d = []
      for(v of today_visit_done){
        const patient = await Patient.findOne({chat_id:v.user_id})
        const visit_day = moment(v.date_visit).format('dddd')
        const visit_time = moment(v.date_visit).format('LT')

        t_v_d.push({
          visit_status:v.status,
          visit_day:visit_day,
          visit_time:visit_time,
          patient_name:patient.firstName,
          patient_surname:patient.lastName,
          patient_id:patient.chat_id,
        })
      }

      res.send({ visit_not_conf:v_n_c,today_visit_conf:t_v_c ,today_visit_conf_count:t_v_c.length, today_visit_done:t_v_d ,today_visit_done_count:t_v_d.length});
    } catch (error) {
      res.send(error);
    }
});


module.exports = router