'use strict';

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
