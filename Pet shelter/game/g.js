document.addEventListener("DOMContentLoaded", function() {
    // Canvas
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Ball
    let ballRadius = 10;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 1;
    let dy = -1;

    // Paddle
    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

    // Controls
    let rightPressed = false;
    let leftPressed = false;

    // Game loop
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        x += dx;
        y += dy;

        // Ball collision detection with walls
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
            increaseSpeed();
        }
        if (y + dy < ballRadius) {
            dy = -dy;
            increaseSpeed();
        } else if (y + dy > canvas.height - ballRadius) {
            gameOver();
        }

        // Paddle collision detection
        if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - paddleHeight - ballRadius) {
            dy = -dy;
            increaseSpeed();
        }

        // Move paddle
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
    }

    // Ball drawing function
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Paddle drawing function
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    // Key event listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }

    // Game over function
    function gameOver() {
        clearInterval(interval);
    }

    // Restart button
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", function() {
        document.location.reload();
    });

    // Game loop interval
    const interval = setInterval(draw, 10);

    // Speed up ball after each collision
    function increaseSpeed() {
        dx += (dx > 0) ? 0.1 : -0.1;
        dy += (dy > 0) ? 0.1 : -0.1;
    }
});

