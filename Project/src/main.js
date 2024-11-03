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
    const navList = document.querySelector(".nav-list");
    const hamburgerMenu = document.querySelector(".hamburger");
    const dateInput = document.getElementById("date");

    // Set the initial active form to login
    if (loginForm) {
        loginForm.classList.add('active');
    } else {
      console.log("loginForm not found");
    }

    // Toggle between login and register forms
    const toggleForm = (isLogin) => {
        toggleSlider.style.transform = isLogin ? 'translateX(0)' : 'translateX(100%)';
        loginForm.classList.toggle('active', isLogin);
        registerForm.classList.toggle('active', !isLogin);
        loginButton.classList.toggle('active', isLogin);
        registerButton.classList.toggle('active', !isLogin);
        loginBackground.classList.toggle('toggle-view', !isLogin);
        loginImage.classList.toggle('register-image', !isLogin);
        resetForm(isLogin ? registerForm : loginForm);
    };

    loginButton?.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForm(true);
    });

    registerButton?.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForm(false);
    });

    // Toggle password visibility
    togglePassword?.forEach((icon) => {
        icon.addEventListener('click', () => {
            const input = document.getElementById(icon.getAttribute('data-target'));
            const isPasswordType = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPasswordType ? 'text' : 'password');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Reset form function to clear inputs
    const resetForm = (form) => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
    };

    // Set minimum date for date input
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Handle navigation toggle for mobile
    hamburgerMenu.addEventListener("click", () => {
      console.log("click");
      navList.classList.toggle("active");

    });

    // Toggle details open/close with animation
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(details => {
        const content = details.querySelector('.content');
        details.addEventListener('toggle', () => {
            content.style.maxHeight = details.open ? content.scrollHeight + 'px' : '0';
        });
    });
});
