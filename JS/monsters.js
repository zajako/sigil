
function Monster(img, name, mind, body, spirit, melee, ranged, spawncode, modelPathName)
{

//model pathname
//texture id

/*

	for(var k=0; k < mobtypes.length; k++)
            {
                if(this.map.grid[i][j] == mobtypes[k].spawncode)
                {
                    
                }
            }

*/

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
    this.spawncode = spawncode;
    this.modelPathName = modelPathName;
    this.textureId = 0;

}

Monster.prototype.clone = function()
{
	var temp = new Monster();
    for (myvar in this)
    {
        temp[myvar] = this[myvar];
    }
    return temp;
}

Monster.prototype.setMesh = function(mesh)
{
	this.mesh = mesh;
}

Monster.prototype.setResist = function(element)
{
	this.resist = element;
}

Monster.prototype.setTextureId = function(id)
{
	this.textureId = id;
}

Monster.prototype.setWeak = function(element)
{
	this.weak = element;
}

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
		if(spell.material.name == "mercury" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Mind Damage!");
			this.current_mind -= damage;
		}
	}

	if(this.body > 0)
	{
		if(spell.material.name == "charcoal" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Body Damage!");
			this.current_body -= damage;
		}
	}

	if(this.spirit > 0)
	{
		if(spell.material.name == "gold" || spell.material.name == "Blood")
		{
			console.log("Monster Takes Spirit Damage!");
			this.current_spirit -= damage;
		}
	}

	if(
		(this.mind > 0 && this.current_mind <= 0) || 
		(this.body > 0 && this.current_body <= 0) || 
		(this.spirit > 0 && this.current_spirit <= 0)
	)
	{
		this.death();
	}
	// debugger;
}

Monster.prototype.search = function()
{
	if(myThreeCanvas.isPlayerInRange(this.mesh))
	{
		sigil.targetMonster(this);

		if(myThreeCanvas.isPlayerInCloseRange(this.mesh))
		{
			if(this.melee > 0)
				this.attack();
		}
		else
		{
			if(this.ranged > 0)
				this.rangedAttack();
		}
	}
}

Monster.prototype.attack = function()
{
	if(Math.random() >= 0.8)
	{
		//play sound
		sigil.takeDamage(this.melee);
	}
	
}

Monster.prototype.rangedAttack = function()
{
	if(Math.random() >= 0.4)
	{
		//play sound
		sigil.takeDamage(this.ranged);
	}
}

Monster.prototype.death = function()
{
	//Despawn Monster
	console.log("Monster Has Died!");
	myThreeCanvas.scene.remove(mesh);

	sigil.cancelTarget(this);
}

//Monster(img, name, mind, body, spirit, melee, ranged)
dummy = new Monster('', 'Training Dummy', -1, 100, -1, 0, 0, "./MODELS/Dummy.json");
dummy.setResist('water');
dummy.setWeak('fire');
dummy.setTextureId(11);

goblin = new Monster('', 'Goblin', 25, 25, 50, 10, 10, "./MODELS/Dummy.json");
goblin.setResist('fire');
goblin.setWeak('water');

orc = new Monster('', 'Orc', 50, 75, 50, 30, 10, "./MODELS/Dummy.json");
orc.setResist('fire');
orc.setWeak('water');

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
	"G" : "golem",
	"p" : "human",
	"h" : "elf",
	"r" : "dwarf",
	"f" : "fire",
	"w" : "water",
	"e" : "earth",
	"a" : "air",
	"w" : "wight",
	"z" : "zombie",
	"s" : "skel",
	"o" : "orc",
	"g" : "goblin",
	"d" : "dummy"
};
