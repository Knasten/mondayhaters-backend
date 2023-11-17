const {db} = require('../db/firebase');

const getAllUsers = async () => {
  try{
    const usersRef = db.collection('Users');

    const docSnapshot = await usersRef.get();

    const users = [];
    docSnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return users;

  } catch (error) {
    console.error('Failed to get users', error)
  }
};

module.exports = {getAllUsers};