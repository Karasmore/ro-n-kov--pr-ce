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
    constructor(img) {
        this.position = { x: 300 };
        this.width = 150;
        this.height = 100;
        this.img = img;
    }

    draw(y) {

        ctx.drawImage(birdImage, this.position.x, y, this.width, this.height)
    };
}

let birdImage = new Image;

birdImage.src = "./res/img/bird2.png";
const player = new myPlayer(birdImage);




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

        if(player.position.y<=canvas.height){
            x.code = over;
        }
        
    }
});

const backgroundCanvas = () => {
    let bgImage = new Image();
    bgImage.src = "./res/img/bg.png";
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
};


function gameLoop() {
    backgroundCanvas();
    player.draw(height);
    if (gameStart && coolDown) {
        height += jump / 2;
    }
    if(height >= canvas.height- 80){
        over = true;
        player = none;
    }   
    requestAnimationFrame(gameLoop);
}


gameLoop();









