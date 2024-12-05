import { formatDate } from "./utils/functions";
import { UserLoggedIn } from "./utils/interfaces";
import { clearCart } from "./services/cartService";
import {translations, loginErrorMessages, registerErrorMessages } from "./translations";
const loginSubmit = document.getElementById('submit-button-login') as HTMLButtonElement;
const reservationsList = document.getElementById('reservation-list') as HTMLUListElement;

const registerSubmit = document.getElementById('submit-button-register') as HTMLButtonElement;

const registerEmail = document.getElementById('register-email') as HTMLInputElement;
const registerPassword = document.getElementById('register-password') as HTMLInputElement;
const registerUsername = document.getElementById('register-username') as HTMLInputElement;


const loginEmail = document.getElementById('login-email') as HTMLInputElement;
const loginPassword = document.getElementById('login-password') as HTMLInputElement;
const messageTarget = document.getElementById('message-target') as HTMLSpanElement;
const popup = document.getElementById('success-popup') as HTMLDivElement;
const popupMessage = document.getElementById('popup-message') as HTMLParagraphElement;
const closePopup = document.getElementById('close-popup') as HTMLButtonElement;

const modal = document.getElementById('profile-modal') as HTMLDivElement;
const overlay = document.createElement('div') as HTMLDivElement;
overlay.classList.add('modal-overlay') ;
document.body.appendChild(overlay);

