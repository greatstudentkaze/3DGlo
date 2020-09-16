import maskPhone from './maskPhone';

const sendForm = () => {
  const errorMsg = 'Что-то пошло не так...',
    successMsg = 'Спасибо! Мы скоро с Вами свяжемся!',
    loadMsg = `<div class="sk-circle-bounce">
                  <div class="sk-child sk-circle-1"></div>
                  <div class="sk-child sk-circle-2"></div>
                  <div class="sk-child sk-circle-3"></div>
                  <div class="sk-child sk-circle-4"></div>
                  <div class="sk-child sk-circle-5"></div>
                  <div class="sk-child sk-circle-6"></div>
                  <div class="sk-child sk-circle-7"></div>
                  <div class="sk-child sk-circle-8"></div>
                  <div class="sk-child sk-circle-9"></div>
                  <div class="sk-child sk-circle-10"></div>
                  <div class="sk-child sk-circle-11"></div>
                  <div class="sk-child sk-circle-12"></div>
                </div>`;

  // eslint-disable-next-line no-undef
  maskPhone('input[name="user_phone"]');
  const patterns = {
    'user_name': /^[а-яё ]+$/i,
    'user_email': /^[\w.]+@\w+\.\w{2,}$/i,
    'user_phone': /^\+?[78]([-() ]*\d){10}$/,
    'user_message': /^[а-яё ]+$/i
  };

  const statusMsg = document.createElement('div');
  statusMsg.style.cssText = 'font-size: 2rem; color: #ffffff';

  const postData = body =>
    fetch('server.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

  const formHandler = evt => {
    evt.preventDefault();
    const errors = new Set(),
      formElements = [...evt.target.elements]
        .filter(elem => elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button');

    formElements.forEach(elem => {
      if (!elem.value.trim()) {
        elem.style.border = '2px solid red';
        errors.add(elem);
      } else if (!patterns[elem.name].test(elem.value)) {
        elem.style.border = '2px solid red';
        errors.add(elem);
      } else {
        elem.style.border = '';
        errors.delete(elem);
      }
    });

    if (!errors.size) {
      evt.target.append(statusMsg);
      statusMsg.innerHTML = loadMsg;

      const body = {},
        formData = new FormData(evt.target);
      formData.forEach((value, key) => (body[key] = value.trim()));

      postData(body)
        .then(response => {
          if (response.status !== 200) throw new Error('Error');
          statusMsg.textContent = successMsg;
          formElements.forEach(elem => elem.value = '');
        })
        .catch(err => {
          statusMsg.textContent = errorMsg;
          console.error(err);
        });
    }
  };

  document.body.addEventListener('submit', formHandler);
  document.body.addEventListener('input', evt => {
    const target = evt.target;

    if (target.matches('input[name="user_name"]') || target.matches('input[name="user_message"]')) {
      target.value = target.value.replace(/[^а-яё ]/gi, '');
    }
  });
};

export default sendForm;
