const mongoose = require("mongoose");
const Worker = require("../models/worker.model");

exports.getPendingWorkers = async () => {
  return await Worker.find({ status: 'inactive' });
};

exports.updateWorkerStatus = async (id, status) => {
  const cleanId = id.trim(); // ✨ Removes \n or spaces

  if (!mongoose.Types.ObjectId.isValid(cleanId)) {
    throw new Error('Invalid ObjectId format');
  }

  return await Worker.findByIdAndUpdate(cleanId, { status }, { new: true });
};


exports.getApprovedWorkers = async () => {
  return await Worker.find({ status: 'active' });
};
