import { Translation } from "./utils/interfaces";

const translations: Translation = {
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
        "this-is-us": "This is us",
        "about-us": "Welcome to Tataki, where tradition meets innovation in Helsinki’s vibrant city center. Our restaurant blends authentic Japanese techniques with a touch of Nordic flair to offer unforgettable dining experiences.",
        "restaurant": "Restaurant",
        "our-restaurant": "Tataki is known for its fresh, locally sourced ingredients and expertly crafted sushi, sashimi, and Japanese dishes. Inspired by Japanese minimalism, our cozy, modern space is perfect for enjoying award-winning signature dishes.",
        "team": "Team",
        "our-team": "Our skilled chefs, trained in Japan, create authentic flavors with a commitment to quality and sustainability. They ensure every dish meets the highest standards and warmly welcome you to experience our passion for Japanese cuisine.",
        "our-story": "Our Story",
        "about-us2": "Founded by a sushi enthusiast, Tataki combines expertise with a passion for fusion. Each dish showcases artistry, sustainability, and the joy of good food. Thank you for being part of our journey — we look forward to sharing more memorable meals with you!",

        //menu page translations
        "our-menus": "Our menus",
        "explore-menus": "Explore our delicious menus and find your favorite!",
        "chef-recommendation": "Chef's Recommendations",
        "lunch": "Lunch",
        "dinner": "Dinner",
        "sides": "Sides",
        "drinks": "Drinks",
        "desserts": "Desserts",
        "allergen-header": "Allergen information",
        "allergen-info": "We strive to provide accurate allergen details for our menu:",
        "egg": "E = contains egg",
        "fish": "F = contains fish",
        "gluten": "G = contains gluten",
        "milk": "M = contains milk",
        "soy": "S = contains soy",
        "allergen-info2": "Our kitchen uses shared spaces, so cross-contamination may occur. Please inform our staff of any allergies before ordering—we’re happy to help you choose safely. Your safety is our priority; feel free to ask for more information.",

        // order page translations
        "add-to-cart": "Add to cart",
        "your-order": "Your order:",
        "menu": "Menu",
        "price": "Price",
        "qty": "Qty",
        "total": "Total:",
        "order": "Order",
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
        "placeholder-courier": "Add instructions for the courier here",
        "placeholder-name": "Name",
        "placeholder-email": "Email",
        "placeholder-phone": "Phone number",
        "placeholder-address": "Address",
        "placeholder-po": "Postal code",
        "dessert": "Desserts",

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
        "reservationDescription": "For larger parties we recommend calling the customer service. Please do notice that we do not take reservations for parties smaller than four.",

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
        "message": "This is a message box",
        "phone-label": "Phone Number",
        "welcome-header": "Welcome to Your Profile",
        "heres-your-profile": "Hi, Here's your profile information.",
        "your-information": "Your Information",
        "logout-button": "Logout"



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
        "this-is-us": "Tietoa meistä",
        "about-us": "Tervetuloa Tatakiin, jossa perinteet ja innovaatio kohtaavat Helsingin vilkkaassa keskustassa. Ravintolamme yhdistää aitoja japanilaisia tekniikoita pohjoismaiseen tyyliin tarjotakseen unohtumattomia ruokailukokemuksia.",
        "restaurant": "Ravintola",
        "our-restaurant": "Tataki tunnetaan tuoreista, paikallisista raaka-aineistaan ja asiantuntevasti valmistetuista sushista, sashimista ja japanilaisista ruoista. Inspiroituneena japanilaisesta minimalismista viihtyisä, moderni tilamme on täydellinen paikka nauttia palkituista erikoisruoistamme.",
        "team": "Tiimi",
        "our-team": "Taitavat, Japanissa koulutetut kokkimme luovat aitoja makuja sitoutuen laatuun ja kestävyyteen. He varmistavat, että jokainen annos täyttää korkeimmat standardit ja toivottavat sinut lämpimästi tervetulleeksi kokemaan intohimomme japanilaiseen keittiöön.",
        "our-story": "Tarinamme",
        "about-us2": "Sushin ystävän perustama Tataki yhdistää asiantuntemuksen ja intohimon fuusioon. Jokainen annos esittelee taiteellisuutta, kestävyyttä ja hyvän ruoan iloa. Kiitos, että olet osa matkaamme – odotamme innolla jakavamme kanssasi lisää ikimuistoisia aterioita!",
        
        //menu page translations
        "our-menus": "Ruokalistamme",
        "explore-menus": "Selaa meidän herkullisia ruokalistoja ja löydä suosikkisi!",
        "chef-recommendation": "Kokin suositukset",
        "lunch": "Lounas",
        "dinner": "Päivällinen",
        "sides": "Lisukkeet",
        "drinks": "Juomat",
        "desserts": "Jälkiruoat",
        "allergen-header": "Allergeenitiedot",
        "allergen-info": "Pyrimme tarjoamaan tarkat allergeenitiedot ruokalistallemme:",
        "egg": "E = sisältää munaa",
        "fish": "F = sisältää kalaa",
        "gluten": "G = sisältää gluteenia",
        "milk": "M = sisältää maitoa",
        "soy": "S = sisältää soijaa",
        "allergen-info2": "Keittiössämme käytetään jaettuja tiloja, joten ristikontaminaatiota voi tapahtua. Ilmoitathan henkilökunnallemme mahdollisista allergioista ennen tilaamista – autamme mielellämme turvallisen annoksen valinnassa. Turvallisuutesi on meille tärkeää; kysy rohkeasti lisätietoja.",

        // order page translations
        "add-to-cart": "Lisää ostoskoriin",
        "your-order": "Tilauksesi:",
        "menu": "Annos",
        "price": "Hinta",
        "qty": "Määrä",
        "order": "Tilaa",
        "total": "Yhteensä:",
        "additional-comment": "Jätä lisäohjeita tai toiveita tähän",
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
        "placeholder-courier": "Lisää kuriirille ohjeita tähän",
        "placeholder-name": "Nimi",
        "placeholder-email": "Sähköposti",
        "placeholder-phone": "Puhelinnumero",
        "placeholder-address": "Osoite",
        "placeholder-po": "Postinumero",
        "dessert": "Jälkiruoat",
        

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
        "reservationDescription": "Suuremmille seurueille suosittelemme soittamista asiakaspalveluumme. Huomioithan, että emme ota vastaan alle neljän hengen pöytävarauksia.",

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
        "message": "Tämä on viestilaatikko",
        "phone-label": "Puhelinnumero",
        "welcome-header": "Tervetuloa Profiiliisi",
        "heres-your-profile": "Hei, tässä on profiilitietosi.",
        "your-information": "Tietosi",
        "logout-button": "Kirjaudu ulos"

    }
};


const loginErrorMessages: Translation = {
  en: {
      400: "Invalid input, please check your input.",
      401: "Invalid username or password.",
      500: "Server error, please try again later.",
      default: "Login failed. User does not exist."
  },
  fi : {
      400: "Virheellinen syöte, tarkista syötteet.",
      401: "Virheellinen käyttäjätunnus tai salasana.",
      500: "Palvelinvirhe, yritä myöhemmin uudelleen.",
      default: "Kirjautuminen epäonnistui."
  }
}

const registerErrorMessages: Translation = {
  en: {
      400: "Invalid input. Please check your input.",
      409: "Email or username already exists.",
      500: "Server error. Please try again later.",
      default: "Registration failed."
  },
  fi: {
      400: "Virheellinen syöte. Tarkista syötteet.",
      409: "Sähköposti tai käyttäjänimi on jo käytössä.",
      500: "Palvelinvirhe. Yritä myöhemmin uudelleen.",
      default: "Rekisteröinti epäonnistui."
  }
}


export { translations, loginErrorMessages, registerErrorMessages };