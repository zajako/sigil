
function Pickup(name, modelPathName)
{
    this.name = name;
    this.modelPathName = modelPathName;
    this.textureId = 0;
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



Pickup.prototype.death = function()
{
	console.log("Item has been picked up.");
	myThreeCanvas.scene.remove(mesh);
}

//PickupUp(img, name, mind, body, spirit, melee, ranged)
book1 = new Pickup('Book 1', "./MODELS/book.json");
book1.setTextureId(12);

book2 = new Pickup('Book 2', "./MODELS/book.json");
book2.setTextureId(13);

var itemTypeEnum = {
	"B1" : book1,
	"B2" : book2,

};
