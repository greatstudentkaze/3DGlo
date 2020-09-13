class Validator {
  constructor({ selector, patterns = {}, method }) {
    this.form = document.querySelector(selector);
    this.patterns = patterns;
    this.method = method;
    this.formElements = [...this.form.elements]
      .filter(elem => (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button'));
    this.errors = new Set();
  }

  init() {
    this.setPatterns();
    this.formElements.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', evt => {
      this.formElements.forEach(elem => this.checkIt({ target: elem }));
      if (this.errors.size) evt.preventDefault();
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        return elem.value.trim() !== '';
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];
      if (method) return method.every(item => validatorMethod[item[0]](elem, this.patterns[item[1]]));
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки для них');
    }

    return true;
  }

  checkIt(evt) {
    const target = evt.target;

    if (this.isValid(target)) {
      this.errors.delete(target);
      this.showSuccess(target);
    } else {
      this.errors.add(target);
      this.showError(target);
    }
    console.log(this.errors);
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');

    if (!elem.nextElementSibling || !elem.nextElementSibling.classList.contains('error-msg')) {
      const errorMsg = document.createElement('div');
      errorMsg.textContent = 'Ошибка в этом поле';
      errorMsg.classList.add('error-msg');
      elem.insertAdjacentElement('afterend', errorMsg);
    }
  }

  showSuccess(elem) {
    elem.classList.remove('error');

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('error-msg')) {
      elem.nextElementSibling.remove();
    }
  }

  setPatterns() {
    if (!this.patterns.phone) this.patterns.phone = /^\+?[78]([-() ]*\d){10}$/;
    if (!this.patterns.email) this.patterns.email = /^\w+@\w+\.\w{2,}$/;
    if (!this.patterns.onlyRussian) this.patterns.onlyRussian = /^[а-яё ]+$/i;
  }
}
