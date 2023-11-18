const router = require('express').Router()
const { db } = require('../db/firebase');

router.post('/', async (req, res) => {
  // Private, should add with link to user
  if(req.isAuthenticated()){
    console.log('Is Authenticated')
    try{
      // Setting up data to be written
      const {raid: documentId, ...rest} = req.body;
      const userId = req.session.passport.user;

      // FIRE BASE WILL INSTEAD LOOK LIKE COLLECTION(RESERVATIONS)DOCS(RAIDNAME)FIELD[object](Userid)
      
      // Setting up refs
      const documentRef = db.collection('Reservations').doc(documentId);
      const docSnapshot = await documentRef.get();

      if(!docSnapshot.exists){
        // No reservations has been made for the selectedRaid at the moment
        // Create the document and append the reservation data.
        await documentRef.set({[userId]: rest}, {merge: true})
      } else {
        // Reservations exists for the selectedRaid make sure the user has not reserved
        const currentReservations = docSnapshot.data();
        if(currentReservations[userId]){
          throw new Error(`Reservation with ${userId} already exists`)
        } else{
          await documentRef.set({[userId]: rest}, {merge: true})
        }
      }

      res.status(200).json({
        message: 'Success',
        reservation: {[userId]: rest}
      })

    } catch(e){
      console.log(e)
      res.status(500).json({
        message: e
      })
    }
  }
})

module.exports = router;