const router = require('express').Router();
let Analysis = require('../models/analysis.model');



router.get("/", async (req, res) => {
    try {
        let analysis = await Analysis.find({})
        res.send(analysis);

      } catch (error) {
        res.send(error);
      }
})


module.exports = router