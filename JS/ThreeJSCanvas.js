var clock = new THREE.Clock();
var options, spawnerOptions, tick = 0;

function Player(grid){
    this.x = 0;
    this.z = 0;
    this.gridX = 0;
    this.gridZ = 0;
    this.rotY = 0;
    this.desiredRotY = 0;
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

Player.prototype.setTurnLeft = function(){
    if(this.rotY + Math.PI / 2 >= Math.PI * 2){
        this.desiredRotY = 0;
    }
    else{
        this.desiredRotY += (Math.PI / 2);
    }
};

Player.prototype.setTurnRight = function(){
    if(this.rotY - Math.PI / 2 <= Math.PI * -2){
        this.desiredRotY = 0;
    }
    else{
        this.desiredRotY -= (Math.PI / 2);
    }
};

Player.prototype.facingEnum = {
    "Forward" : 0,
    "Backward" : Math.PI,
    "Left" : 3 * Math.PI / 2,
    "Right" : Math.PI / 2
};

Player.prototype.lerpRotation = function(deltaTime){
    this.rotY = this.desiredRotY;
};

function THREECanvas(){
    this.width = 800;
    this.height = 450;

    this.deltaTime = 0;

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
    this.enemies = [];
    this.particleSystems = [];

    this.init();
}

THREECanvas.prototype.init = function(){
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );
    this.loadTexture("./IMG/Textures/CobbleFloor.png", 100, 100);
    this.loadTexture("./IMG/Textures/TempleWall.png", 1, 1);
    this.loadTexture("./IMG/Textures/DummyUVs_textured.png", 1, 1);
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
    this.addParticleSystem('Fire', 1500, 0xffffff, 0.1, new THREE.Vector3(this.player.x, 1, this.player.z));
    // for(var k=0; k < 50; k++){
    //     this.loadModelGeometry("./MODELS/candle2.json", new THREE.Vector3(getRandomArbitrary(-25, 25), getRandomArbitrary(1, 2), getRandomArbitrary(-25, 25)), new THREE.Vector3(0,0,0));
    // }
    this.loadModelGeometry("./MODELS/Dummy.json", new THREE.Vector3(this.player.x,-1.5,this.player.z), new THREE.Vector3(0,0,0), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[2]}), true);
    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 500, 500, 0.01), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[0]}), new THREE.Vector3(0, -2, 0), new THREE.Vector3(Math.PI / 2,0,0));
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

THREECanvas.prototype.addWallSegment = function(x, y){
    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 5, 5, 5), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[1]}), new THREE.Vector3(x * 5, 0.5, y * 5), new THREE.Vector3(0,0,0));
};

THREECanvas.prototype.addParticleSystem = function(name, particleCount, color, size, position){
    var particleSystem = new THREE.GPUParticleSystem({
        maxParticles: 50000
      });
      this.scene.add( particleSystem);
      this.particleSystems.push(particleSystem);

      // options passed during each spawned
      options = {
        position: new THREE.Vector3(0, 0, 0),
        positionRandomness: .5,
        velocity: new THREE.Vector3(0, 0, 0),
        velocityRandomness: 0,
        color: 0xff8000,
        colorRandomness: .3,
        turbulence: 0,
        lifetime: 2,
        size: 3,
        sizeRandomness: 1
      };

      spawnerOptions = {
        spawnRate: 5000,
        horizontalSpeed: 0,
        verticalSpeed: 0,
        timeScale: 1
      };

      this.scene.add(particleSystem);
};

THREECanvas.prototype.makeGeometry = function(geoType, width, height, depth){
    var geo = new geoType(width, height, depth);
    return geo;
};

THREECanvas.prototype.addMeshToScene = function(geo, material, position, rotation, isEnemy){
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
    if(isEnemy){
        this.enemies.push(mesh);
    }
};

THREECanvas.prototype.addMaterial = function(color){
    this.materials[this.materials.length - 1] = new THREE.MeshBasicMaterial({color: color});
};

THREECanvas.prototype.render = function() {
    this.renderer.render(this.scene, this.camera);
};

THREECanvas.prototype.loadTexture = function(name, repeatX, repeatY){
    var texture = THREE.ImageUtils.loadTexture( name );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( repeatX, repeatY );
    this.textures.push(texture);
};

THREECanvas.prototype.loadModelGeometry = function(pathName, position, rotation, material, isEnemy){
    var myCanvas = this;
    var test = this.loader.load(pathName, function(geometry){
        myCanvas.addMeshToScene(geometry, material === undefined ? myCanvas.materials[0] : material, position, rotation, isEnemy);
    });
};

THREECanvas.prototype.setNeedUpdate = function(value){
    this.needupdate = value;
};

THREECanvas.prototype.updatePosition = function(){
    this.camera.position.set(this.player.x, 0.5, this.player.z);
};

THREECanvas.prototype.updateRotation = function(deltaTime){
    this.player.lerpRotation(deltaTime);
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
            myThreeCanvas.player.setTurnRight(myThreeCanvas.deltaTime);
            break;
        case 97:
            myThreeCanvas.player.setTurnLeft(myThreeCanvas.deltaTime);
            break;
    }
});

function update()
{
    this.deltaTime = clock.getDelta();
    myThreeCanvas.render();
    myThreeCanvas.updatePosition();
    myThreeCanvas.updateRotation(deltaTime);
    for(var i=0; i < myThreeCanvas.enemies.length; i++){
        myThreeCanvas.enemies[i].rotateY();
    }
    var delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;

    if (tick < 0) tick = 0;

    if (delta > 0) {
        options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
        options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
        options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;

        for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
          // Yep, that's really it.  Spawning particles is super cheap, and once you spawn them, the rest of
          // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
          myThreeCanvas.particleSystems[0].spawnParticle(options);
        }
    }

    myThreeCanvas.particleSystems[0].update(tick);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
});