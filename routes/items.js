const router = require('express').Router()
const {db} = require('../db/firebase');

// Setup the reference


router.get('/', async (req, res) => {
  if(req.isAuthenticated()){
    try{
      const itemsSnapshot = await db.collection('Items').get();
      const items = [];
      // Loop through response from firestore
      itemsSnapshot.forEach((doc) => {
        // Push each item to array
        items.push({
          id: doc.id,
          ...doc.data()
        })
      })
      // If all succeeded return items
      return res.status(200).json({status: 'Success', message: items})
    } catch (err) {
      // If encountering error send back error, this should be more dynamic
      res.status(500)
      res.send({status: 'error', message: 'Items could not be fetched..'})
    }
  }
});
  

router.get('/:id', async (req, res) => {
  // Public
  try {
    const documentId = req.params.id;
    const docRef = db.collection('Items').doc(documentId)
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists){
      throw new Error('Your item could not be found', 404)
    }
    
    const item = docSnapshot.data();
    item.id = documentId;
    res.send({status: 'success', message: item});
  } catch (err) {
    res.status(500)
    res.send({status: 'error', message: err.message || 'Something went wrong'})
  }
})

router.post('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const { droppedBy, name, quality, raid } = req.body;
    const isLootable = quality === 'Legendary' ? false : true;

    const documentId = req.params.id
    const docRef = db.collection('Items').doc(documentId);
    const docSnapshot = await docRef.get();

    if(docSnapshot.exists){
      // If we reach this code we know an item does not exist and we can continue to post a new
      return res.status(400).json({error: 'Item ID already exists'});
    }
    const newItem = {
      droppedBy,
      isLootable,
      name,
      quality,
      raid
    }
    await docRef.set(newItem);
    res.status(200).json({message: 'Successfully added item: ' + documentId ,newItem})
  } catch(error) {
    res.status(500).json({message: error.message})
  }
})

module.exports = router