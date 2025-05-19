export const authorize = (roles) => {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
    
    return (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized - Please login first",
          });
        }
        
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({
            success: false,
            message: "Forbidden - You don't have permission to access this resource",
          });
        }
        
        next();
      } catch (error) {
        next(error);
      }
    };
  };