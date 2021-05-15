const router = require('express').Router();
let Visit = require('../models/visit.model');



router.get("/", async (req, res) => {
    try {

      var start = new Date();
      start.setHours(0,0,0,0);
      
      var end = new Date();
      end.setHours(23,59,59,999);


      let today_visit = await Visit.find({date_visit: {$gte: start, $lt: end} , doctor_id: parseInt(req.query.doctor) , status: "done"})
      
      res.send(today_visit);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router