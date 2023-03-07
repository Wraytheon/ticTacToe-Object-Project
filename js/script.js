const board = document.querySelector(".board");

let markerSymbol = "X"; // Initialize the markerSymbol to "X"

// Get all cells within the board
const cells = document.querySelectorAll(".cell");

document.querySelector("#start-btn").addEventListener("click", function () {
  document.querySelector(".player-one").classList.add("turn-alert");
  document.querySelector("#players-container").classList.remove("hide");
  document.querySelector("#board-container").classList.remove("hide");
});

//* Player turns
let currentPlayer = "player1";

function playerTurns() {
  // get the current player's turn
  let playerOne = document.querySelector(".player-one");
  let playerTwo = document.querySelector(".player-two");

  // update the turn
  if (currentPlayer === "player1") {
    playerTwo.classList.remove("turn-alert");
    playerOne.classList.add("turn-alert");
    currentPlayer = "player2";
    playerTwo.classList.add("turn-alert");
    playerOne.classList.remove("turn-alert");
  } else {
    playerOne.classList.remove("turn-alert");
    playerTwo.classList.add("turn-alert");
    currentPlayer = "player1";
    playerOne.classList.add("turn-alert");
    playerTwo.classList.remove("turn-alert");
  }
  console.log(currentPlayer);

  // do something else
  // ...
}
console.log(currentPlayer);

// Add click event listener to the board
document.querySelector(".board").addEventListener("click", placeMarkers);
function placeMarkers(event) {
  // Check if the clicked element is a cell
  if (!event.target.classList.contains("cell")) return;

  // Check if the clicked cell has already been clicked
  if (event.target.classList.contains("clicked")) return;

  // Get the ID of the clicked cell
  const clickedCellId = event.target.id;
  // Get the class of the clicked cell
  const clickedCellMarker = document.querySelector(`#${clickedCellId}-marker`);

  // Display the correct marker (X or O)
  document.querySelector(`#${clickedCellId}-marker`).textContent = markerSymbol;

  // Remove the 'hide' class from the marker within the clicked cell, if it exists
  if (clickedCellMarker && clickedCellMarker.classList.contains("hide")) {
    clickedCellMarker.classList.remove("hide");
  }

  // Add the 'clicked' class to the clicked cell
  event.target.classList.add("clicked");

  // Check if the current player has won
  if (getWinner()) {
    document.querySelector(
      "#result-text"
    ).textContent = `${markerSymbol} wins!`;
    return;
  }

  // Switch the marker symbol to the other player's symbol
  markerSymbol = markerSymbol === "X" ? "O" : "X";

  playerTurns();
}

// Check if the currentPlayer has won
function getWinner() {
  // Define all winning combinations
  const winningCombos = [
    ["top-left", "top-center", "top-right"],
    ["mid-left", "mid-center", "mid-right"],
    ["bottom-left", "bottom-center", "bottom-right"],
    ["top-left", "mid-left", "bottom-left"],
    ["top-center", "mid-center", "bottom-center"],
    ["top-right", "mid-right", "bottom-right"],
    ["top-left", "mid-center", "bottom-right"],
    ["top-right", "mid-center", "bottom-left"],
  ];

  // Check if the currentPlayer has a winning combination
  for (let combo of winningCombos) {
    let hasWon = true;
    for (let cellId of combo) {
      if (
        !document
          .getElementById(cellId + "-marker")
          .textContent.includes(markerSymbol)
      ) {
        console.log(document.getElementById(cellId + "-marker").textContent);
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      // If the currentPlayer has won, display a message and disable all cells
      document.getElementById(
        "result-text"
      ).innerHTML = `${currentPlayer} wins`;
      cells.forEach((cell) => {
        cell.classList.add("clicked");
      });
      break;
    }
  }
}
