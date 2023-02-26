const defaultThingsKey = document.getElementById("thingsSelect").value;
const divThings = document.getElementById("things");

let currentThings = [];

// TODO the only function that doesn't access things directly
// needs an argument when filtering
function render(things) {
    divThings.innerHTML = "";
    for (thing of things) {
        const thingStr = thing + " <br />";
        divThings.innerHTML += thingStr;
    }
}

function filterThings() {
    const filter = document.getElementById("input").value;
    const filtered = currentThings.filter( 
        t => String(t).toLowerCase().search(filter) !== -1);
    render(filtered);
}

function changeThings(event) {
    setCurrentThingsByKey(event.target.value);
    render(currentThings);
}

function setCurrentThingsByKey(key) {
    if (key === "movies") {
        currentThings = MOVIES;
    } else if (key === "books") {
        currentThings = BOOKS;
    } else if (key === "fruits") {
        currentThings = FRUITS;
    }
}

setCurrentThingsByKey(defaultThingsKey)
render(currentThings);
