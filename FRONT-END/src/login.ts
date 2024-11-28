import { UserLoggedIn } from "./utils/interfaces";


const loginSubmit = document.getElementById('submit-button-login') as HTMLButtonElement;
const registerSubmit = document.getElementById('submit-button-register') as HTMLButtonElement;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const registerForm = document.getElementById('register-form') as HTMLFormElement;
const loginToggle = document.getElementById('login-btn') as HTMLButtonElement;
const registerToggle = document.getElementById('register-btn') as HTMLButtonElement;
const userPageButton = document.getElementById('login-register-user') as HTMLButtonElement;

const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const registerEmail = document.getElementById('register-email') as HTMLInputElement;
const registerPassword = document.getElementById('register-password') as HTMLInputElement;
const registerUsername = document.getElementById('register-username') as HTMLInputElement;
const messageTarget = document.getElementById('message-target') as HTMLSpanElement;


// URL for the login endpoint
const LOGIN_URL = '/api/login'; // Replace with your actual API endpoint

// Function to handle login logic
const handleLogin = async (event: Event) => {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!email || !password) {
        messageTarget.textContent = "Please fill in all fields.";
        messageTarget.style.color = "red";
        return;
    }

    try {
        const response = await fetch(`localhost:3000${LOGIN_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            messageTarget.textContent = errorData.message || "Login failed.";
            messageTarget.style.color = "red";
            return;
        }

        const data: UserLoggedIn = await response.json();
        messageTarget.textContent = "Login successful!";
        messageTarget.style.color = "green";

        // Store the token in local storage or a cookie
        localStorage.setItem('authToken', data.token);

    } catch (error) {
        console.error("Login error:", error);
        messageTarget.textContent = "An error occurred. Please try again.";
        messageTarget.style.color = "red";
    }
};

// Attach the event listener to the login button
loginSubmit.addEventListener('click', handleLogin);
