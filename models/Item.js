const Sequelize = require('sequelize')
const {sequelize} = require('../db/Connection')

const Item = sequelize.define('item', {
  // This will be added by the user upon adding items
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  // This will be added by the user upon adding items
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  // This will not be added by the user upon adding items instead we will look upon quality of item if legendary it will be false
  isLootable: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  // This will be added by the user upon adding items
  droppedBy: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  // This will be added by the user upon adding items
  quality: {
    type: Sequelize.DataTypes.STRING,
    defaultValue: 'Epic'
  },
  // This will be added by the user upon adding items
  raid: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true
});

Item.sync().then(() => {
  console.log('ITEM: Success')
}).catch(e => {
  console.error('Error syncing data')
})

module.exports = { Item };