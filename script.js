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

/*----- event listeners -----*/
// function playAgain() {
boardEls.forEach(function (cell) {
  cell.addEventListener('click', play);
});
// }
playAgainBtn.addEventListener('click', init);

/*----- functions -----*/
init();
// playAgain();

// Initialize all state, then call render()
function init() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 1;
  winner = null;
  boardEls.forEach(function (cell) {
    cell.innerText = '';
    cell.classList.remove('X', 'O');
  });
  messageEl.style.display = 'block';
  messageEl.innerText = 'Start the game by clicking the game board';
  turnMsg.style.display = 'block';
  turnMsg.innerHTML = `<span style="color: #4763ff">${marks['-1']}</span> starts first😎`;
  playAgainBtn.style.visibility = 'hidden';
  render();
}

function play(e) {
  console.log('clicked');
  const cell = e.target;
  //   console.log(cell);
  if (cell.innerText != '') return;

  if (winner !== null) return;

  turn *= -1;
  //   console.log(turn);

  messageEl.style.display = 'none';
  checkWin();
  renderBoard(cell, turn);
  render();
}

function render() {
  renderBoard();
  checkWin();
  draw(boardEls);
  renderMessage(winner);
}

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

function draw() {
  const isDraw = Array.from(boardEls).every((square) => {
    return square.classList.contains('X') || square.classList.contains('O');
  });
  if (isDraw) {
    if (winner !== 1 && winner !== -1) {
      winner = 'T';
    }
  }
  renderMessage(winner);
}

function checkWin() {
  const squares = document.querySelectorAll('.square');
  let xWins;
  let oWins;
  winningCombinations.forEach((array) => {
    xWins = array.every((box) => squares[box].classList.contains('X'));
    if (xWins) {
      winner = 1;
      return;
    }
  });

  winningCombinations.forEach((array) => {
    oWins = array.every((box) => squares[box].classList.contains('O'));
    if (oWins) {
      winner = -1;
      return;
    }
  });

  renderMessage(winner);
}

function renderMessage(winner) {
  if (winner === 'T') {
    messageEl.style.display = 'block';
    messageEl.innerText = "It's a Tie 😲";
    turnMsg.style.display = 'none';
  } else if (winner === 1) {
    messageEl.style.display = 'block';
    messageEl.innerHTML = `<span style ="color:#cf262d">X</span> Won!🎉`;
    turnMsg.style.display = 'none';
  } else if (winner === -1) {
    messageEl.style.display = 'block';
    messageEl.innerHTML = `<span style ="color:#4763ff">O</span> Won!🎊`;
    turnMsg.style.display = 'none';
  }

  if (winner !== null) {
    playAgainBtn.style.visibility = 'visible';
  } else {
    playAgainBtn.style.visibility = 'hidden';
  }
}
