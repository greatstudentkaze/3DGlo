const smoothScrollBy = scrollTarget => {
  scrollBy({
    top: scrollTarget.getBoundingClientRect().top,
    behavior: 'smooth'
  });
};

export default smoothScrollBy;
