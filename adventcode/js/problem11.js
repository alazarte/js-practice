
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


// the actual problem
function handleSubmit() {
    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    // TODO: parse from input instead
    const monkeys = [
        {
            items: [79, 98],
            operation: "new = old * 19",
            test: {
              divisible: 23,
              true: 2,
              false: 3,
              },
            inspections: 0,
          },
          {
            items: [54, 65, 75, 74],
            operation: "new = old + 6",
            test: {
              divisible: 19,
              true: 2,
              false: 0,
              },
            inspections: 0,
          },
          {
            items: [79, 60, 97],
            operation: "new = old * old",
            test: {
              divisible: 13,
              true: 1,
              false: 3,
              },
            inspections: 0,
          },
          {
            items: [74],
            operation: "new = old + 3",
            test: {
              divisible: 17,
              true: 0,
              false: 1,
              },
            inspections: 0,
          }
    ];

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
