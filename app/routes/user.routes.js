module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", users.create);
    // Retrieve all Tutorials
    router.get("/", users.findAll);
    // Retrieve all published Tutorials
    router.get("/published", users.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/find_one", users.findOne);
    router.post("/login", users.login);
    router.post("/api_token", users.findOneInApiToken);
    
    // Update a Tutorial with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
    // Delete all Tutorials
    router.delete("/", users.deleteAll);

   
    router.post("/singup", users.singup);
    app.use('/api/users', router);
  };