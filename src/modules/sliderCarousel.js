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
    this.addStyles();

    if (this.togglePrev && this.toggleNext) {
      this.configureToggles();
    } else {
      this.addToggles();
      this.configureToggles();
    }
  }

  configureToggles() {
    console.log(123);
  }

  addClasses() {
    this.wrapper.classList.add('gsk-slider');
    this.slideList.classList.add('gsk-slider__list');
    [...this.slides].forEach(slide => slide.classList.add('gsk-slider__item'));
  }

  addStyles() {
    if (this.slidesNumber === 4) return;

    let style = document.getElementById('gsk-slider');
    if (!style) {
      style = document.createElement('style');
      style.id = 'gsk-slider';
    }

    style.textContent = `
      .gsk-slider__item {
        flex-basis: ${this.options.slideWidth}% !important;
      }
    `;

    document.head.append(style);
  }

  createToggle(type = '', textContent = '', elementClass = 'gsk-slider__toggle') {
    const toggle = document.createElement('button');
    toggle.className = `${elementClass} ${elementClass}--${type}`;
    toggle.type = 'button';
    toggle.textContent = textContent;

    return toggle;
  }

  addToggles() {
    const togglesWrapper = document.createElement('div');
    togglesWrapper.className = 'gsk-slider__toggles';

    this.togglePrev = this.createToggle('prev', 'Назад');
    this.toggleNext = this.createToggle('next', 'Вперед');

    togglesWrapper.append(this.togglePrev);
    togglesWrapper.append(this.toggleNext);

    this.wrapper.append(togglesWrapper);
  }
}

export default SliderCarousel;
