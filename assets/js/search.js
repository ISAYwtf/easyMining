window.addEventListener('DOMContentLoaded', () => {
    let goodsList = document.createElement('ul');

    let req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buildArray(this.responseText);
        }
    }

    req.open("GET", "assets/parser.php", true);
    req.send();

    function buildArray(data) {
        let answer = document.createElement('div');
        answer.innerHTML = data;
        answer = answer.children[0].children;
        let answerCount = answer.length;
        for (let i = 0; i < answerCount; i++) {
            goodsList.append(document.createElement('a'));
            let a = goodsList.querySelectorAll('a')[i];
            a.append(answer[0]);
            a.href = 'catalog.html#' + a.children[0].id;
            a.children[0].append(document.createElement('div'));
            a.children[0].lastChild.classList.add('item-info');
            a.querySelector('h5').textContent = a.children[0].getAttribute('data-brand');
            a.querySelector('p').remove();
            a.querySelector('.item-info').append(a.querySelector('.good__price'));
            a.querySelector('.item-info').append(a.querySelector('.good__stock'));
        }

        document.querySelector('.search-data').append(goodsList);
    }

    document.querySelector('#search').addEventListener('input', function () {
        let val = this.value.trim(),
            searchItems = document.querySelectorAll('.search-data a'),
            regExp = new RegExp(/[^A-Za-z]/g);

        val = val.replace(regExp, '');

        if (val != '') {
            searchItems.forEach(el => {
                if (el.querySelector('h5').innerText.toLowerCase().search(val.toLowerCase()) == -1) {
                    el.setAttribute('aria-expanded', 'false');
                } else {
                    el.setAttribute('aria-expanded', 'true');
                    document.querySelector('.search-data').setAttribute('aria-expanded', 'true');

                    document.body.style.overflowY = 'hidden';
                }

                el.addEventListener('click', function() {
                    let dataAttr = {};
                    for (const key in this.children[0].dataset) {
                        dataAttr[key] = this.children[0].dataset[key];
                    }
                    // localStorage.setItem('dataAttr', JSON.stringify(dataAttr));
                });
            });
        } else {
            document.querySelector('.search-data').setAttribute('aria-expanded', 'false');
            document.body.style.overflowY = 'unset';
        }
    });

    document.addEventListener('click', (e) => {
        let target = e.srcElement,
            flag = false,
            searchData = document.querySelector('.search-data');

        if (target.offsetParent != null || target.offsetParent != undefined) {
            if (target.isEqualNode(searchData.children[0]) || target.isEqualNode(document.querySelector('#search'))) {
                flag = true;
            }
        } else {
            flag = true;
        }

        if (searchData.getAttribute('aria-expanded') === 'true' && window.innerWidth > 770) {
            if (!flag) {
                searchData.setAttribute('aria-expanded', 'false');
                document.body.style.overflowY = 'unset';
            } else {
                return;
            }
        } else return;
    });
});