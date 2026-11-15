import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  req.log.error({ err }, 'Request failed');

  const error =
    err.name === 'ValidationError' ? createHttpError(400, err.message) : err;

  res.status(error.status || 500).json({ message: error.message });
};
