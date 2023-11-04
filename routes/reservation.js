const router = require('express').Router()

const { addReservation, removeReservation, editReservation } = require('../controllers/reservation.controller');

router.post('/', async (req, res) => {
  // Private, should add with link to user
  try{
    const reservation = await addReservation(req.body)
    if(reservation){
      res.status(200).json({
        status: 'Success',
        reservation,
      })
    }
  } catch(e){
    res.status(e.status)
    res.send({staus: e.status, message: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  // Private/Auth - Only Site Manager
  try{
    await removeReservation(req.params.id)
    res.status(200)
    res.send({status: 'Success', message: 'Your reservation has successfully been removed'})
  }catch(e){
    res.status(500)
    res.send({message: e.message})
  }
})

router.put('/:id', async (req, res) => {
  try{
    const reservation = await editReservation(req.params.id, req.body)
    res.status(200);
    res.send({status: 'Success', message: reservation})
  }catch(e) {
    res.status(500)
    res.send({status: 'Failed', message: e.message})
  }
});


module.exports = router;