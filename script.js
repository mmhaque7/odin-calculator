const currentOperandDisplay = document.querySelector(".current-operand")
const digitBtn = document.querySelectorAll(".number")
const operatorBtn = document.querySelectorAll(".operator")
const equalSignBtn = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".clear")
const decimalBtn = document.querySelector(".decimal")
const deleteBtn = document.querySelector(".delete-btn")

let firstOperand = ""
let secondOperand = ""
let currentOperation = null

function handleDigitClick(digit) {
  if (currentOperation === null) {
    firstOperand += digit
    currentOperandDisplay.textContent = firstOperand
  } else {
    secondOperand += digit
    currentOperandDisplay.textContent =
      firstOperand + currentOperation + secondOperand
  }
}

function handleOperatorClick(operator) {
  if (currentOperation === null) {
    currentOperation = operator
    currentOperandDisplay.textContent = firstOperand + operator
  } else {
    // Handle multiple operators
  }
}

function handleEqualSignClick() {
  const result = operate(firstOperand, secondOperand, currentOperation)
  if (currentOperation === null || secondOperand === "") {
    // Not enough information to perform a calculation
    currentOperandDisplay.textContent = "NaN"
    return
  }
  if (Number.isInteger(result)) {
    currentOperandDisplay.textContent = result.toString()
  } else {
    currentOperandDisplay.textContent = result.toFixed(4)
  }
  firstOperand = ""
  secondOperand = ""
  currentOperation = null
}

function operate(firstOperand, secondOperand, operator) {
  firstOperand = Number(firstOperand)
  secondOperand = Number(secondOperand)
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand)
    case "-":
      return subtract(firstOperand, secondOperand)
    case "x":
      return multiply(firstOperand, secondOperand)
    case "/":
      return divide(firstOperand, secondOperand)
    default:
      return null
  }
}

function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Cannot divide by zero"
  } else return a / b
}

digitBtn.forEach((button) => {
  button.addEventListener("click", () => {
    handleDigitClick(button.textContent)
  })
})

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    handleOperatorClick(button.textContent)
  })
})

function handleClear() {
  console.log("Clear button clicked")
  firstOperand = ""
  secondOperand = ""
  currentOperation = null
  currentOperandDisplay.textContent = ""
}

function handleDecimalClick() {
  if (currentOperation === null) {
    if (firstOperand.includes(".")) {
      // Already have a decimal point
      return
    }
    firstOperand += "."
    currentOperandDisplay.textContent = firstOperand
  } else {
    if (secondOperand.includes(".")) {
      // Already have a decimal point
      return
    }
    secondOperand += "."
    currentOperandDisplay.textContent =
      firstOperand + currentOperation + secondOperand
  }
}
function handleDeleteClick() {
  if (currentOperation === null) {
    firstOperand = firstOperand.slice(0, -1)
    currentOperandDisplay.textContent = firstOperand
  } else {
    secondOperand = secondOperand.slice(0, -1)
    currentOperandDisplay.textContent =
      firstOperand + currentOperation + secondOperand
  }
}

clearBtn.addEventListener("click", handleClear)

equalSignBtn.addEventListener("click", handleEqualSignClick)
decimalBtn.addEventListener("click", handleDecimalClick)
deleteBtn.addEventListener("click", handleDeleteClick)

document.addEventListener("keydown", handleKeyDown)

function handleKeyDown(event) {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      handleDigitClick(event.key)
      break
    case "+":
    case "-":
    case "*":
    case "/":
      handleOperatorClick(event.key)
      break
    case "=":
    case "Enter":
      handleEqualSignClick()
      break
    case ".":
      handleDecimalClick()
      break
    case "Backspace":
      handleDeleteClick()
      break
    default:
      break
  }
}
