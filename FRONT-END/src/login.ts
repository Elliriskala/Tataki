import { formatDate, getLanguage } from "./utils/functions";
import { User, UserLoggedIn } from "./utils/interfaces";
import { clearCart } from "./services/cartService";
import {
    translations,
    loginErrorMessages,
    registerErrorMessages,
} from "./translations";
import { logError } from "./utils/functions";

import { displayOrderHistory } from "./components/orderManagementDisplay";
import { initializeOrderManagementPage } from "./order_management";
import { apiBaseUrl } from "./utils/variables";

// DOM elements for login and registration
const loginSubmit = document.getElementById(
    "submit-button-login",
) as HTMLButtonElement;
const reservationsList = document.getElementById(
    "reservation-list",
) as HTMLUListElement;

const registerSubmit = document.getElementById(
    "submit-button-register",
) as HTMLButtonElement;

const registerEmail = document.getElementById(
    "register-email",
) as HTMLInputElement;
const registerPassword = document.getElementById(
    "register-password",
) as HTMLInputElement;
const registerUsername = document.getElementById(
    "register-username",
) as HTMLInputElement;

const loginEmail = document.getElementById("login-email") as HTMLInputElement;
const loginPassword = document.getElementById(
    "login-password",
) as HTMLInputElement;
const messageTarget = document.getElementById(
    "message-target",
) as HTMLSpanElement;
const popup = document.getElementById("success-popup") as HTMLDivElement;
const popupMessage = document.getElementById(
    "popup-message",
) as HTMLParagraphElement;
const closePopup = document.getElementById("close-popup") as HTMLButtonElement;

const modal = document.getElementById("profile-modal") as HTMLDivElement;
const overlay = document.createElement("div") as HTMLDivElement;
overlay.classList.add("modal-overlay");
document.body.appendChild(overlay);

const editProfileBtn = document.getElementById(
    "edit-profile-button",
) as HTMLButtonElement;
const closeModalBtn = document.getElementById(
    "close-modal-button",
) as HTMLButtonElement;
const tabButtons = document.querySelectorAll(
    ".tab-button",
) as NodeListOf<HTMLButtonElement>;
const tabContents = document.querySelectorAll(
    ".tab-content",
) as NodeListOf<HTMLDivElement>;

// Function to show the popup
const showPopup = (message: string) => {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
};

// Function to hide the popup
closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});

// URL for the login endpoint

const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";

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
        localStorage.removeItem("authToken");
        if (reservationsList) {
            reservationsList.innerHTML = "";
        }
        const response = await fetch(`${apiBaseUrl}${LOGIN_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Check for specific status codes
        if (!response.ok) {
            if (response.status === 429) {
                showPopup(translations[language]["login-too-many-attempts"]);
                loginEmail.value = "";
                loginPassword.value = "";
                return;

            } else {
            const errorData = await response.json();
            let errorMessage =
                loginErrorMessages[language][errorData.status] ||
                loginErrorMessages[language].default;

            messageTarget.textContent = errorMessage;
            messageTarget.style.color = "red";
            return;
            }
        }

        const data: UserLoggedIn = await response.json();
        showPopup(translations[language]["login-success"]);

        // Store the token in local storage or a cookie
        localStorage.setItem("authToken", data.token);

        loadUserPage();
    } catch (error) {
        messageTarget.textContent = "An error occurred. Please try again.";
        messageTarget.style.color = "red";
    } finally {
        loginSubmit.disabled = false;
    }
};

// Function to handle registration logic
const handleRegister = async (event: Event) => {
    event.preventDefault();

    const language = getLanguage();
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
        const response = await fetch(`${apiBaseUrl}${REGISTER_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }),
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            // Success - Registration was successful
            showPopup(translations[language]["register-success"]);
            // empty the input fields
            registerEmail.value = "";
            registerPassword.value = "";
            registerUsername.value = "";
        } else {
            // If the response is not OK, handle different status codes
            let errorMessage =
                registerErrorMessages[language][response.status] ||
                registerErrorMessages[language].default;
            messageTarget.textContent = errorMessage;
            messageTarget.style.color = "red";
            return;
        }
    } catch (error) {
        messageTarget.textContent = "An error occurred. Please try again.";
        messageTarget.style.color = "red";
    } finally {
        registerSubmit.disabled = false;
    }
};

