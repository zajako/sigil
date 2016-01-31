




function Player(grid){
    this.x = 0;
    this.z = 0;
    this.gridX = 0;
    this.gridZ = 0;
    this.rotY = 0;
    this.desiredRotY = 0;
    this.grid = grid;
}



Player.prototype.moveForward = function(){
    if(this.rotY === 0){
        if(this.grid[this.gridZ - 1][this.gridX] !== 0){
            this.z -= 5;
            this.gridZ -= 1;
        }
    }
    else if(this.rotY == radiansToDegrees(Math.PI / 2) || this.rotY == radiansToDegrees((-3 * Math.PI / 2))){
        if(this.grid[this.gridZ][this.gridX - 1] !== 0){
            this.x -= 5;
            this.gridX -= 1;
        }
    }
    else if(this.rotY == radiansToDegrees((3 * Math.PI / 2)) || this.rotY == radiansToDegrees(-Math.PI / 2)){
        if(this.grid[this.gridZ][this.gridX + 1] !== 0){
            this.x += 5;
            this.gridX += 1;
        }
    }
    else if(this.rotY == radiansToDegrees(Math.PI) || this.rotY == radiansToDegrees(-Math.PI)){
        if(this.grid[this.gridZ + 1][this.gridX] !== 0){
            this.z += 5;
            this.gridZ += 1;
        }
    }
};

Player.prototype.moveBackward = function(grid){
    if(this.rotY === 0){
        if(this.grid[this.gridZ + 1][this.gridX] !== 0){
            this.z += 5;
            this.gridZ += 1;
        }
    }
    else if(this.rotY == radiansToDegrees(Math.PI / 2) || this.rotY == radiansToDegrees((-3 * Math.PI / 2))){
        if(this.grid[this.gridZ][this.gridX + 1] !== 0){
            this.x += 5;
            this.gridX += 1;
        }
    }
    else if(this.rotY == radiansToDegrees((3 * Math.PI / 2)) || this.rotY == radiansToDegrees(-Math.PI / 2)){
        if(this.grid[this.gridZ][this.gridX - 1] !== 0){
            this.x -= 5;
            this.gridX -= 1;
        }
    }
    else if(this.rotY == 180 || this.rotY == -180){
        if(this.grid[this.gridZ - 1][this.gridX] !== 0){
            this.z -= 5;
            this.gridZ -= 1;
        }
    }
};

Player.prototype.setTurnLeft = function(){
    this.desiredRotY += 90;
};

Player.prototype.setTurnRight = function(){
    this.desiredRotY -= 90;
};

Player.prototype.lerpRotation = function(deltaTime){
    // console.log(this.rotY);
    // console.log(this.desiredRotY);
    if(this.rotY != this.desiredRotY){
        this.rotY = lerpTowards(this.rotY, this.desiredRotY, 1);
    }
    if(this.rotY == 360 || this.rotY == -360){
        this.rotY = 0;
        this.desiredRotY = 0;
    }
};