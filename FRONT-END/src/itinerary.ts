import { Itinerary } from './types';
import * as L from 'leaflet';

const getLocationButton = document.getElementById('getLocation') as HTMLButtonElement;
const itineraryForm = document.getElementById('itineraryForm') as HTMLFormElement;
const itineraryResults = document.getElementById('itineraryResults') as HTMLDivElement;

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

let map = L.map('map').setView([60.16366628688539, 24.94161492221418], 13); // Set the view to Tataki's location
L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }
  ).addTo(map);
L.control.scale().addTo(map);
let marker = L.marker([60.16366628688539, 24.94161492221418]).addTo(map);
marker.bindPopup("<b>Welcome to Tataki!").openPopup();


const language = localStorage.getItem('language') || 'en'; // Default to English

const translations: { [key: string]: { [key: string]: string } }
  = {
    en: {
        "itinerary": "Itinerary",
        "duration": "Duration",
        "mode": "Mode",
        "line": "Line",
        "from": "From",
        "stop-name": "Stop Name",
        "stop-code": "Stop Code",
        "to": "To",
        "start-time": "Start Time",
        "end-time": "End Time",
        "distance": "Distance",
        "meters": "meters",
        "hours": "hours",
        "minutes": "minutes",
        "seconds": "seconds"
    },
    fi: {
        "itinerary": "Reitti",
        "duration": "Kesto",
        "mode": "Liikkumistapa",
        "line": "Linja",
        "from": "Lähtö",
        "stop-name": "Pysäkin Nimi",
        "stop-code": "Pysäkin Koodi",
        "to": "Määränpää",
        "start-time": "Alkuaika",
        "end-time": "Lopetusaika",
        "distance": "Etäisyys",
        "meters": "metriä",
        "hours": "tuntia",
        "minutes": "minuuttia",
        "seconds": "sekuntia"
    }
  };
  


// Handle "Use My Location" button
getLocationButton?.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function (position) {
                // Get user's location (latitude and longitude)
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude; // Get user's longitude

                // Set latitude and longitude in hidden fields
                const fromLatElement = document.getElementById('fromLat') as HTMLInputElement;
                const fromLonElement = document.getElementById('fromLon') as HTMLInputElement;
                if (fromLatElement && fromLonElement) {
                    (fromLatElement as HTMLInputElement).value = userLat.toString();
                    (fromLonElement as HTMLInputElement).value = userLon.toString(); // Set user's longitude in hidden field
                }

                // Show the form and hide the "Use My Location" button
                getLocationButton.style.display = 'none';
                if (itineraryForm) {
                    itineraryForm.style.display = 'block';
                }
            },
            (error) => {
                alert("Error retrieving location: " + error.message);
            },
            options
        );
    } else {
        alert("Geolocation not supported. Please switch your browser or refresh the page.");
    }
});

// Handle itinerary form submission
itineraryForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fromLatElement = document.getElementById('fromLat') as HTMLInputElement;
    const fromLat = fromLatElement ? (fromLatElement as HTMLInputElement).value : '';
    const fromLonElement = document.getElementById('fromLon') as HTMLInputElement;
    const fromLon = fromLonElement ? (fromLonElement as HTMLInputElement).value : '';
    const toLat: number = 60.16366628688539; // Fixed latitude of Tataki
    const toLon: number = 24.94161492221418; // Fixed longitude of Tataki
    const walkSpeedElement = document.getElementById('walkSpeed') as HTMLInputElement;
    const walkSpeed = walkSpeedElement ? (walkSpeedElement as HTMLInputElement).value : '';

    if (!fromLat || !fromLon || !walkSpeed) {
        console.log('No user location or walk speed provided');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/digitransit/itinerary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromLat, fromLon, toLat, toLon, walkSpeed }),
        });

        const data = await response.json();

        if (data.data && data.data.plan && data.data.plan.itineraries) {
            displayItineraryResults(data.data.plan.itineraries);
            if (itineraryResults) {
                itineraryResults.style.display = 'block';
            }
        } else {
            alert('No itineraries found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching itinerary data:', error);
        alert('There was an error fetching the itinerary.');
    }
});