const populateUserPage = async () => {
    const usernameElement = document.getElementById(
        "username-info",
    ) as HTMLSpanElement;
    const usernameDisplay = document.getElementById(
        "username-display",
    ) as HTMLSpanElement;
    const emailElement = document.getElementById(
        "email-info",
    ) as HTMLSpanElement;
    const phoneElement = document.getElementById(
        "phone-info",
    ) as HTMLSpanElement;
    const addressElement = document.getElementById(
        "address-info",
    ) as HTMLSpanElement;
    const cityElement = document.getElementById("city-info") as HTMLSpanElement;

    const language = getLanguage();

    const token = localStorage.getItem("authToken");

    // Clear reservations list if it exists
    if (reservationsList) {
        reservationsList.innerHTML = "";
    }

    // Fetch user info only if logged in
    if (token) {
        try {
            const response = await fetch(`${apiBaseUrl}/users/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                console.error("Failed to get user info:", response.statusText);
                return;
            }

            const data: User = await response.json();
            if (data) {
                if (usernameElement)
                    usernameElement.innerHTML = data.username || "Unknown";
                if (usernameDisplay)
                    usernameDisplay.textContent = `${data.username || "Unknown"}!`;
                if (emailElement)
                    emailElement.innerHTML = data.email || "No email provided";
                if (phoneElement)
                    phoneElement.innerHTML = data.phone_number || "N/A";
                if (addressElement)
                    addressElement.innerHTML = data.customer_address || "N/A";
                if (cityElement) cityElement.innerHTML = data.city || "N/A";
            } else {
                console.error("No data found for the user");
            }
        } catch (error) {
            console.error("Error while fetching user info:", error);
        }
    } else {
        console.log("No token found, user not logged in");
        // Optionally show guest-specific messages here
    }

    // Fetch reservations only if logged in
    if (token) {
        try {
            const response = await fetch(`${apiBaseUrl}/reservations/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            const reservations = Array.isArray(data) ? data : [data];
            const locale = language === "fi" ? "fi-FI" : "en-US";

            if (response.ok && reservations.length > 0) {
                reservations.forEach((reservation) => {
                    const reservationGroup = document.createElement("ul");
                    reservationGroup.classList.add("reservation-group");

                    const formattedDate = formatDate(
                        new Date(reservation.reservation_date),
                        locale,
                    );

                    const reservationDateItem = document.createElement("li");
                    reservationDateItem.textContent = `${translations[language]["your-date"]}: ${formattedDate}`;
                    reservationGroup.appendChild(reservationDateItem);

                    const reservationTimeItem = document.createElement("li");
                    reservationTimeItem.textContent = `${translations[language]["your-time"]}: ${reservation.reservation_time}`;
                    reservationGroup.appendChild(reservationTimeItem);

                    const fullNameItem = document.createElement("li");
                    fullNameItem.textContent = `${translations[language]["your-full-name"]}: ${reservation.full_name}`;
                    reservationGroup.appendChild(fullNameItem);

                    const guestsItem = document.createElement("li");
                    guestsItem.textContent = `${translations[language]["your-guests"]}: ${reservation.guests}`;
                    reservationGroup.appendChild(guestsItem);

                    const reservationIdItem = document.createElement("li");
                    reservationIdItem.textContent = `${translations[language]["your-reservation-id"]}: ${reservation.reservation_id}`;
                    reservationGroup.appendChild(reservationIdItem);

                    reservationsList.appendChild(reservationGroup);
                });
            } else {
                const noReservations = document.createElement("li");
                noReservations.textContent =
                    translations[language]["no-reservations"];
                reservationsList.appendChild(noReservations);
            }

            // Display the order history on the user page
            displayOrderHistory();
        } catch (error) {
            console.error("Failed to get reservations", error);
        }
    } else {
        console.log("No token found, skipping reservations fetch");
    }
};

const loadUserPage = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        return;
    }

    try {
        // fetch user details to determine their level
        const response = await fetch(`${apiBaseUrl}/auth/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            // Handle unexpected responses or errors
            console.error(
                `HTTP Error: ${response.status} ${response.statusText}`,
            );
            return;
        }

        if (
            !response.headers.get("Content-Type")?.includes("application/json")
        ) {
            const responseText = await response.text();
            console.error("Unexpected response type:", responseText);
            throw new Error("Received non-JSON response from the server.");
        }

        const userInfo = await response.json();

        // Check if the user is an admin
        const isAdmin = userInfo.user_level_id === 1;

        const loginContent = document.getElementById("login-main");
        const userContent = document.getElementById("user-main");
        const adminContent = document.getElementById("admin-main");

        if (loginContent) loginContent.style.display = "none";
        if (userContent) userContent.style.display = "flex";
        if (adminContent) adminContent.style.display = "none";

        if (isAdmin && adminContent) {
            if (userContent) userContent.style.display = "none";
                adminContent.style.display = "flex";
                initializeOrderManagementPage();
        } else {
            if (userContent) userContent.style.display = "flex";
            populateUserPage();
        }
    } catch (error) {
        console.error("Error in loadUserPage:", error);
        logError(error, "loadUserPage");
        window.location.href = "/";
    }
};

// Admin log out functionality
const adminLogoutButton = document.getElementById(
    "admin-logout",
) as HTMLButtonElement;

if (adminLogoutButton) {
    adminLogoutButton.addEventListener("click", () => {
        clearCart();
        localStorage.removeItem("authToken");
        const loginContent = document.getElementById("login-main");
        const adminContent = document.getElementById("admin-main");

        if (loginContent && adminContent) {
            loginContent.style.display = "block";
            adminContent.style.display = "none";
        }
    });
}

//  Log out functionality
const logOutButton = document.getElementById("logout-btn") as HTMLButtonElement;

if (logOutButton) {
    logOutButton.addEventListener("click", () => {
        clearCart();
        localStorage.removeItem("authToken");
        const loginContent = document.getElementById("login-main");
        const userContent = document.getElementById("user-main");
        if (loginContent && userContent) {
            loginContent.style.display = "block";
            userContent.style.display = "none";
        }

        if (reservationsList) {
            reservationsList.innerHTML = "";
        }
    });
}

window.onload = loadUserPage;

// Attach the event listener to the login button
loginSubmit.addEventListener("click", handleLogin);

// Attach the event listener to the register button
registerSubmit.addEventListener("click", handleRegister);

/*Edit profile - Modal functionality */

editProfileBtn.addEventListener("click", () => {
    modal.style.display = "block";

    showTab(tabButtons[0].getAttribute("data-tab"));
});

const closeModal = () => {
    modal.style.display = "none";
};

// Close modal
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Show tab content
interface TabButton extends HTMLButtonElement {
    getAttribute(qualifiedName: "data-tab"): string | null;
}

interface TabContent extends HTMLDivElement {
    classList: DOMTokenList;
}

const showTab = (tabId: string | null) => {
    tabContents.forEach((tab: TabContent) => tab.classList.remove("active"));
    if (tabId) {
        const activeTab = document.getElementById(tabId) as TabContent;
        if (activeTab) {
            activeTab.classList.add("active");
        }
    }

    tabButtons.forEach((button: TabButton) =>
        button.classList.remove("active"),
    );
    const activeButton = document.querySelector(
        `[data-tab="${tabId}"]`,
    ) as TabButton;
    if (activeButton) {
        activeButton.classList.add("active");
    }
};

// Tab switching
tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        showTab(tabId);
    });
});
const showPasswordCheckbox = document.getElementById("show-password");
if (showPasswordCheckbox) {
    showPasswordCheckbox.addEventListener("change", () => {
        const showPasswordElement = document.getElementById("show-password");
        if (showPasswordElement) {
            showPasswordElement.addEventListener("change", function () {
                const passwordFields = document.querySelectorAll(
                    "#current-password, #new-password, #confirm-password",
                );
                passwordFields.forEach((field) => {
                    (field as HTMLInputElement).type = (
                        this as HTMLInputElement
                    ).checked
                        ? "text"
                        : "password";
                });
            });
        }
    });

    // Tab Switching Logic
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetTab = button.getAttribute("data-tab");

            tabContents.forEach((tab) => {
                (tab as HTMLElement).style.display =
                    tab.id === targetTab ? "block" : "none";
            });

            tabButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Close Modal

    const closeModalBtn = document.getElementById("close-modal-button");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
            overlay.style.display = "none";
            const passwordFields = document.querySelectorAll(
                "#current-password, #new-password, #confirm-password",
            ) as NodeListOf<HTMLInputElement>;
            passwordFields.forEach((field) => {
                field.value = "";
                field.type = "password";
            });
        });
    } else {
        console.error("Close modal button not found");
    }
}

// update phone number

const phoneSubmit = document.getElementById(
    "phone-submit",
) as HTMLButtonElement;
const phoneInput = document.getElementById(
    "phone-number-input",
) as HTMLInputElement;

const phoneNumberInput = document.getElementById(
    "phone-number-input",
) as HTMLInputElement;
if (phoneNumberInput) {
    phoneNumberInput.addEventListener("input", (event) => {
        // Remove any non-numeric characters
        (event.target as HTMLInputElement).value = (
            event.target as HTMLInputElement
        ).value.replace(/\D/g, "");
    });
}

phoneSubmit?.addEventListener("click", async (e) => {
    e.preventDefault();
    const phoneElement = document.getElementById(
        "phone-info",
    ) as HTMLSpanElement;
    const language = getLanguage();
    const phone = phoneInput.value.trim();
    if (!phone) {
        showPopup(translations[language]["phone-format"]);
        return;
    }

    // Check if the phone number is the same as the current one
    if (phone === phoneElement.textContent) {
        showPopup(translations[language]["phone-same"]);
        return;
    }

    // Check if token exists
    const token = localStorage.getItem("authToken");
    if (!token) {
        logError(new Error("No token found"), "phoneSubmit");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/users/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ phone_number: phone }),
        });

        if (response.ok) {
            modal.style.display = "none";
            overlay.style.display = "none";
            showPopup(translations[language]["phone-update-success"]);
            phoneInput.value = "";
            populateUserPage();
        } else {
            showPopup(translations[language]["phone-update-fail"]);
        }
    } catch (error) {
        console.error("Error updating phone number:", error);
    }
});

// Update address
const addressSubmit = document.getElementById(
    "address-submit",
) as HTMLButtonElement;
const addressInput = document.getElementById(
    "address-input",
) as HTMLInputElement;
const cityInput = document.getElementById("city-input") as HTMLInputElement;

addressSubmit.addEventListener("click", async (e) => {
    e.preventDefault();

    const language = getLanguage();

    const address = addressInput.value.trim();
    const city = cityInput.value.trim();

    if (address === addressInput.textContent) {
        showPopup(translations[language]["address-same"]);
        return;
    }

    if (!address || !city) {
        showPopup(translations[language]["address-format"]);
        return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
        logError(new Error("No token found"), "addressSubmit");
    }

    try {
        const response = await fetch(`${apiBaseUrl}/users/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ customer_address: address, city }),
        });

        if (response.ok) {
            modal.style.display = "none";
            overlay.style.display = "none";
            showPopup(translations[language]["address-update-success"]);
            addressInput.value = "";
            cityInput.value = "";
            populateUserPage();
        } else {
            showPopup(translations[language]["address-update-fail"]);
        }
    } catch (error) {
        logError(error, "addressSubmit");
    }
});

