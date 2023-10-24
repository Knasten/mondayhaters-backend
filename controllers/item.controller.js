const {Item, sequelize} = require('../models/Item');

const addItem = async (itemData) => {
  if (itemData.quality === 'Legendary') {
    itemData.isLootable = false;
  }
  const newItem = await Item.create(itemData);
  if (newItem === null)
    throw new Error({status:'Failed', message: 'Your item could not be added'});
  
  console.log('Everything worked and your item has been added');
  return newItem;
};

const updateItem = async (id, data) => {
  data.isLootable = true;
  if(data.quality === 'Legendary') {
    data.isLootable = false
  }
  const updatedItem = await Item.update(data, {
    where: {
      id,
    }
  })

  return updatedItem;
}

const removeItem = async (id) => {
  return await Item.destroy({
    where: {
      id,
    }
  });
};

const getItems = async () => {
  return await Item.findAll()
}

const getItem = async (id) => {
  return await Item.findByPk(id)
}


module.exports = {addItem, removeItem, getItems, updateItem, getItem}