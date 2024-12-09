import { translations } from "./translations";
import { getLanguage } from "./utils/functions";
import { apiBaseUrl } from "./services/apiService";
const reviewForm = document.querySelector('.review-form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const commentInput = document.querySelector('#comments') as HTMLTextAreaElement
const popup = document.getElementById('success-popup') as HTMLDivElement;
const popupMessage = document.getElementById('popup-message') as HTMLParagraphElement;
const closePopup = document.getElementById('close-popup') as HTMLButtonElement;



const language = getLanguage();
// Function to show the popup
const showPopup = (message: string) => {
    popupMessage.textContent = message;
    popup.classList.remove('hidden');
};

// Function to hide the popup
closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
});

reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // get the rating value
    const rating = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
    if (!rating) {
        showPopup(translations[language]['select-rating']);
        return;
    }

    const name = nameInput.value;
    const comment = commentInput.value;
    const ratingValue = rating.value;

    if (!name) {
        return;
    }

    // create the body of the request, if user is not logged in
    const ratingBody = {
        review: comment,
        username: name,
        star_rating: ratingValue
    }

    console.log(ratingBody);

    const response = await fetch(apiBaseUrl + '/reviews/restaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingBody)
    });

    // show the popup message based on the response
    if (response) {
        console.log('Review submitted');
        popupMessage.style.color = 'green';
        showPopup(translations[language]['review-submitted']);
        nameInput.value = '';
        commentInput.value = '';
        rating.checked = false;
    } else {
        console.log('Review failed');
        popupMessage.style.color = 'red';
        showPopup(translations[language]['review-failed']);
    }
});