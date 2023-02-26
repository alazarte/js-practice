const HABITS_DATA = {};
const prefixUpdateInputId = "habitInput";

let HABITS_KEYS = 0;

document.getElementById("submitHabitBtn").
    addEventListener("click", handleNewHabit);

const TABLE = document.getElementById("tbody");

function render(habits) {
    TABLE.innerHTML = "";

    for (key in habits) {
        const habit = habits[key];

        const tr = document.createElement("tr");

        // TODO hmmm...
        const tds = [];
        tds.push(document.createElement("td"));
        tds.push(document.createElement("td"));
        tds.push(document.createElement("td"));

        const updateHabitBtn = document.createElement("input");
        updateHabitBtn.type = "submit";
        updateHabitBtn.value = "Update";
        updateHabitBtn.className = "habitUpdateBtn";
        updateHabitBtn.addEventListener("click", updateHabit(key));

        const habitInput = document.createElement("input");
        habitInput.id = prefixUpdateInputId + key;
        habitInput.value = habit.habit;
        habitInput.className = "habitInput";
        tds[0].appendChild(habitInput);
        tds[0].appendChild(updateHabitBtn);

        const checkInput = document.createElement("input");
        checkInput.type = "checkbox";
        checkInput.onclick = toggleCheckedHabit(key);
        checkInput.checked = habit.complete;
        checkInput.className = "habitCheckbox";
        tds[1].appendChild(checkInput);

        // TODO delete after filter doesn't work
        const delHabit = document.createElement("input");
        delHabit.type = "submit";
        delHabit.value = "Delete";
        delHabit.addEventListener("click", deleteHabit(key));
        tds[2].appendChild(delHabit);

        tr.append(...tds);

        TABLE.appendChild(tr);
    }
}

function deleteHabit(id) {
    return function() {
        delete HABITS_DATA[id];
        render(HABITS_DATA);
        sendAllHabits();
    };
}

function updateHabit(id) {
    return function() {
        const updateInput = document.getElementById(prefixUpdateInputId + id);
        HABITS_DATA[id].habit = updateInput.value;
        sendAllHabits();
    };
}

function handleFilter() {
    const filter = document.getElementById("filter").value.toLowerCase();
    const filtered = {};

    for (key in HABITS_DATA) {
        if (HABITS_DATA[key].habit.search(filter) !== -1) {
            filtered[key] = HABITS_DATA[key];
        }
    }

    render(filtered);
}

function handleNewHabit() {
    const newHabitInput = document.getElementById("inputHabit");
    const newHabit = newHabitInput.value;
    if (newHabit === "") {
        return;
    }

    // TODO hash(newHabit)
    HABITS_DATA[String(HABITS_KEYS++)] = { habit: newHabit, complete: false };
    render(HABITS_DATA);
    sendAllHabits();

    newHabitInput.value = "";
}

function toggleCheckedHabit(key) {
    return function() {
        const habit = HABITS_DATA[key];
        habit.complete = !habit.complete;
        HABITS_DATA[key] = habit;
        sendAllHabits();
    };
}

function sendAllHabits() {
    console.log("sending all habits");
    const habitsArray = [];

    $.ajax({
        type: "POST",
        url: "http://localhost:3000",
        headers: {
            "content-type": "application/json",
        },
        data: JSON.stringify(HABITS_DATA),
    })
    .done( res => {
        console.log("done");
        const ajaxOutputDiv = document.getElementById("ajaxOutput");
        ajaxOutputDiv.innerText = "Success!";
    })
    .fail( err => {
        console.log(err);
    });
}

function getAllHabits() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000",
    })
    .done( res => {
        body = JSON.parse(res);

        let biggestKey = 0;
        for (key in body) {
            HABITS_DATA[key] = body[key];
            if (key > biggestKey) {
                biggestKey = key;
            }
        }

        HABITS_KEYS = biggestKey+1;
        render(HABITS_DATA);
    })
    .fail( err => {
        console.log(err);
    });
}

getAllHabits();
