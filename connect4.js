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
  board = []; // reset board for tracking status of game

  // Array.from() another option here
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
    const row = []; // create new row to append to board

    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {
      row.push(null); // push cell value (null) into row
    }

    board.push(row); // push complete row onto board
  }
}

/** makeHtmlBoard: make HTML table and responsive row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // Creating a top element in the DOM and setting ID attribute
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  // TODO: Create the header element based on the number of columns, set ID
  // attribute, and add an event listener.
  // Appends the full responsive row to the HTMLboard.
  for (let headColumnIndex = 0; headColumnIndex < WIDTH; headColumnIndex++) {
    const headCell = document.createElement("td");

    // adds id for top-columnIndex
    headCell.setAttribute("id", `top-${headColumnIndex}`);

    // adds event listener for click on tr
    headCell.addEventListener("click", handleClick);

    // appends cell to topRow
    top.append(headCell);
  }

  // appends full responsive top row to htmlBoard
  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {

    // Create a table row element and assign to a "row" variable
    const row = document.createElement("tr");

    for (let columnIndex = 0; columnIndex < WIDTH; columnIndex++) {

      // Create a table cell element and assign to a "cell" variable
      const cell = document.createElement("td");

      // Add an id, c-y-x, to the above table cell element
      cell.setAttribute("id", `c-${rowIndex}-${columnIndex}`)

      // Append the table cell to the table row
      row.append(cell);
    }
    // Append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(columnIndex) { // given a column, find the specific row index the piece will be played in
  // TODO: write the real version of this, rather than always returning 5
  let rowIndex = 0;
  while (rowIndex < HEIGHT) {
    if (board[rowIndex][columnIndex] === null) {
      return columnIndex;
    }
    rowIndex++;
  }
  return; // This occurs when the board column is filled
}

/** placeInTable: update DOM to place piece into HTML table of board , with class 'piece' and class p1/p2 */

function placeInTable(rowIndex, columnIndex) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.setAttribute("class", `piece p${currPlayer}`);

  // Place piece into board
  board[rowIndex][columnIndex] = currPlayer;

  // Place piece into HTMLgameBoard
  let currentHTMLCell = document.querySelector(`c-${rowIndex}-${columnIndex}`);
  currentHTMLCell.append(piece);
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
