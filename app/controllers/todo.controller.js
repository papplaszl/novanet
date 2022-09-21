require("dotenv").config();
const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

// Index Route with isLoggedIn middleware
exports.getIsLoggedIn = async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    //send all todos with that user
    Todo.findAll({ where: { username} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
  
  };
  
  // Show Route with isLoggedIn middleware
  exports.getId = async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    const id = req.params.id; // get id from params
    
    Todo.findOne({ where: { username, id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

  };
  
  // create Route with isLoggedIn middleware
  exports.postIsLoggedIn =async (req, res) => {
   // const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    //req.body.username = username; // add username property to req.body
    //create new todo and send it in response
    /*if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }*/
    // Create a Tutorial
    const todo = {
      username: "username",
      reminder: "req.body.reminder",
      completed: false,
    };
    // Save Tutorial in the database
    Todo.create(todo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };
  
  // update Route with isLoggedIn middleware
  exports.putId = async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    req.body.username = username; // add username property to req.body
    const _id = req.params.id;
    //update todo with same id if belongs to logged in User
    const id = req.params.id;
    Todo.update(req.body, {
      where: { id: _id, username }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
  
  // update Route with isLoggedIn middleware
  exports.deleteId = async (req, res) => {
    const { username } = req.user; // get username from req.user property created by isLoggedIn middleware
    const _id = req.params.id;
    //remove todo with same id if belongs to logged in User
    Todo.destroy({
      where: { id: _id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };
  