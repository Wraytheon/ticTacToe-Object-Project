class TicTacToeGame {
  constructor() {
    this.board = document.querySelector(".board");
    this.markerSymbol = "X";
    this.cells = document.querySelectorAll(".cell");
    this.currentPlayer = "player1";
    this.playerOne = document.querySelector(".player-one");
    this.playerTwo = document.querySelector(".player-two");
    this.resultText = document.querySelector("#result-text");

    document.querySelector("#start-btn").addEventListener("click", this.showBoard.bind(this));
    this.board.addEventListener("click", this.placeMarkers.bind(this))

  }

  //*Reveal the board and highlight player 1 title
  showBoard() {
    document.querySelector(".player-one").classList.add("turn-alert");
    document.querySelector("#players-container").classList.remove("hide");
    document.querySelector("#board-container").classList.remove("hide");
  }

  playerTurns() {
    // get the current player's turn
  
    // update the turn
    if (this.currentPlayer === "player1") {
      this.playerTwo.classList.remove("turn-alert");
      this.playerOne.classList.add("turn-alert");
      this.currentPlayer = "player2";
      this.playerTwo.classList.add("turn-alert");
      this.playerOne.classList.remove("turn-alert");
    } else {
      this.playerOne.classList.remove("turn-alert");
      this.playerTwo.classList.add("turn-alert");
      this.currentPlayer = "player1";
      this.playerOne.classList.add("turn-alert");
      this.playerTwo.classList.remove("turn-alert");
    }
  
  }

  placeMarkers(event) {
    // Check if the clicked element is a cell
    if (!event.target.classList.contains("cell")) return;
  
    // Check if the clicked cell has already been clicked
    if (event.target.classList.contains("clicked")) return;
  
    // Get the ID of the clicked cell
    const clickedCellId = event.target.id;
    // Get the class of the clicked cell
    const clickedCellMarker = document.querySelector(`#${clickedCellId}-marker`);
  
    // Display the correct marker (X or O)
    document.querySelector(`#${clickedCellId}-marker`).textContent = this.markerSymbol;
  
    // Remove the 'hide' class from the marker within the clicked cell, if it exists
    if (clickedCellMarker && clickedCellMarker.classList.contains("hide")) {
      clickedCellMarker.classList.remove("hide");
    }
  
    // Add the 'clicked' class to the clicked cell
    event.target.classList.add("clicked");
  
    // Check if the current player has won
    if (this.getWinner()) {
      //!Change to 'this'?
      document.querySelector(
        "#result-text"
      ).textContent = `${this.markerSymbol} wins!`;
      return;
    }
  
    // Switch the marker symbol to the other player's symbol
    this.markerSymbol = this.markerSymbol === "X" ? "O" : "X";
  
    this.playerTurns();
  }

  getWinner() {
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
      //* Check each cell in the combination for a match with the current player's marker symbol
      for (let cellId of combo) {
        if (
          !document
            .getElementById(cellId + "-marker")
            .textContent.includes(this.markerSymbol)
        ) {
          console.log(document.getElementById(cellId + "-marker").textContent);
          hasWon = false;
          break;
        }
      }
        // If the current player has won, display a message and disable all cells
      if (hasWon) {
        // If the currentPlayer has won, display a message and disable all cells
        document.getElementById(
          "result-text"
        ).innerHTML = `${this.currentPlayer} wins`;
        this.cells.forEach((cell) => {
          cell.classList.add("clicked");
        });
        return true;
      }
    }
    return false;
  }
}

const game = new TicTacToeGame();
