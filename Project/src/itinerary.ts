// const getLocationButton = document.getElementById('getLocation') as HTMLButtonElement;
// const itineraryForm = document.getElementById('itineraryForm') as HTMLFormElement;
// const itineraryResults = document.getElementById('itineraryResults') as HTMLDivElement;
// const apiKey = '############################'; // unfortunately, I will not provide the API key for everyone to use. You can get your own API key from Digitransit

if (getLocationButton) {
  getLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      // Get user's location (latitude and longitude)
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;

      // Use user's location in the query
      const fromLatElement = document.getElementById('fromLat') as HTMLInputElement;
      const fromLonElement = document.getElementById('fromLon') as HTMLInputElement;
      if (fromLatElement && fromLonElement) {
        fromLatElement.value = userLat.toString();
        fromLonElement.value = userLon.toString();
      }

      // Show the form and hide the "Use my location" button
      if (itineraryForm && getLocationButton) {
      getLocationButton.style.display = 'none';
      itineraryForm.style.display = 'block';
      }
      });
    }
  });
} else {
  alert("Geolocation is not supported by this browser.");
}

// Handle the itinerary form
itineraryForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fromLatElement = document.getElementById('fromLat') as HTMLInputElement | null;
    const fromLonElement = document.getElementById('fromLon') as HTMLInputElement | null;
    const fromLat = fromLatElement ? fromLatElement.value : '';
    const fromLon = fromLonElement ? fromLonElement.value : '';
    const toLat = 60.1699; // Fixed latitude of Tataki
    const toLon = 24.9384; // Fixed longitude of Tataki
    const numOfItinerariesElement = document.getElementById('numOfItineraries') as HTMLInputElement | null;
    const numOfItineraries = numOfItinerariesElement ? numOfItinerariesElement.value : '';
    const walkSpeedElement = document.getElementById('walkSpeed') as HTMLInputElement | null;
    const walkSpeed = walkSpeedElement ? walkSpeedElement.value : '';

    // API request to get the itineraries
    // method must be POST
    // headers must include 'Content-Type': 'application/json' or 'application/graphql' and 'digitransit-subscription-key': apiKey
    try {
      const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'digitransit-subscription-key': apiKey
        },
        body: JSON.stringify({
          query: `
          query {
            plan(fromPlace: "Your location::${fromLat},${fromLon}", toPlace: "Tataki, Helsinki::${toLat},${toLon}", numItineraries: ${numOfItineraries}, walkSpeed: ${walkSpeed}, walkReluctance: 2.1) {
              itineraries{
                walkDistance,
                duration,
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
                  },
                  to {
                    lat
                    lon
                    name
                  },
                  agency {
                    gtfsId
              name
                  },
                  distance
                  legGeometry {
                    length
                    points
                  }
                }
              }
            }
          }
        `
      }),
    });

      const data = await response.json();

      // Check if we have valid itineraries
      if (data.data && data.data.plan && data.data.plan.itineraries) {
        displayItineraryResults(data.data.plan.itineraries);
        if (itineraryResults) {
          itineraryResults.style.display = 'block';
        }
      } else {
        alert("No itineraries found. Please try again.");
      }
    } catch (error) {
      console.error('Error fetching itinerary data:', error);
      alert("There was an error fetching the itinerary.");
    }
  });


