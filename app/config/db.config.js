module.exports = {
    HOST: "novanet.cigcgo7gc9zy.eu-west-3.rds.amazonaws.com", 
    PORT: '3306',
    USER: "admin",
    PASSWORD: "NovaNetServer2022",
    DB: "novanet",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };