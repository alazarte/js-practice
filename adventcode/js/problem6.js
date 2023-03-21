function findRepeatedChar(s) {
    for(let i=0; i<s.length-1; i++) {
        for(let j=i+1; j<s.length; j++) {
            if (s[i] === s[j]) {
                return i;
            }
        }
    }
    return -1;
}

function getMarkerAfterNChars(line, nchars) {
    for(let i=0; i<line.length-nchars; i++) {
        // offset of first char repeated in substr
        const offset = findRepeatedChar(line.substr(i, nchars));
        if (offset === -1) {
            return i + nchars;
        }
        i=i+offset;
    }
    return -1;
}

function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    const markers = [];

    for(line of inputText.split("\n")) {
        if(line === "") {
            continue;
        }

        const marker = getMarkerAfterNChars(line, 14);
        if (marker === -1)
            continue;

        markers.push(marker);
    }

    outputDiv.value = markers.join(" ");
}
