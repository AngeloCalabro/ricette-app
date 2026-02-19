function addIngredient() {
    const container = document.getElementById("ingredientsList");

    const div = document.createElement("div");
    div.className = "ingredient";

    div.innerHTML = `
        <input type="text" placeholder="Nome ingrediente">
        <input type="number" placeholder="Quantità" min="0" step="any">
        <select>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="L">L</option>
            <option value="cucchiai">cucchiai</option>
            <option value="cucchiaini">cucchiaini</option>
            <option value="pz">pezzi</option>
        </select>
        <button onclick="deleteIngredient(this)">❌</button>
    `;

    container.appendChild(div);
}

// Cancella un singolo ingrediente
function deleteIngredient(button) {
    const div = button.parentElement;
    div.remove();
}

function calculate() {
    const title = document.getElementById("recipeTitle").value;
    const original = parseFloat(document.getElementById("originalServings").value);
    const newServings = parseFloat(document.getElementById("newServings").value);

    if (!title) {
        alert("Inserisci il nome della ricetta.");
        return;
    }

    if (!original || !newServings) {
        alert("Inserisci numeri validi per le persone.");
        return;
    }

    const ratio = newServings / original;
    const ingredients = document.querySelectorAll(".ingredient");

    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    ingredients.forEach(ingredient => {
        const name = ingredient.children[0].value;
        const quantity = parseFloat(ingredient.children[1].value);
        const unit = ingredient.children[2].value;

        if (name && quantity) {
            let newQuantity = quantity * ratio;

            if (unit === "kg" || unit === "L") newQuantity = newQuantity.toFixed(2);
            else if (unit === "pz") newQuantity = Math.round(newQuantity);
            else newQuantity = newQuantity.toFixed(1);

            const li = document.createElement("li");
            li.textContent = `${newQuantity} ${unit} di ${name}`;
            resultList.appendChild(li);
        }
    });

    document.getElementById("resultTitle").textContent = title;
    document.getElementById("resultServings").textContent = "Per " + newServings + " persone";
    document.getElementById("resultSection").style.display = "block";
}

function printResult() {
    window.print();
}

// Torna indietro mantenendo dati
function goBack() {
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("resultList").innerHTML = "";
}

// Reset completo
function resetAll() {
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("resultList").innerHTML = "";
    document.getElementById("ingredientsList").innerHTML = "";
    document.getElementById("recipeTitle").value = "";
    document.getElementById("originalServings").value = 4;
    document.getElementById("newServings").value = 4;
}