const changePasswordForm = document.getElementById(
    "change-password-form",
) as HTMLFormElement;

// Change password
changePasswordForm?.addEventListener("submit", async (e) => {
    const language = getLanguage();
    e.preventDefault();
    const currentPassword = document.getElementById(
        "current-password",
    ) as HTMLInputElement;
    const newPassword = document.getElementById(
        "new-password",
    ) as HTMLInputElement;
    const confirmPassword = document.getElementById(
        "confirm-password",
    ) as HTMLInputElement;

    const currentPasswordValue = currentPassword.value.trim();
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Check if any field is empty
    if (!currentPasswordValue || !newPasswordValue || !confirmPasswordValue) {
        return;
    }

    // Check if the new password and confirm password fields
    if (newPasswordValue !== confirmPasswordValue) {
        showPopup(translations[language]["password-mismatch"]);
        return;
    }

    // Check if the new password meets the required format
    if (!/^(?=.*\d)(?=.*[A-ZÄÖÅ]).{8,30}$/.test(newPasswordValue)) {
        showPopup(translations[language]["password-format"]);
        return;
    }

    const token = localStorage.getItem("authToken");

    if (!token) {
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/auth/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword: currentPasswordValue,
                newPassword: newPasswordValue,
            }),
        });

        // Check if the response is OK, render a success message
        if (response.ok) {
            showPopup(translations[language]["password-change-success"]);
            currentPassword.value = "";
            newPassword.value = "";
            confirmPassword.value = "";
        } else {
            showPopup(translations[language]["password-change-fail"]);
        }
    } catch (error) {
        console.error("Error changing password:", error);
    }
});

