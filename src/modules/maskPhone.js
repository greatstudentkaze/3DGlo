const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
  function mask(event) {
    const keyCode = event.code,
      target = event.target;

    const template = masked,
      def = template.replace(/\D/g, ""),
      val = target.value.replace(/\D/g, "");

    let i = 0,
      newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    newValue = newValue.substr(0, 1) + '7' + newValue.substr(2);

    let reg = template.substr(0, target.value.length).replace(/_+/g,
      a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");

    if (!reg.test(target.value) || target.value.length < 5 || keyCode > 47 && keyCode < 58) {
      target.value = newValue;
    }

    if (event.type === "blur" && target.value.length < 5) {
      target.value = "";
    }
  }

  document.body.addEventListener('input', evt => {
    if (evt.target.closest(selector)) mask(evt);
  });

  document.body.addEventListener('focusin', evt => {
    if (evt.target.closest(selector)) mask(evt);
  });

  document.body.addEventListener('focusout', evt => {
    if (evt.target.closest(selector)) mask(evt);
  });
};

export default maskPhone;
