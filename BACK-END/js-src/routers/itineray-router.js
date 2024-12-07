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
     * @apiDescription Get itineraries between two locations
     * @apiPermission none
     * 
     * @apiParam {Number} fromLat Latitude of the starting location
     * @apiParam {Number} fromLon Longitude of the starting location
     * @apiParam {Number} toLat Latitude of the destination location
     * @apiParam {Number} toLon Longitude of the destination location
     * @apiParam {Number} walkSpeed Walking speed in m/s
     * 
     * @apiSuccess {Object[]} itineraries List of itineraries
     * @apiSuccess {Object} itineraries.legs List of legs in the itinerary
     * @apiSuccess {String} itineraries.legs.mode Mode of transport
     * @apiSuccess {String} itineraries.legs.startTime Start time of the leg
     * @apiSuccess {String} itineraries.legs.endTime End time of the leg
     * @apiSuccess {String} itineraries.legs.from Name of the starting location
     * @apiSuccess {String} itineraries.legs.to Name of the destination location
     * 
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *  {
     *   "itineraries": [
     *    {
     *     "legs": [
     *      {
     *       "mode": "WALK",
     *       "startTime": "2021-03-15T08:00:00",
     *       "endTime": "2021-03-15T08:10:00",
     *       "from": "Kamppi",
     *       "to": "Tataki Restaurant"
     *      }
     *     ]
     *    }
     *   ]
     *  }
     * 
     * @apiError (Error 400) BadRequest The request was invalid
     * @apiErrorExample Error-Response:
     *   HTTP/1.1 400 Bad Request
     * {
     * "error": {
     * "message": "Invalid geographical coordinates",
     * "status": 400
     *  }
     * }
     */
    body('fromLat').isNumeric(),
    body('fromLon').isNumeric(),
    body('toLat').isNumeric(),
    body('toLon').isNumeric(),
    body('walkSpeed').isNumeric(),
    validationErrorHandler,
    fetchItineraries);

export default itineraryRouter;