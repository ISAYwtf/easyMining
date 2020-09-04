let clientForm = document.querySelector('.big-form').querySelector('form'),
    responseBlock = document.querySelector('.big-form__response');

clientForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = {
        name: clientForm.elements.name.value,
        lastName: clientForm.elements.lastName.value,
        phone: clientForm.elements.phone.value,
        email: clientForm.elements.email.value
    };

    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {
        console.log(request.response);
        if (request.response === '1') {
            responseBlock.style.display = 'flex';
            responseBlock.querySelector('svg').style.display = 'unset';
            responseBlock.querySelector('p').textContent = 'Заявка успешно отправлена';
            responseBlock.style;justifyContent = 'space-between';
            clientForm.elements.name.value = '';
            clientForm.elements.lastName.value = '';
            clientForm.elements.phone.value = '';
            clientForm.elements.email.value = '';
        } else  {
            responseBlock.style.display = 'flex';
            responseBlock.querySelector('svg').style.display = 'none';
            responseBlock.querySelector('p').innerHTML = 'Что-то пошло не так:( <br>Повторите попытку';
            responseBlock.style;justifyContent = 'center';
        }
    });

    request.open('POST', 'assets/full_mail.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(`name= ${encodeURIComponent(formData.name)} &lastName= ${encodeURIComponent(formData.lastName)} &phone= ${encodeURIComponent(formData.phone)} &email= ${encodeURIComponent(formData.email)}`);

    setTimeout(document.body.addEventListener('click', () => {
        responseBlock.style.display = 'none';
    }), 1000);
});