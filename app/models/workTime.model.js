const { ENUM } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const WorkTime = sequelize.define("worktime", {
      workday: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      starttime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      endtime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      stoptype: {
        type: ENUM (['stop', 'pause'])
        
      }
    });
    return WorkTime;
  };