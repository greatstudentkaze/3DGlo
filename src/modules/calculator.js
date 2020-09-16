const calculator = (price = 100) => {
  const calcBlock = document.querySelector('.calc-block'),
    inputType = calcBlock.querySelector('.calc-type'),
    inputArea = calcBlock.querySelector('.calc-square'),
    inputAmount = calcBlock.querySelector('.calc-count'),
    inputDays = calcBlock.querySelector('.calc-day'),
    totalCost = document.getElementById('total');

  const calcCost = () => {
    let total = 0,
      amountValue = 1,
      daysValue = 1;

    const typeValue = inputType.options[inputType.selectedIndex].value,
      areaValue = +inputArea.value;

    if (inputAmount.value > 1) {
      amountValue += (inputAmount.value - 1) / 10;
    }

    if (inputDays.value && inputDays.value < 5) {
      daysValue *= 2;
    } else if (inputDays.value && inputDays.value < 10) {
      daysValue *= 1.5;
    }

    if (typeValue && areaValue) {
      total = price * typeValue * areaValue * amountValue * daysValue;
    }

    animate({
      duration: 500,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        totalCost.textContent = Math.round(progress * total);
      }
    });
  };

  calcBlock.addEventListener('input', evt => {
    const target = evt.target;

    if (target.matches('select') || target.matches('input')) {
      if (target.matches('input')) target.value = target.value.replace(/\D/g, '');
      calcCost();
    }
  });

};
