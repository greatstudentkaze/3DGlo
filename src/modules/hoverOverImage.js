const hoverOverImage = () => {
  const imageRow = document.querySelector('.command .row');

  let imageSrc;

  imageRow.addEventListener('mouseover', evt => {
    if (!evt.target.classList.contains('command__photo')) return;

    imageSrc = evt.target.src;
    evt.target.src = evt.target.dataset.img;
  });

  imageRow.addEventListener('mouseout', evt => {
    if (!evt.target.classList.contains('command__photo')) return;

    evt.target.src = imageSrc;
  });
};

export default hoverOverImage;
