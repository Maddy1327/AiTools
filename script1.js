const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const NUM_BRICKS_PER_ROW = 8;
const NUM_BRICK_ROWS = 6;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 5;

let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 2;
let ballSpeedY = -2;

let paddleX = (canvas.width - PADDLE_WIDTH) / 2;

const bricks = [];
let remainingBricks = NUM_BRICKS_PER_ROW * NUM_BRICK_ROWS;

for (let row = 0; row < NUM_BRICK_ROWS; row++) {
  bricks[row] = [];
  for (let col = 0; col < NUM_BRICKS_PER_ROW; col++) {
    bricks[row][col] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
    for (let row = 0; row < NUM_BRICK_ROWS; row++) {
      for (let col = 0; col < NUM_BRICKS_PER_ROW; col++) {
        if (bricks[row][col].status === 1) {
          const brickX = col * (BRICK_WIDTH + 20) + 30; // Adjusted spacing (20) between bricks
          const brickY = row * (BRICK_HEIGHT + 10) + 30; // Adjusted spacing (10) between bricks
          bricks[row][col].x = brickX;
          bricks[row][col].y = brickY;
          ctx.fillStyle = "#ff9048";
          ctx.fillRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
        }
      }
    }
  }

function collisionDetection() {
  for (let row = 0; row < NUM_BRICK_ROWS; row++) {
    for (let col = 0; col < NUM_BRICKS_PER_ROW; col++) {
      const brick = bricks[row][col];
      if (brick.status === 1) {
        if (
          ballX > brick.x &&
          ballX < brick.x + BRICK_WIDTH &&
          ballY > brick.y &&
          ballY < brick.y + BRICK_HEIGHT
        ) {
          ballSpeedY = -ballSpeedY;
          brick.status = 0;
          remainingBricks--;

          if (remainingBricks === 0) {
            // Game won
            document.getElementById("gameWon").classList.remove("hidden");
            return;
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = "#ff2e63";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.fillStyle = "#00adb5";
  ctx.fillRect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bricks
  drawBricks();

  // Draw ball
  drawBall();

  // Draw paddle
  drawPaddle();

  collisionDetection();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX < BALL_RADIUS || ballX > canvas.width - BALL_RADIUS) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY < BALL_RADIUS) {
    ballSpeedY = -ballSpeedY;
  } else if (ballY > canvas.height - BALL_RADIUS) {
    if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
      ballSpeedY = -ballSpeedY;
    } else {
      // Game over
      document.getElementById("gameOver").classList.remove("hidden");
      return;
    }
  }

  if (remainingBricks === 0) {
    // Game won
    document.getElementById("gameWon").classList.remove("hidden");
    return;
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += 7;
  } else if (event.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= 7;
  }
});

document.addEventListener("mousemove", (event) => {
  const relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - PADDLE_WIDTH / 2;
  }
});

function resetGame() {
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballSpeedX = 2;
  ballSpeedY = -2;

  for (let row = 0; row < NUM_BRICK_ROWS; row++) {
    for (let col = 0; col < NUM_BRICKS_PER_ROW; col++) {
      bricks[row][col].status = 1;
    }
  }

  remainingBricks = NUM_BRICKS_PER_ROW * NUM_BRICK_ROWS;

  document.getElementById("gameOver").classList.add("hidden");
  document.getElementById("gameWon").classList.add("hidden");

  draw();
}

draw();
