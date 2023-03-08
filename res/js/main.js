let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");

let gameStart = false;
let coolDown = true;
let over = false;
let gameSpeed =3;
let secondPosition = 1920;

let position = 0;
let value = 0;


const bot = [];
const mid = [];


const jump = 5.5;



const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 969;
let playerPosition = (canvas.height / 2) -  50;

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

    };
}


class myPipe {
    constructor() {
        this.position = { x: canvas.width - 120, y: 0 };
        this.width = 100;
        this.bot = bot;
        this.top = mid;
        this.pipePos = 0;

    }

    /* draw() {
  
          ctx.fillStyle = "green";
          ctx.fillRect(this.position.x, this.position.y, this.width, this.top[0]);
          ctx.fill();
          ctx.fillRect(this.position.x, canvas.height - this.bot[0], this.width, this.bot[0]);
          ctx.fill();
  
      }
   */
    move() {
        this.position.x = this.pipePos + canvas.width;
        this.pipePos -= gameSpeed;
        //  this.draw();

    }

}

let birdImage = new Image;

birdImage.src = "./res/img/bird2.png";
const player = new myPlayer(birdImage);
const pipe = new myPipe();


const begin = () => {
    ctx.font = "bold 50px sans-serif"
    ctx.fillText("Press spacebar to start the game", canvas.width / 2 - 350
        , canvas.height / 2 - 100)
}


document.addEventListener('keydown', (x) => {

    if (x.code === "Space" && coolDown && playerPosition > 85 && !over ) {
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

const generatePositions = () => {

    //dolní díra   
    for (let i = 0; i < 100; i++) {
        bot[i] = Math.floor(Math.random() * canvas.height / 2) + 200;

    }


   
    for (let i = 0; i < 100; i++) {
        mid[i] = canvas.height - bot[i] - 250;
    }


    
    console.log("horní pipe " + mid);
    console.log("dolní pipe " + bot);

}


const generate = () => {

    for (let i = 0; i < 100; i++) {

        position = pipe.position.x + 700;
        pipe.position.x = position;
        ctx.fillStyle = "green";
        ctx.fillRect(position, pipe.position.y, pipe.width, pipe.top[i]);
        ctx.fill();
        ctx.fillRect(position, canvas.height - pipe.bot[i], pipe.width, pipe.bot[i]);
        ctx.fill();

        
        ctx.fillStyle = "#000";
        ctx.font = "bold 50px sans-serif"
        ctx.fillText(value, 20, 50);
    
      

        
    }

}

/**
 * const countingScore = () =>{
      
    if(player.position.x>pipe.position.x){
        
        value++;
    }

     console.log(value);
     console.log("Hráč pozice "+  player.position.x);
     console.log("Pipe position " + pipe.position.x)

}
*/

const score = () => {
    ctx.fillStyle = "#000";
    ctx.font = "bold 90px sans-serif"
    ctx.fillText("Game Over", canvas.width / 2 - 225, 200);

    ctx.roundRect(canvas.width / 2 - 230, 300, 500, 250, [50, 0, 50, 0]);
    ctx.fillStyle = "#2c2c2c";
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 27px sans-serif"
    ctx.fillText("Score ", canvas.width / 2 - 200, 350);
    ctx.fillText("Best", canvas.width / 2 + 130, 350);

 //   ctx.filter = 'grayscale(1)';


}
//countingScore();

generatePositions();
function gameLoop() {

    backgroundCanvas();
   

    if (!gameStart) {
        begin();


    }
    else {

        pipe.move();
        generate();
       

    }



    player.draw(playerPosition);
    if (playerPosition >= canvas.height - 80 ) {

        score();
        // playerPosition = 889 ;
        
        gameSpeed =0;

        over = true;


    }

    if (gameStart && coolDown) {
        playerPosition += jump / 3;

    }


    requestAnimationFrame(gameLoop);

}


gameLoop();