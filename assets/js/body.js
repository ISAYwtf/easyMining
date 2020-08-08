let header = document.querySelector('header'),
    hoisting = document.querySelector('.hoisting');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.style.height = '120px';
        if (window.scrollY > window.screen.height) {
            hoisting.style.display = 'unset';
        } else if (window.scrollY <= window.screen.height) {
            hoisting.style.display = 'none';
        }
    } else {
        header.style.height = '';
    }
});