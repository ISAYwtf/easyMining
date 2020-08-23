let header = document.querySelector('header'),
    hoisting = document.querySelector('.hoisting');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40 && window.screen.width > 715) {
        header.style.height = '120px';

        if (window.scrollY > window.screen.height) {
            hoisting.style.display = 'unset';
        } else if (window.scrollY <= window.screen.height) {
            hoisting.style.display = 'none';
        }
    } else if (window.scrollY <= 40 && window.screen.width > 715) {
        header.style.height = '';
    }
});

let burgerBtn = document.querySelector('.burger__btn'),
    headerWrap = header.querySelector('.header--wrap');

burgerBtn.addEventListener('click', () => {
    headerWrap.classList.toggle("paused");

    if (headerWrap.classList.contains("header--active")) {
        headerWrap.classList.remove("header--active");
        headerWrap.classList.add("reverse");
        header.style.height = "70px";
        burgerBtn.children[0].children[0].removeAttribute('x');
        burgerBtn.children[0].children[1].setAttribute('x', '5.66667');
    } else if (headerWrap.classList.contains("reverse")) {
        headerWrap.classList.remove("reverse");
        headerWrap.classList.add("header--active");
        header.style.height = "271px";
        headerWrap.style.display = 'flex';
        burgerBtn.children[0].children[0].setAttribute('x', '17');
        burgerBtn.children[0].children[1].setAttribute('x', '3');
    } else {
        headerWrap.classList.add("header--active");
        headerWrap.style.display = 'flex';
        header.style.height = "271px";
        burgerBtn.children[0].children[0].setAttribute('x', '17');
        burgerBtn.children[0].children[1].setAttribute('x', '3');
    }

    setTimeout(() => {
        if (headerWrap.classList.contains("header--active")) {
            headerWrap.style.marginTop = "70px";
            headerWrap.style.height = "200px";
        } else if (headerWrap.classList.contains("reverse")) {
            headerWrap.style.height = "0";
            headerWrap.style.marginTop = "-130px";
            headerWrap.style.display = 'none';
        }

        headerWrap.classList.toggle("paused");
    }, 400);
});