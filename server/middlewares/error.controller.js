const globalErrorHandler = (err, req, res, next) => {
  // Default values if not specified
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // DEVELOPMENT: Send detailed error info for debugging
  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  } else {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Something went very wrong!",
      });
    }
  }
};

export default globalErrorHandler;
