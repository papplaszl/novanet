module.exports = app => {
    const todos = require("../controllers/todo.controller.js");
    var router = require("express").Router();
    const { isLoggedIn } = require("../middleware/middleware");
   
    router.get("/", isLoggedIn, todos.getIsLoggedIn);
   
    router.get("/:id", isLoggedIn, todos.getId);
   
    router.post("/", todos.postIsLoggedIn);
   
    router.put("/:id", isLoggedIn, todos.putId);

    router.delete("/:id", isLoggedIn, todos.deleteId);
    app.use('/api/todos', router);
  };