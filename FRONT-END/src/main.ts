import translations from "./translations";

const translationsTyped = translations;

document.addEventListener("DOMContentLoaded", () => {
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
  const guestInput = document.getElementById(
    "guests-input"
  ) as HTMLInputElement;

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
    iconContainer.addEventListener("click", () => {
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
      guestInput.value = button.getAttribute("guests-input") || "";
      const lang = localStorage.getItem("language") || "en";
      const key = button.getAttribute("data-translate");
      if (
        key &&
        translationsTyped[lang] &&
        (translationsTyped[lang] as { [key: string]: string })[key]
      ) {
        alert(translationsTyped[lang][key]);
      }
    });

    function changeLanguage(lang: string) {
      if (!(lang in translations)) {
        console.warn(`Invalid language key: ${lang}`);
        lang = "en"; // Default to 'en' if the key is invalid
      }

      const languageKey = button.getAttribute("data-translate") || "en";
      const elements = document.querySelectorAll("[data-translate]");
      elements.forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (key && translations[languageKey][key]) {
          if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") {
            (el as HTMLElement).innerText = translations[languageKey][key];
          } else {
            (el as HTMLInputElement | HTMLTextAreaElement).placeholder =
              translations[languageKey][key];
          }
        }
      });

      localStorage.setItem("language", languageKey);
    }

    // Event listeners for language buttons
    const flagEn = document.getElementById("flag-en");
    if (flagEn) {
      flagEn.addEventListener("click", () => changeLanguage("en"));
    }
    const flagFi = document.getElementById("flag-fi");
    if (flagFi) {
      flagFi.addEventListener("click", () => changeLanguage("fi"));
    }

    // Load saved language from localStorage
    const savedLang = localStorage.getItem("language") || "en";
    if (!(savedLang in translations)) {
      console.warn(`Invalid saved language: ${savedLang}. Defaulting to 'en'.`);
    }
    changeLanguage(savedLang in translations ? savedLang : "en");
    
  });
});

const fetchReservations = document.getElementById(
  "fetchReservations"
) as HTMLButtonElement;
fetchReservations?.addEventListener("click", async () => {
  const response = await fetch("/api/reservations");
  const reservations = await response.json();
  console.log(reservations);
});


const fetchButton = document.getElementById("fetch") as HTMLButtonElement;
const target = document.getElementById("contactMap") as HTMLDivElement;


fetchButton?.addEventListener("click", async () => {
  try {
    const response = await fetch('http://localhost:3000/api/reservations', {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response body as JSON
    const data = await response.json();

    // Log the data to the console for debugging
    console.log(data);

    // Update the target element with the formatted data
    if (target) {
      target.innerHTML = JSON.stringify(data, null, 2);  // Pretty-print JSON
    }
  } catch (error) {
    // Log any errors
    console.error('Fetch error:', error);

    // Optionally show an error message to the user
    if (target) {
      target.innerHTML = `<p>Error fetching data: ${(error as Error).message}</p>`;
    }
  }
});

