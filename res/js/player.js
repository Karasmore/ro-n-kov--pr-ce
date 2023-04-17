import { canvas } from "./main.js";

class Player {
    constructor(birdImage) {
        this.position = { x: 305 };
        this.width = 100;
        this.height = 100;
        this.birdImage = birdImage
    }

    draw(y) {
        canvas.getContext("2d").drawImage(this.birdImage, this.position.x, y, this.width, this.height)
    };
}

    
export{Player}