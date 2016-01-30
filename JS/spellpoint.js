

function spellPoint(url, x, y, w, h, rotate)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.left = x;
	this.right = x + w;
    this.top = y;
    this.bottom = y + h;

    this.image = new Image();
    this.image.rotate = rotate;
    this.image.onload = function() {
        // sigil.draw();
    }
    this.image.src = url;
}

spellPoint.prototype.checkClick = function(x, y)

{

}