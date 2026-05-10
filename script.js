const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const puzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function generatePuzzle() {
    const board = document.getElementById("sudoku-board");
    board.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("cell");

            // Thicker borders for 3x3 boxes
            if ((row + 1) % 3 === 0) {
                input.style.borderBottom = "2px solid black";
            }
            if ((col + 1) % 3 === 0) {
                input.style.borderRight = "2px solid black";
            }

            if (puzzle[row][col] !== 0) {
                input.value = puzzle[row][col];
                input.disabled = true;
                input.classList.add("fixed");
            }

            input.dataset.row = row;
            input.dataset.col = col;

            // Allow only numbers 1-9
            input.addEventListener("input", () => {
                if (!/^[1-9]$/.test(input.value)) {
                    input.value = "";
                }
            });

            board.appendChild(input);
        }
    }

    document.getElementById("message").textContent = "";
}

function checkSolution() {
    const cells = document.querySelectorAll(".cell");
    let correct = true;

    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;

        if (parseInt(cell.value) !== solution[row][col]) {
            correct = false;
        }
    });

    const message = document.getElementById("message");

    if (correct) {
        message.textContent = "🎉 Congratulations! You solved the Sudoku!";
        message.style.color = "green";
    } else {
        message.textContent = "❌ Some cells are incorrect. Try again!";
        message.style.color = "red";
    }
}

function resetGame() {
    generatePuzzle();
}

// Load puzzle on page start
generatePuzzle();