const editProfileBtn = document.getElementById('edit-profile-button') as HTMLButtonElement;
const closeModalBtn = document.getElementById('close-modal-button') as HTMLButtonElement; 
const tabButtons = document.querySelectorAll('.tab-button') as NodeListOf<HTMLButtonElement>;
const tabContents = document.querySelectorAll('.tab-content') as NodeListOf<HTMLDivElement>;

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
        // Clear old state before logging in
        clearCart();
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_id');
        if (reservationsList) {
            reservationsList.innerHTML = '';
        }
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
    const language = getLanguage();

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found');
        return;
    }

    if (reservationsList) {
        reservationsList.innerHTML = '';
    }

    try {
        const response = await fetch(`${BASE_URL}/api/users/user`, {
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
             console.log(data);
            // Safely update elements if they exist in the DOM
            if (usernameElement) {
                usernameElement.innerHTML = data.username || 'Unknown';
            }
            if (usernameDisplay) {
                usernameDisplay.textContent = `${data.username || 'Unknown'}!`;
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
        const response = await fetch(`${BASE_URL}/api/reservations/user`, {
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
    const locale = language === 'fi' ? 'fi-FI' : 'en-US';
    // Check if there are any reservations
    if (response.ok && reservations.length > 0) {
        reservations.forEach(reservation => {
        const reservationGroup = document.createElement('ul');


        reservationGroup.classList.add('reservation-group');

        // Format the reservation date
        const formattedDate = formatDate(new Date(reservation.reservation_date), locale);

        // Create <li> elements for each property
        const reservationDateItem = document.createElement('li');
        reservationDateItem.textContent = `${translations[language]["your-date"]}: ${formattedDate}`;
        reservationGroup.appendChild(reservationDateItem);

        const reservationTimeItem = document.createElement('li');
        reservationTimeItem.textContent = `${translations[language]["your-time"]}: ${reservation.reservation_time}`;
        reservationGroup.appendChild(reservationTimeItem);

        const fullNameItem = document.createElement('li');
        fullNameItem.textContent = `${translations[language]["your-full-name"]}: ${reservation.full_name}`;
        reservationGroup.appendChild(fullNameItem);

        const guestsItem = document.createElement('li');
        guestsItem.textContent = `${translations[language]["your-guests"]}: ${reservation.guests}`;
        reservationGroup.appendChild(guestsItem);

        const reservationIdItem = document.createElement('li');
        reservationIdItem.textContent = `${translations[language]["your-reservation-id"]}: ${reservation.reservation_id}`;
        reservationGroup.appendChild(reservationIdItem);

        // Append the reservation group to the main list
        reservationsList.appendChild(reservationGroup);
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
    clearCart();
    const loginContent = document.getElementById('login-main');
    const userContent = document.getElementById('user-main');
    if (loginContent && userContent) {
        loginContent.style.display = 'block';
        userContent.style.display = 'none';
    }

    if (reservationsList) {
        reservationsList.innerHTML = '';
    }
});

window.onload = loadUserPage;

// Attach the event listener to the login button
loginSubmit.addEventListener('click', handleLogin);

// Attach the event listener to the register button
registerSubmit.addEventListener('click', handleRegister);


/*Edit profile - Modal functionality */

editProfileBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    // Default to the first tab
    showTab(tabButtons[0].getAttribute('data-tab'));
});

// Close modal
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Show tab content
interface TabButton extends HTMLButtonElement {
    getAttribute(qualifiedName: 'data-tab'): string | null;
}

interface TabContent extends HTMLDivElement {
    classList: DOMTokenList;
}

function showTab(tabId: string | null) {
    tabContents.forEach((tab: TabContent) => tab.classList.remove('active'));
    if (tabId) {
        const activeTab = document.getElementById(tabId) as TabContent;
        if (activeTab) {
            activeTab.classList.add('active');
        }
    }

    tabButtons.forEach((button: TabButton) => button.classList.remove('active'));
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`) as TabButton;
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// Tab switching
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        showTab(tabId);
    });
});
const showPasswordCheckbox = document.getElementById('show-password');
if (showPasswordCheckbox) {
showPasswordCheckbox.addEventListener('change', () => {
    const showPasswordElement = document.getElementById('show-password');
    if (showPasswordElement) {
        showPasswordElement.addEventListener('change', function() {
            const passwordFields = document.querySelectorAll('#current-password, #new-password, #confirm-password');
            passwordFields.forEach(field => {
                (field as HTMLInputElement).type = (this as HTMLInputElement).checked ? 'text' : 'password';
            });
        });
    }
});

// Tab Switching Logic
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        tabContents.forEach(tab => {
            (tab as HTMLElement).style.display = tab.id === targetTab ? 'block' : 'none';
        });

        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Close Modal

const closeModalBtn = document.getElementById('close-modal-button');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        const passwordFields = document.querySelectorAll('#current-password, #new-password, #confirm-password') as NodeListOf<HTMLInputElement>;
        passwordFields.forEach(field => {
            field.value = '';
            field.type = 'password';
        });

    });
} else {
    console.error('Close modal button not found');
}   
}

// update phone number 

const phoneSubmit = document.getElementById('phone-submit') as HTMLButtonElement;
const phoneInput = document.getElementById('phone-number-input') as HTMLInputElement;

const phoneNumberInput = document.getElementById('phone-number-input') as HTMLInputElement;
if (phoneNumberInput) {
    phoneNumberInput.addEventListener('input', (event) => {
        // Remove any non-numeric characters
        (event.target as HTMLInputElement).value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    });
}

phoneSubmit?.addEventListener('click', async (e) => {
    e.preventDefault();
    const phone = phoneInput.value.trim();
    if (!phone) {
        console.log('Phone number is required');
        return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/users/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ phone_number: phone })
        });

        if (response.ok) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
            showPopup('Phone number updated successfully');
            phoneInput.value = '';
            populateUserPage();
        } else {
            showPopup('Failed to update phone number');
        }
    } catch (error) {
        console.error('Error updating phone number:', error);
    }
});

const changePasswordForm = document.getElementById('change-password-form') as HTMLFormElement;

changePasswordForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('current-password') as HTMLInputElement;
    const newPassword = document.getElementById('new-password') as HTMLInputElement;
    const confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;

    const currentPasswordValue = currentPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    if (!currentPasswordValue || !newPasswordValue || !confirmPasswordValue) {
        console.log('Please fill in all fields');
        return;
    } 

    if (newPasswordValue !== confirmPasswordValue) {
        showPopup('New passwords do not match');
        return
    }

    if (!/^(?=.*\d)(?=.*[A-ZÄÖÅ]).{8,30}$/.test(newPasswordValue)) {
        showPopup('New password must contain at least one digit, one uppercase letter, and be 8-30 characters long');
        return;
    }

    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/auth/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ currentPassword: currentPasswordValue, newPassword: newPasswordValue })
        });

        if (response.ok) {
            showPopup('Password changed successfully');
            currentPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';
            console.log('Password changed successfully');
        } else {
            showPopup('Failed to change password, Check your current password');
        }
    } catch (error) {
        console.error('Error changing password:', error);
    }
});