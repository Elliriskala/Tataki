const getLocationButton = document.getElementById("getLocation");
const itineraryForm = document.getElementById("itineraryForm");
const itineraryResults = document.getElementById("itineraryResults");
// unfortunately, I will not provide the API key for everyone to use. You can get your own API key from Digitransit

let language = localStorage.getItem("language") || "en";

const translations = {
  en: {
    itinerary: "Itinerary",
    duration: "Duration",
    mode: "Mode",
    line: "Line",
    from: "From",
    "stop-name": "Stop Name",
    "stop-code": "Stop Code",
    to: "To",
    "start-time": "Start Time",
    "end-time": "End Time",
    distance: "Distance",
    meters: "meters",
    "User Location": "User Location",
    hours: "hours",
    minutes: "minutes",
    seconds: "seconds"
  },
  fi: {
    itinerary: "Reitti",
    duration: "Kesto",
    mode: "Liikkumistapa",
    line: "Linja",
    from: "Lähtö",
    "stop-name": "Pysäkin Nimi",
    "stop-code": "Pysäkin Koodi",
    to: "Määränpää",
    "start-time": "Aloitusaika",
    "end-time": "Lopetusaika",
    distance: "Etäisyys",
    meters: "metriä",
    "User Location": "Käyttäjän sijainti",
    hours: "tuntia",
    minutes: "minuuttia",
    seconds: "sekuntia"
  },
};

// require('dotenv').config();
const apiKey = "8b8ee0e6809a405e81615d51d3e6e738";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

getLocationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        // Get user's location (latitude and longitude)
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        // Use user's location in the query
        document.getElementById("fromLat").value = userLat;
        document.getElementById("fromLon").value = userLon;

        // Show the form and hide the "Use my location" button
        getLocationButton.style.display = "none";
        itineraryForm.style.display = "block";
      },
      (error) => {
        alert("Error retrieving location: " + error.message);
      },
      options
    );
  } else {
    alert(
      "Geolocation failed. Try switching your broweser or refresh the page."
    );
  }
});

// Handle the itinerary form
itineraryForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(apiKey);

  const fromLat = document.getElementById("fromLat").value;
  const fromLon = document.getElementById("fromLon").value;
  const toLat = 60.1699; // Fixed latitude of Tataki
  const toLon = 24.9384; // Fixed longitude of Tataki
  const numOfItineraries = 1; // document.getElementById('numOfItineraries').value;
  const walkSpeed = document.getElementById("walkSpeed").value;
  const fromPlaceTranslation = translations[language]["User Location"];

  // API request to get the itineraries
  // method must be POST
  // headers must include 'Content-Type': 'application/json' or 'application/graphql' and 'digitransit-subscription-key': apiKey
  try {
    const response = await fetch(
      "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "digitransit-subscription-key": apiKey,
        },
        body: JSON.stringify({
          query: `
          query {
            plan(
              fromPlace: "${fromPlaceTranslation}::${fromLat},${fromLon}",
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
        `,
        }),
      }
    );

    const data = await response.json();

    // Check if we have valid itineraries
    if (data.data && data.data.plan && data.data.plan.itineraries) {
      displayItineraryResults(data.data.plan.itineraries);
      itineraryResults.style.display = "block";
    } else {
      alert("No itineraries found. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
    alert("There was an error fetching the itinerary.");
  }
});

function displayItineraryResults(itineraries) {
  const resultList = document.getElementById("itineraryList");
  resultList.innerHTML = ""; // Clear previous results

  itineraries.forEach((itinerary, index) => {
    const itineraryItem = document.createElement("li");
    const formattedDuration = formatDuration(itinerary.duration);

    // Map transport modes to Finnish
    const modeTranslation = {
      WALK: "Kävely",
      RAIL: "Juna",
      BUS: "Linja-auto",
      TRAM: "Raitiovaunu",
      FERRY: "Laiva",
    };

    itineraryItem.innerHTML = `
            <h3>${translations[language]["itinerary"]} ${index + 1}</h3>
            <p><strong>${translations[language]["duration"]}:</strong> ${formattedDuration}</p>
            <ul>
                ${itinerary.legs
                  .map(
                    (leg) => `
                    <li>
                        ${leg.mode ? `<strong>${translations[language]["mode"]}:</strong> ${modeTranslation[leg.mode] || leg.mode} ${leg.trip?.tripHeadsign ? `(${translations[language]["line"]}: ${leg.trip.tripHeadsign} ${leg.trip.routeShortName || ""})` : ""} <br>` : ""}
                        ${leg.from?.name ? `<strong>${translations[language]["from"]}:</strong> ${leg.from.name} (${leg.from.lat}, ${leg.from.lon})<br>` : ""}
                        ${leg.from?.stop?.name ? `<strong>${translations[language]["stop-name"]}:</strong> ${leg.from.stop.name} <br>` : ""}
                        ${leg.from?.stop?.code ? `<strong>${translations[language]["stop-code"]}:</strong> ${leg.from.stop.code} <br>` : ""}<br>
                        ${leg.to?.name ? `<strong>${translations[language]["to"]}:</strong> ${leg.to.name} (${leg.to.lat}, ${leg.to.lon})<br>` : ""}
                        ${leg.startTime ? `<strong>${translations[language]["start-time"]}:</strong> ${formatDate(leg.startTime)} <br>` : ""}
                        ${leg.endTime ? `<strong>${translations[language]["end-time"]}:</strong> ${formatDate(leg.endTime)} <br>` : ""}
                        ${typeof leg.distance === "number" ? `<strong>${translations[language]["distance"]}:</strong> ${leg.distance.toFixed(0)} ${translations[language]["meters"]} <br>` : ""}
                    </li>
                `
                  )
                  .join("")}
            </ul>
        `;

    resultList.appendChild(itineraryItem);
  });
}

function formatDuration(durationInSeconds) {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  // Use translations for hours, minutes, and seconds
  const hoursPart =
    hours > 0 ? `${hours} ${translations[language]["hours"]} ` : "";
  const minutesPart =
    minutes > 0 ? `${minutes} ${translations[language]["minutes"]} ` : "";
  const secondsPart =
    seconds > 0 ? `${seconds} ${translations[language]["seconds"]}` : "";

  return `${hoursPart}${minutesPart}${secondsPart}`.trim();
}

function formatDate(timestamp) {
  const date = new Date(timestamp);

  // Check the selected language (assumes 'language' is a variable containing the current language code)
  if (language === "fi") {
    // For Finnish, use 24-hour format
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // You can also adjust the date format if needed, for now it uses the default
    const formattedDate = date.toLocaleDateString("fi-FI"); // Finnish locale

    return `${formattedDate}, ${formattedTime}`;
  } else {
    // For other languages (e.g., English), keep the default format
    const formattedTime = date.toLocaleTimeString();
    const formattedDate = date.toLocaleDateString(); // Default locale format
    return `${formattedDate}, ${formattedTime}`;
  }
}
