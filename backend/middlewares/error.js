class ErrorHandler extends Error {
  constructor(message, statusCode, duration) {
    super(message);
    this.statusCode = statusCode;
    this.duration = duration;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  try {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
   

    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      err = new ErrorHandler(message, 400); // 10 seconds
    }

    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map(err => err.message);
      err = new ErrorHandler(validationErrors.join(', '), 400, 10000); // 10 seconds
    }

    console.error(err); // Log the error
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
     
    });
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
   
    });
  }
};

export default ErrorHandler;