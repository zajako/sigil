

// From http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches/
  var source = "http://blog.sklambert.com/wp-content/uploads/2012/09/sounds/kick_shock.mp3",
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ),
      renderer = new THREE.WebGLRenderer(),
      playWhenLoaded,
      song,
      radius;

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
			source = 'http://sigil.nevernull.com/IMG/sounds/fire_spell1.mp3';
		}
		else if(this.spell.element = "earth")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/earth_spell1.mp3';
		}
		else if(this.spell.element = "wind")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/air_spell1.mp3';
		}
		else if(this.spell.element = "water")
		{
			source = 'http://sigil.nevernull.com/IMG/sounds/water_spell1.mp3';
		}
	}

	scene = myThreeCanvas.scene;
	camera = myThreeCanvas.player;
	renderer = myThreeCanvas.renderer;
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

