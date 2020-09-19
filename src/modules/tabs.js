const tabs = () => {
  const tabHeader = document.querySelector('.service-header'),
    tabs = tabHeader.querySelectorAll('.service-header-tab'),
    tabsContent = document.querySelectorAll('.service-tab');

  const toggleTabContent = index => {
    tabsContent.forEach((tabContent, i) => {
      if (index === i) {
        tabs[i].classList.add('active');
        tabContent.classList.remove('d-none');
      } else {
        tabs[i].classList.remove('active');
        tabContent.classList.add('d-none');
      }
    });
  };

  tabHeader.addEventListener('click', evt => {
    const target = evt.target.closest('.service-header-tab');
    if (target) {
      tabs.forEach((tab, index) => {
        if (tab === target) {
          toggleTabContent(index);
        }
      });
    }
  });
};

export default tabs;
