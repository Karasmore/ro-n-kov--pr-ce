let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");

let gameStart = false;
let coolDown = true;
let over = false;
let gameSpeed = 3;
let secondPosition = 1920;
let frame = 0;

const bot = [];
const mid = [];
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



// PIPES BOT AND TOP length
const generate = () =>{
 
     
        for(let i =0; i<4;i++){
           bot[i] = Math.floor(Math.random() * canvas.height/2)+150;
           
        /*   for(let j =0; j<4;j++){
              mid[j] = canvas.height - bot[i] -250;
           }
           */
        }   
        
       
       // console.log(mid);
       for(let i =0; i<4;i++){
        mid[i] = canvas.height- bot[i]-250;
       }
       console.log(mid);
       console.log(bot);
  
}
generate();


// I want to do x - position (tommorow);
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
      //  this.bot = (Math.random()* canvas.height/2)+150;
      //  this.top = canvas.height - this.bot -250;
          this.bot = bot;
          this.top = mid;
        this.pipePos = 0;
        
       
        
    }
 

   draw(){
    
    ctx.fillStyle = "green";
    ctx.fillRect(500,this.position.y, this.width ,  this.top[1]);
    ctx.fill();
    ctx.fillRect(500,canvas.height - this.bot[1], this.width , this.bot[1]);
    ctx.fill();
   
   }
  
   
 
   
    

   
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

        pipe.draw();
       
    
    player.draw(playerPosition);
    if(playerPosition >= canvas.height- 80){
      
        score();
        // playerPosition = 889 ;
        over = true; 
  
       
     }   
    
    if (gameStart && coolDown ) {
        playerPosition += jump / 2;
        
    }
 
 
    
   
    
    requestAnimationFrame(gameLoop);
}


gameLoop();









