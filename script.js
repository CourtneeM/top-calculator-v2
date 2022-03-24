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
        return this.calculate.add(a, b);
      case '-':
        return this.calculate.subtract(a, b);
      case 'x':
        return this.calculate.multiply(a, b);
      case '/':
        return this.calculate.divide(a, b);
    }
  }
}

console.log(calculator.operate('/', 5, 2));