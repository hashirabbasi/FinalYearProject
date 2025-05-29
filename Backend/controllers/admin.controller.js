const adminService = require('../services/admin.service');

// GET /admin/pending-workers
exports.getPendingWorkers = async (req, res) => {
  try {
    const pendingWorkers = await adminService.getPendingWorkers();
    res.status(200).json(pendingWorkers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /admin/approve-worker/:id
exports.approveWorker = async (req, res) => {
  try {
    console.log('Incoming ID:', req.params.id);
    const worker = await adminService.updateWorkerStatus(req.params.id, 'active');
    if (!worker) return res.status(404).json({ error: 'Worker not found' });

    console.log('Worker updated:', worker);
    res.status(200).json({ message: 'Worker approved', worker });
  } catch (err) {
    console.error('approveWorker error:', err); // 🔍 this helps
    res.status(500).json({ error: 'Server error' });
  }
};


// PUT /admin/disapprove-worker/:id
exports.disapproveWorker = async (req, res) => {
  try {
    const worker = await adminService.updateWorkerStatus(req.params.id, 'inactive');
    if (!worker) return res.status(404).json({ error: 'Worker not found' });
    res.status(200).json({ message: 'Worker disapproved', worker });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getApprovedWorkers = async (req, res) => {
  try {
    const approved = await adminService.getApprovedWorkers();
    res.status(200).json(approved);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
