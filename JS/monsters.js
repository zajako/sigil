
function Monster(img, name, mind, body, spirit, melee, ranged, modelPathName)
{
    this.image = img;
    this.name = name;
    this.mind = mind;
    this.body = body;
    this.spirit = spirit;
    this.melee = melee;
    this.ranged = ranged;
    this.mesh = "";
    this.resist = "";
    this.weak = "";
    this.current_mind = mind;
    this.current_body = body;
    this.current_spirit = spirit;
    this.modelPathName = modelPathName;
    this.textureId = 0;
    this.gridX = 0;
    this.gridZ = 0;
    this.arrayslot = 0;
}

Monster.prototype.clone = function()
{
	var temp = new Monster();
    for (var myVar in this)
    {
        temp[myVar] = this[myVar];
    }
    return temp;
};



Monster.prototype.setMesh = function(mesh)
{
	this.mesh = mesh;
};

Monster.prototype.setResist = function(element)
{
	this.resist = element;
};

Monster.prototype.setTextureId = function(id)
{
	this.textureId = id;
};

Monster.prototype.setWeak = function(element)
{
	this.weak = element;
};

Monster.prototype.setGridLocation = function(x, z){
  this.gridX = x;
  this.gridZ = z;
};

Monster.prototype.onContact = function(spell)
{
	console.log("Monster has been hit! M:"+this.current_mind+"/"+this.mind+
			" B:"+this.current_body+"/"+this.body+" S:"+this.current_spirit+"/"+this.spirit+" SpellScore:"+spell.score+ " Material:" +spell.material.name);

	var damage = spell.score / 3;

	if(spell.element == this.weak)
	{
		damage *= 2;
	}

	if(spell.element == this.resist)
	{
		damage /= 2;
	}

	if(spell.material.name == "blood")
	{
		damage /= 3;
	}

	console.log("Damage: "+damage);

	//Handle Material
	if(this.mind > 0)
	{
		if(spell.material.name == "QuickSilver" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Mind Damage!");
			this.current_mind -= damage;
		}
	}

	if(this.body > 0)
	{
		if(spell.material.name == "Charcoal" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Body Damage!");
			this.current_body -= damage;
		}
	}

	if(this.spirit > 0)
	{
		if(spell.material.name == "Gold" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Spirit Damage!");
			this.current_spirit -= damage;
		}
	}

	sigil.updateAll();

	if(
		(this.mind > 0 && this.current_mind <= 0) || 
		(this.body > 0 && this.current_body <= 0) || 
		(this.spirit > 0 && this.current_spirit <= 0)
	)
	{

		this.death();
	}
	else
	{
		source = 'http://sigil.nevernull.com/IMG/sounds/dummy_hit1.mp3';
		playWhenLoaded = function()
		{
	    	this.loop = true;
	    	this.play();
		};
		song = new THREE.Audio3D({"url":source, "reciever": myThreeCanvas.player, "onload": playWhenLoaded});
		this.mesh.add(song);

		radius = parseInt( 10, 10 );
		song.soundRadius = radius;
	}


	// debugger;
}

Monster.prototype.attack = function()
{
	if(Math.random() >= 0.8)
	{
		//play sound
		source = 'http://sigil.nevernull.com/IMG/sounds/Melee1.mp3';
		playWhenLoaded = function()
		{
	    	this.loop = true;
	    	this.play();
		};
		song = new THREE.Audio3D({"url":source, "reciever": myThreeCanvas.player, "onload": playWhenLoaded});
		this.mesh.add(song);

		radius = parseInt( 10, 10 );
		song.soundRadius = radius;

		//Inflict Damage
		sigil.takeDamage(this.melee);
	}
	
}

Monster.prototype.rangedAttack = function()
{
	if(Math.random() >= 0.4)
	{
		//Play SOund
    	source = 'http://sigil.nevernull.com/IMG/sounds/Ranged.mp3';
		playWhenLoaded = function()
		{
	    	this.loop = true;
	    	this.play();
		};
		song = new THREE.Audio3D({"url":source, "reciever": myThreeCanvas.player, "onload": playWhenLoaded});
		this.mesh.add(song);

		radius = parseInt( 10, 10 );
		song.soundRadius = radius;

		//Inflict Damage
		sigil.takeDamage(this.ranged);
	}
}

