
const cells = [...document.querySelectorAll("#board .cell")];
const buttons = document.querySelectorAll(".dice button");
const displays = document.querySelectorAll(".dicedisplay");

// Example snake and ladder connections.
// Change these pairs to match your board.
const snakes = {
    99: 11,
    95: 63,
    62: 19
};

const ladders = {
    9: 92,
    15: 43,
    56: 74
};

let positions = [1, 1];

function showPlayers() {
    cells.forEach(cell => {
        cell.querySelectorAll(".player-token").forEach(token => token.remove());
    });

    positions.forEach((position, playerIndex) => {
        const cell = cells.find(
            cell => Number(cell.textContent.trim()) === position
        );

        if (cell) {
            const token = document.createElement("span");
            token.className = "player-token";
            token.textContent = ` P${playerIndex + 1}`;
            token.style.color = playerIndex === 0 ? "blue" : "green";
            token.style.fontWeight = "bold";
            cell.appendChild(token);
        }
    });
}

buttons.forEach((button, playerIndex) => {
    button.addEventListener("click", function () {
        if (positions[playerIndex] === 100) {
            alert(`Player ${playerIndex + 1} has already won!`);
            return;
        }

        const dice = Math.floor(Math.random() * 6) + 1;
        displays[playerIndex].textContent = dice;

        let nextPosition = positions[playerIndex] + dice;

        if (nextPosition > 100) {
            return; // Must roll the exact number to reach 100
        }

        // Red cell: snake, move down.
        if (snakes[nextPosition] !== undefined) {
            alert(`Snake! ${nextPosition} → ${snakes[nextPosition]}`);
            nextPosition = snakes[nextPosition];
        }
        // Gray cell: ladder, move up.
        else if (ladders[nextPosition] !== undefined) {
            alert(`Ladder! ${nextPosition} → ${ladders[nextPosition]}`);
            nextPosition = ladders[nextPosition];
        }

        positions[playerIndex] = nextPosition;
        showPlayers();

        if (nextPosition === 100) {
            alert(`Player ${playerIndex + 1} wins!`);
        }
    });
});

showPlayers();
