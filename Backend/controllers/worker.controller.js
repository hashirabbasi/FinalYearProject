const workerModel = require('../models/worker.model');
const workerService = require('../services/worker.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokken.model');

// Register new worker (default status: inactive)
exports.registerWorker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const existing = await workerModel.findOne({ email: req.body.email });
  if (existing) return res.status(400).json({ message: "Worker already exists" });

  const {
    firstname,
    lastname,
    email,
    password,
    phone,
    serviceType,
    experience
  } = req.body;

  try {
    const worker = await workerService.createWorker({
      firstname,
      lastname,
      email,
      password,
      phone,
      serviceType,
      experience,
      status: "inactive" // force status = inactive
    });

    const token = worker.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ token, worker });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login only if worker is approved (status: active)
exports.loginWorker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const worker = await workerModel.findOne({ email }).select('+password');
    if (!worker || !(await worker.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (worker.status !== 'active') {
      return res.status(403).json({ error: 'Your account is pending admin approval.' });
    }

    const token = worker.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, worker });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// View own profile
exports.getWorkerProfile = (req, res) => {
  res.status(200).json({ worker: req.worker });
};

// Logout
exports.logoutWorker = async (req, res) => {
  try {
    const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

    if (!token) {
      return res.status(400).json({ error: 'No token found to logout' });
    }

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (!blacklisted) {
      await blacklistTokenModel.create({ token });
    }

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
