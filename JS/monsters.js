
function Monster(img, name, mind, body, spirit, melee, ranged)
{
    this.image = img;
    this.name = name;
    this.mind = mind;
    this.body = body;
    this.spirit = spirit;
    this.melee = melee;
    this.ranged = ranged;
}

Monster.prototype.setResist = function(element)
{
	this.resist = element;
}

Monster.prototype.setWeak = function(element)
{
	this.weak = element;
}

dummy = new Monster('', 'Training Dummy', -1, 100, -1, 0, 0);
dummy.setResist('water');
dummy.setWeak('fire');

goblin = new Monster('', 'Goblin', 25, 25, 50, 10, 10);
goblin.setResist('fire');
goblin.setWeak('water');

