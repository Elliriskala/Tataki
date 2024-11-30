const reviewForm = document.querySelector('.review-form') as HTMLFormElement;
const nameInput = document.querySelector('#name') as HTMLInputElement;
const commentInput = document.querySelector('#comments') as HTMLTextAreaElement

reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const rating = document.querySelector('input[name="rating"]:checked') as HTMLInputElement;
    if (!rating) {
        alert('Please select a rating');
        return;
    }
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        console.log('User not logged in');
    }

    const name = nameInput.value;
    const comment = commentInput.value;
    const ratingValue = rating.value;

    if (!name) {
        alert('Please enter your name');
        return;
    }

    const ratingBody = {
        user_id: user_id || null,
        review: comment,
        username: name,
        star_rating: ratingValue
    }

    console.log(ratingBody);

    const response = await fetch('http://localhost:3000/api/reviews/restaurant', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingBody)
    });

    if (response) {
        console.log('Review submitted');
        nameInput.value = '';
        commentInput.value = '';
        rating.checked = false;
    } else {
        console.log('Review failed to submit');
    }
});