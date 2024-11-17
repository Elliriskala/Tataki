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
  const navList = document.querySelector('.nav-list');
  const hamburgerMenu = document.querySelector('.hamburger');
  const dateInput = document.getElementById('date');
  const guestButtons = document.querySelectorAll('.guest-btn');
  const guestInput = document.getElementById('guests-input');

  // Set the initial active form to login
  if (loginForm) {
    loginForm.classList.add('active');
  } else {
    console.log('loginForm not found');
  }

  // Toggle between login and register forms with animation control
  const toggleForm = (isLogin) => {
    // Temporarily disable animations by adding 'no-animate' class
    loginForm.classList.add('no-animate');
    registerForm.classList.add('no-animate');

    toggleSlider.style.transform = isLogin
      ? 'translateX(0)'
      : 'translateX(100%)';
    loginForm.classList.toggle('active', isLogin);
    registerForm.classList.toggle('active', !isLogin);
    loginButton.classList.toggle('active', isLogin);
    registerButton.classList.toggle('active', !isLogin);
    loginBackground.classList.toggle('toggle-view', !isLogin);
    loginImage.classList.toggle('register-image', !isLogin);
    resetForm(isLogin ? registerForm : loginForm);

    // Remove 'no-animate' class after a short delay
    setTimeout(() => {
      loginForm.classList.remove('no-animate');
      registerForm.classList.remove('no-animate');
    }, 300); // Adjust timing to match CSS animation duration
  };

  // Function to add `interacted` class on input focus or change
  const addInteractionListeners = (form) => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => input.classList.add('interacted'));
      input.addEventListener('focus', () => input.classList.add('interacted'));
    });
  };

  // Call this for both login and register forms
  if (loginForm) addInteractionListeners(loginForm);
  if (registerForm) addInteractionListeners(registerForm);

  loginButton?.addEventListener('click', (event) => {
    event.preventDefault();
    toggleForm(true);
  });

  registerButton?.addEventListener('click', (event) => {
    event.preventDefault();
    toggleForm(false);
  });

  // Toggle password visibility
  togglePassword?.forEach((iconContainer) => {
    iconContainer.addEventListener('click', () => {
      // Retrieve the associated password input field
      const input = document.getElementById(
        iconContainer.getAttribute('data-target')
      );
      const icon = iconContainer.querySelector('i'); // Select the <i> icon inside the span

      if (input) {
        // Toggle between password and text
        const isPasswordType = input.getAttribute('type') === 'password';
        input.setAttribute('type', isPasswordType ? 'text' : 'password');

        // Toggle icon classes
        if (icon) {
          icon.classList.toggle('fa-eye', !isPasswordType);
          icon.classList.toggle('fa-eye-slash', isPasswordType);
        }
      } else {
        console.warn(
          'Target input not found for iconContainer:',
          iconContainer
        );
      }
    });
  });

  // Reset form function to clear inputs and validation state
  const resetForm = (form) => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
      input.classList.remove('valid', 'invalid');
    });
  };

  // Set minimum date for date input
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Handle navigation toggle for mobile
  hamburgerMenu.addEventListener('click', (event) => {
    console.log('click');
    event.stopPropagation();
    navList.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    const isInsideNav =
      navList.contains(event.target) || hamburgerMenu.contains(event.target);
    if (!isInsideNav) {
      navList.classList.remove('active');
    }
  });

  // Toggle details open/close with animation
  const detailsElements = document.querySelectorAll('details');
  detailsElements.forEach((details) => {
    const content = details.querySelector('.content');
    details.addEventListener('toggle', () => {
      content.style.maxHeight = details.open
        ? content.scrollHeight + 'px'
        : '0';
    });
  });

  // Handle guest selection
  guestButtons.forEach((button) => {
    button.addEventListener('click', () => {
      guestButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      guestInput.value = button.getAttribute('guests-input');
    });
  });
});


