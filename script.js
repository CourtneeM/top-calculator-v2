const currentCalculation = [];
const operators = ['+', '-', 'x', '/'];

const calculator = {
  calculate: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
  },
  operate: function(operator, a, b) {
    switch (operator) {
      case '+':
        return this.calculate.add(Number(a), Number(b));
      case '-':
        return this.calculate.subtract(Number(a), Number(b));
      case 'x':
        return this.calculate.multiply(Number(a), Number(b));
      case '/':
        return this.calculate.divide(Number(a), Number(b));
    }
  }
}


const buttonEventHandlers = {
  addButtonListener: () => {
    const buttons = document.querySelectorAll('button');
    [...buttons].forEach(btn => btn.addEventListener('click', () => {
      const calcDisplay = document.querySelector('#calculator-display');
      let value = btn.textContent;
      switch (value) {
        case 'C':
          while (currentCalculation.length > 0) currentCalculation.pop();
          break;
        case 'DEL':
          if (currentCalculation.length > 0) {
            let modifiedValue = currentCalculation.pop();
            
            if (modifiedValue.length > 1) {
              modifiedValue = modifiedValue.split('');
              modifiedValue.pop();
            } else {
              modifiedValue = '';
            }
            
            if (modifiedValue) currentCalculation.push(modifiedValue.join(''));
          }
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (currentCalculation.length === 0 || operators.includes(currentCalculation[currentCalculation.length - 1])) {
            currentCalculation.push(value);
          } else {
            currentCalculation[currentCalculation.length - 1] += value;
          }
          break;
        case '.':
          if (currentCalculation[currentCalculation.length - 1] === String(Number(currentCalculation[currentCalculation.length - 1]))) {
            currentCalculation[currentCalculation.length - 1] += value;
          }
          break;
        case '+/-':
          if (currentCalculation[currentCalculation.length - 1] === String(Number(currentCalculation[currentCalculation.length - 1]))) {
            let modifiedValue = currentCalculation[currentCalculation.length - 1];

            if (modifiedValue > 0) currentCalculation[currentCalculation.length - 1] = String(modifiedValue - (modifiedValue * 2));
            if (modifiedValue < 0) currentCalculation[currentCalculation.length - 1] = String(Math.abs(modifiedValue));
          }
          break;
        case '+':
        case '-':
        case 'x':
        case '/':
          currentCalculation.forEach(el => {
            if (operators.includes(el)) {
              let newCalculation = calculator.operate(el, currentCalculation[0], currentCalculation[currentCalculation.length - 1]).toFixed(2);

              while (currentCalculation.length > 0) currentCalculation.pop();
              currentCalculation.push(newCalculation, value);
            }
          });
          
          if (operators.includes(value) && currentCalculation[currentCalculation.length - 1] === String(Number(currentCalculation[currentCalculation.length - 1]))) {
            currentCalculation.push(value);
          }
          break;
        case '=':
          if (currentCalculation.length === 3) {
            let [operand1, operator, operand2] = currentCalculation;
            let newCalculation = calculator.operate(operator, operand1, operand2).toFixed(2);

            while (currentCalculation.length > 0) currentCalculation.pop();
            currentCalculation.push(String(newCalculation));
          }
        }
        
        calcDisplay.textContent = currentCalculation.join(' ');
        if (currentCalculation.length === 0) calcDisplay.textContent = '0';
    }));
  },
}

buttonEventHandlers.addButtonListener();