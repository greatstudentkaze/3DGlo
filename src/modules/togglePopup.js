import animate from './animate';

const togglePopup = () => {
  const popup = document.querySelector('.popup'),
    popupContent = popup.querySelector('.popup-content'),
    serviceBlock = document.getElementById('service-block');

  const linear = timeFraction => timeFraction;
  const makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);
  const bounce = timeFraction => {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      }
    }
  };

  serviceBlock.addEventListener('click', evt => {
    const target = evt.target;

    if (!target.closest('.popup-btn')) return;

    popup.style.display = 'block';

    if (document.documentElement.clientWidth >= 768) {
      popupContent.style.top = '-100%';

      animate({
        duration: 800,
        timing: makeEaseOut(bounce),
        draw(progress) {
          popupContent.style.top = progress * 10 + '%';
        }
      });
    }
  });

  popup.addEventListener('click', evt => {
    let target = evt.target;

    if (target.classList.contains('popup-close')) {
      if (document.documentElement.clientWidth >= 768) {
        animate({
          duration: 300,
          timing: linear,
          draw(progress) {
            popupContent.style.top = progress * -100 + '%';
          }
        });

        setTimeout(() => {
          popup.style.display = '';
          popupContent.style.top = '';
        }, 320);
      } else {
        popup.style.display = '';
      }
    } else {
      target = target.closest('.popup-content');

      if (!target) {
        popup.style.display = '';
      }
    }
  });
};

export default togglePopup;
