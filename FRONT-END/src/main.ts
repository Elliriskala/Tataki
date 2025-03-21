import { translations } from "./translations";
import { displayOrderHistory } from "./components/orderManagementDisplay";
import { clearCart } from "./services/cartService";
import { apiBaseUrl } from "./utils/variables";
import { logError } from "./utils/functions";

const loginButton = document.getElementById("login-btn") as HTMLButtonElement;
const registerButton = document.getElementById(
    "register-btn",
) as HTMLButtonElement;
const toggleSlider = document.getElementById("toggle-slider") as HTMLDivElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const registerForm = document.getElementById(
    "register-form",
) as HTMLFormElement;
const togglePassword = document.querySelectorAll(
    ".toggle-password",
) as NodeListOf<HTMLSpanElement>;
const loginBackground = document.querySelector(
    ".login-background",
) as HTMLDivElement;
const loginImage = document.querySelector(
    ".form-image-container",
) as HTMLDivElement;
const navList = document.querySelector(".nav-list") as HTMLUListElement;
const hamburgerMenu = document.querySelector(".hamburger") as HTMLDivElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const guestButtons = document.querySelectorAll(
    ".guest-btn",
) as NodeListOf<HTMLButtonElement>;
const messageTarget = document.getElementById(
    "message-target",
) as HTMLDivElement;

