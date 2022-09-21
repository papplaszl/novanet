require("dotenv").config();
const db = require("../models");
const WorkTime = db.workTime;
const User = db.users;
const Op = db.Sequelize.Op;

exports.startTime = async (req, res) => {
    try {
      // hash the password
      /*console.log(Object.keys(req.body)[0]);
      var objKeys = Object.keys(req.body)[0];
      
      if((objKeys.charAt(objKeys.length - 1)) != "}"){
        objKeys = objKeys + '"}';
      }*/
      var bodyJson = JSON.parse(Object.keys(req.body)[0]);
      console.log(bodyJson);
      console.log(bodyJson.userId);
      console.log(bodyJson.qrCode);
      var user;
      if(bodyJson.userId == 0 && bodyJson.qrCode != undefined){
       user = await User.findOne({where:{ workQrCode: bodyJson.qrCode }});
       

      }else{
        user = await User.findOne({where:{ id: bodyJson.userId }});
      }
      var userName = user.name;
      if(user.workStatus == 0){
        res.status(201).send({"userName": userName});
      }else{

       
        var userId = user.id;
  
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let hours = date_ob.getHours();
        let year = date_ob.getFullYear();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
  
       /* var objKeys = Object.keys(req.body)[0];
      
      if((objKeys.charAt(objKeys.length - 1)) != "}"){
        objKeys = objKeys + '"}';
      }
  
      var bodyJson = JSON.parse(objKeys);*/
  
      
        const worktime = {
         
          user_id: userId,
          workday:  year + "-" + month + "-" + date,
          starttime: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
          
        };
  
       
  
       WorkTime.create(worktime)
        .then(data => {
          User.update({"workStatus": 0}, {
            where: { id: user.id }
          })
          res.send({"userName": userName});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });


        
      }

      

     
    
     
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  exports.endTime = async (req, res) => {
    try {
      // hash the password
      /*console.log(Object.keys(req.body)[0]);
      var objKeys = Object.keys(req.body)[0];
      
      if((objKeys.charAt(objKeys.length - 1)) != "}"){
        objKeys = objKeys + '"}';
      }*/
      var bodyJson = JSON.parse(Object.keys(req.body)[0]);
      var user;
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let hours = date_ob.getHours();
      let year = date_ob.getFullYear();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();

      if(bodyJson.userId == 0 && bodyJson.qrCode != undefined){
        user = await User.findOne({where:{ workQrCode: bodyJson.qrCode }});
 
       }else{
         user = await User.findOne({where:{ id: bodyJson.userId }});
       }

       var userId = user.id;

      var workTime = await WorkTime.findOne({where:{ workday: year + "-" + month + "-" + date, user_id: userId },  order: [['starttime', 'DESC']] });
      
      
      var userName = user.name;
      if(user.workStatus == 2 || workTime.endTime != null){
        res.status(201).send({"userName": userName});
      }else{

       
        
      workTime.endTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  
       
  
       /* var objKeys = Object.keys(req.body)[0];
      
      if((objKeys.charAt(objKeys.length - 1)) != "}"){
        objKeys = objKeys + '"}';
      }
  
      var bodyJson = JSON.parse(objKeys);*/
  
      
        /*const worktime = {
         
          user_id: userId,
          workday:  year + "-" + month + "-" + date,
          starttime: year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
          
        };*/
  
       
  
      WorkTime.update({"endtime":  workTime.endTime},
        {
          where: {id: workTime.id}
        })
        .then(data => {
          User.update({"workStatus": 2}, {
            where: { id: user.id }
          })
          res.send({"userName": userName});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        }); 
      }
     
    } catch (error) {
      console.log(error)
      res.status(400).json({ error });
    }
  };

  exports.todayWorkTime = (req, res) => {

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let hours = date_ob.getHours();
    let year = date_ob.getFullYear();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const userId = req.query.id;  
      WorkTime.findAll( {where: {user_id: userId,   workday: year + "-" + month + "-" + date} })
        .then(data => {
          if (data) {
           res.send(data);
          } else {
            res.status(404).send({
              message: `Cannot find Tutorial with id=${api_token}.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Tutorial with id=" + id
          });
        });
  };