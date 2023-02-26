document.getElementById("submitBtn").
    addEventListener("click", handleClick);

const canvasHistory = document.getElementById("canvasHistory");
const colors = new Map();
const errorDiv = document.getElementById("error");

function handleClick() {
    const hexColor = document.getElementById("input").value;
    // TODO 
    //  - check if str is 3 or 6
    //  - if 6 then valid hex color
    //  - if 3 then translate that to 6 so easier to parse for white or black
    //  font
    //  - also #fff and #ffffff will be repeated in the map
    if (! /^#[a-f0-9]{3,6}$/.test(hexColor)) {
        errorDiv.innerHTML = "Invalid input";
        return;
    }
    errorDiv.innerHTML = "";

    if(colors.get(hexColor)) {
        return;
    }

    appendColor(hexColor);
    colors.set(hexColor, true);
}

function appendColor(hexColor) {
    const canvas = document.createElement("div");
    canvas.className = "canvas";
    canvas.style.backgroundColor = hexColor;

    const p = document.createElement("p");
    p.className = "hexText";
    p.innerText = hexColor;
    if (/(^#[a-f])|(^#.[a-f])/.test(hexColor)) {
        p.style.color = "black";
    } else {
        p.style.color = "white";
    }

    canvas.appendChild(p);
    canvasHistory.prepend(canvas);
}
