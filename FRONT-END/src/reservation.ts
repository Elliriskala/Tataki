
import { Times } from "./utils/interfaces";

document.addEventListener('DOMContentLoaded', () => {


    const guestButtons = document.querySelectorAll('.guest-btn') as NodeListOf<HTMLButtonElement>;
    const dateInput = document.getElementById('date') as HTMLInputElement;
    const timeSelect = document.getElementById('time') as HTMLSelectElement;
    const messageBox = document.getElementById('reservation-message') as HTMLDivElement;

    dateInput.disabled = true;
    timeSelect.disabled = true;

    guestButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target) {
                const guests = target.getAttribute('data-value');
                const guestsInput = document.getElementById('guests-input') as HTMLInputElement;
                if (guestsInput) {
                    guestsInput.value = guests ?? '';
                }
            }

            dateInput.disabled = false;
        });
    });

    dateInput.addEventListener('change', async () => {
        const guestsInput = document.getElementById('guests-input') as HTMLInputElement;
        const guests = guestsInput?.value;
        const date = dateInput?.value;

        // application/json
        if (!date || !guests) {
            timeSelect.disabled = true;
            messageBox.textContent = 'Please select a date and number of guests';
            return;
        }
        try {
        const response = await fetch(`http://localhost:3000/api/reservations/times?date=${date}&guests=${guests}`, {
            method: 'GET', // Use POST or GET as appropriate for your endpoint
            headers: {
              'Content-Type': 'application/json', // Ensure the content is in JSON format
            }, 
          });

        if (!response.ok) {
            console.error('Failed to get times');
            return;
        }

        const data: Times = await response.json();
        const times: string[] = data.availableTimes;
        console.log(times);

        timeSelect.innerHTML = `<option value="">Select a time</option>`;

        if (times && times.length > 0) {
            times.forEach((time) => {
                const option = document.createElement('option')
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
        });

        timeSelect.disabled = false;
    } else {
        console.error('No times available');
        timeSelect.disabled = true;
    }
    } catch (error) {
        console.error('Failed to get times', error);
        messageBox.textContent = 'Failed to get times';
        timeSelect.disabled = true;
    }
});
});