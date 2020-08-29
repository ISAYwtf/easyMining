let advantBtn = document.querySelector('.advantage').querySelector('.button__wrap'),
    bigForm = document.querySelector('.big-form');

advantBtn.addEventListener('click', (event) => {
    event.preventDefault();

    if (bigForm.getAttribute('data-show') === 'false') {
        bigForm.setAttribute('data-show', 'true');
        setTimeout(() => bigForm.style.opacity = '1', 300);
        setTimeout(() => window.scrollTo(0, bigForm.offsetTop - 20), 600);
    } else if (bigForm.getAttribute('data-show') === 'true') {
        bigForm.style.opacity = '0';
        setTimeout(() => bigForm.setAttribute('data-show', 'false'), 400);
    }
});