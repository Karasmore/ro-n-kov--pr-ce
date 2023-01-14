let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");

let gameStart = false;
let coolDown = true;
let over = false;
let gameSpeed = 3;
let secondPosition = 1920;

const jump = 5.5;



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 969;
let playerPosition= (canvas.height / 2) - 50;

start.onclick = () => {
    run = true;
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
      
    };
}

 


class myPipe {
    constructor() {
        this.position = { x: canvas.width, y:0};
        this.width = 100;
        this.bot = (Math.random()* canvas.height/2)+150;
        this.top = canvas.height - this.bot -250;
        this.bgPos = 0;
       
        
    }
 

   draw(){
    
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x,this.position.y, this.width ,  this.top);
    ctx.fill();
    ctx.fillRect(this.position.x,canvas.height - this.bot, this.width , this.bot);
    ctx.fill();
   
   }
   generate(){
    pipe.position.x = pipe.bgPos + canvas.width;
   }
   
    
     
  
      //this.position.x = (this.position.x - gameSpeed);
   
   
   
}
 





let birdImage = new Image;

birdImage.src = "./res/img/bird2.png";
const player = new myPlayer(birdImage);
const pipe = new myPipe();


const begin= () =>{
    ctx.font = "bold 50px sans-serif"
    ctx.fillText("Press spacebar to start the game", canvas.width/2 -350
    ,canvas.height/2-100)
}


document.addEventListener('keydown', (x) => {
    
    if (x.code === "Space" && coolDown && playerPosition > 85&& !over&&
     run == true) {
        if (!gameStart) {
           
            gameStart = !gameStart;
        }

        const smoothJump = setInterval(() => {
          
            playerPosition -= jump;

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
    ctx.font = "bold 27px sans-serif"
    ctx.fillText("Score ", canvas.width/2 -200,350);
    ctx.fillText("Best", canvas.width/2 + 130,350);
   
    ctx.filter = 'grayscale(1)';
   

}

function gameLoop() {
 
    backgroundCanvas();
  
    
    if (!gameStart) {
        begin();  
     
    }
  
    player.draw(playerPosition);
    
    if (gameStart && coolDown ) {
        playerPosition += jump / 2;
        
    }
    if(gameStart ){
           pipe.draw();
           pipe.generate();
           pipe.bgPos -= gameSpeed;
            }
   
   
    if(playerPosition >= canvas.height- 80){
      
       score();
       // playerPosition = 889 ;
       over = true; 
 
       
    }   
    if(pipe.position.x <1020 || secondPosition<1020){
        pipe.position.x = secondPosition;
        this.bot = (Math.random()* canvas.height/2)+150;
       
        pipe.draw();
        pipe.generate();
      secondPosition-=3;
        console.log(".x");
         
    }
   console.log(pipe.position.x);
   
    requestAnimationFrame(gameLoop);
}


gameLoop();









