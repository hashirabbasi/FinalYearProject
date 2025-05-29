const workerModel = require('../models/worker.model');

module.exports.createWorker = async ({
  firstname,
  lastname,
  email,
  password,
  phone,
  status = 'inactive', // default if not provided
  serviceType,
  experience
}) => {
  if (!firstname || !lastname || !email || !password || !phone || !serviceType || experience == null) {
    throw new Error('All required fields must be provided');
  }

  const worker = new workerModel({
    fullname: { firstname, lastname },
    email,
    password,
    phone,
    status,
    serviceType,
    experience
  });

  await worker.save();
  return worker;
};
