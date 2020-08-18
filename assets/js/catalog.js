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
    pages = [];

initGoods(goods);

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

function initGoods(goods) {
    let pageCount = Math.ceil(goods.length / size);

    if (!goods.length) {
        goodsContainer.textContent = 'Товаров не найдено';
        createPagination(1, pagination);
        return;
    }

    for (let i = 1; i <= pageCount; i++) {
        pages[i - 1] = new Array();
        let j = 0;
        if (i > 1) {
            j = size * (i - 1);
        }
        for (j; j < size * i; j++) {
            if (goods[j] != undefined) {
                pages[i - 1][j] = goods[j];
                goodsItem(pages[i - 1][j]);
            }
        }
    }

    goodShow(pages[0]);

    createPagination(pageCount, pagination);
}

function createPagination(count, place) {
    while (place.firstChild) {
        place.removeChild(place.firstChild);
    }

    for (let i = 1; i <= count; i++) {
        let span = document.createElement('span');
        span.textContent = i;
        span.setAttribute('data-show', i);
        place.append(span);
    }

    place.firstChild.classList.add('pagination__active');
}

function togglePagination(prev, next) {
    if (next == null) return;
    let count = next.getAttribute('data-show');
    prev.classList.remove('pagination__active');
    next.classList.add('pagination__active');
    goodShow(pages[count - 1]);
    window.scrollTo(0, 0);
}

function goodShow(page) {
    while (goodsContainer.firstChild) {
        goodsContainer.removeChild(goodsContainer.firstChild);
    }

    page.forEach(item => {
        goodsContainer.append(item);
    })
}

function goodsItem(goods) {
    let title = goods.getAttribute('data-brand'),
        price = goods.getAttribute('data-price');

    price = price.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')

    goods.querySelector('h5').textContent = title;
    goods.querySelector('.good__price').textContent = price + '\u{0020}' + '\u{20BD}';
}

let filter = document.forms.filterForm,
    filterBtn = document.querySelector('.filter__apply'),
    filterClear = document.querySelector('.filter__clear').querySelector('input');

filterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let brand = checked(filter.elements.brand),
        minPrice = filter.querySelector('#min').value,
        maxPrice = filter.querySelector('#max').value,
        energy = checked(filter.elements.energy),
        algorithm = checked(filter.elements.algorithm),
        crypto = checked(filter.elements.crypto),
        filterGoods = goods;

    minPrice = +minPrice;
    maxPrice = +maxPrice;

    filterGoods = checkItem(brand, 'data-brand', filterGoods);
    filterGoods = checkPrice(minPrice, maxPrice, filterGoods);
    filterGoods = checkItem(energy, 'data-energy', filterGoods);
    filterGoods = checkItem(algorithm, 'data-algorithm', filterGoods);
    filterGoods = checkItem(crypto, 'data-crypto', filterGoods);

    initGoods(filterGoods);
});

filterClear.addEventListener('click', () => {
    initGoods(goods);
});

function checked(input) {
    let res = new Array();
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            res.push(input[i].value);
        }
    }

    return res;
}

function checkItem(filterItem, attr, filterGoods) {
    let set = new Set();
    if (!filterItem.length) return filterGoods;
    for (let i = 0; i < filterGoods.length; i++) {
        let data = filterGoods[i].getAttribute(attr);
        if (filterItem.includes(data)) {
            set.add(filterGoods[i]);
        }
    }
    return new Array(...set);
}

function checkPrice(min, max, filterGoods) {
    let set = new Set();
    if (!min && !max) return filterGoods;
    for (let i = 0; i < filterGoods.length; i++) {
        let data = filterGoods[i].getAttribute('data-price');
        data = +data;
        if (min && max && data <= max && data >= min) {
            set.add(filterGoods[i]);
        } else if (min && data >= min && !max) {
            set.add(filterGoods[i]);
        } else if (max && data <= max && !min) {
            set.add(filterGoods[i]);
        }
    }
    return new Array(...set);
}