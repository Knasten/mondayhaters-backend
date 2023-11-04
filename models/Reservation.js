const Sequelize = require('sequelize')
const {sequelize} = require('./Connection')

const Reservation = sequelize.define('reservation', {
  raid: {
    type: Sequelize.DataTypes.STRING,
    unique: true
  },
  100: {
    type: Sequelize.DataTypes.INTEGER
  },
  90: {
    type: Sequelize.DataTypes.INTEGER
  },
  80: {
    type: Sequelize.DataTypes.INTEGER
  },
  70: {
    type: Sequelize.DataTypes.INTEGER
  },
  60: {
    type: Sequelize.DataTypes.INTEGER
  },
  55: {
    type: Sequelize.DataTypes.INTEGER
  },
  50: {
    type: Sequelize.DataTypes.INTEGER
  },
})

Reservation.sync({force:true}).then(() => {
  console.log('RESERVATION: Success')
}).catch(e => {
  console.error('RESERVATION: Error when syncing')
})

module.exports = { Reservation, sequelize }