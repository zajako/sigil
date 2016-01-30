



function Sigil(){
    this.width = 800;
    this.height = 450;

    this.init();
}

Sigil.prototype.init = function() {
    this.initCanvas();
    this.initContext();
    this.drawBackground();
}

Sigil.prototype.initCanvas = function() {
    this.topScreen = document.createElement('canvas');
    this.bottomScreen = document.createElement('canvas');
    this.topScreen.width  = this.width;
    this.topScreen.height = this.height;
    this.bottomScreen.width  = this.width;
    this.bottomScreen.height = this.height;
};

Sigil.prototype.initContext = function() {
    this.topCtx = this.topScreen.getContext('2d');
    this.bottomCtx = this.bottomScreen.getContext('2d');
};

Sigil.prototype.drawBackground = function() {
    this.topCtx.strokeStyle = 'red';
    this.topCtx.lineWidth = 2;
    this.topCtx.fillStyle = '#9ea7b8'
    this.topCtx.fillRect(0,0,this.width, this.height);
    this.topCtx.fill();


    // var bgImage = new Image;
    // bgImage.src = 'file:///Volumes/R1/Development/Jams/Sigil/IMG/lowerscreen.png';
    // var img = document.getElementById("test");
    // this.bottomCtx.drawImage(img,0,0,this.width,this.height);

    // this.bottomCtx.strokeStyle = 'red';
    // this.bottomCtx.lineWidth = 2;
    // this.bottomCtx.fillStyle = '#000000'
    // this.bottomCtx.fillRect(0,0,this.width, this.height);
    // this.bottomCtx.fill();

};


   