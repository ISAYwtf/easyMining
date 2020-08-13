let collapseBtn = document.querySelectorAll('.filter-item__title'),
    min = document.querySelectorAll('input');

collapseBtn.forEach(item => {
    item.addEventListener('click', () => {
        let filter = item.parentNode;

        if (filter.classList.contains('filter__item--active')) {
            filter.classList.remove('filter__item--active');
        } else {
            filter.classList.add('filter__item--active');
        }
    });
});