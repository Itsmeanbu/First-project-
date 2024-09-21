const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let currentPlayer = 'X';
let gameActive = true;

function startGame() {
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x');
    cell.classList.remove('o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  currentPlayer = 'X'; // Start with player X
  gameActive = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = currentPlayer === 'X' ? 'x' : 'o';
  
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false, currentPlayer);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function endGame(draw, winner) {
  gameActive = false;
  if (draw) {
    winnerMessage.textContent = `It's a Draw!`;
  } else {
    winnerMessage.textContent = `${winner === 'X' ? "X's" : "O's"} Wins!`;
  }
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function placeMark(cell, currentClass) {
  cell.textContent = currentPlayer;
  cell.classList.add(currentClass);
}

function swapTurns() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

restartButton.addEventListener('click', startGame);

startGame();
