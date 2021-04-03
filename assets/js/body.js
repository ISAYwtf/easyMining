const header = document.querySelector("header"),
    hoisting = document.querySelector(".hoisting");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40 && window.innerWidth > 770) {
        header.style.height = "90px";

        if (window.scrollY > window.innerHeight) {
            hoisting.style.display = "unset";
        } else if (window.scrollY <= window.innerHeight) {
            hoisting.style.display = "none";
        }
    } else if (window.scrollY <= 40 && window.innerWidth > 770) {
        header.style.height = "";
    }
});

const burgerBtn = document.querySelector(".burger__btn"),
    headerWrap = header.querySelector(".header--wrap");

burgerBtn.addEventListener("click", () => {
    headerWrap.classList.toggle("paused");

    if (headerWrap.classList.contains("header--active")) {
        headerWrap.classList.remove("header--active");
        headerWrap.classList.add("reverse");
        header.style.height = "70px";
        burgerBtn.children[0].children[0].removeAttribute("x");
        burgerBtn.children[0].children[1].setAttribute("x", "5.66667");
    } else if (headerWrap.classList.contains("reverse")) {
        headerWrap.classList.remove("reverse");
        headerWrap.classList.add("header--active");
        header.style.height = "271px";
        headerWrap.style.display = "flex";
        burgerBtn.children[0].children[0].setAttribute("x", "17");
        burgerBtn.children[0].children[1].setAttribute("x", "3");
    } else {
        headerWrap.classList.add("header--active");
        headerWrap.style.display = "flex";
        header.style.height = "271px";
        burgerBtn.children[0].children[0].setAttribute("x", "17");
        burgerBtn.children[0].children[1].setAttribute("x", "3");
    }

    setTimeout(() => {
        if (headerWrap.classList.contains("header--active")) {
            headerWrap.style.marginTop = "70px";
            headerWrap.style.height = "200px";
        } else if (headerWrap.classList.contains("reverse")) {
            headerWrap.style.height = "0";
            headerWrap.style.marginTop = "-130px";
            headerWrap.style.display = "none";
        }

        headerWrap.classList.toggle("paused");
    }, 400);
});

const simpleForm = document.querySelector(".form").querySelector("form"),
    simpleFormBtn = simpleForm.querySelector("button");

simpleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
        email: simpleForm.elements.email.value,
    };

    const request = new XMLHttpRequest();

    request.addEventListener("load", () => {
        console.log(request.response);
        if (request.response === "1") {
            simpleFormBtn.classList.add("form-email__response");
            simpleForm.elements.email.value = "";
        } else {
            simpleFormBtn.classList.add("form-email__response-fail");
        }
    });

    request.open("POST", "assets/simple_mail.php", true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    request.send(`email= ${encodeURIComponent(formData.email)}`);
});