const deleteModal = document.getElementById(
    "delete-profile-modal",
) as HTMLDivElement;
const openModal = document.getElementById(
    "delete-profile-button",
) as HTMLButtonElement;
const closeDeleteModal = document.getElementById(
    "close-delete-modal-button",
) as HTMLButtonElement;
const deleteProfileButton = document.getElementById(
    "confirm-delete-button",
) as HTMLButtonElement;

openModal.addEventListener("click", () => {
    deleteModal.style.display = "flex";
});

closeDeleteModal.addEventListener("click", () => {
    deleteModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === deleteModal) {
        deleteModal.style.display = "none";
    }
});

deleteProfileButton.addEventListener("click", async () => {
    const language = getLanguage();
    const token = localStorage.getItem("authToken");

    if (!token) {
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/users/user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem("authToken");
            deleteModal.style.display = "none";
            overlay.style.display = "none";
            const loginContent = document.getElementById("login-main");
            const userContent = document.getElementById("user-main");
            if (loginContent && userContent) {
                loginContent.style.display = "block";
                userContent.style.display = "none";
            }
            if (reservationsList) {
                reservationsList.innerHTML = "";
            }
            showPopup(translations[language]["profile-delete-success"]);
        } else {
            showPopup(translations[language]["profile-delete-fail"]);
        }
    } catch (error) {
        console.error("Error deleting profile:", error);
    }
});
