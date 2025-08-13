const jwt = require('jsonwebtoken');

exports.isUser = (req, res, next) => {
    const token = req.header.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
};

exports.isAdmin = (req, res, next) => {
    const token = req.header.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.sendStatus(403);
    req.user = decoded;
    next();
};
