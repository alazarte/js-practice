document.getElementById("submitBtn").
  addEventListener("click", handleClick);

let FG_COLOR = "#ffffff";
let ADD_COLOR_FG = false;

let ALL_LABELS = [];

const canvasHistory = document.getElementById("canvasHistory");
const colors = new Map();
const errorDiv = document.getElementById("error");

function validColor(color) {
  return /^#[a-fA-F0-9]{3,6}$/.test(color);
}

function handleClick() {
  const color = colorFromInput("bannerColor");
  if (! color) {
    return;
  }

  if(colors.get(color)) {
    return;
  }

  appendColor(color);
  colors.set(color, true);
}

function appendColor(hexColor) {
  const canvas = document.createElement("div");
  canvas.className = "canvas";

  const p = document.createElement("p");
  p.className = "hexText";
  p.innerText = hexColor;

  if (ADD_COLOR_FG) {
    canvas.style.backgroundColor = FG_COLOR;
    p.style.color = hexColor;
  } else {
    canvas.style.backgroundColor = hexColor;
    p.style.color = FG_COLOR;
  }

  canvas.appendChild(p);
  canvasHistory.prepend(canvas);
}

function switchColorsCanvas() {
  ADD_COLOR_FG = !ADD_COLOR_FG;

  for (canvas of canvasHistory.children) {
    const p = canvas.getElementsByTagName("p")[0]
    const bgColor = canvas.style.backgroundColor;
    canvas.style.backgroundColor = p.style.color;
    p.style.color = bgColor;
  }
}

function errorInput(inputId) {
  document.getElementById(inputId).style.border = "1px solid red";
  errorDiv.innerHTML = "Invalid input";
}

function colorFromInput(inputId) {
  document.getElementById(inputId).style.border = "1px solid black";
  errorDiv.innerHTML = "";

  const color = document.getElementById(inputId).value;
  if (! validColor(color)) {
    errorInput(inputId);
    return;
  }

  return color;
}

function setAsFg() {
  const color = colorFromInput("fgColor");
  if (! color) {
    console.log("no color!", color);
    return;
  }
  FG_COLOR = color;

  for (canvas of canvasHistory.children) {
    const p = canvas.getElementsByTagName("p")[0]
    p.style.color = FG_COLOR;
  }
}

function randomColor() {
  let hexColor = "#";
  for (let i=0; i<6; i++) {
    hexColor += Math.floor(Math.random() * 16).toString(16);
  }
  appendColor(hexColor);
  colors.set(hexColor, true);
}
