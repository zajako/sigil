function Player(){
    this.x = 0;
    this.z = 0;
    this.rotY = 0;
}

Player.prototype.moveForward = function(){
    if(this.rotY === 0){
        this.z -= 1;
    }
    else if(this.rotY == Math.PI / 2 || this.rotY == (-3 * Math.PI / 2)){
         this.x -= 1;
    }
    else if(this.rotY == (3 * Math.PI / 2) || this.rotY == -Math.PI / 2){
        this.x += 1;
    }
    else if(this.rotY == Math.PI || this.rotY == -Math.PI){
         this.z += 1;
    }
};

Player.prototype.moveBackward = function(){
    if(this.rotY === 0){
        this.z += 1;
    }
    else if(this.rotY == Math.PI / 2 || this.rotY == (-3 * Math.PI / 2)){
        this.x += 1;
    }
    else if(this.rotY == (3 * Math.PI / 2) || this.rotY == -Math.PI / 2){
        this.x -= 1;
    }
    else if(this.rotY == Math.PI || this.rotY == -Math.PI){
        this.z -= 1;
    }
};

Player.prototype.turnLeft = function(){
    if(this.rotY - Math.PI / 2 <= Math.PI * -2){
        this.rotY = 0;
    }
    else{
        this.rotY -= Math.PI / 2;
    }
};

Player.prototype.turnRight = function(){
    if(this.rotY + Math.PI / 2 >= Math.PI * 2){
        this.rotY = 0;
    }
    else{
        this.rotY += Math.PI / 2;
    }
};

function THREECanvas(){
    this.width = 800;
    this.height = 450;

    this.needupdate = true;

    this.player = new Player();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();

    this.materials = [new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})];
    this.meshes = [];
    this.textures = [];

    this.init();
}

THREECanvas.prototype.init = function(){
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );
    this.loadTexture("./IMG/Textures/CobbleFloor.png", 12, 12);
    this.loadTexture("./IMG/Textures/TempleWall.png", 10, 1);


};

THREECanvas.prototype.addGeometry = function(geoType, width, height, depth, material, position, rotation){
    var mesh;
    var geo = new geoType(width, height, depth);
    if(material !== undefined){
        mesh = new THREE.Mesh(geo, material);
    }
    else{
        material = this.materials[0];
        mesh = new THREE.Mesh(geo, material);
    }
    if(position !== undefined){
        mesh.position.set(position.x, position.y, position.z);
    }
    if(rotation !== undefined){
        mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    }

    this.scene.add(mesh);
    this.meshes.push(mesh);
};

THREECanvas.prototype.addMaterial = function(color){
    this.materials[this.materials.length - 1] = new THREE.MeshBasicMaterial({color: color});
};

THREECanvas.prototype.render = function() {
    if(this.needupdate){
        this.renderer.render(this.scene, this.camera);
        // this.needupdate = false;
    }
};

THREECanvas.prototype.loadTexture = function(name, repeatX, repeatY){
    var texture = THREE.ImageUtils.loadTexture( name );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( repeatX, repeatY );
    this.textures.push(texture);
};

THREECanvas.prototype.setNeedUpdate = function(value){
    this.needupdate = value;
};

THREECanvas.prototype.updatePosition = function(){
    this.camera.position.set(this.player.x, 0, this.player.z);
};

THREECanvas.prototype.updateRotation = function(){
    this.camera.rotation.set(0,this.player.rotY,0);
};

$().ready(function(){
$("body").keypress(function(event){
    switch(event.which){
        case 119:
            myThreeCanvas.player.moveForward();
            break;
        case 115:
            myThreeCanvas.player.moveBackward();
            break;
        case 100:
            myThreeCanvas.player.turnLeft();
            break;
        case 97:
            myThreeCanvas.player.turnRight();
            break;
    }
});
var myThreeCanvas = new THREECanvas();

myThreeCanvas.addGeometry(THREE.BoxGeometry, 50, 5, 1, new THREE.MeshBasicMaterial({color: 0xffffff, map: myThreeCanvas.textures[1]}), new THREE.Vector3(0, 0, -25), new THREE.Vector3(0,0,0));
myThreeCanvas.addGeometry(THREE.BoxGeometry, 50, 5, 1, new THREE.MeshBasicMaterial({color: 0xffffff, map: myThreeCanvas.textures[1]}), new THREE.Vector3(0, 0, 25), new THREE.Vector3(0,0,0));
myThreeCanvas.addGeometry(THREE.BoxGeometry, 50, 5, 1, new THREE.MeshBasicMaterial({color: 0xffffff, map: myThreeCanvas.textures[1]}), new THREE.Vector3(-25, 0, 0), new THREE.Vector3(0,Math.PI / 2,0));
myThreeCanvas.addGeometry(THREE.BoxGeometry, 50, 5, 1, new THREE.MeshBasicMaterial({color: 0xffffff, map: myThreeCanvas.textures[1]}), new THREE.Vector3(25, 0, 0), new THREE.Vector3(0,Math.PI / 2,0));
myThreeCanvas.addGeometry(THREE.BoxGeometry, 50, 50, 0.1, new THREE.MeshBasicMaterial({color: 0xffffff, map: myThreeCanvas.textures[0]}), new THREE.Vector3(0, -2, 0), new THREE.Vector3(Math.PI / 2,0,0));

myThreeCanvas.camera.position.z = 0;

function update()
{
    myThreeCanvas.render();
    myThreeCanvas.updatePosition();
    myThreeCanvas.updateRotation();
    // for(var i=0; i<myThreeCanvas.meshes.length;i++){
    //     myThreeCanvas.meshes[i].rotation.x += i * 0.01;
    // }
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
});




