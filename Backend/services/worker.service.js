const workerModel = require('../models/worker.model');

module.exports = async ({
    firstname,
    lastname,
    email,
    password,
    phone,
    status,
    serviceType,
    experience
}) => {
    if (!firstname || !lastname || !email || !password || !phone || !status || !serviceType || experience == null) {
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
