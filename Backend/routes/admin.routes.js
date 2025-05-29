const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authUser } = require('../middlewares/auth.middleware');

// Role check middleware
const checkAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
};

router.get('/pending-workers', authUser, checkAdmin, adminController.getPendingWorkers);
router.put('/approve-worker/:id', authUser, checkAdmin, adminController.approveWorker);
router.put('/disapprove-worker/:id', authUser, checkAdmin, adminController.disapproveWorker);
router.get('/approved-workers', authUser,checkAdmin, adminController.getApprovedWorkers);
module.exports = router;
