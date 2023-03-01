function parseRange(pair) {
    return pair.split("-").map(n => { return Number(n); });
}

function rangeToString(from, to, size) {
    let s = "";
    for(let i=0; i<size; i++) {
        if (i >= from && i <= to) {
            s += i;
            continue;
        }
        s += "."
    }
    return s;
}

function pairRangeToString(pair) {
    if (pair == "")
        return;

    let line = "";
    for (p of pair) {
        const range = parseRange(p);
        line += rangeToString(range[0], range[1], 100) + " " + range[0] + "-" + range[1] + "\n";
    }
    line += "\n";
    return line;
}

function arePairContained(pair) {
    if (pair == "")
        return false;

    const ranges = [];
    for (p of pair) {
        ranges.push(...parseRange(p));
    }

    // for readability
    const [low1, high1, low2, high2] = ranges;
    if (low1 === low2 || high1 === high2)
        return true;

    // .xxxx.
    // ..xx..
    if (low1 < low2) {
        return high1 > high2;
    }
    // ..xx..
    // .xxxx.
    else if (low2 < low1) {
        return high2 > high1;
    }

    return false;
}

function arePairOverlapping(pair) {
    if (pair == "")
        return false;

    const ranges = [];
    for (p of pair) {
        ranges.push(...parseRange(p));
    }

    // for readability
    const [low1, high1, low2, high2] = ranges;
    if (low1 === low2 || high1 === high2)
        return true;

    // ....xxxxx...
    // ........xxx.
    if (low1 < low2) {
        return high1 >= low2;
    }
    // ..xx..
    // .xxxx.
    else if (low2 < low1) {
        return high2 >= low1;
    }

    return false;
}

function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    const pairs = [];
    let prettyPrint = "";
    let pairsOverlapping = 0;

    for (line of inputText.split("\n")) {
        const pair = line.split(",");
        // TODO only to print in console, both functions repeat some code
        prettyPrint += pairRangeToString(pair);
        if (arePairOverlapping(pair)) {
            pairsOverlapping++;
        }
    }
    console.log(prettyPrint);

    outputDiv.value = pairsOverlapping;
}
