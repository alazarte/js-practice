const body = document.getElementById("body");

const nProblems = 3;
const problems = ["problem1", "problem2"];

const ul = document.createElement("ul");
for (let i=1; i<=nProblems; i++) {
    const li = document.createElement("li");
    const problemName = "problem"+i;
    const problemFilepath = "problems/"+problemName+".html"

    const a = document.createElement("a");
    a.setAttribute("href", problemFilepath)
    a.innerHTML = problemName;

    li.appendChild(a);
    ul.appendChild(li);
}
body.appendChild(ul);