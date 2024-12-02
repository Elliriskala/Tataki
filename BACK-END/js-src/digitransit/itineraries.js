import 'dotenv/config';
import fetch from 'node-fetch';
import { customError } from '../middlewares/error-handlers.js';


const apiKey = process.env.DT_KEY;

const fetchItineraries = async (req, res, next) => {
    const { fromLat, fromLon, toLat, toLon, walkSpeed } = req.body;

    const query = `
        query {
            plan(
              fromPlace: "User Location::${fromLat},${fromLon}",
              toPlace: "Tataki, Helsinki::${toLat},${toLon}",
              numItineraries: 1,
              transportModes: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}, {mode: FERRY}, {mode: WALK}],
              walkReluctance: 2.1,
              minTransferTime: 600,
              walkSpeed: ${walkSpeed}
            ) {
              itineraries {
                walkDistance
                duration
                legs {
                  mode
                  startTime
                  endTime
                  from {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  to {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  trip {
                    tripHeadsign
                    routeShortName
                  }
                  distance
                  legGeometry {
                    length
                    points
                  }
                }
              }
            }
        }
    `;

    try {
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'digitransit-subscription-key': apiKey
            },
            body: JSON.stringify({ query }),
        });

        if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            console.log('error in digitransit fetch', response.statusText);
            next(customError('Digitransit API error', 500));
        }
    } catch (error) {
        console.log('error in digitransit fetch', error);
        next(customError('Digitransit API error', 500));
    }
};


export default fetchItineraries;