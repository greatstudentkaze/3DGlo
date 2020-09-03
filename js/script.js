window.addEventListener('DOMContentLoaded', () => {
  'use strict';

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
        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;
      } else {
        timerHours.textContent = '0';
        timerMinutes.textContent = '0';
        timerSeconds.textContent = '0';
      }
    }

    updateTimer();

    const timerInterval = setInterval(() => {
      if (getTimeRemaining().timeRemaining >= 0) updateTimer();
      else clearInterval(timerInterval);
    }, 1000);
  };

  countTimer('03 september 2020 17:27');
});