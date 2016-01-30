function Character(){
  this.name = "";

  this.x = 0;
  this.z = 0;

  this.spirit = 0;
  this.body = 0;
  this.mind = 0;

  this.vulnerability = "";
  this.basic1 = "";
  this.basic2 = "";
  this.resistance = "";

  this.melee = 0;
  this.ranged = 0;
}

for(var i=0; i < _points.length - 1;i++){
  canvas.moveto(_points[i]);
  canvas.lineto(_points[i+1]);
}