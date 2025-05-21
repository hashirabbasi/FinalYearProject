const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistTokken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }

        // Check if the token is blacklisted
        const blacklisted = await blacklistTokenModel.findOne({ token });
        if (blacklisted) {
            return res.status(401).json({ error: 'Unauthorized - Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid or expired token' });
    }
};
