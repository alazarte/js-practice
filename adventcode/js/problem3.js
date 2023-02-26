function handleSubmit() {
    const inputText = document.getElementById("input").value;
    const outputDiv = document.getElementById("output");
    console.log(inputText);
    outputDiv.value = inputText;
}
