

function cButton(url, x, y, w, h)
{
    button = this;
    button.x = x;
    button.y = y;
    button.width = w;
    button.height = h;
    button.image = new Image();
    button.image.src = url;
    button.image.onload = function() {
        sigil.draw();
    }
}
