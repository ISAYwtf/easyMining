let collapseBtn = document.querySelectorAll('.filter-item__title');

collapseBtn.forEach(item => {
    item.addEventListener('click', () => {
        let filter = item.parentNode,
            other = document.querySelectorAll('.filter__item');

        other.forEach(el => {
            if (el.classList.contains('filter__item--active') && !el.isEqualNode(filter)) {
                el.classList.remove('filter__item--active');
            }
        });

        filter.classList.toggle('filter__item--active');
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

let filterBurger = document.querySelector('.filter__burger').querySelector('.filter__burger-btn'),
    catalogFilter = document.querySelector('.catalog__filter'),
    filterWrap = catalogFilter.querySelector('.filter__wrap');

filterBurger.addEventListener('click', () => {
    filterWrap.classList.toggle("paused");

    if (filterWrap.classList.contains("filter--active")) {
        filterWrap.classList.remove("filter--active");
        filterWrap.classList.add("reverse");

        filterBurger.children[1].setAttribute('cx', '4.5');
        filterBurger.children[3].setAttribute('cx', '11.5');
        filterBurger.children[5].setAttribute('cx', '18.5');
    } else if (filterWrap.classList.contains("reverse")) {
        filterWrap.classList.remove("reverse");
        filterWrap.classList.add("filter--active");
        filterWrap.style.display = 'unset';

        filterBurger.children[1].setAttribute('cx', '14.5');
        filterBurger.children[3].setAttribute('cx', '18.5');
        filterBurger.children[5].setAttribute('cx', '4.5');
    } else {
        filterWrap.classList.add("filter--active");
        filterWrap.style.display = 'unset';

        filterBurger.children[1].setAttribute('cx', '14.5');
        filterBurger.children[3].setAttribute('cx', '18.5');
        filterBurger.children[5].setAttribute('cx', '4.5');
    }

    setTimeout(() => {
        if (filterWrap.classList.contains("filter--active")) {
            filterWrap.style.marginTop = "0";
        } else if (filterWrap.classList.contains("reverse")) {
            filterWrap.style.marginTop = "-2000px";
            filterWrap.style.display = 'none';
        }

        filterWrap.classList.toggle("paused");
    }, 400);
});

let orderBtn = document.querySelector('.specif__order'),
    form = document.querySelector('.modal-good__form'),
    interval = false;

orderBtn.addEventListener('click', () => {
    if (interval) return;
    if (form.getAttribute('data-show') === 'false') {
        orderBtn.children[1].style.transform = 'rotateX(180deg)';
        orderBtn.children[1].style.fill = '#FFE474';
        form.style.marginTop = 'unset';

        setTimeout(() => form.setAttribute('data-show', 'true'), 250);
        // setTimeout(() => form.style.opacity = '1', 400);
        // form.setAttribute('data-show', 'true');
    } else if (form.getAttribute('data-show') === 'true') {
        form.setAttribute('data-show', 'false');
        orderBtn.children[1].style.transform = 'none';
        orderBtn.children[1].style.fill = 'none';

        if (window.screen.width > 1024) {
            setTimeout(() => form.style.marginTop = '-710px', 250);
        } else if (window.screen.width <= 1024 && window.screen.width > 770) {
            setTimeout(() => form.style.marginTop = '-678px', 250);
        } else if (window.screen.width <= 770 && window.screen.width > 715) {
            setTimeout(() => form.style.marginTop = '-657px', 250);
        } else if (window.screen.width <= 715 && window.screen.width > 568) {
            setTimeout(() => form.style.marginTop = '-788px', 250);
        } else if (window.screen.width <= 568 && window.screen.width > 414) {
            setTimeout(() => form.style.marginTop = '-777px', 250);
        } else if (window.screen.width <= 414) {
            setTimeout(() => form.style.marginTop = '-650px', 250);
        }
    }
    interval = true;
    setTimeout(() => interval = false, 410);
});

let modalClose = document.querySelector('.modal-good__close'),
    modal = document.querySelector('.modal-good'),
    backBtn = document.querySelector('.catalog__back');

modalClose.addEventListener('click', () => {
    modal.setAttribute('data-show', 'false');

    if (window.screen.width <= 770) {
        document.querySelector('.catalog__goods').style.display = 'flex';
        backBtn.style.display = 'none';
        filterBurger.style.display = 'unset';
        document.querySelector('.filter__burger').style.justifyContent = 'flex-end';
    } else {
        document.querySelector('.catalog__wrap').style.opacity = '1';
        document.querySelector('.catalog__wrap').style.pointerEvents = 'unset';
    }

    if (window.screen.width <= 1024 && window.screen.width > 770) {
        document.querySelector('.catalog__wrap').style.display = 'flex';
    }
});

backBtn.addEventListener('click', () => {
    modal.setAttribute('data-show', 'false');

    if (window.screen.width <= 770) {
        document.querySelector('.catalog__goods').style.display = 'flex';
        backBtn.style.display = 'none';
        filterBurger.style.display = 'unset';
        document.querySelector('.filter__burger').style.justifyContent = 'flex-end';
    } else {
        document.querySelector('.catalog__wrap').style.opacity = '1';
        document.querySelector('.catalog__wrap').style.pointerEvents = 'unset';
    }

    if (window.screen.width <= 1024 && window.screen.width > 770) {
        document.querySelector('.catalog__wrap').style.display = 'flex';
    }
});

document.addEventListener('click', (event) => {
    let target = event.path,
        flag = false;

    for (let i = 0; i < target.length - 1; i++) {
        if (target[i].isEqualNode(modal)) {
            flag = true;
        }
    }

    if (modal.getAttribute('data-show') === 'true' && window.screen.width > 1024) {
        if (!flag) {
            modal.setAttribute('data-show', 'false');

            if (window.screen.width <= 770) {
                document.querySelector('.catalog__goods').style.display = 'flex';
                backBtn.style.display = 'none';
                filterBurger.style.display = 'unset';
                document.querySelector('.filter__burger').style.justifyContent = 'flex-end';
            } else {
                document.querySelector('.catalog__wrap').style.opacity = '1';
                document.querySelector('.catalog__wrap').style.pointerEvents = 'unset';
            }

            if (window.screen.width <= 1024 && window.screen.width > 770) {
                document.querySelector('.catalog__wrap').style.display = 'flex';
            }
        } else {
            return;
        }
    } else if (modal.getAttribute('data-show') === 'false') return;
});

let modalImg = modal.querySelector('.modal-good__img').children[0],
    modalTitle = modal.querySelector('.modal-good__title').children[0],
    currency = modal.querySelector('.specif').children[0].querySelector('.specif__info').children[0].children[0],
    algorithm = modal.querySelector('.specif').children[0].querySelector('.specif__info').children[1].children[0],
    energy = modal.querySelector('.specif').children[2].querySelector('.specif__info').children[2].children[0],
    price = modal.querySelector('.specif__price').children[0];


goods.forEach(el => {
    el.addEventListener('click', () => {
        event.stopPropagation();

        if (window.screen.width <= 770) {
            document.querySelector('.catalog__goods').style.display = 'none';
            backBtn.style.display = 'flex';
            filterBurger.style.display = 'none';
            document.querySelector('.filter__burger').style.justifyContent = 'flex-start';
        } else {
            document.querySelector('.catalog__wrap').style.opacity = '0.2';
            document.querySelector('.catalog__wrap').style.pointerEvents = 'none';
        }

        if (window.screen.width <= 1024 && window.screen.width > 770) {
            document.querySelector('.catalog__wrap').style.display = 'none';
        }

        modal.setAttribute('data-show', 'true');

        modalTitle.textContent = el.getAttribute('data-brand');
        currency.textContent = el.getAttribute('data-crypto');
        algorithm.textContent = el.getAttribute('data-algorithm');
        energy.textContent = el.getAttribute('data-energy');
        price.textContent = el.getAttribute('data-price').replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') + '\u{0020}' + '\u{20BD}';
        modalImg.setAttribute('src', el.querySelector('img').getAttribute('src'));
        modalImg.setAttribute('alt', 'assic');
        setTimeout(() => window.scrollTo(0, modal.offsetTop - 120), 100);
    });
});