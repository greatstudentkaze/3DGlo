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

  const smoothScrollBy = scrollTarget => {
    scrollBy({
      top: scrollTarget.getBoundingClientRect().top,
      behavior: 'smooth'
    });
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
      const target = evt.target,
        closeBtn = target.closest('.close-btn'),
        menuBtn = target.closest('.menu'),
        menuItem = target.closest('menu > ul > li'),
        areaOutsideMenu = !target.closest('menu');

      if (menuBtn || closeBtn || (areaOutsideMenu && menu.classList.contains('active-menu'))) {
        evt.preventDefault();
        menuHandler();
      } else if (menuItem) {
        evt.preventDefault();
        smoothScrollBy(document.getElementById(`${evt.target.getAttribute('href').slice(1)}`));
        menuHandler();
      }
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
      smoothScrollBy(scrollTarget);
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

  // Send ajax form
  const sendForm = () => {
    const errorMsg = 'Что-то пошло не так...',
      loadMsg = 'Загрузка...',
      successMsg = 'Спасибо! Мы скоро с Вами свяжемся!';

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

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status === 200) outputData();
        else errorData(request.status);
      });

      request.open('POST', 'server.php');
      request.setRequestHeader('Content-Type', 'application/json');

      request.send(JSON.stringify(body));
    };

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
        statusMsg.textContent = loadMsg;

        const body = {},
          formData = new FormData(evt.target);
        formData.forEach((value, key) => (body[key] = value.trim()));

        postData(body, () => {
          statusMsg.textContent = successMsg;

          formElements.forEach(elem => elem.value = '');
        }, error => {
          statusMsg.textContent = errorMsg;
          console.error(error);
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

  sendForm();
});
