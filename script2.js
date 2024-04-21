const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let birdY = canvas.height / 2;
let velocity = 0;
const gravity = 0.5;
const jumpStrength = -8;
const birdWidth = 30;
const birdHeight = 30;
const pipeWidth = 50;
const pipeSpacing = 200;  // Adjusted for better pipe spacing
const pipeSpeed = 2;

const pipes = [];
let score = 0;

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(50, birdY, birdWidth, birdHeight);
}

function drawPipe(x, height) {
  ctx.fillStyle = 'green';
  ctx.fillRect(x, 0, pipeWidth, height);
  ctx.fillRect(x, height + pipeSpacing, pipeWidth, canvas.height - height - pipeSpacing);
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update bird position and velocity
  velocity += gravity;
  birdY += velocity;

  // Draw bird
  drawBird();

  // Draw pipes
  for (let i = 0; i < pipes.length; i++) {
    drawPipe(pipes[i].x, pipes[i].height);
    pipes[i].x -= pipeSpeed;

    // Check collision
    if (
      birdY < 0 ||
      birdY + birdHeight > canvas.height ||
      (50 < pipes[i].x + pipeWidth &&
        50 + birdWidth > pipes[i].x &&
        (birdY < pipes[i].height || birdY + birdHeight > pipes[i].height + pipeSpacing))
    ) {
      alert(`Game Over! Score: ${score}. Refresh the page to play again.`);
      resetGame();
      return;
    }

    if (pipes[i].x + pipeWidth < 0) {
      pipes.splice(i, 1);
      i--;
      // Increment score when a pipe is passed
      score++;
    }
  }

  // Display score
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function generatePipe() {
  const minHeight = 50;
  const maxHeight = canvas.height - pipeSpacing - 50;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;
  pipes.push({ x: canvas.width, height });
}

function resetGame() {
  birdY = canvas.height / 2;
  velocity = 0;
  pipes.length = 0;
  score = 0;
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    velocity = jumpStrength;
  }
});

setInterval(() => {
  draw();
  if (Math.random() < 0.01) {
    generatePipe();
  }
}, 1000 / 60);
