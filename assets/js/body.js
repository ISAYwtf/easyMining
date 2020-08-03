let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.style.height = '120px';
    } else {
        header.style.height = '';
    }
});