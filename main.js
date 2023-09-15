push = 1;
click = false;
gameMode = 0;

function onMouseDown()
{
    push = -1;
    click = true;
}
function onMouseUp()
{
    push = 1;
    click = false;
}

function resetGame()
{
    sc = 0;
    acc = 0.01;
    vel = -0.1;
    mov = 10;
    gameMode = 0;
    sen = new Array(senNum);
    for(i = 0; i < senNum; ++i)
    {
        sen[i] = height * 0.5;
    }
}

function init()
{
    senNum = 90;
    width = 360;
    height = 640;
    velmax = 8;
    velmin = -8;

    ctx = document.getElementById("canvas").getContext("2d");
    ctx.font="24px serif";

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);

    resetGame();
}

function moveGame()
{
    ++sc;
    for(i = 0; i < senNum - mov; ++i)
    {
        sen[i] = sen[i + mov];
    }
    for(i = senNum - mov; i < senNum; ++i)
    {
        vel += acc * push;
        if(vel > velmax) vel = velmax;
        if(vel < velmin) vel = velmin;
        sen[i] = sen[i - 1] + vel; 
    }

    pos = sen[senNum - 1];
    if(pos < 0) gameMode = 1;
    if(pos > height) gameMode = 1;
}

function moveGameover()
{
    if(click)
    {
        click = false;
        resetGame();
    }
}

function drawGame()
{
    ctx.beginPath();
    ctx.rect(0,0,width,height);
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.fillText("score : " + sc, 50, 24);

    ctx.moveTo(0, sen[0])
    for(i = 1; i < senNum; ++i)
    {
        ctx.lineTo(i, sen[i]);
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function drawGameOver()
{
    drawGame();
    
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 100, 300);
}

function move()
{
    switch(gameMode){
        case 0:
            moveGame();
            break;
        default:
            moveGameover();
            break;
    }
}

function draw()
{
    switch(gameMode){
        case 0:
            drawGame();
            break;
        default:
            drawGameOver();
            break;
    }
}

function gameOver()
{
    if(click)
    {
        resetGame();
        gameMode = 0;
    }
}



function update()
{
    const begin = Date.now();
    move();
    draw();
    const end = Date.now();
    setTimeout(update, 33 - (end - begin));
}

init();
update();
