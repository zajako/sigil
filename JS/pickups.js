
function Pickup(name, modelPathName, booknumber)
{
    this.name = name;
    this.modelPathName = modelPathName;
    this.textureId = 0;
    this.booknumber = booknumber;
    this.melee = 1;
    this.ranged = 1;
    this.current_mind = 1;
    this.current_body = 1;
    this.current_spirit = 1;
    this.mind = 1;
    this.body = 1;
    this.spirit = 1;
    this.melee = 1;
    this.ranged = 1;
}

Pickup.prototype.clone = function()
{
	var temp = new Monster();
    for (myvar in this)
    {
        temp[myvar] = this[myvar];
    }
    return temp;
}

Pickup.prototype.setMesh = function(mesh)
{
	this.mesh = mesh;
}

Pickup.prototype.setTextureId = function(id)
{
	this.textureId = id;
}


Pickup.prototype.pickup = function()
{
	console.log("");




	this.death();
}


Pickup.prototype.attack = function()
{
	console.log(" woooo");

	this.current_mind -= 1;

	if(this.booknumber == 2)
	{
		sigil.unlockBook2();
	}

	if(this.booknumber == 3)
	{
		sigil.unlockBook3();
	}
	
	this.death();
}



Pickup.prototype.death = function()
{
	sigil.cancelTarget(this);
	console.log("Monster Has Died!");
	// myThreeCanvas.scene.remove(self);
	// myThreeCanvas.monsters.remove(mesh);
	

	var m = this.mesh;
    myThreeCanvas.monsters.splice(this.arrayslot, 1);
    myThreeCanvas.scene.remove(m);
}

//PickupUp(img, name, mind, body, spirit, melee, ranged)
book1 = new Pickup('Book 1', "./MODELS/book.json", 2);
book1.setTextureId(12);

book2 = new Pickup('Book 2', "./MODELS/book.json", 3);
book2.setTextureId(13);

var itemTypeEnum = {
	"Z" : book1,
	"Q" : book2
};