function displayItineraryResults(itineraries: Itinerary[]) {
    const resultList = document.getElementById('itineraryList') as HTMLUListElement;
    resultList.innerHTML = ''; // Clear previous results

    itineraries.forEach((itinerary, index) => {
        const itineraryItem = document.createElement('li');
        const formattedDuration = formatDuration(itinerary.duration);

        // Map transport modes to Finnish
        const modeTranslation: { [key: string]: { [key: string]: string } } = {
            en : {
                "WALK": 'Walk',
                "RAIL": 'Train',
                "BUS": 'Bus',
                "TRAM": 'Tram',
                "FERRY": 'Ferry'
            },
            fi : {
                "WALK": 'Kävely',
                "RAIL": 'Juna',
                "BUS": 'Bussi',
                "TRAM": 'Raitiovaunu',
                "FERRY": 'Laiva'
            }
        };
        
        // Display itinerary details, including mode of transport, start and end times, and distance from origin to destination.
        itineraryItem.innerHTML = `
            <h3>${translations[language]["itinerary"]} ${index + 1}</h3>
            <p><strong>${translations[language]["duration"]}:</strong> ${formattedDuration}</p>
            <ul> 
                ${itinerary.legs.map(leg => `
                    <li>
                        ${leg.mode ? `<strong>${translations[language]["mode"]}:</strong> ${modeTranslation[language][leg.mode] || leg.mode} ${leg.trip?.tripHeadsign ? `(${translations[language]["line"]}: ${leg.trip.tripHeadsign}${leg.trip.routeShortName ? ` ${leg.trip.routeShortName}` : ''})` : ''} <br>` : ''}
                        ${leg.from?.name ? `<strong>${translations[language]["from"]}:</strong> ${leg.from.name} (${leg.from.lat}, ${leg.from.lon})<br>` : ''}
                        ${leg.from?.stop?.name ? `<strong>${translations[language]["stop-name"]}:</strong> ${leg.from.stop.name} <br>` : ''}
                        ${leg.from?.stop?.code ? `<strong>${translations[language]["stop-code"]}:</strong> ${leg.from.stop.code} <br>` : ''}<br>
                        ${leg.to?.name ? `<strong>${translations[language]["to"]}:</strong> ${leg.to.name} (${leg.to.lat}, ${leg.to.lon})<br>` : ''}
                        ${leg.startTime ? `<strong>${translations[language]["start-time"]}:</strong> ${formatDate(leg.startTime)} <br>` : ''}
                        ${leg.endTime ? `<strong>${translations[language]["end-time"]}:</strong> ${formatDate(leg.endTime)} <br>` : ''}
                        ${typeof leg.distance === 'number' ? `<strong>${translations[language]["distance"]}:</strong> ${leg.distance.toFixed(0)} ${translations[language]["meters"]} <br>` : ''}
                    </li>
                `).join('')}
            </ul>
        `;
        


        resultList?.appendChild(itineraryItem);
    });
}


// Format duration in seconds to human-readable format
function formatDuration(durationInSeconds: number) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    // Use translations for hours, minutes, and seconds
    const hoursPart = hours > 0 ? `${hours} ${translations[language]["hours"]} ` : "";
    const minutesPart = minutes > 0 ? `${minutes} ${translations[language]["minutes"]} ` : "";
    const secondsPart = seconds > 0 ? `${seconds} ${translations[language]["seconds"]}` : "";

    return `${hoursPart}${minutesPart}${secondsPart}`.trim();
}


function formatDate(timestamp: number) { // Format timestamp to human-readable date and time
    const date = new Date(timestamp);

    if (language === 'fi') {
        // For Finnish, use 24-hour format
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const formattedDate = date.toLocaleDateString('fi-FI'); // Finnish locale

        return `${formattedDate}, ${formattedTime}`;
    } else {
        const formattedTime = date.toLocaleTimeString();
        const formattedDate = date.toLocaleDateString(); // Default locale format
        return `${formattedDate}, ${formattedTime}`;
    }
}

