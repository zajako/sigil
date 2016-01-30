

function cButton(url, x, y, w, h, clickable)
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
    this.image.onload = function() {
        sigil.draw();
    }
    this.image.src = url;
    
    this.isClickable = clickable;
    this.callName = "";
}

cButton.prototype.checkClick = function(x, y)
{
    if(this.isClickable && this.right >= x && this.left <= x && this.bottom >= y && this.top <= y)
    {
        return true;
    }

    return false;
}

cButton.prototype.addFunction = function(name)
{
	this.callName = name;
}

cButton.prototype.pressButton = function()
{
	if(this.callName == "")
		return;

	context = window;
	var namespaces = this.callName.split(".");
	var func = namespaces.pop();
	for(var i = 0; i < namespaces.length; i++) {
		context = context[namespaces[i]];
	}
	return context[func].apply(context);
}