require("dotenv").config();
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { BOOLEAN, INTEGER } = require("sequelize");

const { SECRET = "secret" } = process.env;

exports.singup = async (req, res) => {
  try {
    // hash the password

    const crypto = require('crypto')

const generatePassword = (
  length = 20,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('')


    console.log(Object.keys(req.body)[0]);
    var objKeys = Object.keys(req.body)[0];
    console.log(req.body);

    if((objKeys.charAt(objKeys.length - 1)) != "}"){
      objKeys = objKeys + '"}';
    }
    console.log(objKeys);
    var bodyJson = JSON.parse(objKeys);
    const qrCode = generatePassword();
    let newUserData = {"workQrCode" : qrCode };
    bodyJson["workQrCode"] = qrCode;
    console.log(bodyJson);


    bodyJson.password = await bcrypt.hash(bodyJson.password, 10);
    // create a new user
    const user = await User.create(bodyJson);
    // send new user as response
    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
};


exports.create = (req, res) => {
    // Create a Tutorial
    const user = {
      username: req.body.username,
      name: req.body.name,
      published: req.body.published ? req.body.published : false,
      password: req.body.password
    };
    // Save Tutorial in the database
    User.create(user)
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

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    User.findAll({ where: condition })
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
// Find a single Tutorial with an id
exports.findOne = (req, res) => {


  const id = req.query.id;
    User.findOne( {where: {id} })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

exports.findOneInApiToken = (req, res) => {

  var bodyJson = JSON.parse(Object.keys(req.body)[0]);
  const api_token = bodyJson.api_token;
  console.log(api_token);
    User.findOne( {where: {api_token} })
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
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
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
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
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
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred"
      });
    });
};


exports.login = async  (req, res) => {
  try {
    // check if the user exists
    var bodyJson = JSON.parse(Object.keys(req.body)[0]);
    const user = await User.findOne({where:{ username: bodyJson.username }});
    console.log(user);
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(bodyJson.password, user.password);
      if (result) {
        // sign token and send it in response
        const api_token = await jwt.sign({ username: user.username }, SECRET);
        User.update({api_token}, {where: { id: user.id }});
        res.json({ api_token, "USERID" : user.id, "QRCODE" : user.workQrCode, "userRole": user.role});
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }

};
