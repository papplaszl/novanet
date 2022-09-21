const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
  operatorsAliases: false,
  dialectOptions: {
    ssl:'Amazon RDS'
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model.js")(sequelize, Sequelize);
db.todos = require("./todo.model.js")(sequelize, Sequelize);
db.workTime = require("./workTime.model.js")(sequelize, Sequelize);
db.users.hasMany(db.workTime, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
module.exports = db;