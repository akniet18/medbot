const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");


let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {
        console.log(req.body.user_id)

        let visit = await Visit.findOne({user_id: req.body.user_id , doctor_id: req.body.doctor_id , status: "confirmed"})
        visit.status = "done"

        await visit.save();

        // MedBot.telegram.sendMessage(req.body.user_id, 'Визит окончен');

        res.sendStatus(200);
        } catch (error) {
        res.send(error);
        }
});


module.exports = router