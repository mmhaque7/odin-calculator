const currentOperandDisplay = document.querySelector(".current-operand");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;

function handleDigitClick(digit) {
  if (currentOperation === null) {
    firstOperand = "";
    secondOperand = "";
  }
  if (currentOperation === null) {
    firstOperand += digit;
  } else {
    secondOperand += digit;
  }
  currentOperandDisplay.textContent =
    currentOperation === null ? firstOperand : secondOperand;
}

function handleOperatorClick(operator) {
  if (currentOperation === null) {
    currentOperation = operator;
    const operatorSymbol = operator === "*" ? "x" : operator;
    currentOperandDisplay.textContent = operatorSymbol;
  } else {
    // Handle multiple operators
  }
}

function handleEqualSignClick() {
  const result = operate(firstOperand, secondOperand, currentOperation);
  currentOperandDisplay.textContent = result;
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function operate(firstOperand, secondOperand, operator) {
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
    default:
      return null;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero";
  } else return a / b;
}
const digitBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const equalSignBtn = document.querySelector(".equal-sign");

digitBtn.forEach((button) => {
  button.addEventListener("click", () => {
    handleDigitClick(button.textContent);
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorClick(button.textContent);
  });
});

equalSignBtn.addEventListener("click", handleEqualSignClick);
