
// splits string of simple math operation to array with numbers and operations
// example:
// input: 2 + 2
// ouput [ [2,2], [+] ]
function numbersAndOps(s) {
    const numbers = [];
    const ops = [];
    let number = "";

    for (let i=0; i<s.length; i++) {
        if (/[0-9]/.test(s[i])) {
            number += s[i];
        } else if (/[-+*/]/.test(s[i])) {
            if (number != "") {
                numbers.push(Number(number));
                number = "";
            }
            ops.push(s[i]);
        }
    }

    if (number != "") {
        numbers.push(Number(number));
        number = "";
    }

    return [ numbers, ops ];
}

function evalOp(s) {
    // 1 + 2 * 3 / 4
    // [ 1 2 3 4 ]
    // [ + * / ]
    // op => numbers
    // 1 => 1 and 2
    // 0 => 0 and 1
    [ numbers, ops ] = numbersAndOps(s);

    for(let i=0; i<ops.length; i++) {
        if(! /[*/]/.test(ops[i])) {
            continue;
        }

        const a = numbers.splice(i, 1)[0];
        const b = numbers.splice(i, 1)[0];
        const op = ops.splice(i, 1)[0];

        switch (op) {
            case "*":
                numbers.splice(i, 0, a*b);
                break;
            case "/":
                numbers.splice(i, 0, a/b);
                break;
        }

        // found a valid operation, array shifted
        i--;
    }

    while(ops.length > 0) {
        const a = numbers.shift();
        const b = numbers.shift();
        const op = ops.shift();

        switch (op) {
            case "+":
                numbers = [a+b, ...numbers];
                break;
            case "-":
                numbers = [a-b, ...numbers];
                break;
        }
    }

    return numbers;
}

function parseItems(line) {
    const r = /[0-9]+/g;
    const items = [];
    while(m = r.exec(line)) {
        items.push(m[0]);
    }

    return items;
}

function parseInput(text) {
    const monkeys = [];
    lines = text.split("\n");
    for (let i=0; i<lines.length; i+=7) {
        let monkey = {};
        monkey.items = parseItems(lines[i+1]);
        monkey.operation = lines[i+2].split(":")[1].trim();
        monkey.test = {};
        tests = parseItems(lines.slice(i+3, i+5));
        monkey.test.divisible = parseItems(lines[i+3])[0];
        monkey.test.true = parseItems(lines[i+4])[0];
        monkey.test.false = parseItems(lines[i+5])[0];
        monkey.inspections = 0;
        monkeys.push(monkey);
    }

    return monkeys;
}

// the actual problem
function handleSubmit() {
    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    monkeys = parseInput(input);

    let supermod = 1;
    for(let monkey of monkeys) {
        supermod *= monkey.test.divisible;
    }

    for (let i=0; i<10000; i++) {
        for (let monkey of monkeys) {
            let itemIndex = 0; // TODO: remove this?
            while (monkey.items.length > 0) {
                let originalWorry = monkey.items[itemIndex];

                const op = monkey.operation.replace(/old/g, originalWorry % supermod);
                let finalWorry = Math.trunc(evalOp(op));

                let monkeyIndex = monkey.test[finalWorry % monkey.test.divisible === 0];
                monkeys[monkeyIndex].items.push(finalWorry);
                monkey.items.splice(monkey.items.indexOf(originalWorry), 1);

                monkey.inspections++;
           }
        }
    }

    const inspections = monkeys.map(m => m.inspections);
    console.log("inspections", inspections);

    inspections.sort((a,b) => {
        return a-b;
    });
    console.log("sorted", inspections);

    const first = inspections.pop();
    const second = inspections.pop();
    console.log("inspections", inspections, first, second);

    outputDiv.value = "inspection: " + (first * second) + "\n\n";
    outputDiv.value += JSON.stringify(monkeys, null, 2);
}
