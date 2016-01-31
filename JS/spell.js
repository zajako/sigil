
function Spell(name, element, accent, modifier, material, score)
{
  holdholdSelf = this;
  this.name = name;
  this.element = element ? element : "fire";
  this.material = material;
  this.particleSystem = myThreeCanvas.getParticleSystemFor(element);
  this.accent = accent ? accent : "ball";
  this.modifier = modifier ? modifier : "long";
  this.score = score;
  this.butt = false;
  // this.position = position;
}


Spell.prototype.cast = function(){

   myThreeCanvas.spawnPlayerProjectile(this.element, "ball", [{forward: 2, right:0}], this);


  // if(this.accent == "ball"){
  //   if(this.modifier == "holdSelf"){
  //     myThreeCanvas.player.resist = this.element;
  //   }
  //   else if(this.modifier == "ring"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 2, right:0}, {forward: -2, right: 0}, {forward: 0, right: 2}, {forward: 0, right: -2}]);
  //   }
  //   else if(this.modifier == "short"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right: 0}]);
  //   }
  //   else if(this.modifier == "long"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 2, right: 0}]);
  //   }
  //   else if(this.modifier == "aerial"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 4, right: 0}]);
  //   }
  // }
  // if(this.accent == "blast"){
  //   if(this.modifier == "holdSelf"){
  //     myThreeCanvas.player.counter = this.element;
  //   }
  //   else if(this.modifier == "ring"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right:1}, {forward: -1, right: -1}, {forward: 1, right: -1}, {forward: -1, right: 1}]);
  //   }
  //   else if(this.modifier == "short"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right: 0}, {forward: 2, right: 0}, {forward: 2, right: -1}, {forward: 2, right: 1}]);
  //   }
  //   else if(this.modifier == "long"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right: 0}, {forward: 2, right: 0}, {forward: 3, right: 0}, {forward: 3, right: -1}, {forward: 3, right: 1}]);
  //   }
  //   else if(this.modifier == "aerial"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 4, right: 0}, {forward: 5, right: -1}, {forward: 5, right: 1}]);
  //   }
  // }
  // if(this.accent == "wall"){
  //   if(this.modifier == "holdSelf"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: -1, right: 0}, {forward: -1, right: 1}, {forward: -1, right: -1}]);
  //   }
  //   else if(this.modifier == "ring"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right:0}, {forward: -1, right: 0}, {forward: 0, right: -1}, {forward: 0, right: 1}]);
  //   }
  //   else if(this.modifier == "short"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 1, right: 0}, {forward: 1, right: 1}, {forward: 1, right: -1}]);
  //   }
  //   else if(this.modifier == "long"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 2, right: 0}, {forward: 2, right: 1}, {forward: 2, right: -1}]);
  //   }
  //   else if(this.modifier == "aerial"){
  //     myThreeCanvas.spawnPlayerProjectile(this.element, this.accent, [{forward: 4, right: 0}, {forward: 4, right: -1}, {forward: 4, right: 1}]);
  //   }
  // }
};