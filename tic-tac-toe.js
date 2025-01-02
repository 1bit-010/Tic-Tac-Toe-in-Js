const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

// Winning combinations
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

// Functions
const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDiv.innerText = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusDiv.innerText = 'It\'s a tie!';
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDiv.innerText = `Player ${currentPlayer}'s turn`;
};

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const cellIndex = clickedCell.getAttribute('data-index');

  if (board[cellIndex] !== '' || !isGameActive) {
    return;
  }

  board[cellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;
  clickedCell.classList.add('taken');

  handleResultValidation();
};

const restartGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusDiv.innerText = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.innerText = '';
    cell.classList.remove('taken');
  });
};

// Event Listeners
cells.forEach((cell) => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initial setup
statusDiv.innerText = `Player ${currentPlayer}'s turn`;
