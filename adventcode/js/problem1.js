function handleSubmit() {
    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    let currentCal = 0;
    let allCals = [];

    for (let line of input.split("\n")) {
        if (line === "") {
            allCals.push(Number(currentCal));
            currentCal = 0;
            continue;
        }
        currentCal += Number(line);
    }
    if (currentCal !== 0) {
        allCals.push(Number(currentCal));
    }

    outputDiv.value = allCals
        .sort(function(a,b){return b-a;})
        .slice(0,3)
        .reduce((acc, val) => {return acc+val;});
}
