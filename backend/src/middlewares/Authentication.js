const authentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user data to request
      req.user = decoded;
      
      next();
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(403).json({ error: 'Invalid token' });
    }
  };

  module.exports = authentication;