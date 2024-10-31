'use strict';

document.querySelector(".hamburger").addEventListener("click", () => {
    const navList = document.querySelector(".nav-list");
    
    navList.classList.toggle("active");

    if (navList.classList.contains("active")) {
        navList.style.height = navList.scrollHeight + "px"; 
    } else {
        navList.style.height = "0"; 
    }
});


