module.exports = app => {
    const workTime = require("../controllers/workTime.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/start", workTime.startTime);
    router.post("/end", workTime.endTime);
    router.get("/todayworktime", workTime.todayWorkTime);
   
    app.use('/api/worktime', router);
  };