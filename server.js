const express = require("express");
const bodyPatser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const crypto = require("crypto");
const {createContext} = require("./app/middleware/middleware");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyPatser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyPatser.urlencoded({ extended: true }));
app.use(createContext);


const db = require("./app/models");

db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/todo.routes")(app);
require("./app/routes/workTime.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});