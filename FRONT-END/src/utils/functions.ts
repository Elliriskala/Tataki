const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error ${response.status} occurred`);
    }
    const json = response.json();
    return json
}


const getUserLocation = async(): Promise<[number, number]> => {
    try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
    );
    return [position.coords.latitude, position.coords.longitude];
    } catch (error) {
        throw new Error('Unable to retrieve your location');
    }
}


const calculateDistance = ( // Calculate distance between two coordinates on a sphere/globe
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };


const showPassword = () => { // Show password
    const input = document.getElementById('password') as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
};


const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
}


// Replace HTML content of an element (most likely body for single page applications)
const replaceHTML = (element: HTMLElement, content: string) => {
  element.innerHTML = "";
  element.insertAdjacentHTML('beforeend', content);
}


// Add content to the end of an element
const addBeforeEnd = (element: HTMLElement, content: string) => {
  element.insertAdjacentHTML('beforeend', content);
}


// format a date string to a more readable format
function formatDate(date: Date, lang: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString(lang, options);
}


const updateLoginButton = (isLoggedIn: boolean) => {
  const loginButton = document.querySelector('.login') as HTMLButtonElement;
  if (loginButton) {
    loginButton.innerText = isLoggedIn ? 'Logout' : 'Login';
  }
}


const showAdminContent = (isAdmin: boolean) => {
  const adminContent = document.querySelector('.admin-content') as HTMLDivElement;
  adminContent.style.display = isAdmin ? 'block' : 'none';
}

const getLanguage = (): string => {
    return localStorage.getItem('language') || 'en';
}



export { fetchData, getUserLocation, calculateDistance, showPassword, isLoggedIn, replaceHTML, addBeforeEnd, formatDate, updateLoginButton, showAdminContent, getLanguage};
