
import { UserLoggedIn } from "./utils/interfaces";
import { loginErrorMessages, registerErrorMessages } from "./translations";
const loginSubmit = document.getElementById('submit-button-login') as HTMLButtonElement;
const registerSubmit = document.getElementById('submit-button-register') as HTMLButtonElement;
//const loginForm = document.getElementById('login-form') as HTMLFormElement;
//const registerForm = document.getElementById('register-form') as HTMLFormElement;
//const loginToggle = document.getElementById('login-btn') as HTMLButtonElement;
//const registerToggle = document.getElementById('register-btn') as HTMLButtonElement;
//const userPageButton = document.getElementById('login-register-user') as HTMLButtonElement;

const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const registerEmail = document.getElementById('register-email') as HTMLInputElement;
const registerPassword = document.getElementById('register-password') as HTMLInputElement;
const registerUsername = document.getElementById('register-username') as HTMLInputElement;
const messageTarget = document.getElementById('message-target') as HTMLSpanElement;


const getLanguage = () => {
    return localStorage.getItem('language') || 'en';
}


// URL for the login endpoint
const BASE_URL = 'http://localhost:3000';
const LOGIN_URL = '/api/auth/login'; // Replace with your actual API endpoint
const REGISTER_URL = '/api/users'; // Replace with your actual API endpoint

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
        messageTarget.textContent = "Login successful!";
        messageTarget.style.color = "green";

        // Store the token in local storage or a cookie
        localStorage.setItem('authToken', data.token);
        console.log(data);

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
            messageTarget.textContent = "Registration successful, you may now log in!";
            messageTarget.style.color = "green";
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


// Attach the event listener to the login button
loginSubmit.addEventListener('click', handleLogin);

// Attach the event listener to the register button
registerSubmit.addEventListener('click', handleRegister);
