
function Pickups(name, modelPathName)
{
    this.name = name;
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

PickupUp.prototype.setMesh = function(mesh)
{
	this.mesh = mesh;
}

PickupUp.prototype.setTextureId = function(id)
{
	this.textureId = id;
}


PickupUp.prototype.pickup = function()
{
	console.log("");




	this.death();
}



PickupUp.prototype.death = function()
{
	console.log("Item has been picked up.");
	myThreeCanvas.scene.remove(mesh);
}

//PickupUp(img, name, mind, body, spirit, melee, ranged)
book1 = new PickupUp('Book 1', "./MODELS/Dummy.json");
book1.setTextureId(11);

book2 = new PickupUp('Book 2', "./MODELS/Dummy.json");
book2.setTextureId(11);

var itemTypeEnum = {
	"B1" : book1,
	"B2" : book2,

};
