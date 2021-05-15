const router = require('express').Router();
let Visit = require('../models/visit.model');



router.get("/", async (req, res) => {
    try {


      let today_visit = await Visit.find({doctor_id: parseInt(req.query.doctor) , status: "not confirmed"})
      console.log(today_visit)

      res.send(today_visit);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router