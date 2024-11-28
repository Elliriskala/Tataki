const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error ${response.status} occurred`);
    }
    const json = response.json();
    return json;
};
const getUserLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
        return [position.coords.latitude, position.coords.longitude];
    }
    catch (error) {
        throw new Error('Unable to retrieve your location');
    }
};
const calculateDistance = (// Calculate distance between two coordinates on a sphere/globe
lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};
const showPassword = () => {
    const input = document.getElementById('password');
    if (input.type === 'password') {
        input.type = 'text';
    }
    else {
        input.type = 'password';
    }
};
const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};
// Replace HTML content of an element (most likely body for single page applications)
const replaceHTML = (element, content) => {
    element.innerHTML = "";
    element.insertAdjacentHTML('beforeend', content);
};
// Add content to the end of an element
const addBeforeEnd = (element, content) => {
    element.insertAdjacentHTML('beforeend', content);
};
// format a date string to a more readable format
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return date.toLocaleDateString('fi-FI', options);
}
const updateLoginButton = (isLoggedIn) => {
    const loginButton = document.querySelector('.login');
    if (loginButton) {
        loginButton.innerText = isLoggedIn ? 'Logout' : 'Login';
    }
};
const showAdminContent = (isAdmin) => {
    const adminContent = document.querySelector('.admin-content');
    adminContent.style.display = isAdmin ? 'block' : 'none';
};
export { fetchData, getUserLocation, calculateDistance, showPassword, isLoggedIn, replaceHTML, addBeforeEnd, formatDate, updateLoginButton, showAdminContent };