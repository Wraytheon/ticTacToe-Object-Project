class TicTacToeGame {
  constructor() {
    this.start = document.querySelector("#start-btn");
    this.start.addEventListener("click", this.showBoard.bind(this));
  }

  showBoard() {
    document.querySelector(".player-one").classList.add("turn-alert");
    document.querySelector("#players-container").classList.remove("hide");
    document.querySelector("#board-container").classList.remove("hide");
  }
}

const game = new TicTacToeGame();
