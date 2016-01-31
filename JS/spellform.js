function spellForm(material)
{
    this.points = [];
    this.material = material;
    this.cast = "";
    this.slot = 0;
    this.spellid = 0;
    this.finished = false;
    this.score = 0;

}

spellForm.prototype.setSpellCast = function(name, slot, score)
{
    this.cast = name;
    this.slot = slot;

    if(score > 20)
        score = 20;

    this.score = score;
    this.spellid = 0;
}