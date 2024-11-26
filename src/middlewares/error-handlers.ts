import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';


/**
 * 
 * @param {string} message
 * @param {string} status
 * @returns {object} error object
 */

class CustomError extends Error {
    status: number;
    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
    }
}

const customError = (message: string, status?: number) => {
    return new CustomError(message, status || 500);
};
  
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  

  const validationErrorHandler = (req: Request, res: Response, next: NextFunction) => {
    console.log('post req body', req.body);
    // validation errors can be retrieved from the request object (added by express-validator middleware)
    const errors = validationResult(req);
    // check if any validation errors
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      const errorsString = errors.array().map((error) => error.msg).join(', ');
      return next(customError('Validation errors in: ' + errorsString, 400));
    }
    next(); // no validation errors, continue to next middleware
  };
  
  /**
   * 404 error handler
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(`Not Found - ${req.originalUrl}`, 404);
    next(error); // forward error to error handler
  };
  /**
   * Custom default middleware for handling errors
   */
  // eslint-disable-next-line no-unused-vars
  const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500); // default is 500 if err.status is not defined
    res.json({
      error: {
        message: err.message,
        status: err.status || 500,
      },
    });
  };
  
  export {notFoundHandler, errorHandler, customError, validationErrorHandler};
  