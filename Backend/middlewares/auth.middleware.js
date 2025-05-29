const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const workerModel = require('../models/worker.model');
const blacklistTokenModel = require('../models/blacklistTokken.model');

exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    console.log('Auth middleware token:', token);

    if (!token) return res.status(401).json({ error: 'No token provided' });

    const blacklisted = await blacklistTokenModel.findOne({ token });
    if (blacklisted) {
      console.log('Token is blacklisted:', token);
      return res.status(401).json({ error: 'Token is blacklisted' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    const user = await userModel.findById(decoded._id);
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    console.log('Auth middleware error:', err.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
  }
};

exports.authWorker = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const blacklisted = await blacklistTokenModel.findOne({ token });
        if (blacklisted) return res.status(401).json({ error: 'Token is blacklisted' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const worker = await workerModel.findById(decoded._id);
        if (!worker) return res.status(401).json({ error: 'Invalid token' });

        req.worker = worker;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }
};
