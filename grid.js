const container = document.getElementById("container");
const resetButton = document.getElementById("reset-button");
let currentMode = "default";

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}
function createGrid(size) {
    container.innerHTML = "";

    const squareSize = 800 / size;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.opacity = 0;

        square.addEventListener("mouseover", () => {
            if (currentMode === "default") {
                square.style.backgroundColor = "rgb(100, 150, 55)";
                square.style.opacity = "1";
            } else if (currentMode === "random") {
                square.style.backgroundColor = getRandomRGB();
                square.style.opacity = "1";
            } else if (currentMode === "progressiveDarkening") {
                if (!square.dataset.opacity) square.dataset.opacity = 0.1;
                else square.dataset.opacity = Math.min(parseFloat(square.dataset.opacity) + 0.1, 1);
                square.style.backgroundColor = "rgb(75, 3, 242)";
                square.style.opacity = square.dataset.opacity;
            }
        });
        container.appendChild(square);
    }
}

document.getElementById("defaultMode").addEventListener("click", () => currentMode = "default");
document.getElementById("randomMode").addEventListener("click", () => currentMode = "random");
document.getElementById("progressiveDarkeningMode").addEventListener("click", () => currentMode = "progressiveDarkening");

createGrid(16);

resetButton.addEventListener("click", () => {
    let newSize = prompt("Enter new grid size (maximum 100):");
    newSize = parseInt(newSize);

    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert("Please enter a number between 1 and 100!");
    }
});
