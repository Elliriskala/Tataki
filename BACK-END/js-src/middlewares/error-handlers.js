import { validationResult } from "express-validator";

/**
 * 
 * @param {string} message Error message
 * @param {string} status HTTP status code
 * @returns {object} Error object
 */
const customError = (message, status, errors) => {
    const error = new Error(message);
    error.status = error.status = Number.isInteger(status) ? status : 500;
    if (errors) {
      error.errors = errors;
    }
    return error
  };


/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} error object
 * @description Middleware to handle validation
 * errors from express-validator
 * @example
 * app.post('/login', [
 * body('email').isEmail(),
 * body('password').isLength({ min: 5 }),
 * validationErrorHandler,
 * (req, res) => {
 * // Handle request
 * });
 */
const validationErrorHandler = (req, res, next) => {
    // validation errors can be retrieved from the request object (added by express-validator middleware)
    //const errors = validationResult(req);
    const errors = validationResult(req, {strictParams: ['body']});
    // check if any validation errors
    if (!errors.isEmpty()) {
      // extract field names & messages from error array (only one error per field)
      const validationErrors = errors.array({onlyFirstError: true}).map((error) => {
        return {field: error.path, msg: error.msg};
      });
      return next(customError('Invalid input data', 400, validationErrors));
    }
    next();
  };


/**
 * 404 error handler
 * @param {*} req 
 * @param {*} res
 * @param {*} next
 * @returns {object} error object
 * @description Middleware to handle 404 errors
 * @example
 * app.use(notFoundHandler);
 */
const notFoundHandler = (req, res, next) => {
    const error = customError(`Not Found - ${req.originalUrl}`, 404);
    next(error); // forward error to error handler
};
/**
 * Custom default middleware for handling errors
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {object} error object
 * @description Middleware to handle errors
 * @example
 * app.use(errorHandler);
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500); // default is 500 if err.status is not defined
    res.json({
      error: {
        message: err.message,
        status: err.status || 500,
        errors: err.errors,
      },
    });
  };
export { notFoundHandler, errorHandler, customError, validationErrorHandler };
