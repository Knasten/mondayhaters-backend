const { User, sequelize } = require('../models/User');

const addUser = async (profile) => {
  const user = await User.create({username: profile.username, discord_id: profile.id});
  if(user === null){
    throw new Error('User could not be created')
  }
  console.log('New user has been added successfully')
  return user;
};

const findUserByDiscordId = async (id) => {
  const user = await User.findOne({ where: {discord_id: id}})
  return user;
};

const findUserByPk = async (id) => {
  const user = await User.findByPk(id)
  return user;
};

module.exports = {
  addUser,
  findUserByDiscordId,
  findUserByPk
}