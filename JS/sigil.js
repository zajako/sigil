



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

    var bg = new cButton('./IMG/lowerscreen.png', 0, 0, 800, 450);
    sigil.drawObjects.push(bg);


    var btnDown = new cButton('./IMG/arrowDown.png', 700, 400, 51, 51);
    sigil.drawObjects.push(btnDown);
    var btnUp = new cButton('./IMG/arrowUp.png', 600, 400, 51, 51);
    sigil.drawObjects.push(btnUp);
    var btnLeft = new cButton('./IMG/arrowLeft.png', 300, 400, 51, 51);
    sigil.drawObjects.push(btnLeft);
    var btnRight = new cButton('./IMG/arrowUp.png', 500, 400, 51, 51);
    sigil.drawObjects.push(btnRight);
    var matcharcoal = new cButton('./IMG/mat_charcoal.png', 670, 20, 108, 74);
    sigil.drawObjects.push(matcharcoal);
}

Sigil.prototype.initCanvas = function() {
    sigil.topScreen = document.createElement('canvas');
    sigil.bottomScreen = document.createElement('canvas');
    sigil.topScreen.width  = sigil.width;
    sigil.topScreen.height = sigil.height;
    sigil.bottomScreen.width  = sigil.width;
    sigil.bottomScreen.height = sigil.height;

    sigil.bottomScreen.addEventListener('click', function(e) {
        console.log('click: ' + e.offsetX + '/' + e.offsetY);

        
        // var rect = sigil.onPress(rects, e.offsetX, e.offsetY);
        // if (rect) {
        //     console.log('collision: ' + rect.x + '/' + rect.y);
        // } else {
        //     console.log('no collision');
        // }
    }, false);
};

Sigil.prototype.initContext = function() {
    sigil.topCtx = sigil.topScreen.getContext('2d');
    sigil.bottomCtx = sigil.bottomScreen.getContext('2d');
};

// Sigil.prototype.onPress = function(rects, x, y) {
//     var isCollision = false;
//     for (var i = 0, len = rects.length; i < len; i++) {
//         var left = rects[i].x, right = rects[i].x+rects[i].w;
//         var top = rects[i].y, bottom = rects[i].y+rects[i].h;
//         if (right >= x
//             && left <= x
//             && bottom >= y
//             && top <= y) {
//             isCollision = rects[i];
//         }
//     }
//     return isCollision;
// }

Sigil.prototype.draw = function() 
{
    sigil.topCtx.strokeStyle = 'red';
    sigil.topCtx.lineWidth = 2;
    sigil.topCtx.fillStyle = '#9ea7b8'
    sigil.topCtx.fillRect(0,0,sigil.width, sigil.height);
    sigil.topCtx.fill();

    $.each(sigil.drawObjects, function( index, object )
    {
        sigil.bottomCtx.drawImage(object.image, object.x, object.y, object.width, object.height);
    });

};



var sigil = new Sigil();

