function Spell(name, element, accent, modifier){
  self = this;
  this.name = name;
  this.element = element;
  this.particleSystem = myThreeCanvas.getParticleSystemFor(element);
  this.accent = accent;
  this.modifier = modifier;
  // this.position = position;
}


Spell.prototype.cast = function(){
   myThreeCanvas.spawnPlayerProjectile(this.element, "ball", [{forward: 2, right:0}]);


  // if(this.accent == "ball"){
  //   if(this.modifier == "self"){
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
  //   if(this.modifier == "self"){
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
  //   if(this.modifier == "self"){
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