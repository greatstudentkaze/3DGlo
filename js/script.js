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

  countTimer('05 september 2020 22:37');

  // Menu
  const toggleMenu = () => {
    const menuBtn = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeMenuBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul > li');

    const menuHandler = () => {
      if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
        menu.style.transform = 'translate(0)';
      } else {
        menu.style.transform = '';
      }
    };

    menuBtn.addEventListener('click', menuHandler);

    closeMenuBtn.addEventListener('click', evt => {
      evt.preventDefault();
      menuHandler();
    });

    menuItems.forEach(item => item.addEventListener('click', menuHandler));
  };

  toggleMenu();
});