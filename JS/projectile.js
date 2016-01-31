function Projectile(position, mesh){
   this.position = position;
   this.mesh = mesh;
   this.spell = "";

   this.addX = 0;
   this.addZ = 0;
}


Projectile.prototype.getWorldPosition = function(){
    return {x: this.position.x * 5, y: this.position.y, z: this.position.z * 5};
};

Projectile.prototype.setSpell = function(spell){
    this.spell = spell;
};


// Projectile.prototype.setMovementVariables = function(addx, addz)
// {

// 	this.addX = addx;
//    this.addZ = addz;

// }