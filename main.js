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
    acc = 0.02;
    vel = -0.1;
    mov = 5;
    gameMode = 0;
    sen = new Array(senNum);
    for(i = 0; i < senNum; ++i)
    {
        sen[i] = height * 0.5;
    }

    harix = width;
    hariy = -100;
    harif = 100;
    haris = 50;
    nextHari = 100;
    hariActive = false;
    hariClear = false;
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

    // hari
    if(hariActive)
    {
        harix -= mov;

        if(harix < 90 && hariClear == false)
        {
            if(sen[89] < hariy || sen[89] > (hariy + haris)) gameMode = 1;
            else hariClear = true;
        }

        if(harix < -20)
        {
            hariActive = false;
            haris -= 1;
        }
    }

    if(hariActive == false && sc > nextHari)
    {
        harix = width;
        hariy = 200 + Math.random() * 200;
        nextHari += harif;
        hariActive = true;
        hariClear = false;
    }
    
    pos = sen[senNum - 1];
    if(pos < 0) gameMode = 1;
    if(pos > height) gameMode = 1;
    
    click = false;
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

    if(hariActive)
    {
        ctx.beginPath()
        ctx.rect(harix,hariy,3,haris);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(harix, hariy + haris)
        ctx.lineTo(harix + 1, hariy + haris + 200);
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(harix + 1, hariy + haris)
        ctx.lineTo(harix + 1, hariy + haris + 200);
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(harix + 2, hariy + haris)
        ctx.lineTo(harix + 1, hariy + haris + 200);
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.stroke();

        ctx.beginPath()
        ctx.moveTo(harix + 3, hariy + haris)
        ctx.lineTo(harix + 1, hariy + haris + 200);
        ctx.lineWidth = 1;
        ctx.fillStyle = "white";
        ctx.stroke();

        if(hariClear)
        {
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillText("OK", harix - 16, hariy - 10);
        }
    }
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
