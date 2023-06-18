/*----- constants -----*/
const marks = {
  0: '',
  1: 'X',
  '-1': 'O',
};
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- state variables -----*/
let board; // array of 3 colomn arrays
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1; 'T' tie

/*----- cached elements  -----*/
const messageEl = document.querySelector('h1');
const turnMsg = document.querySelector('p');
const playAgainBtn = document.querySelector('button');
const boardEls = document.querySelectorAll('div');
console.log(boardEls);

/*----- event listeners -----*/
boardEls.forEach(function (cell) {
  cell.addEventListener('click', play, { once: true });
});
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();

// Initialize all state, then call render()
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 1;
  winner = null;
  //   render();
}

function play(e) {
  console.log('clicked');
  const cell = e.target;
  //   console.log(cell);

  if (turn === 0) return;
  turn *= -1;
  //   console.log(turn);

  messageEl.style.display = 'none';
  checkWin(turn);
  renderBoard(cell, turn);
}

function checkWin(turn) {
    return winningCombinations.
}

// function render() {
//   renderBoard();
//   renderMessage();
//   renderControls();
// }

function renderBoard(cell, turn) {
  if (turn === 1) {
    cell.innerText = marks['1'];
    cell.classList.add('X');
    turnMsg.classList.add('turn');
    turnMsg.innerHTML = `<span style="color: #4763ff">${marks['-1']}</span>'s Turn`;
  } else if (turn === -1) {
    cell.innerText = marks['-1'];
    cell.classList.add('O');
    turnMsg.classList.add('turn');
    turnMsg.innerHTML = `<span style="color: #cf262d">${marks['1']}</span>'s Turn`;
  }
}

function renderMessage() {
  if (winner === 'T') {
    messageEl.innerText = "It's a Tie 😲";
  } else if (winner) {
    messageEl.innerHTML = `${marks[winner]} Won!`;
  } else {
    messageEl.innerHTML = `${marks[turn]} Won!`;
  }
}
