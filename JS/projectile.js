function Projectile(position, mesh, element){
   this.position = position;
   this.mesh = mesh;
   this.spell = "";
   this.element = element;

   this.addX = 0;
   this.addZ = 0;
   this.xOffset = 0;
   this.zOffset = 0;
}

Projectile.prototype.getWorldPosition = function(){
    return {x: this.position.x * 5, y: this.position.y, z: this.position.z * 5};
};

Projectile.prototype.setSpell = function(spell){
    this.spell = spell;
};


Projectile.prototype.playSound = function()
{
	if(this.spell)
	{
		if(this.spell.element == "fire")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/fireMIXED.mp3';
		}
		if(this.spell.element == "air")
		{
      source = 'http://sigil.nevernull.com/IMG/sounds/airMIXED.mp3';
		}
		if(this.spell.element == "water")
		{
      source = 'http://sigil.nevernull.com/IMG/sounds/waterMIXED.mp3';
		}
		if(this.spell.element == "earth")
		{
      source = 'http://sigil.nevernull.com/IMG/sounds/earthMIXED.mp3';
		}
	}

	var scene = myThreeCanvas.scene;
	var camera = myThreeCanvas.player;
	var renderer = myThreeCanvas.renderer;
	playWhenLoaded = function()
	{
    this.loop = true;
    this.play();
	};
	song = new THREE.Audio3D({"url":source, "reciever": camera, "onload": playWhenLoaded});
	this.mesh.add(song);
  radius = parseInt( 10, 10 );
  song.soundRadius = radius;

};