const userModel = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password, role }) => {
  if (!firstname || !email || !password || !role) {
    throw new Error('Missing required fields');
  }

  const user = await userModel.create({
    fullName: {
      firstname,
      lastname
    },
    email,
    password,
    role
  });

  return user;
};
