module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todo", {
      username: {
        type: Sequelize.STRING
      },
      reminder: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
    });
    return Todo;
  };