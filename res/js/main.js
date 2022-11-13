let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");
let gameStart = false;
let coolDown = true;
const jump = 5.5;
let over = false;


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 969;
let height= (canvas.height / 2) - 50;

start.onclick = () => {
    wrapper.style.display = "none";
    canvas.style.display = "flex";

}

class myPlayer {
    constructor() {
        this.position = { x: 300 };
        this.width = 150;
        this.height = 100;
        
    }

    draw(y) {

        ctx.drawImage(birdImage, this.position.x, y, this.width, this.height)
        ctx.fillStyle = "#000";
      
    };
}

let birdImage = new Image;

birdImage.src = "./res/img/bird2.png";
const player = new myPlayer(birdImage);



const begin= () =>{
    ctx.font = "bold 50px sans-serif"
    ctx.fillText("Press spacebar to start the game", canvas.width/2 -350
    ,canvas.height/2-100)
}


document.addEventListener('keydown', (x) => {
    
    if (x.code === "Space" && coolDown && height > 85&& !over) {
        if (!gameStart) {
           
            gameStart = !gameStart;
        }

        const smoothJump = setInterval(() => {
          
            height -= jump;

        }, 0.75);

        coolDown = false;
        setTimeout(() => {
            coolDown = true;
            clearInterval(smoothJump);
        }, 175)
    }
});

const backgroundCanvas = () => {
    let bgImage = new Image();
    bgImage.src = "./res/img/bg.png";
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
};


const score = () =>{
    ctx.fillStyle = "#000";
    ctx.font = "bold 90px sans-serif"
    ctx.fillText("Game Over", canvas.width/2 -225,200);
 
    ctx.roundRect(canvas.width/2 - 230, 300, 500 , 250, [50,0,50,0]);
    ctx.fillStyle = "#2c2c2c";
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 25px sans-serif"
    ctx.fillText("Score ", canvas.width/2 -200,350);
    ctx.fillText("Best", canvas.width/2 + 130,350);
}

function gameLoop() {

    backgroundCanvas();
    if (!gameStart) {
        begin();  
    }
  
    player.draw(height);
    if (gameStart && coolDown) {
        height += jump / 2;
    }
    if(height >= canvas.height- 80){
        score();
        over = true;
        player = none;
    
      
    }   
    requestAnimationFrame(gameLoop);
}


gameLoop();









