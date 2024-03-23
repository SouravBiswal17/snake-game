let board = document.querySelector(".board");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");
const control =document.querySelectorAll(".control i");
let Gameover=false;
let snakeX =5,snakeY =10;
let snakeBody=[]
let foodX ,foodY;
let velocityX = 0,velocityY = 0;
let setIntervalId;
let score=0;
let highScore = localStorage.getItem("high-score")||0;
highScoreElement.innerText = `High score:${highScore}`;
const changeFoodposition=() =>{
    foodX =Math.floor(Math.random()*18)+1;
    foodY =Math.floor(Math.random()*18)+1;
}
// after the game is over reloding the page
const handleGameOver = () =>{
    clearInterval(setIntervalId);
     window.open("index1.html");
    location.reload();
}
// motion of snake
const changeDirection =(e) => {
    if  (e.key ==="ArrowUp" && velocityY!=1){
        velocityX=0;
        velocityY=-1;
    }else if(e.key==="ArrowDown"&& velocityY!=-1){
        velocityX=0;
        velocityY=1;

    }
    else if(e.key==="ArrowRight"&& velocityX!=-1){
        velocityX=1;
        velocityY=0;

    }
    else if(e.key==="ArrowLeft"&& velocityX!=1){
        velocityX=-1;
        velocityY=0;
    }

}
// calling change direction function
control.forEach(key =>{
    key.addEventListener("click",(e)=>{
        if  ( e.target.id == "u"  && velocityY!=1){
            velocityX=0;
            velocityY=-1;
        }else if(e.target.id== 'd' && velocityY!=-1){
            velocityX=0;
            velocityY=1;
    
        }
        else if(e.target.id=="r"&& velocityX!=-1){
            velocityX=1;
            velocityY=0;
    
        }
        else if(e.target.id=="l"&& velocityX!=1){
            velocityX=-1;
            velocityY=0;
        }
    
    })
});
const initgame = () =>{
    if(Gameover)return handleGameOver();
    let htmlMarkup =`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    if(snakeX===foodX && snakeY===foodY){
        changeFoodposition();
        // pusing food into snake body
        snakeBody.push([foodX,foodY]);
        console.log(snakeBody); 
        score++;

        highScore= score>=highScore ? score:highScore;
        localStorage.setItem("high-score",highScore);
        scoreElement.innerHTML=`score:${score}`;
        highScoreElement.innerHTML = `High score:${highScore}`;
    }
    for(let i= snakeBody.length -1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }
    // first element of  snake body
    snakeBody[0]=[snakeX , snakeY];
    // snake head will update according to current velocity
    snakeX +=velocityX;
    snakeY += velocityY;
// cheaking wheather the snakes head is out of the boundary or not
    if(snakeX <= 0 || snakeX > 18 || snakeY <= 0 || snakeY > 18 ){
        Gameover = true;
    }

    for(let i=0; i < snakeBody.length; i++){
        // adding to snake body
        htmlMarkup +=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        // if snake hit the body game over
        if(i !==0 && snakeBody[0][1]===snakeBody[i][1] &&i !==0 && snakeBody[0][0]===snakeBody[i][0]){
            Gameover = true;
        }
    }
    board.innerHTML = htmlMarkup;
}
changeFoodposition();
setIntervalId= setInterval(initgame,150);
document.addEventListener("keydown",changeDirection)

// music system
const bodyElement = document.querySelector(".board");

bodyElement.addEventListener('click', function(e) {
    // Your code here
    console.log('Body clicked!');
    // Audio.play();
    console.log('Body clicked!');
});

