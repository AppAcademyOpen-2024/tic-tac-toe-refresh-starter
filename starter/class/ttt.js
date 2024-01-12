const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
  constructor() {
    this.playerTurn = "O";
    this.grid = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'up command', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'down command', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'left command', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'right command', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'make mark command', this.makeMark.bind(this));

    Screen.render();
  }

  makeMark() {
    const player = this.playerTurn;
    const { row, col } = this.cursor;
    const square = this.grid[row][col];

    if (square === ' ') {
      this.grid[row][col] = player;
      Screen.setGrid(row, col, player);

      if (TTT.checkWin(this.grid)) {
        TTT.endGame(player);
      }

      this.playerTurn = player === 'O' ? 'X' : 'O';
      Screen.render();
    }
  }

  static checkRows(grid) {
    let winner = false;
    if (grid[0][0] !== ' ' && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) winner = grid[0][0];
    if (grid[1][0] !== ' ' && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) winner = grid[1][0];
    if (grid[2][0] !== ' ' && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) winner = grid[2][0];

    return winner;
  }

  static checkCols(grid) {
    let winner = false;
    if (grid[0][0] !== ' ' && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) winner = grid[0][0];
    if (grid[0][1] !== ' ' && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) winner = grid[0][1];
    if (grid[0][2] !== ' ' && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) winner = grid[0][2];

    return winner;
  }

  static checkDiags(grid) {
    let winner = false;
    if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) winner = grid[0][0];
    if (grid[2][0] !== ' ' && grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) winner = grid[2][0];

    return winner;
  }

  static getEmpties(grid) {
    let empties = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === ' ') {
          empties.push(grid[i][j]);
        }
      }
    }
    return empties;
  }

  static checkWin(grid) {
    let winner = false;

    // Horizontal
    if (this.checkRows(grid)) winner = this.checkRows(grid);
    // Vertical
    if (this.checkCols(grid)) winner = this.checkCols(grid);
    // Diagonal
    if (this.checkDiags(grid)) winner = this.checkDiags(grid);
    // Tie
    const empties = this.getEmpties(grid);
    if (empties.length === 0) winner = 'T';

    return winner;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
