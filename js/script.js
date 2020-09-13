'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const addZero = number => (number.toString().length === 1 ? `0${number}` : number);

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
});
