let collapseBtn = document.querySelectorAll('.filter-item__title');

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

let pagination = document.querySelector('.pagination__num'),
    paginationLeft = document.querySelector('.pagination__left'),
    paginationRight = document.querySelector('.pagination__right'),
    paginationNum = pagination.querySelectorAll('span'),
    goods = document.querySelectorAll('.goods__item'),
    goodsContainer = document.querySelector('.goods__wrap'),
    size = 6,
    pageCount = Math.round(goods.length / size),
    pages = [];

for (let i = 1; i <= pageCount; i++) {
    pages[i - 1] = new Array();
    let j = 0;
    if (i > 1) {
        j = size * (i - 1);
    }
    for (j; j < size * i; j++) {
        if (goods[j] != undefined) {
            pages[i - 1][j] = goods[j];
        }
    }
}

goodShow(pages[0]);

createPagination(pageCount, pagination);

pagination.addEventListener('click', function(event) {
    let target = event.target,
        paginationActive = pagination.querySelector('.pagination__active');

    if (target.nodeName === 'SPAN') {
        togglePagination(paginationActive, target);
    }

});

paginationLeft.addEventListener('click', function(event) {
    let paginationActive = pagination.querySelector('.pagination__active');

    togglePagination(paginationActive, paginationActive.previousElementSibling);
});

paginationRight.addEventListener('click', function(event) {
    let paginationActive = pagination.querySelector('.pagination__active');

    togglePagination(paginationActive, paginationActive.nextElementSibling);
});

function createPagination(count, place) {
    if (count > 1) {
        for (let i = 2; i <= count; i++) {
            let span = document.createElement('span');
            span.textContent = i;
            span.setAttribute('data-show', i);
            place.append(span);
        }
    }
}

function togglePagination(prev, next) {
    if (next == null) return;
    let count = next.getAttribute('data-show');
    prev.classList.remove('pagination__active');
    next.classList.add('pagination__active');
    goodShow(pages[count - 1]);
}

function goodShow(page) {
    while (goodsContainer.firstChild) {
        goodsContainer.removeChild(goodsContainer.firstChild);
    }

    page.forEach(item => {
        goodsContainer.append(item);
    })
}