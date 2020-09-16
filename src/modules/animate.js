const animate = ({ timing, draw, duration }) => {
  const start = performance.now();

  const animate = time => {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    const progress = timing(timeFraction);
    draw(progress);

    if (timeFraction < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

export default animate;
