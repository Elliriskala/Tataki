import { Times, User } from "./utils/interfaces";

const guestButtons = document.querySelectorAll(
  ".guest-btn"
) as NodeListOf<HTMLButtonElement>;
const dateInput = document.getElementById("date") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const timeSelect = document.getElementById("time") as HTMLSelectElement;
const reservationSubmit = document.getElementById('reservation-submit') as HTMLButtonElement;
const messageBox = document.getElementById(
  "reservation-message"
) as HTMLDivElement;
const useMyInfoButton = document.getElementById('use-user-info') as HTMLButtonElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const guestsInput = document.getElementById(
  "guests-input"
) as HTMLInputElement;


document.addEventListener("DOMContentLoaded", () => {
  dateInput.disabled = true;
  timeSelect.disabled = true;

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
      messageBox.textContent = "Please select a date and number of guests"; 
      return; 
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/times?date=${date}&guests=${guests}`,
        {
          method: "GET", // Use POST or GET as appropriate for your endpoint
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
      console.log(times);

      timeSelect.innerHTML = `<option value="">Select a time</option>`;

      if (times && times.length > 0) { // ['12:00', '12:30', '1:00']
        times.forEach((time) => {
          const option = document.createElement("option");
          option.value = time;
          option.textContent = time;
          timeSelect.appendChild(option);
        });

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




  useMyInfoButton.addEventListener('click', async () => {

    const user_id = localStorage.getItem('user_id'); 
    const token = localStorage.getItem('authToken'); // 'Bearer token'
    if (!token || !user_id) {
      console.error('No token found');
      alert('Please log in to use this feature');
        return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/users/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        console.error('Failed to get user info');
        return;
      }

      const data: User = await response.json(); // { email: '', phone_number: '' }
      console.log(data);
      emailInput.value = data.email ?? '';
      phoneInput.value = data.phone_number ?? '';
    } catch (error) {
      console.error('Failed to get user info', error);
    }
  });



  reservationSubmit.addEventListener('click', async (event) => { 
    event.preventDefault();
    const fullName = nameInput.value;
    const reservation_date = dateInput.value;
    const reservation_time = timeSelect.value;
    const reservation_guests = guestsInput.value;
    const reservation_email = emailInput.value;
    const reservation_phone = phoneInput.value;
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('authToken');

    // allow user to make a reservation both as a guest and as a logged in user
    if (!reservation_date || !reservation_time || !reservation_guests) {
      messageBox.textContent = 'Please fill out all fields';
      return;
    }

    if (!reservation_email || !validateEmail(reservation_email)) {
      messageBox.textContent = 'Please provide a valid email';
      return;
    }

    if (!reservation_phone || !validatePhone(reservation_phone)) {
      messageBox.textContent = 'Please provide a valid phone number';
      return;
    }

    if (!user_id || !token) {
      console.log('User is not logged in');
    }

    const requestBody = {
      reservation_date: reservation_date,
      reservation_time: reservation_time,
      guests: reservation_guests,
      email: reservation_email,
      phone_number: reservation_phone,
      full_name: fullName,
      user_id: user_id || null
    };

    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        messageBox.textContent = errorData.message || 'Failed to make reservation';
        return;
      }

      const data = await response.json();
      console.log(data);
      messageBox.textContent = 'Reservation successful!';
    } catch (error) {
      console.error('Failed to make reservation', error);
      messageBox.textContent = 'Failed to make reservation';
    }
  });

});

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,15}$/; // Simple regex for phone validation
    return phoneRegex.test(phone);
}