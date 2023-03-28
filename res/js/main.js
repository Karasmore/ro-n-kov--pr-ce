import { Pipe } from "./pipe.js";
import { Player } from "./player.js";

export const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const PIPE_COUNT = 3
canvas.width = 1920;
canvas.height = 969;

let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");

let gameStart = false;
let coolDown = true;
let over = false;
let gameSpeed = 5;
let lastPipePos = 1920;

let position = 0;
let value = 0;

let birdImage = new Image;
birdImage.src = "./res/img/bird2.png";


const jump = 5.5;

let playerPosition = (canvas.height / 2) - 50;

start.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex"
}

let pipeList = []

const player = new Player(birdImage);


const begin = () => {
    ctx.font = "bold 50px sans-serif"
    ctx.fillText("Press spacebar to start the game", canvas.width / 2 - 350
        , canvas.height / 2 - 100)
}




const backgroundCanvas = () => {
    let bgImage = new Image();
    bgImage.src = "./res/img/bg.png";
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
};

const generatePipePositions = () => {  //generate pipes positions
    let bottomCoord = 0
    let topCoord = 0
    //dolní díra   
    for (let i = 0; i < PIPE_COUNT; i++) {
        bottomCoord = Math.floor(Math.random() * canvas.height / 2) + 200;
        topCoord = canvas.height - bottomCoord - 250;
        //console.log("horní pipe " + topCoord);
        //console.log("dolní pipe " + bottomCoord);
        pipeList.push(new Pipe(bottomCoord, topCoord, gameSpeed))

    }

}




const generate = () => {   //draw pipes
    position = pipeList[0].position.x + 700;
    for (let i = 0; i < pipeList.length; i++) {
        console.log("PIPEX " + pipeList[i].position.x)
        if (pipeList[i].position.x <= -2000) {
            pipeList[i].position.x = 1000
            lastPipePos = pipeList[i].position.x
            console.log("LAST " + lastPipePos)
            //console.log("PIPEX " + pipeList[i].position.x)
            console.log("PIPE OUT")
            
        }

        position = position + 700;
        pipeList[i].position.x = position;
        ctx.fillStyle = "green";
        ctx.fillRect(position, pipeList[i].position.y, pipeList[i].width, pipeList[i].topCoord);
        ctx.fill();
        ctx.fillRect(position, canvas.height - pipeList[i].bottomCoord, pipeList[i].width, pipeList[i].bottomCoord);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.font = "bold 50px sans-serif"
        ctx.fillText(value, 20, 50);

       /*
        Zkontrolovat, když se první pipe dostane mimo obrazovku.
        Posounout její X pozici za poslední pipe (bude asi potřeba ukládat poslední pozici, protože vždy nebude na posledním indexu v pipeListu poslední pipe)
        Bude možná potřeba opravit generate funkci
       
       */  
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

generatePipePositions();
function gameLoop() {

    backgroundCanvas();

    if (!gameStart) {
        begin();
    }
    else {
        for (let i = 0; i < pipeList.length; i++) {
            pipeList[i].move();
        }
        generate();

    }

    player.draw(playerPosition);
    if (playerPosition >= canvas.height - 80) {

        score();
        // playerPosition = 889 ;    
        gameSpeed = 0;
        over = true;
    }

    if (gameStart && coolDown) {
        playerPosition += jump / 3;

    }


    requestAnimationFrame(gameLoop);

}

document.addEventListener('keydown', (x) => {

    if (x.code === "Space" && coolDown && playerPosition > 85 && !over) {
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



gameLoop();