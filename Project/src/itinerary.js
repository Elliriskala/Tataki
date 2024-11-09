const getLocationButton = document.getElementById('getLocation');
const itineraryForm = document.getElementById('itineraryForm');
const itineraryResults = document.getElementById('itineraryResults');
const apiKey = '#######################'; // unfortunately, I will not provide the API key for everyone to use. You can get your own API key from Digitransit

  getLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // Get user's location (latitude and longitude)
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Set the user's location as the "From" location
        document.getElementById('toLat').value = userLat;
        document.getElementById('toLon').value = userLon;

        // Show the form and hide the "Use my location" button
        getLocationButton.style.display = 'none';
        itineraryForm.style.display = 'block';
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });

  // Handle the itinerary form
  itineraryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fromLat = document.getElementById('toLat').value;
    const fromLon = document.getElementById('toLon').value;
    const toLat = 60.1699; // Fixed latitude of Tataki
    const toLon = 24.9384; // Fixed longitude of Tataki
    const numOfItineraries = document.getElementById('numOfItineraries').value;
    const walkSpeed = document.getElementById('walkSpeed').value;

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
              plan(from: {lat: ${fromLat}, lon: ${fromLon}}, to: {lat: ${toLat}, lon: ${toLon}}, numItineraries: ${numOfItineraries}, walkSpeed: ${walkSpeed}) {
                itineraries {
                  duration
                  legs {
                    mode
                    startTime
                    endTime
                    distance
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
        itineraryResults.style.display = 'block';
      } else {
        alert("No itineraries found. Please try again.");
      }
    } catch (error) {
      console.error('Error fetching itinerary data:', error);
      alert("There was an error fetching the itinerary.");
    }
  });

  // Function to display the itinerary results
  function displayItineraryResults(itineraries) {
    const resultList = document.getElementById('itineraryList');
    resultList.innerHTML = ''; // Clear previous results

    itineraries.forEach((itinerary, index) => {
      const itineraryItem = document.createElement('li');
      const formattedDuration = `${Math.floor(itinerary.duration / 60)} hours ${itinerary.duration % 60} minutes`; // Format the duration

      itineraryItem.innerHTML = `
        <h3>Itinerary ${index + 1}</h3>
        <p>Duration: ${formattedDuration}</p>
        <ul>
          ${itinerary.legs.map(leg => `
            <li>
              <strong>Mode:</strong> ${leg.mode} <br>
              <strong>Start Time:</strong> ${formatDate(leg.startTime)} <br>
              <strong>End Time:</strong> ${formatDate(leg.endTime)} <br>
              <strong>Distance:</strong> ${leg.distance.toFixed(0)} meters
            </li>
          `).join('')}
        </ul>
      `;
      resultList.appendChild(itineraryItem);
    });
  }

  // format Unix timestamps to readable dates
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts the timestamp to a human-readable date and time
  }
