function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    const size = inputText.split("\n").length;
    let output = "";
    const inputLines = inputText.split("\n");

    let visibleTrees = 0;
    let scenicScore = 0;

    for(let i=1; i<size-1; i++) {
        for(let j=1; j<size-1; j++) {
            const current = inputLines[i][j];
            let visibleEdges = [true, true, true, true];
            // keep track of how many trees can be seen from a particular
            // tree, for second part
            let treesFrom = [0,0,0,0];

            for(let k=1; k<size-1; k++) {
                // if tree no longer visible from any edge, skip; if yes then
                // check if not going past the grid; then check if there's a
                // bigger tree in either of 4 directions

                if(visibleEdges[0] && i>=k) {
                    if (inputLines[i-k][j] >= current) {
                        visibleEdges[0] = false;
                    }
                    treesFrom[0]++;
                }

                if(visibleEdges[1] && (i+k) < size) {
                    if (inputLines[i+k][j] >= current) {
                        visibleEdges[1] = false;
                    }
                    treesFrom[1]++;
                }

                if(visibleEdges[2] && j>=k) {
                    if (inputLines[i][j-k] >= current) {
                        visibleEdges[2] = false;
                    }
                    treesFrom[2]++;
                }

                if(visibleEdges[3] && (j+k) < size) {
                    if (inputLines[i][j+k] >= current) {
                        visibleEdges[3] = false;
                    }
                    treesFrom[3]++;
                }
            }

            if (visibleEdges[0] || visibleEdges[1] || visibleEdges[2] || visibleEdges[3]) {
                visibleTrees++;
            }

            let currentScenicScore = treesFrom[0] * treesFrom[1] * treesFrom[2] * treesFrom[3];
            if (currentScenicScore > scenicScore) {
                scenicScore = currentScenicScore;
            }
        }
    }

    visibleTrees += 4 * size - 4;
    output = "Visible trees: "+visibleTrees+"\n";
    output += "Scenic score: "+scenicScore;

    outputDiv.value = output;
}
