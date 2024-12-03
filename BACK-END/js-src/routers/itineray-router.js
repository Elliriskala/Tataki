import express from 'express';
import { body } from 'express-validator';
import fetchItineraries from '../digitransit/itineraries.js';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const itineraryRouter = express.Router();

itineraryRouter.route('/itinerary').post(
    body('fromLat').isNumeric(),
    body('fromLon').isNumeric(),
    body('toLat').isNumeric(),
    body('toLon').isNumeric(),
    body('walkSpeed').isNumeric(),
    validationErrorHandler,
    fetchItineraries);

export default itineraryRouter;