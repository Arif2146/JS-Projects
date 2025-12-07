let board;
let boardWidth = 360;
let boardHeight = 640 ;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 320;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;
let velocityX = -2;


window.onload = function() {
    board = document.getElementById('board');
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext('2d');

    birdImg= new Image();
    birdImg.src = "./src/fply.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    topPipeImg = new Image();
    topPipeImg.src = "./src/toppipe.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./src/bottompipe.png";
    requestAnimationFrame(ubdate);
    setInterval(placePipes, 1500);
}
function ubdate(){
    requestAnimationFrame(ubdate);
    context.clearRect(0, 0, board.width, board.height);

    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for(let i = 0; i < pipeArray.length; i++){
        context.drawImage(pipeArray[i].img, pipeArray[i].x, pipeArray[i].y, pipeArray[i].width, pipeArray[i].height);
        pipeArray[i].x += velocityX;
      
    }
}
function placePipes() {
    let topPipe={
        img : topPipeImg, 
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);
    let bottomPipe={
        img : bottomPipeImg, 
        x : pipeX,
        y : pipeHeight + pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}