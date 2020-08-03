document.addEventListener('DOMContentLoaded', function(){
    if (window.screen.width > 768) {
        let sliders = document.querySelectorAll('.swiper-container');
        sliders.forEach(el => {
            let mySwiper = new Swiper(el, {
                pagination: {
                    el: el.querySelector('.swiper-pagination'),
                    clickable: true
                },
                navigation: {
                    nextEl: el.querySelector('.swiper-button-next'),
                    prevEl: el.querySelector('.swiper-button-prev'),
                },
                speed: 300,
                loop: true,
                setWrapperSize: true,
                slidesPerView: '1',
                centeredSlides: true,
                slideToClickedSlide: true,
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: true
                }
            });
        });
    }
});