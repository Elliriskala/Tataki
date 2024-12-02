
const apiKey = '8b8ee0e6809a405e81615d51d3e6e738';
const getLocationButton = document.getElementById('getLocation');
const itineraryForm = document.getElementById('itineraryForm');
const itineraryResults = document.getElementById('itineraryResults');
// unfortunately, I will not provide the API key for everyone to use. You can get your own API key from Digitransit
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
getLocationButton?.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function (position) {
            // Get user's location (latitude and longitude)
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            // Use user's location in the query
            const fromLatElement = document.getElementById('fromLat');
            const fromLonElement = document.getElementById('fromLon');
            if (fromLatElement && fromLonElement) {
                fromLatElement.value = userLat.toString();
                fromLonElement.value = userLon.toString();
            }
            // Show the form and hide the "Use my location" button
            getLocationButton.style.display = 'none';
            if (itineraryForm) {
                itineraryForm.style.display = 'block';
            }
        }, (error) => {
            alert("Error retrieving location: " + error.message);
        }, options);
    }
    else {
        alert("Geolocation failed. Try switching your broweser or refresh the page.");
    }
});
// Handle the itinerary form
itineraryForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fromLatElement = document.getElementById('fromLat');
    const fromLat = fromLatElement ? fromLatElement.value : '';
    const fromLonElement = document.getElementById('fromLon');
    const fromLon = fromLonElement ? fromLonElement.value : '';
    const toLat = 60.1699; // Fixed latitude of Tataki
    const toLon = 24.9384; // Fixed longitude of Tataki
    const numOfItineraries = 1; // document.getElementById('numOfItineraries').value;
    const walkSpeedElement = document.getElementById('walkSpeed');
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
            plan(
              fromPlace: "User Location::${fromLat},${fromLon}",
              toPlace: "Tataki, Helsinki::${toLat},${toLon}",
              numItineraries: ${numOfItineraries},
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
        }
        else {
            alert("No itineraries found. Please try again.");
        }
    }
    catch (error) {
        console.error('Error fetching itinerary data:', error);
        alert("There was an error fetching the itinerary.");
    }
});
// Function to display the itinerary results
function displayItineraryResults(itineraries) {
    const resultList = document.getElementById('itineraryList');
    if (resultList) {
        resultList.innerHTML = ''; // Clear previous results
    }
    itineraries.forEach((itinerary, index) => {
        const itineraryItem = document.createElement('li');
        const formattedDuration = formatDuration(itinerary.duration);
        itineraryItem.innerHTML = `
      <h3>Itinerary ${index + 1}</h3>
      <p>Duration: ${formattedDuration}</p>
      <ul>
        ${itinerary.legs.map((leg) => `
          <li>
            ${leg.mode ? `<strong>Mode:</strong> ${leg.mode} ${leg.trip?.tripHeadsign ? `(Line: ${leg.trip.tripHeadsign} ${leg.trip.routeShortName || ''})` : ''} <br>` : ''}
            ${leg.from?.name ? `<strong>From:</strong> ${leg.from.name} (${leg.from.lat}, ${leg.from.lon})<br>` : ''}
            ${leg.from?.stop?.name ? `<strong>Stop Name:</strong> ${leg.from.stop.name} <br>` : ''}
            ${leg.from?.stop?.code ? `<strong>Stop Code:</strong> ${leg.from.stop.code} <br>` : ''}<br>
            ${leg.to?.name ? `<strong>To:</strong> ${leg.to.name} (${leg.to.lat}, ${leg.to.lon})<br>` : ''}
            ${leg.startTime ? `<strong>Start Time:</strong> ${formatDate(leg.startTime)} <br>` : ''}
            ${leg.endTime ? `<strong>End Time:</strong> ${formatDate(leg.endTime)} <br>` : ''}
            ${typeof leg.distance === 'number' ? `<strong>Distance:</strong> ${leg.distance.toFixed(0)} meters <br>` : ''}
          </li>
        `).join('')}
      </ul>
    `;
        resultList?.appendChild(itineraryItem);
    });
}
function formatDuration(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;
    const hoursPart = hours > 0 ? `${hours} hours ` : "";
    const minutesPart = minutes > 0 ? `${minutes} minutes ` : "";
    const secondsPart = seconds > 0 ? `${seconds} seconds` : "";
    return `${hoursPart}${minutesPart}${secondsPart}`.trim();
}
// format Unix timestamps to readable dates
function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts the timestamp to a human-readable date and time
}
