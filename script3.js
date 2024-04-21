let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
  if (board[index] === '' && !checkWin()) {
    board[index] = currentPlayer;
    document.getElementById('board').children[index].innerText = currentPlayer;
    if (checkWin()) {
      document.getElementById('status').innerText = `Player ${currentPlayer} wins!`;
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('status').innerText = 'It\'s a draw!';
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWin() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const cells = document.getElementById('board').children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
  document.getElementById('status').innerText = `Player ${currentPlayer}'s turn`;
}
