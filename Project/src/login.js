'use strict';


document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const registerButton = document.getElementById('register-btn');
    const toggleSlider = document.getElementById('toggle-slider');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePassword = document.querySelectorAll('.toggle-password');

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
        // Clear the input value
        input.value = ''; 
        // Remove custom validity me
    }); 
    }
});
