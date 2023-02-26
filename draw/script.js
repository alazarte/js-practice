let isMouseDown = false;
const canvas = document.getElementById("canvas");

canvas.addEventListener("mousedown", (event) => {
    isMouseDown = true;
    handlePoint(event);
});
canvas.addEventListener("mouseup", () => {
    isMouseDown = false;
});
canvas.addEventListener("mousemove", handlePoint);

function handlePoint(event) {
    if (! isMouseDown) {
        return;
    }

    const point = createPoint(event.x, event.y);
    canvas.appendChild(point);
}

function createPoint(x, y) {
    const point = document.createElement("div");
    point.className = "point";
    point.style.left = x;
    point.style.top = y;

    return point;
}
