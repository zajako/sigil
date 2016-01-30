function spellForm(material)
{
    this.points = [];
    this.material = material;
    this.cast = "";
    this.slot = 0;
    this.spellid = 0;

}

spellForm.prototype.setSpellCast = function(name, slot)
{
    this.cast = name;
    this.slot = slot;



    this.spellid = 0;
}