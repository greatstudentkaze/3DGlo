window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const addZero = number => number.toString().length === 1 ? `0${number}` : number;

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

      return {timeRemaining, hours, minutes, seconds};
    };

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
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
  };

  countTimer('24 september 2020 00:00');

  // Menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeMenuBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul > li');

    const menuHandler = () => {
      menu.classList.toggle('active-menu');
    };

    menuBtn.addEventListener('click', menuHandler);

    closeMenuBtn.addEventListener('click', evt => {
      evt.preventDefault();
      menuHandler();
    });

    menuItems.forEach(elem => elem.addEventListener('click', menuHandler));
  };

  toggleMenu();

  // Popups
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = popup.querySelector('.popup-content'),
      popupBtns = document.querySelectorAll('.popup-btn'),
      closePopupBtn = popup.querySelector('.popup-close');

    let stopAnimationId;
    const animateOpeningPopup = () => {
      stopAnimationId = requestAnimationFrame(animateOpeningPopup);

      if (parseFloat(popupContent.style.top) < 10) {
        popupContent.style.top = parseFloat(popupContent.style.top) + 5 + '%';
      } else {
        cancelAnimationFrame(stopAnimationId);
      }
    };

    const animateClosingPopup = () => {
      stopAnimationId = requestAnimationFrame(animateClosingPopup);

      if (parseFloat(popupContent.style.top) > -100) {
        popupContent.style.top = parseFloat(popupContent.style.top) - 5 + '%';
      } else {
        cancelAnimationFrame(stopAnimationId);
      }
    };

    popupBtns.forEach(elem => elem.addEventListener('click', () => {
      popup.style.display = 'block';

      if (document.documentElement.clientWidth >= 768) {
        popupContent.style.top = '-100%';
        animateOpeningPopup();
      }
    }));

    closePopupBtn.addEventListener('click', () => {
      if (document.documentElement.clientWidth >= 768) {
        animateClosingPopup();
        setTimeout(() => popup.style.display = '', 200);
      } else {
        popup.style.display = '';
      }
    });
  };

  togglePopup();
});
