const checkDiv = document.getElementById("checkboxes");
const table = document.createElement("table");
const checkboxes = generateCheckboxes();

/*
 * checkbox conditions:
 * read and write can be checked
 * if delete is checked, then both read and write are checked too
 * loop add tr
 * 3 times add td with checkbox
 *
 * checkbox object and functions
 *  master prop
 *  children []
 *
 * onclick()
 *  if master, all children same checked
 *  if not master, check:
 *   if all children checked, check master
 *   else, uncheck master
 */

function generateTable() {
    tr = headerRow(["Read", "Write", "Delete"]);
    table.appendChild(tr);

    rows = tableBody();
    for (row of rows) {
        table.appendChild(row);
    }
}

function headerRow(headers) {
    const tr = document.createElement("tr");

    for (header of headers) {
        const th = document.createElement("th");
        th.innerText = header;
        tr.appendChild(th);
    }

    return tr;
}

function handleClick(idx) {
    return function(event) {
        if (checkboxes[idx].isMaster) {
            for(let i=2; i > 0; i--) {
                checkboxes[idx-i].checked = event.target.checked;
            }
        }
    }
}

function generateCheckboxes() {
    const checks = [];
    let childs = [];

    for (let i=0; i<9; i++) {
        // mult of 3 are masters
        const c = document.createElement("input");
        c.type = "checkbox";

        c.isMaster = (i+1) % 3 === 0;
        c.onclick = handleClick(i);

        checks.push(c);
    }

    return checks;
}

function tableBody() {
    const rows = [];

    // master checks all checks
    const masterColIndex = 3;

    for (let y=0; y<3; y++) {
        const tr = document.createElement("tr");
        for (let x=0; x<3; x++) {
            const td = document.createElement("td");

            td.appendChild(checkboxes[x + (y*3)]);
            tr.appendChild(td);
        }
        rows.push(tr);
    }

    return rows;
}

generateTable();
checkDiv.appendChild(table);
