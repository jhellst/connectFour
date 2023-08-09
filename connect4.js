"use strict";

// Useful functions

// makeBoard() -> to generate gameboard

// playGame() -> to start a game of connect 4 with a new board

// playTurn() -> controller function
// 1) addPiece() -> to add a piece as a turn
// 2) validateWin() -> After a turn is played, checks the gameBoard for a connect 4
// 3) determineTurn() -> records whose turn it is (switches P1/P2 each time)


/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  board = [];
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {

    const row = [];
    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
      row.push(null);
    }

    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() { // consider renaming to something like "makeResponsiveTopRow()"
  const htmlBoard = document.getElementById('board');

  // Creating a top element in the DOM and setting ID attribute
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // TODO: Create the header element based on the number of columns, set ID
  // attribute, and add an event listener.
  // Appends the full responsive row to the HTMLboard.
  for (let headColumnIndex = 0; headColumnIndex < WIDTH; headColumnIndex++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${headColumnIndex}`); // adds id for top-columnIndex
    headCell.addEventListener("click", handleClick); // adds event listener for click on tr
    top.append(headCell);
  }
  debugger;
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
    // TODO: Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");

    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");
      // TODO: add an id, c-y-x, to the above table cell element
      cell.setAttribute("id", `c-${rowIndex}-${columnIndex}`)
      // you'll use this later, so make sure you use c-y-x

      // TODO: append the table cell to the table row
      row.append(cell);
    }
    // TODO: append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) { // given a column, find the specific row index the piece will be played in
  // TODO: write the real version of this, rather than always returning 5
  return 5;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // make sure to

  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {

    // TODO: Check four cells to see if they're all legal & all color of current
    // player

  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert;
      let diagDL;
      let diagDR;

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
