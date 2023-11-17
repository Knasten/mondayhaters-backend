const router = require('express').Router()
const { db } = require('../db/firebase');

router.get('/', async (req, res) => {

})

router.post('/', async (req, res) => {
  // Private, should add with link to user
  if(req.isAuthenticated()){
    console.log('Is Authenticated')
    try{
      // Setting up data to be written
      const {raid: documentId, ...rest} = req.body;
      const userId = req.session.passport.user;
      
      // Setting up refs
      const documentRef = db.collection('Users').doc(userId);
      const reservationsDocRef = documentRef.collection('Reservations');

      // Getting doc to check if it exists
      const existingReservationDoc = await reservationsDocRef.doc(documentId).get()
      if(existingReservationDoc.exists){
        console.log('Reservation already exists')
        throw new Error('Reservation already exists');
      }

      // Adding the data if error hasnt been thrown
      await reservationsDocRef.doc(documentId).set(rest);

      res.status(200).json({
        message: 'Success',
        reservation: rest
      })

    } catch(e){
      console.log(e)
      res.status(500).json({
        message: e
      })
    }
  }
})

router.delete('/:id', async (req, res) => {
  // Private/Auth - Only Site Manager
  if(req.isAuthenticated()){
    try{
      await removeReservation(req.params.id)
      res.status(200)
      res.send({status: 'Success', message: 'Your reservation has successfully been removed'})
    }catch(e){
      res.status(500)
      res.send({message: e.message})
    }
  }
  res.status(401)
  res.send({message: 'Please login first.'})
})

router.put('/:id', async (req, res) => {
  if(req.isAuthenticated()){
    try{
      const reservation = await editReservation(req.params.id, req.body)
      res.status(200);
      res.send({status: 'Success', message: reservation})
    }catch(e) {
      res.status(500)
      res.send({status: 'Failed', message: e.message})
    }
  }
});

module.exports = router;