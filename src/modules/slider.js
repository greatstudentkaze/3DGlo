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

export default slider;
