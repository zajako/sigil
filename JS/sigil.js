



function Sigil(){
    sigil = this;
    sigil.width = 800;
    sigil.height = 450;

    sigil.init();
}

Sigil.prototype.init = function() {
    sigil.initCanvas();
    sigil.initContext();
    sigil.drawBackground();
}

Sigil.prototype.initCanvas = function() {
    sigil.topScreen = document.createElement('canvas');
    sigil.bottomScreen = document.createElement('canvas');
    sigil.topScreen.width  = sigil.width;
    sigil.topScreen.height = sigil.height;
    sigil.bottomScreen.width  = sigil.width;
    sigil.bottomScreen.height = sigil.height;
};

Sigil.prototype.initContext = function() {
    sigil.topCtx = sigil.topScreen.getContext('2d');
    sigil.bottomCtx = sigil.bottomScreen.getContext('2d');
};

Sigil.prototype.drawBackground = function() {
    sigil.topCtx.strokeStyle = 'red';
    sigil.topCtx.lineWidth = 2;
    sigil.topCtx.fillStyle = '#9ea7b8'
    sigil.topCtx.fillRect(0,0,sigil.width, sigil.height);
    sigil.topCtx.fill();

    var bgimage = new Image();
    bgimage.src = './IMG/lowerscreen.png';
    bgimage.onload = function() {
      sigil.bottomCtx.drawImage(this, 0, 0);
    };
};

var sigil = new Sigil();   