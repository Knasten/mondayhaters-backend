const { addItem } = require('../controllers/item.controller')
const data = require('../data.json');

data.data.forEach(el => {
  const newItem = {
    name: el.Name,
    id: el.ItemLink.split('/').slice(-1),
    droppedBy: el.AcquisitionName,
    quality: el.ItemQuality,
    raid: el.Zone
  }
  addItem(newItem)
})