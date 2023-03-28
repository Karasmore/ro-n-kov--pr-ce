
class Pipe {
    constructor(bottomCoord, topCoord, gameSpeed) {
        this.position = { x: canvas.width - 120, y: 0 };
        this.width = 100;
        this.bottomCoord = bottomCoord;
        this.topCoord = topCoord;
        this.pipePos = 0;
        this.gameSpeed = gameSpeed

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
        this.pipePos -= this.gameSpeed;

        console.log("X COORD " + this.position.x)
        console.log("PIPE POS " + this.pipePos)
        //  this.draw();

    }

}


export {Pipe};