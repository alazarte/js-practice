function parseCratesInRow(row) {
    // input "[Z] [M] [P]"
    // output "ZMP"
    let crates = "";
    for(let i=0; i<row.length; i+=4) {
        crates += row[i+1];
    }
    return crates;
}

function parseOperation(line) {
    // input="move 1 from 2 to 1"
    // output=[ 1 2 1 ]
    return line.match(/[0-9]+/g).map(n => Number(n));
}

function matrixFromCrateRows(crateRows) {
    const cratesMatrix = [];
    for(let i=0; i<crateRows.length; i++) {
        for(let j=0; j<crateRows[i].length; j++) {
            if(crateRows[i][j] === " ")
                continue;

            // TODO can initialize matrix before hitting undefined?
            if (! cratesMatrix[j])
                cratesMatrix[j] = [];

            // reverse i and j
            cratesMatrix[j][i] = crateRows[i][j];
        }
    }
    return cratesMatrix;
}

function popn(arr, n) {
    return arr.splice(arr.length - n, n);
}

function performOperations(matrix, operations) {
    for(const op of operations) {
        // op = move from to
        const crates = popn(matrix[op[1]-1], op[0]);
        matrix[op[2]-1].push(...crates);
    }
}

function parseInputToCratesAndOperations(inputText, crateRows, operationRows) {
    for(line of inputText.split("\n")) {
        // a crate row
        if (/\[[A-Z]\]/.test(line)) {
            crateRows.push(parseCratesInRow(line));
        }
        // an operation
        else if (/^move /.test(line)) {
            operationRows.push(parseOperation(line));
        }
    }

}

function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    const crateRows = [];
    const operationRows = [];

    // TODO not clear that is modifying crateRows and operationRows
    parseInputToCratesAndOperations(inputText, crateRows, operationRows);

    // need to reverse to create arrays properly
    crateRows.reverse();

    crateMatrix = matrixFromCrateRows(crateRows);

    performOperations(crateMatrix, operationRows);

    const result = [];
    for(row of crateMatrix) {
        result.push(row.pop());
    }

    outputDiv.value = result.join("");
}
