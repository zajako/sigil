function Map(){
  this.name = "";
  //35 * 30 nested array that 
  this.grid = [];

  this.init();

  this.walls = [];
  this.walls[0] = './IMG/Textures/TempleWall.png';
  this.walls[1] = './IMG/Textures/TempleWall2.png';
  this.walls[2] = './IMG/Textures/TempleWall3.png';
  this.walls[3] = './IMG/Textures/TempleWall4.png';

  // this.floor[0] = './IMG/Textures/CobbleFloor.png';
  // this.floor[1] = './IMG/Textures/CobbleFloor2.png';
  // this.floor[2] = './IMG/Textures/CobbleFloor3.png';
  // this.floor[3] = './IMG/Textures/CobbleFloor4.png';

}

Map.prototype.getWallImage = function()
{
    return this.walls[Math.floor(Math.random() * this.walls.length)];
}

Map.prototype.getWallTextureId = function()
{
    return this.walls[Math.floor(Math.random() * 4 + 1)];
}

var d = "d";
var Z = "Z";
var Q = "Q";



Map.prototype.init = function(){
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,Q,d,d,d,d,d,d,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,d,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,d,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,d,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,d,d,d,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,0,0,1,0,1,1,1,1,1,d,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,d,d,d,d,d,d,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,d,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,1,0,1,1,d,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,1,d,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,d,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,1,1,1,1,1,0,1,1,1,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,0,1,1,0,0,0,1,0,0,0,1,0,0,1,1,1,1,d,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,1,1,1,1,d,0,1,0,0,0,1,0,0,d,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,1,d,1,1,1,1,0,1,0,1,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,Z,0,0,0]);
  this.addGridRow([0,1,1,1,d,1,1,0,1,0,1,0,0,0,0,1,0,0,0,1,1,1,1,d,1,1,1,1,0,0,0,1,0,0,0]);
  this.addGridRow([0,1,1,1,1,1,1,0,1,d,1,1,d,1,1,d,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,d,1,1,1,1,1,1,1,1,d,1,d,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,d,1,1,0,0,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,1,1,1,1,0,0,1,1,0,0,0,1,0,0,0,1,1,d,1,1,1,1,1,1,0,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,1,1,1,1,0,1,1,0,0,0,0,1,0,0,0,1,1,1,1,d,1,1,1,1,1,0,0,1,0,0,0]);
  this.addGridRow([0,0,0,0,1,1,2,1,1,1,d,1,1,d,1,1,d,0,0,0,1,1,d,1,d,1,1,1,d,1,1,d,1,0,0]);
  this.addGridRow([0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0]);
  this.addGridRow([0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,d,1,1,1,1,1,d,1,1,1,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  this.addGridRow([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
};

Map.prototype.addGridRow = function(row){
  this.grid.push(row);
};