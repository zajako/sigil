

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


Projectile.prototype.playSound = function()
{
	if(this.spell)
	{
		if(this.spell.element == "fire")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/fireMIXED.mp3';
		}
		else if(this.spell.element = "air")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/airMIXED.mp3';
		}
		else if(this.spell.element = "water")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/waterMIXED.mp3';
		}
		else if(this.spell.element = "earth")
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
		console.log(this);
	};
	song = new THREE.Audio3D({"url":source, "reciever": camera, "onload": playWhenLoaded});
  	mesh.add(song); 
    radius = parseInt( 500, 10 );
    song.soundRadius = radius;

} 

