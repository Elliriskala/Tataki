import { translations } from "./translations";
import { displayOrderHistory } from "./order_management";

const baseURL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
  // check if user has logged in to display order history

  const userToken = localStorage.getItem("authToken");

  if (userToken) {
    console.log("User is logged in.");

    const user_id = localStorage.getItem("user_id");
    console.log("user_id", user_id);
    if (user_id) {
      try {
        await displayOrderHistory(Number(user_id));
      } catch (error) {
        console.error("Failed to display order history", error);
      }
    } else {
      console.warn("User ID not found in localStorage");
    }
  } else {
    console.log("User is not logged in.");
  }

  const loginButton = document.getElementById("login-btn") as HTMLButtonElement;
  const registerButton = document.getElementById(
    "register-btn"
  ) as HTMLButtonElement;
  const toggleSlider = document.getElementById(
    "toggle-slider"
  ) as HTMLDivElement;
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
  const registerForm = document.getElementById(
    "register-form"
  ) as HTMLFormElement;
  const togglePassword = document.querySelectorAll(
    ".toggle-password"
  ) as NodeListOf<HTMLSpanElement>;
  const loginBackground = document.querySelector(
    ".login-background"
  ) as HTMLDivElement;
  const loginImage = document.querySelector(
    ".form-image-container"
  ) as HTMLDivElement;
  const navList = document.querySelector(".nav-list") as HTMLUListElement;
  const hamburgerMenu = document.querySelector(".hamburger") as HTMLDivElement;
  const dateInput = document.getElementById("date") as HTMLInputElement;
  const guestButtons = document.querySelectorAll(
    ".guest-btn"
  ) as NodeListOf<HTMLButtonElement>;
  const messageTarget = document.getElementById("message-target") as HTMLDivElement;

  // Set the initial active form to login
  if (loginForm) {
    loginForm.classList.add("active");
  } else {
    console.log("loginForm not found");
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
    }, 300); // Adjust timing to match CSS animation duration
  };

  // Function to add `interacted` class on input focus or change
  const addInteractionListeners = (form: HTMLFormElement) => {
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => input.classList.add("interacted"));
      input.addEventListener("focus", () => input.classList.add("interacted"));
    });
  };

  // Call this for both login and register forms
  if (loginForm) addInteractionListeners(loginForm);
  if (registerForm) addInteractionListeners(registerForm);

  loginButton?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleForm(true);
  });

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
        console.warn(
          "data-target attribute not found on iconContainer:",
          iconContainer
        );
        return;
      }

      // Retrieve the associated password input field
      const input = document.getElementById(
        targetId
      ) as HTMLInputElement | null;
      if (!input) {
        console.warn("Target input not found for targetId:", targetId);
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
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Handle navigation toggle for mobile
  hamburgerMenu.addEventListener("click", (event) => {
    console.log("click");
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
    console.warn(`Invalid language key: ${lang}. Defaulting to 'en'.`);
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
    console.log("English selected");
    window.location.reload();
  });
}

const flagFi = document.getElementById("flag-fi");
if (flagFi) {
  flagFi.addEventListener("click", () => {
    changeLanguage("fi");
    console.log("Finnish selected");
    window.location.reload();
  });
}

// Load saved language from localStorage when the page loads
const savedLang = localStorage.getItem("language") || "en";
if (!(savedLang in translations)) {
  console.warn(`Invalid saved language: ${savedLang}. Defaulting to 'en'.`);
  changeLanguage("en"); // Default to 'en' if the saved language is invalid
} else {
  changeLanguage(savedLang);
}

const isTokenExpired = async (token: string) => {
  if (!token) {
    console.log("No token found");
    return true;
  }

  // Check sessionStorage for cached token expiration status
  const cachedStatus = sessionStorage.getItem("tokenExpired");
  if (cachedStatus !== null) {
    return cachedStatus === "true"; // Return cached result if available
  }

  try {
    const response = await fetch(`${baseURL}/api/auth/token-validation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        console.log("Token is expired or invalid");
        sessionStorage.setItem("tokenExpired", "true"); // Cache expired status
        return true;
      }
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    const expired = data.expired;
    sessionStorage.setItem("tokenExpired", expired.toString()); // Cache status
    return expired;
  } catch (error) {
    console.error("Error during token verification:", error);
    sessionStorage.setItem("tokenExpired", "true"); // Assume token expired on error
    return true;
  }
};

window.addEventListener("load", async () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    const expired = await isTokenExpired(token);
    if (expired) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("tokenExpired"); // Clear cached result
      window.location.href = "/user.html";
    } else {
      console.log("Token is still valid");
    }
  } else {
    console.log("No token found in localStorage");
  }
});
