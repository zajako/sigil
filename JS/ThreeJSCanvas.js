function Player(grid){
    this.x = 0;
    this.z = 0;
    this.gridX = 0;
    this.gridZ = 0;
    this.rotY = 0;
    this.grid = grid;
}

Player.prototype.moveForward = function(){
    if(this.rotY === 0){
        if(this.grid[this.gridZ - 1][this.gridX] !== 0){
            this.z -= 5;
            this.gridZ -= 1;
        }
    }
    else if(this.rotY == Math.PI / 2 || this.rotY == (-3 * Math.PI / 2)){
        if(this.grid[this.gridZ][this.gridX - 1] !== 0){
            this.x -= 5;
            this.gridX -= 1;
        }
    }
    else if(this.rotY == (3 * Math.PI / 2) || this.rotY == -Math.PI / 2){
        if(this.grid[this.gridZ][this.gridX + 1] !== 0){
            this.x += 5;
            this.gridX += 1;
        }
    }
    else if(this.rotY == Math.PI || this.rotY == -Math.PI){
        if(this.grid[this.gridZ + 1][this.gridX] !== 0){
            this.z += 5;
            this.gridZ += 1;
        }
    }
};

Player.prototype.moveBackward = function(grid){
    if(this.rotY === 0){
        if(this.grid[this.gridZ + 1][this.gridX] !== 0){
            this.z += 5;
            this.gridZ += 1;
        }
    }
    else if(this.rotY == Math.PI / 2 || this.rotY == (-3 * Math.PI / 2)){
        if(this.grid[this.gridZ][this.gridX + 1] !== 0){
            this.x += 5;
            this.gridX += 1;
        }
    }
    else if(this.rotY == (3 * Math.PI / 2) || this.rotY == -Math.PI / 2){
        if(this.grid[this.gridZ][this.gridX - 1] !== 0){
            this.x -= 5;
            this.gridX -= 1;
        }
    }
    else if(this.rotY == Math.PI || this.rotY == -Math.PI){
        if(this.grid[this.gridZ - 1][this.gridX] !== 0){
            this.z -= 5;
            this.gridZ -= 1;
        }
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

    this.map = new Map();
    this.player = new Player(this.map.grid);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.loader = new THREE.JSONLoader();

    this.materials = [new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide})];
    this.meshes = [];
    this.textures = [];

    this.init();
}

THREECanvas.prototype.init = function(){
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );
    this.loadTexture("./IMG/Textures/CobbleFloor.png", 100, 100);
    this.loadTexture("./IMG/Textures/TempleWall.png", 1, 1);
    for(var i=0; i < this.map.grid.length; i++){
        for(var j=0; j < this.map.grid[i].length; j++){
            if(this.map.grid[i][j] === 0){
                this.addWallSegment(j, i);
            }
            if(this.map.grid[i][j] === 2){
                this.player.x = j * 5;
                this.player.z = i * 5;
                this.player.gridX = j;
                this.player.gridZ = i;
            }
        }
    }
    for(var k=0; k < 50; k++){
        this.loadModelGeometry("./MODELS/candle2.json", new THREE.Vector3(getRandomArbitrary(-25, 25), getRandomArbitrary(1, 2), getRandomArbitrary(-25, 25)), new THREE.Vector3(0,0,0));
    }

    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 500, 500, 0.01), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[0]}), new THREE.Vector3(0, -2, 0), new THREE.Vector3(Math.PI / 2,0,0));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

THREECanvas.prototype.addWallSegment = function(x, y){
    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 5, 5, 5), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[1]}), new THREE.Vector3(x * 5, 0.5, y * 5), new THREE.Vector3(0,0,0));
};

THREECanvas.prototype.makeGeometry = function(geoType, width, height, depth){
    var geo = new geoType(width, height, depth);
    return geo;
};

THREECanvas.prototype.addMeshToScene = function(geo, material, position, rotation){
    var mesh;
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

THREECanvas.prototype.loadModelGeometry = function(pathName, position, rotation){
    var myCanvas = this;
    var test = this.loader.load(pathName, function(geometry){
        myCanvas.addMeshToScene(geometry, new THREE.MeshBasicMaterial({color: 0xffffff}), position, rotation);
    });
};

THREECanvas.prototype.setNeedUpdate = function(value){
    this.needupdate = value;
};

THREECanvas.prototype.updatePosition = function(){
    this.camera.position.set(this.player.x, 0.5, this.player.z);
};

THREECanvas.prototype.updateRotation = function(){
    this.camera.rotation.set(0,this.player.rotY,0);
};

$().ready(function(){
$("body").keypress(function(event){
    switch(event.which){
        case 119:
            myThreeCanvas.player.moveForward(myThreeCanvas.map.grid);
            break;
        case 115:
            myThreeCanvas.player.moveBackward(myThreeCanvas.map.grid);
            break;
        case 100:
            myThreeCanvas.player.turnLeft();
            break;
        case 97:
            myThreeCanvas.player.turnRight();
            break;
    }
});

function update()
{
    myThreeCanvas.render();
    myThreeCanvas.updatePosition();
    myThreeCanvas.updateRotation();
    requestAnimationFrame(update);
}

requestAnimationFrame(update);
});




