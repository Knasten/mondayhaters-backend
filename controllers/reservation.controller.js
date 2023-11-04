const { Reservation } = require('../models/Reservation');

const isReservationOpen = process.env.IS_RESERVATION_OPEN

const addReservation = async (data) => {
  let newReservation;
  console.log(data)
  if(isReservationOpen){
    const oldReservation = await Reservation.findOne({ where: {raid: data.raid}})
    if(oldReservation){
      // If an old reservation with the correct raid name exists..
      // Let us update the old reservation with new data
      newReservation = await oldReservation.update(data)
    } else {
      // Non found lets add one
      newReservation = await Reservation.create(data)
    }
    // Continue...
    // Example data: {list: [100: xxxxx, 90: xxxxxx, ...], raid: 'Molten Core'}
    return newReservation;
  } else {
    return new Error({status: 403, message: 'Reservations can not be made at this moment. Contact your Guild Master for more informaion.'})
  }
};

const removeReservation = async id => {
  return await Reservation.destroy({
    where: {
      id,
    }
  });
}

const editReservation = async (id, body) => {
  await Reservation.update(body, {
    where: {
      id,
    }
  });
  return await Reservation.findByPk(id);
}

const getReservation = async id => {
  return await Reservation.findByPk(id);
}

const getReservations = async () => {
  return await Reservation.findAll();
}

// Get All Reservations connected to one User
const getUsersReservations = async () => {

};


module.exports = {
  addReservation,
  removeReservation,
  editReservation,
  getReservation,
  getReservations
}