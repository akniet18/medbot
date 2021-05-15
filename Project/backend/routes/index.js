const express = require("express");
const router = express.Router();

router.use("/", require("./temp"));

router.use("/getdoctors", require("./getdoctors"));
router.use("/getanalysis", require("./getanalysis"));

router.use("/changetodone", require("./changetodone"));
router.use("/changetocancel", require("./changetocancel"));
router.use("/savevisit", require("./savevisit"));
router.use("/confirmvisit", require("./confirmvisit"));

router.use("/getdonevisittoday", require("./getdonevisittoday"));

router.use("/getconfirmedvisittoday", require("./getconfirmedvisittoday"));
router.use("/getconfirmedvisitweek", require("./getconfirmedvisitweek"));
router.use("/getconfirmedvisitmonth", require("./getconfirmedvisitmonth"));

router.use("/getnotconfirmedvisit", require("./getnotconfirmedvisit"));

router.use("/getcabinetvisit", require("./getcabinetvisit"));


module.exports = router;