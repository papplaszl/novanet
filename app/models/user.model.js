const { ENUM } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      workPassword: {
        type: Sequelize.STRING
      },
      workQrCode: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      role: {
        type: ENUM (['employed', 'admin', 'superAdmin', 'cableCut']),
        defaultValue: 'employed'
      },
      password: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      api_token: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING
      },
      workStatus: {
        type: Sequelize.SMALLINT,
        defaultValue: 2
        
      }
    });
    return User;
  };