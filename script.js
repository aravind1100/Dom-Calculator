//Creating h1 tag with ID title

function create(tag, id, className, content) {
  const create = document.createElement(tag);
  create.id = id;
  create.className = className;
  create.textContent = content;
  return create;
}

const h1 = create("h1", "title", "text-center m-3", "Calculator");
const p = create(
  "p",
  "description",
  "text-center m-3",
  "This calculator is made using the DOM"
);
document.body.append(h1, p);

//Create a Calculator div
const calculator = document.createElement("div");
calculator.id = "calculator";
calculator.setAttribute("class", "container");
document.body.append(calculator);

// Create calculator display
const display = document.createElement("input");
display.id = "result";
display.classList.add("form-control", "mb-3");
display.setAttribute("placeholder", "0");
display.readOnly = true;
calculator.appendChild(display);

// Create buttons array
const buttons = [
  ["C", "\u232b", "%", "*"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", "00", ".", "="],
];

// Create buttons and add event listeners
buttons.forEach((row) => {
  const buttonRow = document.createElement("div");
  buttonRow.classList.add("row", "mb-4");
  row.forEach((value) => {
    const buttonCol = document.createElement("div");
    // if (value === "0") {
    //   buttonCol.classList.add("col-3");
    // } else if (value === "00") {
    //   buttonCol.classList.add("col-3");
    // } else if (value === "=") {
    //   buttonCol.classList.add("col-6");
    // } else {}
    buttonCol.classList.add("col");

    const button = document.createElement("button");
    button.classList.add("btn", "btn-block");
    if (value === "C") {
      button.id = "clear";
    } else if (value === "=") {
      button.id = "equal";
    } else if (value === "+") {
      button.id = "add";
    } else if (value === "-") {
      button.id = "subtract";
    } else {
      button.id = value;
    }
    if (value === "\u232b") {
      button.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i>`;
    } else if (value === "*") {
      button.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    } else {
      button.textContent = value;
    }
    button.addEventListener("click", function () {
      if (value === "C") {
        clearDisplay();
      } else if (value === "=") {
        calculate();
      } else if (value === "\u232b") {
        backspace();
      } else {
        appendToDisplay(value);
      }
    });
    buttonCol.appendChild(button);
    buttonRow.appendChild(buttonCol);
  });
  calculator.appendChild(buttonRow);
});

// Function to append value to display
function appendToDisplay(value) {
  document.getElementById("result").value += value;
}

// Function to clear display
function clearDisplay() {
  document.getElementById("result").value = "";
}

function backspace() {
  var display = document.getElementById("result");
  display.value = display.value.slice(0, -1);
}

// Function to calculate result
function calculate() {
  let displayValue = document.getElementById("result").value;
  try{
    let resultFinal = eval(displayValue);
    document.getElementById("result").value = resultFinal;
  }
  catch(err){
    clearDisplay();
    document.getElementById("result").value = "Error"
  }
  
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("keydown", (event) => {
    const ele = event.key;
    const numbers = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "+",
      "-",
      "/",
      "*",
      ".",
    ];
    const operators = ["=","Enter","NumpadEnter","Backspace","Escape"]
    if (numbers.includes(ele)) {
      appendToDisplay(ele);
    }
    if (ele === "=" || ele === "Enter" || ele === "NumpadEnter") {
      calculate();
    }
    if (ele === "Backspace") {
      backspace();
    }
    if (ele === "Escape") {
      clearDisplay();
    }
    if(numbers.includes(ele) === false && operators.includes(ele) === false  ){
      alert("Only numbers are allowed")
    }
  });
});
