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
