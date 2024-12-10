# Tataki Sushi Restaurant Web App

Welcome to the **Tataki** web application! This project is a modern web application designed to provide an intuitive and seamless experience for users to browse menus, make reservations, place orders, and leave reviews. The Tataki Sushi REST API is the backend for the Tataki Sushi web application, providing core functionalities like user authentication, user management, menu handling, order processing, table reservations, ratings, and itinerary planning. This API allows communication between the front-end of the restaurant's website and the database, facilitating a seamless experience for users interacting with the restaurant's services.

Feel free to visit the restaurant at: [Tataki](https://ucad-server-https.northeurope.cloudapp.azure.com/)

---

## Documentation for developers

### Installation Logic
1. Clone the repository
2. Install required packages with NPM (NPM Package Manager for Node.js)
3. Run the sql-scipt in your MySQL-terminal.
4. Set the required environment variables in your .env file:

DT_KEY=Acquire your own DigiTransit API-key, see the link in acknowledgments down below  

DB_HOST=localhost  

DB_USER=your user (in many cases "root")  

DB_PASS=your database password  

DB_NAME=tataki  

JWT_SECRET= your very secret jwt crypting key (Just smash your keyboard for example)  

JWT_EXPIRES_IN= place your desired expiration time here  

---

### documentation can be accessed at:
- ApiDoc documentation at [ApiDoc](https://users.metropolia.fi/~karripar/js-exercises/tataki-docs/apidocs/) for detailed information about the API-endpoints.
- JSDoc documentation at [JSDoc](https://users.metropolia.fi/~karripar/js-exercises/tataki-docs/jsdocs/) for detailed information about server side logic.

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
- **Content Management**: For the restaurant content.

---

## Technologies Used
- **Frontend**: HTML, CSS, and TypeScript with Vite PWA plugin functionality.
- **Backend**: Node.js with Express.js
- **Database**: MariaDB (MySQL) for data and information management. 
- **API**: RESTful API architecture
- **Map Integration**: Leaflet, open-source JavaScript library for mobile-friendly interactive maps. See more at [Leaflet](https://leafletjs.com).
- **Authentication**: Password hashing with bcrypt and session/token-based authentication to maintain secure connections and safe storage management of user data.
- **Documentation**: Markdown documentation, JSDoc and ApiDoc server side documentation.

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


## Acknowledgments

We would like to extend our gratitude to the following:

- **[HSL Open Data](https://www.hsl.fi/avoindata)**: For providing public transportation data, enabling real-time itinerary planning features in our app.
- **[Vite](https://vite-pwa-org.netlify.app/)**: For their fast and modern frontend build tool, which significantly streamlined our development process.
- **Open-Source Contributors**: To all the developers who contribute to the libraries and tools that make this project possible.
- **Development Team**: For their dedication, creativity, and hard work in building the **Tataki Sushi Restaurant Web App**.

Thank you for helping make this project a reality!
