const router = require('express').Router();
let Visit = require('../models/visit.model');



router.get("/", async (req, res) => {
    try {

        // function getMonday(d) {
        //     d = new Date(d);
        //     var day = d.getDay(),
        //         diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        //     return new Date(d.setDate(diff));
        //   }
        // console.log(getMonday(new Date()))

        var curr = new Date; // get current date
        var first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        let today_visit = await Visit.find({date_visit: {$gte: firstday, $lt: lastday} , doctor_id: parseInt(req.query.doctor) , status: "confirmed"})
        console.log(today_visit)

        res.send(today_visit);
    } catch (error) {
        res.send(error);
    }
});


module.exports = router