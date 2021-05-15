const router = require('express').Router();
let Visit = require('../models/visit.model');



router.get("/", async (req, res) => {
    try {

        var date = new Date();
        var firstDay = new Date(new Date(date.getFullYear(), date.getMonth(), 1));
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        console.log(firstDay)
        console.log(lastDay)

        
        let today_visit = await Visit.find({date_visit: {$gte: firstDay, $lt: lastDay} , doctor_id: parseInt(req.query.doctor) , status: "confirmed"})
        console.log(today_visit)

        res.send(today_visit);

        } catch (error) {
        res.send(error);
    }
});


module.exports = router