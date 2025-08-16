const jwt = require('jsonwebtoken');

exports.isUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!req.user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.sendStatus(403);

    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
