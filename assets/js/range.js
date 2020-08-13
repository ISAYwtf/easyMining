document.addEventListener('DOMContentLoaded', () => {
    const priceSlider = document.querySelector('#priceRange');

    noUiSlider.create(priceSlider, {
        start: [20000, 100000],
        connect: true,
        range: {
            'min': 20000,
            'max': 100000
        },
        step: 1,
        format: {
            to: function(value) {
                return parseInt(value);
            },
            from: function(value) {
                return parseInt(value);
            }
        }
    });

    let minNumber = document.querySelector('#min'),
        maxNumber = document.querySelector('#max'),
        clearBtn = document.querySelector('.filter__clear');

    priceSlider.noUiSlider.on('update', function (values, handle) {

        var value = values[handle];

        if (handle) {
            maxNumber.value = value;
        } else {
            minNumber.value = value;
        }
    });

    minNumber.addEventListener('change', function () {
        priceSlider.noUiSlider.set([this.value, null]);
    });

    maxNumber.addEventListener('change', function () {
        priceSlider.noUiSlider.set([null, this.value]);
    });

    clearBtn.addEventListener('click', () => {
        priceSlider.noUiSlider.reset();
    });
});