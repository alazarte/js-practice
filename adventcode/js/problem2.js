/*
    A X: rock
    B Y: paper
    C Z: scissors

    A Y -> won
    B X -> lost
    C Z -> scissors

    map of weakness:
    A -> Y
    B -> Z
    C -> X
    X -> B
    Y -> C
    Z -> A

    shape points:
    1 rock: A X
    2 paper: B Y
    3 scissors: C Z

    outcome points:
    0 lost
    3 draw
    6 won

*/

const weakness = {
    "A": "B",
    "B": "C",
    "C": "A",
};

const outcomePoints = {
    "X": 0,
    "Y": 3,
    "Z": 6,
};

const shapePoints = {
    "A": 1,
    "B": 2,
    "C": 3,
};

function validLine(line) {
    return /[A,B,C] [X,Y,Z]/.test(line);
}

function getShapeForAction(gnomeShape, action) {
    if(action == "Z")
        return weakness[gnomeShape];
    else if(action == "X")
        return weakness[weakness[gnomeShape]];
    else
        return gnomeShape;
}

function handleSubmit() {
    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    let totalScore = 0;

    for (let line of input.split("\n")) {
        if (! validLine(line)) {
            continue;
        }

        const parts = line.split(" ");
        const gnomeShape = parts[0];
        const action = parts[1];
        const myShape = getShapeForAction(gnomeShape, action);

        totalScore += outcomePoints[action];
        totalScore += shapePoints[myShape];

    }

    outputDiv.value = totalScore;
}
