const smoothScrollDown = () => {
  const scrollBtn = document.querySelector('.js-scroll-btn'),
    scrollTarget = document.querySelector('.service');

  scrollBtn.addEventListener('click', evt => {
    evt.preventDefault();
    smoothScrollBy(scrollTarget);
  });
};
