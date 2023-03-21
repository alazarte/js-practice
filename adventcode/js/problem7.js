function parseLine(current, parents, line) {
    const rfolder = /^\$ cd ([a-z\.]+)$/;
    const rfilesize = /(^[0-9]+) .*$/;

    let match = line.match(rfolder);

    if (match) {
        if (match[1] === "..") {
            current = parents.pop();
            return [current, parents];
        }

        const newFolder = {"size": 0};
        current[match[1]] = newFolder;
        parents.push(current);
        current = newFolder;

        return [current, parents];
    }

    match = line.match(rfilesize);
    if (match) {
        current["size"] += Number(match[1]);
        for(p of parents) {
            p["size"] += Number(match[1]);
        }
        return [current, parents];
    }

    return [current, parents];
}

function sumSmallNodes(node) {
    let size = 0;
    for (child in node) {
        if (child === "size")
            continue;
        size += sumSmallNodes(node[child]);
    }
    if (node["size"] <= 100000)
        size += node["size"];
    return size;
}

function sizeList(node) {
    let sizes = [ node["size"] ];
    for (k in node) {
        if (k === "size") {
            continue;
        }
        sizes = sizes.concat(sizeList(node[k]));
    }
    return sizes;
}

function findSmallerDesired(avail, desired, list) {
    for (l of list) {
        if(avail+l >= desired) {
            return l;
        }
    }
    return -1;
}

function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    const root = {"size": 0};

    let current = root;
    let parents = [];
    for (line of inputText.split("\n")) {
        [current, parents] = parseLine(current, parents, line);
    }

    const sum = sumSmallNodes(root);

    let list = sizeList(root);
    list = list.sort(function(a, b) {
        return a - b;
    });

    let avail = 70000000 - root["size"];
    let desired = 30000000;
    const smallerSize = findSmallerDesired(avail, desired, list);

    outputDiv.value = "sum=" + sum + "\n" + "smaller=" + smallerSize;
}
