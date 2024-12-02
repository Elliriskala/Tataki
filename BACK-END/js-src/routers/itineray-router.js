import express from 'express';
import { body } from 'express-validator';
import fetchItineraries from '../digitransit/itineraries.js';

const itineraryRouter = express.Router();

itineraryRouter.route('/itinerary').post(
    body('fromLat').isNumeric(),
    body('fromLon').isNumeric(),
    body('toLat').isNumeric(),
    body('toLon').isNumeric(),
    body('walkSpeed').isNumeric(),
    fetchItineraries);

export default itineraryRouter;