document.addEventListener("DOMContentLoaded", async () => {
    // check if user has logged in to display order history

    const userToken = localStorage.getItem("authToken");
    if (userToken) {
        try {
            const response = await fetch(`${apiBaseUrl}/orders/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const orders = await response.json();

            if (response.ok && orders.length > 0) {
                displayOrderHistory();
            }
        } catch (error) {
            logError(error, "fetching order history");
        }
    }

    // Set the initial active form to login
    if (loginForm) {
        loginForm.classList.add("active");
    } else {
        console.log("Login form not found");
    }

    // Toggle between login and register forms with animation control
    const toggleForm = (isLogin: boolean) => {
        // Temporarily disable animations by adding 'no-animate' class
        loginForm.classList.add("no-animate");
        registerForm.classList.add("no-animate");

        toggleSlider.style.transform = isLogin
            ? "translateX(0)"
            : "translateX(100%)";
        loginForm.classList.toggle("active", isLogin);
        registerForm.classList.toggle("active", !isLogin);
        loginButton.classList.toggle("active", isLogin);
        registerButton.classList.toggle("active", !isLogin);
        loginBackground.classList.toggle("toggle-view", !isLogin);
        loginImage.classList.toggle("register-image", !isLogin);
        resetForm(isLogin ? registerForm : loginForm);
        messageTarget.innerHTML = ""; // Clear any previous messages

    // Remove 'no-animate' class after a short delay
    setTimeout(() => {
      loginForm.classList.remove("no-animate");
      registerForm.classList.remove("no-animate");
    }, 300); // match CSS animation duration
  };

    // Function to add `interacted` class on input focus or change
    const addInteractionListeners = (form: HTMLFormElement) => {
        const inputs = form.querySelectorAll("input");
        inputs.forEach((input) => {
            input.addEventListener("input", () =>
                input.classList.add("interacted"),
            );
            input.addEventListener("focus", () =>
                input.classList.add("interacted"),
            );
        });
    };

    // Call this for both login and register forms
    if (loginForm) addInteractionListeners(loginForm);
    if (registerForm) addInteractionListeners(registerForm);

    loginButton?.addEventListener("click", (event) => {
        event.preventDefault();
        toggleForm(true);
    });

    // Register button event listener
    registerButton?.addEventListener("click", (event) => {
        event.preventDefault();
        toggleForm(false);
    });

    // Toggle password visibility
    togglePassword?.forEach((iconContainer) => {
        iconContainer.addEventListener("click", async () => {
            // Retrieve the target ID from the data-target attribute
            const targetId = iconContainer.getAttribute("data-target");
            if (!targetId) {
                return;
            }

            // Retrieve the associated password input field
            const input = document.getElementById(
                targetId,
            ) as HTMLInputElement | null;
            if (!input) {
                return;
            }

            // Select the <i> icon inside the span
            const icon = iconContainer.querySelector("i");

            // Toggle between password and text
            const isPasswordType = input.getAttribute("type") === "password";
            input.setAttribute("type", isPasswordType ? "text" : "password");

            // Toggle icon classes
            if (icon) {
                icon.classList.toggle("fa-eye", !isPasswordType);
                icon.classList.toggle("fa-eye-slash", isPasswordType);
            }
        });
    });

    // Reset form function to clear inputs and validation state
    const resetForm = (form: HTMLFormElement) => {
        const inputs = form.querySelectorAll("input");
        inputs.forEach((input) => {
            input.value = "";
            input.classList.remove("valid", "invalid");
        });
    };

  // Set minimum date for date input
  if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add one day to today
    const minDate = tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    dateInput.setAttribute("min", minDate);
  }

    // Handle navigation toggle for mobile
    hamburgerMenu.addEventListener("click", (event) => {
        event.stopPropagation();
        navList.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        const target = event.target as Node;
        const isInsideNav =
            navList.contains(target) || hamburgerMenu.contains(target);
        if (!isInsideNav) {
            navList.classList.remove("active");
        }
    });

    // Toggle details open/close with animation
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach((details) => {
        const content = details.querySelector(".content");
        details.addEventListener("toggle", () => {
            if (!content) return;
            (content as HTMLElement).style.maxHeight = details.open
                ? content.scrollHeight + "px"
                : "0";
        });
    });

    // Handle guest selection
    guestButtons.forEach((button) => {
        button.addEventListener("click", () => {
            guestButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            //guestInput.value = button.getAttribute("guests-input") || "";
        });
    });
});

// Language change logic
function changeLanguage(lang: string) {
    // Check if the language exists in the translations object
    if (!(lang in translations)) {
        lang = "en"; // Default to 'en' if the key is invalid
    }

    // Retrieve the translation keys and update the elements with the 'data-translate' attribute
    const languageData = translations[lang];
    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (key && languageData[key]) {
            if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") {
                // If it's not a form input, update the innerText
                (el as HTMLElement).innerText = languageData[key];
            } else {
                // For input/textarea, update the placeholder
                (el as HTMLInputElement | HTMLTextAreaElement).placeholder =
                    languageData[key];
            }
        }
    });

    // Save the selected language in localStorage
    localStorage.setItem("language", lang);
}

// Event listeners for language buttons
const flagEn = document.getElementById("flag-en");
if (flagEn) {
    flagEn.addEventListener("click", () => {
        changeLanguage("en");
        window.location.reload();
    });
}

const flagFi = document.getElementById("flag-fi");
if (flagFi) {
    flagFi.addEventListener("click", () => {
        changeLanguage("fi");
        window.location.reload();
    });
}

// Load saved language from localStorage when the page loads
const savedLang = localStorage.getItem("language") || "en";
if (!(savedLang in translations)) {
    changeLanguage("en"); // Default to 'en' if the saved language is invalid
} else {
    changeLanguage(savedLang);
}

const isTokenExpired = async (token: string) => {
    if (!token) {
        return true;
    }

    // Check sessionStorage for cached token expiration status
    const cachedStatus = sessionStorage.getItem("tokenExpired");
    if (cachedStatus !== null) {
        return cachedStatus === "true"; // Return cached result if available
    }

    try {
        const response = await fetch(`${apiBaseUrl}/auth/token-validation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                sessionStorage.setItem("tokenExpired", "true"); // Cache expired status
                return true;
            }
            throw new Error(`Server error: ${response.statusText}`);
        }

        // Parse the JSON response and cache the result
        const data = await response.json();
        const expired = data.expired;
        sessionStorage.setItem("tokenExpired", expired.toString()); // Cache status
        return expired;
    } catch (error) {
        sessionStorage.setItem("tokenExpired", "true"); // Assume token expired on error
        return true;
    }
};


const showSessionExpiredPopup = () => {
    const expiredPopup = document.createElement("div");
    expiredPopup.className = "session-expired-popup";
    expiredPopup.innerHTML = `
        <p>${translations[savedLang]["session-expired-p"]}</p>
        <button id="close-popup">OK</button>
    `;
    document.body.appendChild(expiredPopup);

    const closePopup = document.getElementById("close-popup") as HTMLButtonElement;
    if (closePopup) {
    closePopup.addEventListener("click", () => {
        clearCart();
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("tokenExpired"); // Clear cached result
        window.location.href = "/user.html";
        document.body.removeChild(expiredPopup);
    });
    } else {
        logError(new Error("Close button not found"), "showSessionExpiredPopup");
    }
};


window.addEventListener("load", async () => {
    const token = localStorage.getItem("authToken");

    // Check if the token is expired and redirect to login if needed
    if (token) {
        const expired = await isTokenExpired(token);
        if (expired) {
            showSessionExpiredPopup();
        } else {
            return;
        }
    } else {
        return;
    }
});

