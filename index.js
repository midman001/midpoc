
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    // Ensure the board exists
    if (!board) {
        console.error("Board element not found!");
        return;
    }

    // Function to create the game board
    function createBoard() {
        for (let i = 0; i < 30; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.innerText = i + 1;
            board.appendChild(square);
        }
    }

    // Render the board
    createBoard();

    console.log("Board initialized with squares.");
});
