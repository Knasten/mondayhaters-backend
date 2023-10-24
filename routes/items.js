const router = require('express').Router()

// Controller
const { addItem, removeItem, getItems, updateItem, getItem } = require('../controllers/item.controller')


router.get('/', async (req, res) => {
  // Public
  try{
    const items = await getItems()
    return res.status(200).json({status: 'Success', message: items})
  } catch (err) {
    res.status(500)
    res.send({status: 'error', message: 'Items could not be fetched..'})
  }
});

router.get('/:id', async (req, res) => {
  // Public
  try {
    const item = await getItem(req.params.id)
    if (item === null){
      throw new Error('Your item could not be found')
    } else {
      res.status(200).json({status: 'Success', message: item})
    }
    
  } catch (err) {
    res.status(500)
    res.send({status: 'error', message: err.message || 'Something went wrong'})
  }
})

router.post('/', async (req, res) => {
  // Private/Auth
  try{
    const item = await addItem(req.body)
    if(item) {
      res.status(200).json({ status: 'success', result: item})
    }
  } catch (err) {
    console.log(err.message)
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401)
      res.send({ status: 'error', message: 'Item with this ID already exist'})
    } else {
      res.status(500)
      res.send({status: 'error', message: 'Something went wrong with your request. Please try again later!'})
    }
  }
})

router.put('/:id', async (req, res) => {
  // Private/Auth
  try {
    await updateItem(req.params.id, req.body)
    const item = await getItem(req.params.id)
    res.status(200)
    res.send({status: 'successful', message: item})
  } catch (err) {
    res.status(500)
    res.send({status: 'error', message: 'Something went wrong and your update was not completed.'})
  }
})

router.delete('/:id', async (req, res) => {
  // Private/Auth
  try {
    await removeItem(req.params.id)
    res.status(200)
    res.send({status: 'Successful', message: 'The item with id: ' + req.params.id + ' has successfully been removed'})
  } catch (err) {
    res.status(500)
    res.send({status: 'error', message: 'Something went wrong and the item was not removed.'})
  }
})

module.exports = router