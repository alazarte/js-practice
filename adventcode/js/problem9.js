function newValue(H, T) {
    if (H > T) {
        return H-1;
    }
    return H+1;
}

// this function assumes that both points are not close 
// points H for Head and T for Tail
function moveT(H, T) {
    const diffX = Math.abs(H.x - T.x);
    const diffY = Math.abs(H.y - T.y);

    if (diffX > 1 && diffY > 1) {
        T.x = newValue(H.x, T.x);
        T.y = newValue(H.y, T.y);
        return;
    }

    if (diffX > 1) {
        T.y = H.y;
        T.x = newValue(H.x, T.x);
        return;
    }

    if (diffY > 1) {
        T.x = H.x;
        T.y = newValue(H.y, T.y);
    }
}

function areClose(H, T) {
    closeX = Math.abs(H.x - T.x) <= 1;
    closeY = Math.abs(H.y - T.y) <= 1;
    return closeX && closeY;
}

function parseOps(line) {
    const dir = line[0];
    const n = Number(/[0-9]+/.exec(line)[0]);
    return Array(n).fill(dir);
}

function moveH(H, dir) {
    switch (dir) {
        case "U":
            H.y--;
            break;
        case "D":
            H.y++;
            break;
        case "L":
            H.x--;
            break;
        case "R":
            H.x++;
            break;
    }
    return H;
}

function drawGrid(knots, locmap) {
    const push = 20;
    const size = 500;
    let output = "";
    let n = 0;

    const coor = {};
    for(k of knots) {
        coor[String(k.x)+","+String(k.y)] = String(n++);
    }

    for(let i=0; i<size; i++) {
        for(let j=0; j<size; j++) {
            const k = String(j)+","+String(i);
            if (coor[k]) {
                output += coor[k];
            } else if (locmap[k]) {
                output += "#";
            } else {
                output += ".";
            }
        }
        output += "\n";
    }
    return output;
}

function handleSubmit() {
    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    // starting point is high to not deal with negative numbers
    // but maybe 100 is too hig
    const knots = new Array(10).fill().map(u => ({x:100, y:100}));

    const locmap = {};

    const ops = [];
    for(line of input.split("\n")) {
        if (line === "")
            continue;
        ops.push(...parseOps(line));
    }

    for(op of ops) {
        moveH(knots[0], op);
        for(let i=1; i<10; i++) {
            moveT(knots[i-1], knots[i]);
            if(i === 9) {
                locmap[String(knots[i].x)+","+String(knots[i].y)] = true;
            }
        }
    }

    outputDiv.value = Object.keys(locmap).length;
    // draw the output, also draws tail position history
    outputDiv.value = drawGrid(knots, locmap);
}
