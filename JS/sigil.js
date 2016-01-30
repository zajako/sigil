function Sigil(){
    sigil = this;
    sigil.width = 800;
    sigil.height = 450;
    sigil.drawObjects = [];
    sigil.init();

    setInterval(function(){
        sigil.draw();
    },500);
}

Sigil.prototype.init = function() {
    sigil.initCanvas();
    sigil.initContext();
    sigil.drawBackground();
};

Sigil.prototype.drawBackground = function() {
    sigil.initCanvas();
    sigil.initContext();

    var bg = new cButton('./IMG/lowerscreen.png', 0, 0, 800, 450, false);
    sigil.drawObjects.push(bg);


    var btnDown = new cButton('./IMG/arrowDown.png', 675, 390, 51, 51, true);
    btnDown.addFunction("sigil.moveDown");
    sigil.drawObjects.push(btnDown);

    var btnUp = new cButton('./IMG/arrowUp.png', 675, 335, 51, 51, true);
    btnUp.addFunction("sigil.moveUp");
    sigil.drawObjects.push(btnUp);

    var btnLeft = new cButton('./IMG/arrowLeft.png', 620, 390, 51, 51, true);
    btnLeft.addFunction("sigil.moveLeft");
    sigil.drawObjects.push(btnLeft);

    var btnRight = new cButton('./IMG/arrowRight.png', 730, 390, 51, 51, true);
    btnRight.addFunction("sigil.moveRight");
    sigil.drawObjects.push(btnRight);

    var matcharcoal = new cButton('./IMG/mat_charcoal.png', 670, 20, 108, 74, true);
    matcharcoal.addFunction("sigil.test");
    sigil.drawObjects.push(matcharcoal);
};

Sigil.prototype.initCanvas = function() {
    sigil.bottomScreen = document.createElement('canvas');
    sigil.bottomScreen.width  = sigil.width;
    sigil.bottomScreen.height = sigil.height;

    sigil.bottomScreen.addEventListener('click', function(e) {
        // console.log('click: ' + e.offsetX + '/' + e.offsetY);

        $.each(sigil.drawObjects, function( index, object )
        {
            if(object.checkClick(e.offsetX, e.offsetY))
            {
                // console.log("button pressed:"+object.image.src);
                object.pressButton();
            }

        });
    }, false);
};

Sigil.prototype.initContext = function() {
    sigil.bottomCtx = sigil.bottomScreen.getContext('2d');
};

Sigil.prototype.draw = function() 
{
    $.each(sigil.drawObjects, function( index, object )
    {
        sigil.bottomCtx.drawImage(object.image, object.x, object.y, object.width, object.height);
    });
};

Sigil.prototype.moveUp = function()
{
    console.log("moving on up");
};

Sigil.prototype.moveDown = function()
{
    console.log("turn down to what");
};

Sigil.prototype.moveLeft = function()
{
    console.log("to the left to the left");
};

Sigil.prototype.moveRight = function()
{
    console.log("Right...");
};

Sigil.prototype.test = function()
{
    console.log("Charcoal Selected");
};

$().ready(function(){
    var sigil = new Sigil();
});
