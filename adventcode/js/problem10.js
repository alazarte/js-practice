function getPixel(X, index) {
    if (index >= X-1 && index <= X+1) {
        return "#";
    }
    return ".";
}

function tick(machine) {
    machine.tick++;

    let currentInstruction = undefined;
    if (machine.instructions.length > machine.instructionIdx) {
        currentInstruction = machine.instructions[machine.instructionIdx];
    }

    if (machine.tick === 20 || (machine.tick - 20) % 40 === 0) {
        machine.signal += machine.tick * machine.X;
    }

    if (machine.CRTPixelIndex > 39) {
        machine.CRTPixelIndex = 0;
        machine.CRTOutput += "\n";
    }
    machine.CRTOutput += getPixel(machine.X, machine.CRTPixelIndex);
    machine.CRTPixelIndex += 1;


    operate(machine, currentInstruction);

    if (!currentInstruction && machine.tmpX.length === 0) {
        return false;
    }

    return true;
}

function operate(machine, instruction) {
    if(machine.tmpX.length > 0) {
        machine.X += machine.tmpX.pop();
        machine.instructionIdx++;

        // return to skip pushing to tmp during processing current addx
        return;
    }

    const r = /addx ([0-9-]+)/;
    const m = r.exec(instruction);
    if (m) {
        machine.tmpX.push(Number(m[1]));
        return;
    }

    // if instruction not recognized, skip
    machine.instructionIdx++;
}

function load(machine, input) {
    machine.instructions = input.split("\n");
    const rop = /noop|addx/;
    const filter = machine.instructions.filter(i => rop.test(i));
    machine.instructions = filter;
}

function handleSubmit() {
    const machine = {
        instructionIdx: 0,
        instructions: [],
        tick: 0,
        X: 1,
        tmpX: [],
        signal: 0,
        CRTOutput: "",
        CRTPixelIndex: 0,
    };

    const input = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");

    load(machine, input);

    const maxloops = 1000;
    let i = 0;
    while(tick(machine)) {
        console.log(".");
        if (i++ > maxloops) {
            break;
        }
    }

    // console.log(machine.CRTOutput);
    outputDiv.value = JSON.stringify(machine, null, 2);
    outputDiv.value += "\n";
    outputDiv.value += machine.CRTOutput;
}

// tick1: [ noop __ noop    ]
// tick2: [ addx __ sleep 1 ]
// tick3: [ ____ __ addx    ]