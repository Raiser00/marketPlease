const jwt = require('jsonwebtoken');

exports.isUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (!req.user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};

exports.isAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé : réservé aux admins' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};
