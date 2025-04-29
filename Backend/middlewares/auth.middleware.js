const serModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    const tokken = req.cookies.tokken ||req.headers.authorization.split(' ')[1];
    if (!tokken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(tokken, process.env.JWT_SECRET);
        const user = await serModel.findById(decoded._id);

        req.user = user;
        return next();

}
catch(err){
    return res.status(401).json({ error: 'Unauthorized' });
}
}
