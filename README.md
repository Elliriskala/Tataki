# Tataki Sushi Restaurant Web App

Welcome to the **Tataki** web application! This project is a modern web application designed to provide an intuitive and seamless experience for users to browse menus, make reservations, place orders, and leave reviews.

Feel free to visit the restaurant at: [Tataki]()

---

## Documentation for developers

### documentation can be accessed at:
- ApiDoc documentation at [ApiDoc]() for detailed information about the API-endpoints.
- JSDoc documentation at [JSDoc]() for detailed information about server side logic.

---

## Features

### For Users:
- **Menu Browsing**: Explore our sushi menu, including detailed descriptions, pricing, and allergen information.
- **Account Creation**: Create an account to keep track of your reservations, orders and make your experience more swift by filling forms with information saved to the account.
- **Reservations**: Book a table for your next sushi experience with ease, with or without an account.
- **Online Orders**: Place takeout or delivery orders with a user-friendly interface.
- **Ratings and Reviews**: Share your experience by rating the restaurant on an easy to use form.
- **Itinerary to the Restaurant**: Plan your trip to the restaurant with real time itinerary planning based on [HSL](https://www.hsl.fi/avoindata) open data.

### For Admins:
- **Menu Management**: Add, edit, or delete menu items, including allergen information.
- **Order Management**: View and update order statuses.
- **Reservation Overview**: Manage reservations to optimize seating arrangements.

---

## Technologies Used
- **Frontend**: HTML, CSS, and TypeScript with Vite PWA plugin functionality.
- **Backend**: Node.js with Express.js
- **Database**: MariaDB (MySQL) for data and information management. 
- **API**: RESTful API architecture
- **Map Integration**: Leaflet, open-source JavaScript library for mobile-friendly interactive maps. See more [Leaflet](https://leafletjs.com)
- **Authentication**: Password hashing with bcrypt and session/token-based authentication.

---

## Structure and Production

### The project is divided into two main sections
- Frontend constructed with `TypeScript` and built with the `Vite PWA` plugin.
- Backend built with `Express.js` and MySQL-database integration.
- Published on `Azure App Services` where the backend renders static frontend files.


### Future Development
- Future Development is based on user feedback.
- Missing functionalities already considered for future include:
    1. Forgotten password implementation where the user can change their password by confirming their identity.