Monster.prototype.isDead = function()
{
	if(this.current_spirit <= 0 && this.spirit > 0)
	{
		return true;
	}
	if(this.current_body <= 0 && this.body > 0)
	{
		return true;
	}
	if(this.current_mind <= 0 && this.mind > 0)
	{
		return true;
	}
	return false;
}

Monster.prototype.death = function()
{
	//Despawn Monster
	sigil.cancelTarget(this);
	console.log("Monster Has Died!");
	// myThreeCanvas.scene.remove(self);
	// myThreeCanvas.monsters.remove(mesh);
	

	var m = this.mesh;
    myThreeCanvas.monsters.splice(this.arrayslot, 1);
    myThreeCanvas.scene.remove(m);
}

//Monster(img, name, mind, body, spirit, melee, ranged)
dummy = new Monster('', 'Training Dummy', 50, 20, 50, 1, 1, "./MODELS/Dummy.json");
dummy.setResist('water');
dummy.setWeak('fire');
dummy.setTextureId(11);

goblin = new Monster('', 'Goblin', 25, 25, 50, 10, 10, "./MODELS/Goblin.json");
goblin.setResist('fire');
goblin.setWeak('water');
goblin.setTextureId(16);


orc = new Monster('', 'Orc', 50, 75, 50, 30, 10, "./MODELS/Orc.json");
orc.setResist('fire');
orc.setWeak('water');
orc.setTextureId(15);

skel = new Monster('', 'Skeleton', -1, 25, -1, 20, 0, "./MODELS/Dummy.json");
skel.setResist('water');
skel.setWeak('fire');

zombie = new Monster('', 'Zombie', -1, 50, -1, 10, 0, "./MODELS/Dummy.json");
zombie.setResist('water');
zombie.setWeak('fire');

wight = new Monster('', 'Wight', 25, 50, -1, 35, 0, "./MODELS/Dummy.json");
wight.setResist('water');
wight.setWeak('fire');

air = new Monster('', 'Air Elemental', -1, 5, 100, 0, 40, "./MODELS/Dummy.json");
air.setResist('air');
air.setWeak('earth');

earth = new Monster('', 'Earth Elemental', -1, 75, 100, 40, 0, "./MODELS/Dummy.json");
earth.setResist('earth');
earth.setWeak('air');

water = new Monster('', 'Water Elemental', -1, 15, 100, 30, 10, "./MODELS/Dummy.json");
water.setResist('water');
water.setWeak('fire');

fire = new Monster('', 'Fire Elemental', -1, 25, 100, 20, 20, "./MODELS/Dummy.json");
fire.setResist('fire');
fire.setWeak('water');

dwarf = new Monster('', 'Dwarf Ruffian', 50, 75, 40, 30, 0, "./MODELS/Dummy.json");
dwarf.setResist('earth');
dwarf.setWeak('air');

elf = new Monster('', 'Elf Hunter', 40, 50, 75, 10, 30, "./MODELS/Dummy.json");
elf.setResist('air');
elf.setWeak('earth');

human = new Monster('', 'Prospector', 50, 50, 50, 20, 10, "./MODELS/Dummy.json");
human.setResist('air');
human.setWeak('earth');

golem = new Monster('', 'Golem', -1, 100, -1, 40, 0, "./MODELS/Dummy.json");
golem.setResist('earth');
golem.setWeak('air');

var monsterTypeEnum = {
	"G" : golem,
	"p" : human,
	"h" : elf,
	"r" : dwarf,
	"f" : fire,
	"w" : water,
	"e" : earth,
	"a" : air,
	"w" : wight,
	"z" : zombie,
	"s" : skel,
	"o" : orc,
	"g" : goblin,
	"d" : dummy
};
