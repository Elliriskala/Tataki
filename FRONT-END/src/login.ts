
import { UserLoggedIn } from "./utils/interfaces";
import { loginErrorMessages, registerErrorMessages } from "./translations";
const loginSubmit = document.getElementById('submit-button-login') as HTMLButtonElement;


const registerSubmit = document.getElementById('submit-button-register') as HTMLButtonElement;
//const loginForm = document.getElementById('login-form') as HTMLFormElement;
//const registerForm = document.getElementById('register-form') as HTMLFormElement;
//const loginToggle = document.getElementById('login-btn') as HTMLButtonElement;
//const registerToggle = document.getElementById('register-btn') as HTMLButtonElement;
//const userPageButton = document.getElementById('login-register-user') as HTMLButtonElement;

const registerEmail = document.getElementById('register-email') as HTMLInputElement;
const registerPassword = document.getElementById('register-password') as HTMLInputElement;
const registerUsername = document.getElementById('register-username') as HTMLInputElement;


const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const messageTarget = document.getElementById('message-target') as HTMLSpanElement;
const popup = document.getElementById('success-popup') as HTMLDivElement;
const popupMessage = document.getElementById('popup-message') as HTMLParagraphElement;
const closePopup = document.getElementById('close-popup') as HTMLButtonElement;

// Function to show the popup
const showPopup = (message: string) => {
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
};

// Function to hide the popup
closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});


const getLanguage = () => {
    return localStorage.getItem('language') || 'en';
}


// URL for the login endpoint
const BASE_URL = 'http://localhost:3000';
const LOGIN_URL = '/api/auth/login'; // Replace with your actual API endpoint
const REGISTER_URL = '/api/auth/register'; // Replace with your actual API endpoint

// Function to handle login logic
const handleLogin = async (event: Event) => {
    event.preventDefault();

    const language = getLanguage();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
        messageTarget.textContent = "Please fill in all fields.";
        messageTarget.style.color = "red";
        return;
    }

    loginSubmit.disabled = true;

    try {
        const response = await fetch(`${BASE_URL}${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check for specific status codes
        if (!response.ok) {
            const errorData = await response.json();
        let errorMessage = loginErrorMessages[language][errorData.status] || loginErrorMessages[language].default;

        messageTarget.textContent = errorMessage;
        messageTarget.style.color = "red";
        return;
    }

        const data: UserLoggedIn = await response.json();
        showPopup("Login successful! Redirecting to user page...");

        // Store the token in local storage or a cookie
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user_id', data.user_id.toString());
        console.log(data);

        loadUserPage();

    } catch (error) {
        console.error("Login error:", error);
        messageTarget.textContent = "An error occurred. Please try again.";
        messageTarget.style.color = "red";
    } finally {
        loginSubmit.disabled = false;
    }
};


// Function to handle registration logic
// Function to handle registration logic
const handleRegister = async (event: Event) => {
    event.preventDefault();

    const language = getLanguage();
    console.log(language);
    const email = registerEmail.value.trim();
    const password = registerPassword.value.trim();
    const username = registerUsername.value.trim();

    if (!email || !password || !username) {
        messageTarget.textContent = "Please fill in all fields.";
        messageTarget.style.color = "red";
        return;
    }

    registerSubmit.disabled = true;

    try {
        const response = await fetch(`${BASE_URL}${REGISTER_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username }),
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            // Success - Registration was successful
            showPopup("Registration successful! You may now log in.");
            // empty the input fields
            registerEmail.value = '';
            registerPassword.value = '';
            registerUsername.value = '';
        } else {
            // If the response is not OK, handle different status codes
            let errorMessage = registerErrorMessages[language][response.status] || registerErrorMessages[language].default;
            messageTarget.textContent = errorMessage;
            messageTarget.style.color = "red";
            return;
        }

    } catch (error) {
        console.error("Registration error:", error);
        messageTarget.textContent = "An error occurred. Please try again.";
        messageTarget.style.color = "red";
    } finally {
        registerSubmit.disabled = false;
    }
};


const populateUserPage = async () => {
    const usernameElement = document.getElementById('username-info') as HTMLSpanElement;
    const usernameDisplay = document.getElementById('username-display') as HTMLSpanElement;
    const emailElement = document.getElementById('email-info') as HTMLSpanElement;
    const phoneElement = document.getElementById('phone-info') as HTMLSpanElement;
    const reservationsList = document.getElementById('reservation-list') as HTMLUListElement;

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');
    if (!token || !user_id) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/users/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    
        if (!response.ok) {
            console.error('Failed to get user info:', response.statusText);
            return;
        }
    
        const data = await response.json();
        if (data) {
            // Safely update elements if they exist in the DOM
            if (usernameElement) {
                usernameElement.innerHTML = data.username || 'Unknown';
            }
            if (usernameDisplay) {
                usernameDisplay.innerHTML = data.username || 'Unknown';
            }
            if (emailElement) {
                emailElement.innerHTML = data.email || 'No email provided';
            }
            if (phoneElement) {
                phoneElement.innerHTML = data.phone_number || 'N/A';
            }
        } else {
            console.error('No data found for the user');
        }
    } catch (error) {
        console.error('Error while fetching user info:', error);
    }


    try {

        const response = await fetch(`${BASE_URL}/api/reservations/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        const data = await response.json();
    console.log(data);

    // Wrap data in an array if it's not already an array
    const reservations = Array.isArray(data) ? data : [data];

    // Check if there are any reservations
    if (response.ok) {
        reservations.forEach(reservation => {
            // Create a <li> for each property of the reservation
            const reservationDateItem = document.createElement('li');
            reservationDateItem.textContent = `Reservation Date: ${reservation.reservation_date}`;
            reservationsList.appendChild(reservationDateItem);

            const reservationTimeItem = document.createElement('li');
            reservationTimeItem.textContent = `Reservation Time: ${reservation.reservation_time}`;
            reservationsList.appendChild(reservationTimeItem);

            const fullNameItem = document.createElement('li');
            fullNameItem.textContent = `Full Name: ${reservation.full_name}`;
            reservationsList.appendChild(fullNameItem);

            // Add more properties as needed
            // Example: for guests, reservation_id, etc.
            const guestsItem = document.createElement('li');
            guestsItem.textContent = `Guests: ${reservation.guests}`;
            reservationsList.appendChild(guestsItem);

            const reservationIdItem = document.createElement('li');
            reservationIdItem.textContent = `Reservation ID: ${reservation.reservation_id}`;
            reservationsList.appendChild(reservationIdItem);
        });
    } else {
        // If no reservations, show a "No reservations found" message
        const noReservations = document.createElement('li');
        noReservations.textContent = 'No reservations found';
        reservationsList.appendChild(noReservations);
    }
} catch (error) {
    console.error('Failed to get reservations', error);
}
}


const loadUserPage = () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        return;
    } else {
        const loginContent = document.getElementById('login-main');
        const userContent = document.getElementById('user-main');
        if (loginContent && userContent) {
            loginContent.style.display = 'none';
            userContent.style.display = 'flex';
        }
        populateUserPage();
    }
}

const logOutButton = document.getElementById('logout-btn') as HTMLButtonElement;
logOutButton.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    const loginContent = document.getElementById('login-main');
    const userContent = document.getElementById('user-main');
    if (loginContent && userContent) {
        loginContent.style.display = 'block';
        userContent.style.display = 'none';
    }
});

window.onload = loadUserPage;

// Attach the event listener to the login button
loginSubmit.addEventListener('click', handleLogin);

// Attach the event listener to the register button
registerSubmit.addEventListener('click', handleRegister);
