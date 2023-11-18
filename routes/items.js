const router = require('express').Router()
const {db} = require('../db/firebase');

// Setup the reference


router.get('/', async (req, res) => {
  if(req.isAuthenticated()){
    const raidName = req.query.raid;
    try{
      console.log('getting items')
      const docRef = db.collection('Items');
      const docSnapshot = await docRef.doc(raidName).get();
      return res.status(200).json({status: 'Success', message: docSnapshot.data()})
    } catch (err) {
      // If encountering error send back error, this should be more dynamic
      res.status(500)
      res.send({status: 'error', message: 'Items could not be fetched..'})
    }
  } else {
    res.status(401).json({message: 'Unauthorized access'});
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

    const fieldId = req.params.id
    const docRef = db.collection('Items').doc(raid);
    
    const newItem = {
      [fieldId] : {
        droppedBy,
        isLootable,
        name,
        quality,
      }
    }
    const docSnapshot = await docRef.set(newItem, { merge: true });
    console.log(docSnapshot)
    res.status(200).json({message: 'Successfully added item: ' + fieldId ,newItem})
  } catch(error) {
    console.error(error)
    res.status(500).json({message: error.message})
  }
})

module.exports = router