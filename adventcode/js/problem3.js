const lowerACode = "a".charCodeAt(0);
const nletters = "z".charCodeAt(0) - lowerACode + 1;
const upperACode = "A".charCodeAt(0);

function getPriority(c) {
    if (/[a-z]/.test(c)) {
        return c.charCodeAt(0) - lowerACode + 1;
    }
    return c.charCodeAt(0) - upperACode + 1 + nletters;
}

// TODO always finds a badge
function findBadge(group) {
    for (c of group[0]) {
        if (group[1].indexOf(c) !== -1 && group[2].indexOf(c) !== -1) {
            return c;
        }
    }
}

function splitIntoGroupsOf3(input) {
    const groups = [];
    let current = [];
    for (line of input.split("\n")) {
        if (current.length === 3) {
            groups.push(current);
            current = [];
        }
        current.push(line);
    }

    // if no newline at the last line, it won't go another cycle and parse
    // groups
    if (current.length === 3) {
        groups.push(current);
    }

    return groups;
}

function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    let total = 0;
    let groups = splitIntoGroupsOf3(inputText)
    for (group of groups) {
        console.log("processing group: ", group);
        const badge = findBadge(group);
        total += getPriority(badge);
    }

    outputDiv.value = total;
}
