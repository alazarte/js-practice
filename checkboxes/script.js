let CHECKS = [];
let CHECKSMAP = new Map();

const checkboxes = document.getElementById("checkboxes");

function handleClick(event) {
    if (CHECKSMAP.has(event.target)) {
        for (checks of CHECKSMAP.get(event.target)) {
            checks.checked = event.target.checked;
        }
    } else {
        let areAllChecked = true;
        for (check of CHECKSMAP.get(event.target.master)) {
            areAllChecked &= check.checked;
        }

        event.target.master.checked = areAllChecked;
    }
}

function generateChecks(numberChecks, numberChildren) {
    for (let i=0; i<numberChecks; i++) {
        const childChecks = [];
        // render a checkbox for each children

        const masterCheck = document.createElement("input");
        masterCheck.type = "checkbox";
        masterCheck.onclick = handleClick;

        for (let j=0; j<numberChildren; j++) {
            const c = document.createElement("input");
            c.type = "checkbox";
            c.onclick = handleClick;

            c.master = masterCheck;

            childChecks.push(c);
        }

        CHECKSMAP.set(masterCheck, childChecks);
    }
}

function render(checks, children) {
    const table = document.getElementById("table");

    for (masterCheck of CHECKSMAP.keys()) {
        const tr = document.createElement("tr");
        for (childCheck of CHECKSMAP.get(masterCheck)) {
            const td = document.createElement("td");
            td.appendChild(childCheck);
            tr.appendChild(td);
        }
        const mtd = document.createElement("td");
        mtd.appendChild(masterCheck)
        tr.appendChild(mtd);
        table.appendChild(tr);
    }
}

generateChecks(3, 3);
render();
