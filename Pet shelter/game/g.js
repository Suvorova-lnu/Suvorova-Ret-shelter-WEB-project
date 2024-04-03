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

    // Score
    let score = 0;
    const scoreElement = document.getElementById("scoreValue");

    // Top scores
    const topList = document.getElementById("topList");
    const worstList = document.getElementById("worstList");

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
            score++;
            scoreElement.textContent = score;
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
        checkScore();
    }

    // Restart button
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.addEventListener("click", function() {
        document.location.reload();
    });

    // Check score and update top scores
    function checkScore() {
        const topScores = JSON.parse(localStorage.getItem("topScores")) || [];
        const worstScores = JSON.parse(localStorage.getItem("worstScores")) || [];
        if (topScores.length < 3 || score > topScores[topScores.length - 1] || !topScores[2]) {
            topScores.push(score);
            topScores.sort((a, b) => b - a);
            topScores.splice(3);
            localStorage.setItem("topScores", JSON.stringify(topScores));
            updateScoreList(topList, topScores);
        }
        if (worstScores.length < 3 || score < worstScores[worstScores.length - 1] || !worstScores[2]) {
            worstScores.push(score);
            worstScores.sort((a, b) => a - b);
            worstScores.splice(3);
            localStorage.setItem("worstScores", JSON.stringify(worstScores));
            updateScoreList(worstList, worstScores);
        }
        updateScoreList(topList, topScores);
        updateScoreList(worstList, worstScores);
    }

    // Update score list on page
    function updateScoreList(listElement, scores) {
        listElement.innerHTML = "";
        scores.forEach((score, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}. ${score}`;
            listElement.appendChild(li);
        });
    }

    // Game loop interval
    const interval = setInterval(draw, 10);

    // Speed up ball after each collision
    function increaseSpeed() {
        dx += (dx > 0) ? 0.1 : -0.1;
        dy += (dy > 0) ? 0.1 : -0.1;
    }
    const resetBtn = document.getElementById("resetBtn");
});
