
const translations: {
    [lang: string]: {
      [key: string]: string;
    };
  } = {
    en: {
        // Navigation and about page translations
        "nav-home": "Home",
        "nav-about": "About",
        "nav-contact": "Contact",
        "nav-language": "Language",
        "nav-language-en": "English",
        "nav-language-fi": "Finnish",
        "hero-title": "Welcome to our website",
        "hero-subtitle": "We are a small team of developers",
        "about-title": "About Us",
        "about-content": "We are a small team of developers who love building web applications. Our goal is to create useful tools and resources for everyone to use.",
        "contact-title": "Contact Us",
        "contact-content": "You can contact us by sending an email to",

        // contact form translations
        "title": "Contact Us - Sushi Restaurant",
        "home-link": "Home Page",
        "menu-link": "Menu",
        "order-link": "Order",
        "reservation-link": "Reserve a table",
        "english-flag": "🇬🇧",
        "finnish-flag": "🇫🇮",
        "address": "Address: 123 Street, Helsinki, Finland",
        "phone": "Phone: 123456789",
        "email": "Email: ravintolatataki@gmail.com",
        "find-us": "Find Us",
        "map-placeholder": "Map comes here",
        "itinerary-title": "Your itinerary to Tataki",
        "use-location": "Use my location",
        "plan-itinerary": "Plan Your Itinerary",
        "itinerary-results": "Itinerary Results",
        "contact-link": "Contact us",
        "about-link": "About us",
        "review-link": "Review us",

        // index page translations
        "restaurant-name": "Tataki",
        "leave-review": "Leave a Review",
        "our-menus": "Our menus",
        "explore-menus": "Explore our delicious menus and find your favorite!",
        "chef-recommendation": "Chef's Recommendations",
        "view-more": "View more menus",
        "our-story": "This is us",
        "read-about-us": "Learn more about our restaurant and our team!",
        "restaurant": "Restaurant",
        "our-restaurant": "Our restaurant is located in the heart of the city. We offer a wide range of sushi and sashimi sets, as well as other Japanese dishes. Our team of experienced chefs will make sure you have an unforgettable dining experience.",
        "team": "Team",
        "our-team": "Our team of experienced chefs assure that each customer's needs are met. We use only the freshest ingredients to create delicious and authentic Japanese dishes. We warmly welcome you to visit us and learn more about our team!",
        "read-more": "Read more",

        //menu page translations
        "allergen-header": "Allergen information",
        "allergen-info": "At our restaurant, we are committed to ensuring that all our customers can enjoy a safe and delicious dining experience. We strive to provide accurate and up-to-date allergen information for each of our menu items.",
        "egg": "E = contains egg",
        "fish": "F = contains fish",
        "gluten": "G = contains gluten",
        "milk": "M = contains milk",
        "soy": "S = contains soy",
        "allergen-info2": "We make every effort to prevent cross-contamination in our kitchen, but please note that we use shared cooking and preparation areas. If you or someone in your party has a food allergy or intolerance, please inform our staff before placing your order, and we will be happy to assist you with your selection.",
        "allergen-info3": "Your safety and satisfaction are our top priorities. If you have any questions about allergens or need more information, feel free to ask our staff.",

        // order page translations
        "add-to-cart": "Add to cart",
        "your-order": "Your order:",
        "menu": "Menu",
        "price": "Price",
        "qty": "Qty",
        "total": "Total:",
        "additional-comment": "Leave additional comments here",
        "your-info": "Your information:",
        "use-existing-info": "Use existing delivery information",
        "select-delivery": "Select delivery method:",
        "delivery": "Delivery",
        "pickup": "Pickup",
        "add-instructions": "Add instructions for courier here",
        "terms-summary": "Terms & Conditions",
        "agree": "To order you need to agree to our Terms & Conditions.",
        "terms": "Our delivery times are between 20-50 minutes and we deliver within a 15km radius. We do not accept cash or orders over the phone. We do not accept returns or cancellations. If you have any issues with your order, please contact us immediately. We will do our best to resolve the issue. We appreciate your understanding and cooperation, thank you!",
        "agree-checkbox": "I agree to the terms and conditions",
        "order-now": "ORDER",

        // reservation page translations
        "navHome": "Home Page",
        "navMenu": "Menu",
        "navOrder": "Order",
        "navReservation": "Reserve a table",
        "footerContact": "Contact us",
        "footerAbout": "About us",
        "footerReview": "Review us",
        "footerFacebook": "Facebook",
        "footerInstagram": "Instagram",
        "reservationTitle": "Table Reservation",
        "reservationName": "Full Name",
        "reservationEmail": "Email",
        "reservationPhone": "Phone Number",
        "reservationDate": "Reservation Date",
        "reservationTime": "Reservation Time",
        "numberOfGuests": "Number of Guests",
        "reserveNowButton": "Reserve Now",
        "placeholderName": "Enter your name",
        "placeholderEmail": "Enter your email",
        "placeholderPhone": "Enter your phone number",
        "placeholderDate": "Select a date",
        "detailsSummary": "Terms & Conditions",
        "detailsContent1": "By clicking the \"Reserve Now\" button, you agree to our Terms & Conditions.",
        "detailsContent2": "Our restaurant has a 15-minute grace period. If you are running late, please call us to let us know. Otherwise, your reservation will be canceled. We appreciate your understanding.",
        "timeSelectLabel": "Select Time",
        "timeOption1": "10:00 AM",
        "timeOption2": "11:00 AM",
        "timeOption3": "12:00 PM",
        "timeOption4": "1:00 PM",
        "timeOption5": "2:00 PM",
        "timeOption6": "3:00 PM",
        "timeOption7": "4:00 PM",
        "timeOption8": "5:00 PM",
        "timeOption9": "6:00 PM",
        "timeOption10": "7:00 PM",
        "timeOption11": "8:00 PM",
        "timeOption12": "9:00 PM",
        "timeOptionDefault": "Select Time",

        //Review page translations
        
        "your-name": "Your Name",
        "rate-us": "Rate Us",
        "comments": "Comments",
        "submit-review": "Submit Review",
        "placeHolderComments": "Write your review here. Maximum of 200 characters.",
        "placeholderReviewName": "Enter your name or use a nickname",

        // login page translations
        "login-button": "Login",
        "register-button": "Register",
        "login-form-title": "Login",
        "password-label": "Password",
        "submit-button": "Submit",
        "reset-button": "Reset",
        "register-form-title": "Register",
        "username-label": "Username",
        "email-label": "Email",
        "message": "This is a message box"


    },
    fi: {
        // Navigation and about page translations
        "nav-home": "Koti",
        "nav-about": "Tietoa",
        "nav-contact": "Ota yhteyttä",
        "nav-language": "Kieli",
        "nav-language-en": "Englanti",
        "nav-language-fi": "Suomi",
        "hero-title": "Tervetuloa sivustollemme",
        "hero-subtitle": "Olemme pieni kehittäjätiimi",
        "about-title": "Tietoa Meistä",
        "about-content": "Olemme pieni kehittäjätiimi, joka rakastaa web-sovellusten rakentamista. Tavoitteenamme on luoda hyödyllisiä työkaluja ja resursseja kaikkien käyttöön.",
        "contact-title": "Ota Yhteyttä",
        "contact-content": "Voit ottaa meihin yhteyttä lähettämällä sähköpostia osoitteeseen",

        // contact form translations
        "home-link": "Etusivu",
        "menu-link": "Ruokalistat",
        "order-link": "Tilaukset",
        "reservation-link": "Varaa pöytä",
        "english-flag": "🇬🇧",
        "finnish-flag": "🇫🇮",
        "address": "Osoite: 123 Street, Helsinki, Suomi",
        "phone": "Puhelin: 123456789",
        "email": "Sähköposti: ravintolatataki@gmail.com",
        "find-us": "Löydä Meidät",
        "map-placeholder": "Kartta tulee tänne",
        "itinerary-title": "Reittisi Tatakiin",
        "use-location": "Käytä sijaintiani",
        "plan-itinerary": "Suunnittele Reittisi",
        "itinerary-results": "Reitti-ehdotukset",
        "contact-link": "Ota yhteyttä",
        "about-link": "Meistä",
        "review-link": "Arvioi meidät",

        // index page translations
        "title": "Etusivu",
        "restaurant-name": "Tataki",
        "leave-review": "Jätä arvostelu",
        "our-menus": "Ruokalistamme",
        "explore-menus": "Selaa meidän herkullisia ruokalistoja ja löydä suosikkisi!",
        "chef-recommendation": "Kokin suositukset",
        "view-more": "Lisää ruokalistoja",
        "our-story": "Tietoa meistä",
        "read-about-us": "Lue lisää ravintolastamme ja tiimistämme!",
        "restaurant": "Ravintola",
        "our-restaurant": "Ravintolamme sijaitsee kaupungin sydämessä. Tarjoamme laajan valikoiman sushia ja sashimia, sekä muita japanilaisia ruokia. Kokeneet kokkimme varmistavat sinulle unohtumattoman ruokailukokemuksen.",
        "team": "Tiimi",
        "our-team": "Kokkitiimimme varmistaa, että jokaisen asiakkaan tarpeet täyttyvät. Käytämme vain tuoreimpia raaka-aineita luodaksemme herkullisia ja aitoja japanilaisia ruokia. Lämpimästi tervetuloa tutustumaan asiantuntevaan tiimiimme!",
        "read-more": "Lue lisää",

        //menu page translations
        "allergen-header": "Allergeenitiedot",
        "allergen-info": "Ravintolassamme sitoudumme varmistamaan, että kaikki asiakkaamme voivat nauttia turvallisesta ja herkullisesta ruokailukokemuksesta. Pyrimme tarjoamaan tarkkoja ja ajan tasalla olevia allergeenitietoja jokaisesta ruokalistamme tuotteesta.",
        "egg": "E = sisältää munaa",
        "fish": "F = sisältää kalaa",
        "gluten": "G = sisältää gluteenia",
        "milk": "M = sisältää maitoa",
        "soy": "S = sisältää soijaa",
        "allergen-info2": "Teemme parhaamme estääksemme risti kontaminaatiota keittiössämme, mutta huomioithan, että käytämme yhteisiä ruoanlaitto- ja valmistelualueita. Jos sinulla tai jollakin seurueestasi on ruoka-aineallergia tai intoleranssi, ilmoitathan siitä henkilökunnallemme ennen tilauksen tekemistä, niin pystymme auttamaan valinnan tekemisessä.",
        "allergen-info3": "Turvallisuutesi ja tyytyväisyytesi ovat meille ensisijaisen tärkeitä. Jos sinulla on kysyttävää allergeeneista tai tarvitset lisätietoja, älä epäröi kysyä henkilökunnaltamme.", 

        // order page translations
        "add-to-cart": "Lisää ostoskoriin",
        "your-order": "Tilauksesi:",
        "menu": "Annos",
        "price": "Hinta",
        "qty": "Määrä",
        "total": "Yhteensä:",
        "additional-comment": "Jätä lisäkommentti tähän",
        "your-info": "Tietosi:",
        "use-existing-info": "Käytä olemassa olevaa toimitusosoitetta",
        "select-delivery": "Valitse toimitustapa:",
        "delivery": "Toimitus",
        "pickup": "Nouto",
        "add-instructions": "Lisää ohjeita kuriirille tähän",
        "terms-summary": "Käyttöehdot",
        "agree": "Tilataksesi sinun tulee hyväksyä käyttöehdot.",
        "terms": "Toimitusaikamme ovat 20-50 minuuttia ja toimitamme 15 km säteellä. Emme hyväksy käteismaksuja tai puhelimitse tehtyjä tilauksia. Emme hyväksy palautuksia tai peruutuksia. Jos sinulla on ongelmia tilauksesi kanssa, ota meihin yhteyttä välittömästi. Teemme parhaamme ratkaistaksemme ongelman. Arvostamme ymmärrystäsi ja yhteistyötä, kiitos!",
        "agree-checkbox": "Hyväksyn käyttöehdot",
        "order-now": "TILAA",

        // reservation page translations
        "navHome": "Etusivu",
        "navMenu": "Ruokalista",
        "navOrder": "Tilaukset",
        "navReservation": "Varaa pöytä",
        "footerContact": "Ota yhteyttä",
        "footerAbout": "Tietoa meistä",
        "footerReview": "Jätä arvostelu",
        "footerFacebook": "Facebook",
        "footerInstagram": "Instagram",
        "reservationTitle": "Pöytävaraus",
        "reservationName": "Koko Nimi",
        "reservationEmail": "Sähköposti",
        "reservationPhone": "Puhelinnumero",
        "reservationDate": "Pöydän Varauspäivämäärä",
        "reservationTime": "Varausaika",
        "numberOfGuests": "Vieraiden Lukumäärä",
        "reserveNowButton": "Varaa Nyt",
        "placeholderName": "Syötä nimesi",
        "placeholderEmail": "Syötä sähköpostisi",
        "placeholderPhone": "Syötä puhelinnumerosi",
        "placeholderDate": "Valitse päivämäärä",
        "detailsSummary": "Ehdot ja säännöt",
        "detailsContent1": "Napsauttamalla 'Varaa Nyt' -painiketta hyväksyt ehdot ja säännöt.",
        "detailsContent2": "Ravintolassamme on 15 minuutin armonaika. Jos myöhästyt, soita meille ja ilmoita asiasta. Muuten varauksesi perutaan. Kiitämme ymmärrystäsi.",
        "timeSelectLabel": "Valitse Aika",
        "timeOption1": "10:00",
        "timeOption2": "11:00",
        "timeOption3": "12:00",
        "timeOption4": "13:00",
        "timeOption5": "14:00",
        "timeOption6": "15:00",
        "timeOption7": "16:00",
        "timeOption8": "17:00",
        "timeOption9": "18:00",
        "timeOption10": "19:00",
        "timeOption11": "20:00",
        "timeOption12": "21:00",
        "timeOptionDefault": "Valitse Aika",

        //Review page translations
        "your-name": "Nimesi",
        "rate-us": "Arvostele meidät",
        "comments": "Kommentit",
        "submit-review": "Lähetä arvostelu",
        "placeHolderComments": "Kirjoita arvostelusi tähän. Maksimissaan 200 merkkiä.",
        "placeholderReviewName": "Kirjoita nimesi tai käytä nimimerkkiä.",

        // login page translations
        "login-button": "Kirjaudu sisään",
        "register-button": "Rekisteröidy",
        "login-form-title": "Kirjaudu sisään",
        "password-label": "Salasana",
        "submit-button": "Lähetä",
        "reset-button": "Tyhjennä kentät",
        "register-form-title": "Rekisteröidy",
        "username-label": "Käyttäjänimi",
        "email-label": "Sähköposti",
        "message": "Tämä on viestilaatikko"

    }
};

export default translations;