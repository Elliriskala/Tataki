'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn') as HTMLElement;
    const registerButton = document.getElementById('register-btn') as HTMLElement;
    const toggleSlider = document.getElementById('toggle-slider') as HTMLElement;
    const loginForm = document.getElementById('login-form') as HTMLElement;
    const registerForm = document.getElementById('register-form') as HTMLElement;
    const togglePassword = document.querySelectorAll('.toggle-password') as NodeListOf<HTMLElement>;
    const loginBackground = document.querySelector('.login-background') as HTMLElement;
    const loginImage = document.querySelector('.form-image-container') as HTMLElement;
    const navList = document.querySelector(".nav-list") as HTMLElement;
    const hamburgerMenu = document.querySelector(".hamburger") as HTMLElement;
    const dateInput = document.getElementById("date") as HTMLInputElement;

    // Set the initial active form to login
    if (loginForm) {
        loginForm.classList.add('active');
    } else {
      console.log("loginForm not found");
    }

    // Toggle between login and register forms
    const toggleForm = (isLogin: boolean) => {
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
            const targetId = icon.getAttribute('data-target') ?? '';
            const input = document.getElementById(targetId) as HTMLInputElement;
            const isPasswordType = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPasswordType ? 'text' : 'password');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Reset form function to clear inputs
    const resetForm = (form) => {
        const inputs = form.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
        inputs.forEach(input => input.value = '');
    };

    // Set minimum date for date input
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Handle navigation toggle for mobile
    hamburgerMenu.addEventListener("click", (event) => {
      console.log("click");
      event.stopPropagation();
      navList.classList.toggle("active");

    });

    document.addEventListener("click", (event) => {
      const isInsideNav = navList.contains(event.target as Node) || hamburgerMenu.contains(event.target as Node);
      if (!isInsideNav) {
        navList.classList.remove("active");
      }
    })

    // Toggle details open/close with animation
    const detailsElements = document.querySelectorAll('details');
    detailsElements.forEach(details => {
        const content = details.querySelector('.content') as HTMLElement;
        details.addEventListener('toggle', () => {
            if (content) {
            content.style.maxHeight = details.open ? content.scrollHeight + 'px' : '0';
            }
        });
    });
});
