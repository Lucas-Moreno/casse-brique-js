var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false; /* variable si fleche droite est pressé (true si la pagaie bouge) */
var leftPressed = false; /* variable si fleche gauche est pressé (true si la pagaie bouge) */

document.addEventListener("keydown", keyDownHandler, false); /* keydown = touche enfoncé alors keyDownHandler est appelée */
document.addEventListener("keyup", keyUpHandler, false); /* keyup = touche non enfoncé alors keyUpHandler est appelée */

function keyDownHandler(e) { /* Quand on appuie les deux touches passe a true en fonction de où l'on appuie */
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) { /* Quand on appuie les deux touches passe a false en fonction de où l'on appuie */
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) { /* si la longueur du bord bas + la direction de la balle est inférieur à la balle alors changement de sens */
      dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) { /* condition pour que le bord bas finissent en game over */
        if(x > paddleX && x < paddleX + paddleWidth) { /* condition qui permet que la pagaie ne soit pas compté comme le bord bas */
            dy = -dy;
        }
        else {
            alert("GAME OVER"); /* message de game over */
            document.location.reload(); /* reload la page */
            clearInterval(interval); /* fonction pour chrome */
        }
    }
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);