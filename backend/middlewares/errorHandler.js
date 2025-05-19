module.exports = (err, req, res, next) => {
    console.error(err.stack);
  
    let statusCode = 500;
    let message = "Internal Server Error";
  
    switch (err.name) {
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        statusCode = 400;
        message = err.errors.map(e => e.message).join(", ");
        break;
  
      case "JsonWebTokenError":
        statusCode = 401;
        message = "Invalid token";
        break;
  
      case "TokenExpiredError":
        statusCode = 401;
        message = "Token has expired";
        break;
  
      case "UnauthorizedError":
        statusCode = 401;
        message = err.message || "Unauthorized";
        break;
  
      case "NotFoundError":
        statusCode = 404;
        message = err.message || "Resource not found";
        break;
  
      case "BadRequestError":
        statusCode = 400;
        message = err.message || "Bad Request";
        break;
  
      default:
        if (err.statusCode && err.message) {
          statusCode = err.statusCode;
          message = err.message;
        }
    }
  
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  