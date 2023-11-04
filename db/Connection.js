const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_CONNECTION
})

module.exports = {
  sequelize
}