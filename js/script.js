'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const addZero = number => (number.toString().length === 1 ? `0${number}` : number);

  const animate = ({ timing, draw, duration }) => {
    const start = performance.now();

    const animate = time => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);
      draw(progress);

      if (timeFraction < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  // Timer
  const countTimer = deadline => {
    const timerHours = document.getElementById('timer-hours'),
      timerMinutes = document.getElementById('timer-minutes'),
      timerSeconds = document.getElementById('timer-seconds');

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime();

      const timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor(timeRemaining / 60 % 60),
        hours = Math.floor(timeRemaining / 3600);

      return { timeRemaining, hours, minutes, seconds };
    };

    // eslint-disable-next-line prefer-const
    let timerInterval;
    const updateTimer = () => {
      const timer = getTimeRemaining();

      if (timer.timeRemaining > 0) {
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      } else {
        clearInterval(timerInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };

    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  };

  countTimer('24 september 2020 00:00');

  // Menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const menuHandler = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', evt => {
      const target = evt.target;

      if (!target.closest('.menu') &&
        !(target.closest('.close-btn') && menu.contains(target.closest('.close-btn'))) &&
        !(!target.closest('menu') && menu.classList.contains('active-menu'))) {

        if (target.closest('menu > ul > li')) {
          const scrollTarget = document.getElementById(`${evt.target.getAttribute('href').slice(1)}`);
          scrollBy({
            top: scrollTarget.getBoundingClientRect().top,
            behavior: 'smooth'
          });
        } else return;
      }

      evt.preventDefault();
      menuHandler();
    });
  };

  toggleMenu();

  // Popups
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = popup.querySelector('.popup-content'),
      popupBtns = document.querySelectorAll('.popup-btn');

    popupBtns.forEach(elem => elem.addEventListener('click', () => {
      popup.style.display = 'block';

      if (document.documentElement.clientWidth >= 768) {
        popupContent.style.top = '-100%';
        const makeEaseOut = timing => timeFraction => 1 - timing(1 - timeFraction);

        const bounce = timeFraction => {
          for (let a = 0, b = 1; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
              return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
          }
        };

        animate({
          duration: 800,
          timing: makeEaseOut(bounce),
          draw(progress) {
            popupContent.style.top = progress * 10 + '%';
          }
        });
      }
    }));

    popup.addEventListener('click', evt => {
      let target = evt.target;

      if (target.classList.contains('popup-close')) {
        if (document.documentElement.clientWidth >= 768) {
          animate({
            duration: 300,
            timing(timeFraction) {
              return timeFraction;
            },
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

  togglePopup();

  // Smooth Scrolling to service-block
  const smoothScrollDown = () => {
    const scrollBtn = document.querySelector('.js-scroll-btn'),
      scrollTarget = document.querySelector('.service');

    scrollBtn.addEventListener('click', evt => {
      evt.preventDefault();
      scrollBy({
        top: scrollTarget.getBoundingClientRect().top,
        behavior: 'smooth'
      });
    });
  };

  smoothScrollDown();

  // Tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tabs = tabHeader.querySelectorAll('.service-header-tab'),
      tabsContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
      for (let i = 0; i < tabsContent.length; i++) {
        if (index === i) {
          tabs[i].classList.add('active');
          tabsContent[i].classList.remove('d-none');
        } else {
          tabs[i].classList.remove('active');
          tabsContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', evt => {
      const target = evt.target.closest('.service-header-tab');
      if (target) {
        tabs.forEach((item, index) => {
          if (item === target) {
            toggleTabContent(index);
          }
        });
      }
    });
  };

  tabs();

  // Slider
  const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
      slides = slider.querySelectorAll('.portfolio-item'),
      sliderDots = slider.getElementsByClassName('dot');

    const renderDots = () => {
      const sliderDots = slider.querySelector('.portfolio-dots');

      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('dot-active');

        sliderDots.append(dot);
      }
    };

    renderDots();

    let currentSlide = 0,
      stopIdInterval;

    const prevSlide = (slides, index, strClass) => slides[index].classList.remove(strClass);

    const nextSlide = (slides, index, strClass) => slides[index].classList.add(strClass);

    const autoplaySlider = () => {
      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(sliderDots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(sliderDots, currentSlide, 'dot-active');
    };

    const startSlider = (time = 3000) => stopIdInterval = setInterval(autoplaySlider, time);

    const stopSlider = () => clearInterval(stopIdInterval);

    slider.addEventListener('click', evt => {
      const target = evt.target;
      evt.preventDefault();

      if (!target.matches('.portfolio-btn, .dot')) return;

      prevSlide(slides, currentSlide, 'portfolio-item-active');
      prevSlide(sliderDots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) currentSlide++;
      else if (target.matches('#arrow-left')) currentSlide--;
      else if (target.matches('.dot')) {
        [...sliderDots].forEach((dot, index) => {
          if (dot === target) currentSlide = index;
        });
      }

      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;

      nextSlide(slides, currentSlide, 'portfolio-item-active');
      nextSlide(sliderDots, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', evt => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) stopSlider();
    });

    slider.addEventListener('mouseout', evt => {
      if (evt.target.matches('.portfolio-btn') || evt.target.matches('.dot')) startSlider();
    });

    startSlider();
  };

  slider();

  // Image hover
  const hoverOverImage = () => {
    const imageRow = document.querySelector('.command .row');

    let imageSrc;

    imageRow.addEventListener('mouseover', evt => {
      if (!evt.target.classList.contains('command__photo')) return;

      imageSrc = evt.target.src;
      evt.target.src = evt.target.dataset.img;
    });

    imageRow.addEventListener('mouseout', evt => {
      if (!evt.target.classList.contains('command__photo')) return;

      evt.target.src = imageSrc;
    });
  };

  hoverOverImage();

  // Calculator
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      inputType = calcBlock.querySelector('.calc-type'),
      inputArea = calcBlock.querySelector('.calc-square'),
      inputAmount = calcBlock.querySelector('.calc-count'),
      inputDays = calcBlock.querySelector('.calc-day'),
      totalCost = document.getElementById('total');

    const calcCost = () => {
      let total = 0,
        amountValue = 1,
        daysValue = 1;

      const typeValue = inputType.options[inputType.selectedIndex].value,
        areaValue = +inputArea.value;

      if (inputAmount.value > 1) {
        amountValue += (inputAmount.value - 1) / 10;
      }

      if (inputDays.value && inputDays.value < 5) {
        daysValue *= 2;
      } else if (inputDays.value && inputDays.value < 10) {
        daysValue *= 1.5;
      }

      if (typeValue && areaValue) {
        total = price * typeValue * areaValue * amountValue * daysValue;
      }

      animate({
        duration: 500,
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          totalCost.textContent = Math.round(progress * total);
        }
      });
    };

    calcBlock.addEventListener('input', evt => {
      const target = evt.target;

      if (target.matches('select') || target.matches('input')) {
        if (target.matches('input')) target.value = target.value.replace(/\D/g, '');
        calcCost();
      }
    });

  };

  calculator();

  // Validator
  // eslint-disable-next-line no-undef
  const introFormValidator = new Validator({
    selector: '#form1',
    patterns: {},
    method: {
      'form1-name': [
        ['notEmpty'],
        ['pattern', 'onlyRussian']
      ],
      'form1-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
    }
  });

  // eslint-disable-next-line no-undef
  const questionFormValidator = new Validator({
    selector: '#form2',
    patterns: {},
    method: {
      'form2-name': [
        ['notEmpty'],
        ['pattern', 'onlyRussian']
      ],
      'form2-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form2-message': [
        ['notEmpty'],
        ['pattern', 'onlyRussian']
      ]
    }
  });

  // eslint-disable-next-line no-undef
  const popupFormValidator = new Validator({
    selector: '#form3',
    patterns: {},
    method: {
      'form3-name': [
        ['notEmpty'],
        ['pattern', 'onlyRussian']
      ],
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form3-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ]
    }
  });

  introFormValidator.init();
  questionFormValidator.init();
  popupFormValidator.init();
});
