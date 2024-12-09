import express from 'express';
import { body } from 'express-validator';
import fetchItineraries from '../digitransit/itineraries.js';
import { validationErrorHandler } from '../middlewares/error-handlers.js';

const itineraryRouter = express.Router();

itineraryRouter.route('/itinerary').post(
    /**
   * @api {post} /itinerary Get itineraries
   * @apiName GetItineraries
   * @apiGroup all
   * @apiDescription Get itineraries between two locations, including walking speeds and transport modes.
   * @apiPermission none
   * 
   * @apiParam {Number} fromLat Latitude of the starting location (in decimal degrees)
   * @apiParam {Number} fromLon Longitude of the starting location (in decimal degrees)
   * @apiParam {Number} toLat Latitude of the destination location (in decimal degrees)
   * @apiParam {Number} toLon Longitude of the destination location (in decimal degrees)
   * @apiParam {Number} walkSpeed Walking speed in meters per second (e.g., 1.4 m/s)
   * 
   * @apiSuccess {Object[]} itineraries List of itineraries
   * @apiSuccess {Object} itineraries.legs Information about each leg in the itinerary
   * @apiSuccess {String} itineraries.legs.mode Mode of transport (e.g., "WALK", "BUS")
   * @apiSuccess {String} itineraries.legs.startTime Start time of the leg in ISO 8601 format (YYYY-MM-DDTHH:MM:SS)
   * @apiSuccess {String} itineraries.legs.endTime End time of the leg in ISO 8601 format (YYYY-MM-DDTHH:MM:SS)
   * @apiSuccess {String} itineraries.legs.from Name of the starting location
   * @apiSuccess {String} itineraries.legs.to Name of the destination location
   * 
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 200 OK
   *   {
   *     "itineraries": [
   *       {
   *         "legs": [
   *           {
   *             "mode": "WALK",
   *             "startTime": "2021-03-15T08:00:00",
   *             "endTime": "2021-03-15T08:10:00",
   *             "from": "Kamppi",
   *             "to": "Tataki Restaurant"
   *           }
   *         ]
   *       }
   *     ]
   *   }
   * 
   * @apiError (Error 400) BadRequest Invalid geographical coordinates or missing parameters
   * @apiErrorExample Error-Response:
   *   HTTP/1.1 400 Bad Request
   *   {
   *     "error": {
   *       "message": "Invalid geographical coordinates",
   *       "status": 400
   *     }
   *   }
   */
    body('fromLat').isNumeric(),
    body('fromLon').isNumeric(),
    body('toLat').isNumeric(),
    body('toLon').isNumeric(),
    body('walkSpeed').isNumeric(),
    validationErrorHandler,
    fetchItineraries);

export default itineraryRouter;