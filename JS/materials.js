function spellMaterial(img, name, width, height, rotate, count)
{
    this.image = img;
    this.name = name;
    this.count = count;
    this.width = width;
    this.height = height;
    this.rotate = rotate;
}

blood = new spellMaterial('./IMG/brushes/blood2.png', 'Blood', 30, 27, 180, 99);
charcoal = new spellMaterial('./IMG/brushes/charcoal.png', 'Charcoal', 30, 27, 180, 5);
gold = new spellMaterial('./IMG/brushes/goldbrush.png', 'Gold', 30, 27, 0, 5);
mercury = new spellMaterial('./IMG/brushes/mercury.png', 'QuickSilver', 30, 27, 180, 5);
