function Projectile(position, mesh, element){
   this.position = position;
   this.mesh = mesh;
   this.spell = "";
   this.element = element;

   this.addX = 0;
   this.addZ = 0;
}

Projectile.prototype.getWorldPosition = function(){
    return {x: this.position.x * 5, y: this.position.y, z: this.position.z * 5};
};

Projectile.prototype.setSpell = function(spell){
    this.spell = spell;
};