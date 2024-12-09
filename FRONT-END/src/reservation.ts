import { Reservation, Times, User } from "./utils/interfaces";
import { getLanguage } from "./utils/functions";
import { translations } from "./translations";
const guestButtons = document.querySelectorAll(
  ".guest-btn"
) as NodeListOf<HTMLButtonElement>;
const dateInput = document.getElementById("date") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const timeSelect = document.getElementById("time") as HTMLSelectElement;
const reservationSubmit = document.getElementById(
  "reservation-submit"
) as HTMLButtonElement;
const messageBox = document.getElementById(
  "reservation-message"
) as HTMLDivElement;
const useMyInfoButton = document.getElementById(
  "use-user-info"
) as HTMLButtonElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const guestsInput = document.getElementById("guests-input") as HTMLInputElement;
const popup = document.getElementById("success-popup") as HTMLDivElement;
const popupMessage = document.getElementById(
  "popup-message"
) as HTMLParagraphElement;
const closePopup = document.getElementById("close-popup") as HTMLButtonElement;

// Function to show the popup
const showPopup = (message: string) => {
    popupMessage.textContent = message;
    popup.classList.remove("hidden");
};

// Function to hide the popup
closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
    dateInput.disabled = true;
    timeSelect.disabled = true;
    const language = getLanguage();

    guestButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target) {
                const guests = target.getAttribute("data-value");

                const guestsInput = document.getElementById(
          "guests-input"
                ) as HTMLInputElement;
                if (guestsInput) {
                    guestsInput.value = guests ?? "";
                }
            }
            dateInput.disabled = false;
        });
    });

    dateInput.addEventListener("change", async () => {
        const guests = guestsInput?.value;
        const date = dateInput?.value;
        const name = nameInput?.value;
        // application/json
        if (!date || !guests || !name) {
            timeSelect.disabled = true;
      messageBox.textContent = translations[language]["select-date-and-guests"];
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:3000/api/reservations/times?date=${date}&guests=${guests}`,

                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json", // Ensure the content is in JSON format
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to get times");
                return;
            }

            const data: Times = await response.json();
            const times: string[] = data.availableTimes;

            timeSelect.innerHTML = `<option value="">Select a time</option>`;

            if (times && times.length > 0) {
                // ['12:00', '12:30', '1:00']
                for (const time of times) {
                    const option = document.createElement("option");
                    option.value = time;
                    option.textContent = time;
                    timeSelect.appendChild(option);
                }
                timeSelect.disabled = false;
            } else {
                console.error("No times available");
                timeSelect.disabled = true;
            }
        } catch (error) {
            console.error("Failed to get times", error);
            messageBox.textContent = "Failed to get times";
            timeSelect.disabled = true;
        }
    });

    useMyInfoButton.addEventListener("click", async () => {
        const token = localStorage.getItem("authToken"); // 'Bearer token'
        if (!token) {
            console.error("No token found");
            alert("Please log in to use this feature");
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:3000/api/users/user`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                console.error("Failed to get user info");
                return;
            }

            const data: User = await response.json(); // { email: '', phone_number: '' }
            emailInput.value = data.email ?? "";
            phoneInput.value = data.phone_number ?? "";
        } catch (error) {
            console.error("Failed to get user info", error);
        }
    });

    reservationSubmit.addEventListener("click", async (event) => {
        event.preventDefault();
        const language = getLanguage();
        const fullName = nameInput.value;
        const reservation_date = dateInput.value;
        const reservation_time = timeSelect.value;
        const reservation_guests = Number(guestsInput.value); // Ensure this is a number
        const reservation_email = emailInput.value;
        const reservation_phone = phoneInput.value;
        const token = localStorage.getItem("authToken");

        // Allow user to make a reservation both as a guest and as a logged-in user
        if (!reservation_date || !reservation_time || !reservation_guests) {
            messageBox.textContent = translations[language]["fill-all-fields"];
            return;
        }

        if (!reservation_email || !validateEmail(reservation_email)) {
            messageBox.textContent = translations[language]["invalid-email"];
            return;
        }

        if (!reservation_phone || !validatePhone(reservation_phone)) {
            messageBox.textContent = translations[language]["invalid-phone"];
            return;
        }

        if (!token) {
            console.error("No token found");
        }

        const requestBody: Reservation = {
            reservation_date,
            reservation_time,
            guests: reservation_guests,
            email: reservation_email,
            phone_number: String(reservation_phone),
            full_name: fullName,
            user_id: null,
        };

        try {
      const response = await fetch("http://localhost:3000/api/reservations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(requestBody),
      });

            const responseData = await response.json();

            if (!response.ok) {
                // Handle specific error for reservation limit
        if (responseData.details === "Maximum reservation limit (5) reached for this user.") {
          messageBox.textContent = translations[language]["max-reservations"];
                    messageBox.style.color = "red";
                    return;
                }

                // Handle other errors
        messageBox.textContent = translations[language]["reservation-failed"];
                messageBox.style.color = "red";
                return;
            }

            // Success case
            popupMessage.style.color = "green";
            showPopup(translations[language]["reservation-success"]);
            nameInput.value = "";
            dateInput.value = "";
            timeSelect.value = "";
            phoneInput.value = "";
            guestsInput.value = "";
            emailInput.value = "";
        } catch (error) {
            console.error("Failed to make reservation", error);
      messageBox.textContent = translations[language]["reservation-failed"];
            messageBox.style.color = "red";
        }
    });
});

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,15}$/; // Simple regex for phone validation
    return phoneRegex.test(phone);
};
