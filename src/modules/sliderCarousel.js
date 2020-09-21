class SliderCarousel {
  constructor({
    wrapper, slideList, togglePrev, toggleNext,
    position = 0,
    slidesNumber = 4,
    infinity = false,
    responsive = []
  }) {
    this.wrapper = document.querySelector(wrapper);
    this.slideList = document.querySelector(slideList);
    this.slides = this.slideList.children;
    this.togglePrev = document.querySelector(togglePrev);
    this.toggleNext = document.querySelector(toggleNext);
    this.slidesNumber = slidesNumber;

    this.options = {
      position,
      maxPosition: this.slides.length - this.slidesNumber,
      slideWidth: Math.floor(100 / this.slidesNumber),
      infinity
    };
    this.responsive = responsive;
  }

  init() {
    this.addClasses();
  }

  addClasses() {
    this.wrapper.classList.add('gsk-slider');
    this.slideList.classList.add('gsk-slider__list');
    [...this.slides].forEach(slide => slide.classList.add('gsk-slider__item'));
  }
}

export default SliderCarousel;
