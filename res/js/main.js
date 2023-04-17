import { Pipe } from "./pipe.js";
import { Player } from "./player.js";

export const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let PIPE_COUNT = 5;
canvas.width = innerWidth;
canvas.height = innerHeight - 1;

let start = document.getElementById("start");
let wrap = document.getElementById("wrapper");

let gameStart = false;
let coolDown = true;
let over = false;
let gameSpeed = 5;

let value = 0;

let birdImage = new Image;
birdImage.src = "./res/img/flappy.png";

let pipeBottomImage = new Image;
pipeBottomImage.src = "./res/img/pipe_bottom.png"

let pipeTopImage = new Image;
pipeTopImage.src = "./res/img/pipe_top.png";

let jump = 8;


let playerPosition = (canvas.height / 2) - 50;


let pipeList = []
let positionPipes = [];

const player = new Player(birdImage);

start.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex"
}

for (let i = 0; i < PIPE_COUNT; i++) {
    positionPipes[i] = 2400 + 700 * i;

}

const begin = () => {
    ctx.font = "bold 50px sans-serif"
    ctx.fillText("Press spacebar to start the game", canvas.width / 2 - 350
        , canvas.height / 2 - 100)
}

const backgroundCanvas = () => {
    let bgImage = new Image();
    bgImage.src = "./res/img/bg3.jpg";
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
};

const generatePipePositions = () => {  //generate pipes positions
    let bottomCoord = 0
    let topCoord = 0

    //dolní díra   
    for (let i = 0; i < PIPE_COUNT; i++) {

        bottomCoord = Math.floor(Math.random() * canvas.height / 2) + 100;
        topCoord = canvas.height - bottomCoord - 200;
        console.log(topCoord);

        pipeList.push(new Pipe(bottomCoord, topCoord, gameSpeed, pipeBottomImage))



    }

}

const generate = () => {   //draw pipes

    pipeList.forEach((pipe, i) => {


        pipe.position.x = positionPipes[i];

        ctx.drawImage(pipeTopImage, pipe.position.x, pipe.position.y, pipe.width, pipe.topCoord);
        ctx.fill();
        ctx.drawImage(pipeBottomImage, pipe.position.x, canvas.height - pipe.bottomCoord + 30, pipe.width, pipe.bottomCoord);
        ctx.fill();


        positionPipes[i] -= gameSpeed - 3;

        if (pipe.position.x <= -200) {

            positionPipes[i] = 3500;

        }

        if (pipe.position.x >= 300 && pipe.position.x <= 500) {

            collisionPipes(pipe);

        }
        //score

        if (pipe.position.x == 150) {
            value++;
            console.log("w  ODUJSWQKIDSWJHQAFDKSQHJD KL")
        }

    });

}

const countingScore = () => {



    ctx.fillStyle = "#000";
    ctx.font = "bold 50px sans-serif"
    ctx.fillText(value, 20, 50);

}

const collisionPipes = (pipe) => {

    //playerPosition == HEIGHT  
    console.log(player.position.x);
    console.log(playerPosition);
    if ((player.position.x >= pipe.position.x && playerPosition >= pipe.position.y && playerPosition <= pipe.position.y + pipe.topCoord) ||
        (player.position.x >= pipe.position.x && playerPosition >= canvas.height - pipe.bottomCoord && playerPosition <= canvas.height - pipe.bottomCoord + pipe.bottomCoord)

        // (player.position.x >= pipe.position.y + pipe.topCoord && player.position.x <= pipe.position.y + pipe.topCoord + pipe.width && playerPosition <= pipe.topCoord )

    ) {

        over = true;
        gameSpeed = 3;

    }
}

const score = () => {
    ctx.fillStyle = "#000";
    ctx.font = "bold 90px sans-serif"
    ctx.fillText("Game Over", canvas.width / 2 - 225, 200);

    ctx.roundRect(canvas.width / 2 - 230, 300, 500, 250, [50, 0, 50, 0]);
    ctx.fillStyle = "#2c2c2c";
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 27px sans-serif"
    ctx.fillText("Score ", canvas.width / 2 - 15, 350);


    ctx.fillStyle = "#fff";
    ctx.font = "bold 80px sans-serif"
    ctx.fillText(value, canvas.width / 2 - 20, 450);

}

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

    countingScore();

    if (playerPosition >= canvas.height - 80) {

        score();
        // playerPosition = 889 ;    
        gameSpeed = 3;

        over = true;
        // refreshGame();
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

/*const refreshGame = () => {


document.addEventListener('keydown', (x) => { 

    if (x.code === "Enter" ) {
       
     
      location.reload();
      
    }

})

}
*/
gameLoop();