const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/test.sqlite'
})

const RaidTag = sequelize.define('tag', {
  name: {
    type: Sequelize.DataTypes.STRING
  },
})

const Reservation = sequelize.define('reservation', {
  userId: {
    type: Sequelize.DataTypes.INTEGER
  },
  raid: {
    type: Sequelize.DataTypes.STRING
  }
})