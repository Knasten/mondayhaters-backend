const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/test.sqlite'
})

const User = sequelize.define('user', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  discord_id: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  isMember: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  include: []
})

User.sync().then(() => {
  console.log('USER: Model and table succesful sync')
}).catch(e => {
  console.error('USER: Error syncing data')
})

module.exports = { User, sequelize }