const HABITS_DATA = getHabitsData();
const prefixUpdateInputId = "habitInput";
let HABITS_KEYS = localStorage.getItem("key") ? localStorage.getItem("key") : 0;

document.getElementById("submitHabitBtn").
    addEventListener("click", handleNewHabit);

const TABLE = document.getElementById("tbody");
const NOTIF_DIV = document.getElementById("notifications");

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
        notify("Habit id=" + id + " updated!");
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
    localStorage.setItem("key", HABITS_KEYS);
    localStorage.setItem("habits", JSON.stringify(HABITS_DATA));
}

function getHabitsData() {
    const habitsJson = localStorage.getItem("habits");
    if (habitsJson === null) {
        return {};
    }

    try {
        const habits = JSON.parse(habitsJson)
        console.log(habits);
        return habits;
    } catch (e) {
        console.log("Failed to load habits: ", e);
    }

    return {};
}

function notify(msg) {
    if (NOTIF_DIV.children.length >= 5) {
        NOTIF_DIV.removeChild(NOTIF_DIV.children[0]);
    }
    const p = document.createElement("p");
    p.innerHTML = msg;

    NOTIF_DIV.appendChild(p);
}

render(HABITS_DATA);
