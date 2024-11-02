'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
    const toggleSlider = document.getElementById('toggle-slider');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePassword = document.querySelectorAll('.toggle-password');
    const loginBackground = document.querySelector('.login-background');
    const loginImage = document.querySelector('.form-image-container');

    // Set the initial active form to login
    loginForm.classList.add('active');

    // Login button event listener
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSlider.style.transform = 'translateX(0)';
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginButton.classList.add('active');
        registerButton.classList.remove('active');
        loginBackground.classList.remove('toggle-view')
        loginImage.classList.remove('register-image');


        resetForm(registerForm); // Reset the register form
        resetForm(loginForm); // Reset the login
    });

    // Register button event listener
    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        toggleSlider.style.transform = 'translateX(100%)';
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginButton.classList.remove('active');
        registerButton.classList.add('active');
        loginBackground.classList.add('toggle-view');
        loginImage.classList.add('register-image');


        resetForm(loginForm); // Reset the login form
        resetForm(registerForm); // Reset the register form
    });

    // Toggle password visibility
    togglePassword.forEach((icon) => {
        icon.addEventListener('click', () => {
            const input = document.getElementById(icon.getAttribute('data-target'));
            const inputType = input.getAttribute('type');
            if (inputType === 'password') {
                input.setAttribute('type', 'text');
                icon.innerHTML = '<i class="fa-regular fa-eye"></i>';
            } else {
                input.setAttribute('type', 'password');
                icon.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
            }
        });
    });


    // Reset form function to clear inputs
    const resetForm = (form) => {
        const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';

    });
    }
});

document.querySelector(".hamburger").addEventListener("click", () => {
    const navList = document.querySelector(".nav-list");

    navList.classList.toggle("active");

    if (navList.classList.contains("active")) {
        navList.style.height = navList.scrollHeight + "px";
        navList.style.borderBottom = "2px solid var(--dust-pink)";
    } else {
        navList.style.height = "0";
        navList.style.borderBottom = "none";
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);

    const detailsElements = document.querySelectorAll('details');

    detailsElements.forEach(details => {
        const content = details.querySelector('.content');

        details.addEventListener('toggle', () => {
            if (details.open) {
                const contentHeight = content.scrollHeight + 'px';
                content.style.maxHeight = contentHeight;
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
});


