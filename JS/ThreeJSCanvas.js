var clock = new THREE.Clock();
var options = [], spawnerOptions = [], tick = 0;

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

    this.elementEnum = {"fire" : 0, "water" : 1, "earth" : 2, "air" : 3};
    
    this.particleSystems = [];

    //Actual Non Mesh Information Storage 
    this.bullets = [];
    this.monsters = [];

    this.init();
}

THREECanvas.prototype.init = function(){
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );

    this.loadIn();
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

THREECanvas.prototype.addWallSegment = function(x, y)
{
    var wall = Math.floor(Math.random() * 7 + 4);

    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 5, 5, 5), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[wall]}), new THREE.Vector3(x * 5, 0.5, y * 5), new THREE.Vector3(0,0,0));
};

THREECanvas.prototype.addFloorSegment = function(x, y){
    var floor = Math.floor(Math.random() * 4);

    this.addMeshToScene(this.makeGeometry(THREE.BoxGeometry, 5, 5, 0.1), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[floor], side: THREE.DoubleSide}), new THREE.Vector3(x * 5, -2, y * 5), new THREE.Vector3(Math.PI / 2,0,0));
};

THREECanvas.prototype.loadIn = function(){
//Load textures
    this.loadTexture("./IMG/Textures/CobbleFloor.png", 1, 1);
    this.loadTexture("./IMG/Textures/CobbleFloor2.png", 1, 1);
    this.loadTexture("./IMG/Textures/CobbleFloor3.png", 1, 1);
    this.loadTexture("./IMG/Textures/CobbleFloor4.png", 1, 1);

    this.loadTexture("./IMG/Textures/TempleWall.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall2.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall3.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall4.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall5.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall6.png", 1, 1);
    this.loadTexture("./IMG/Textures/TempleWall7.png", 1, 1);
    this.loadTexture("./IMG/Textures/DummyUVs_textured.png", 1, 1);

//Particle Systems
    this.addParticleSystem({name: 'fire', maxParticles: 75000, spawnRate: 12500, color: 0xff6600, positionRandomness: .3, verticalSpeed: 1.33, horizontalSpeed: 1.5, velocity: new THREE.Vector3(0, 0, 0), size: 15, position: new THREE.Vector3(-500, -5, -500), velocityRandomness: 0, lifetime: .1, turbulence: 0});
    this.addParticleSystem({name: 'water', maxParticles: 75000, spawnRate: 12500, color: 0x33cbff, positionRandomness: .3, verticalSpeed: 1.33, horizontalSpeed: 1.5, velocity: new THREE.Vector3(0, 0, 0), size: 15, position: new THREE.Vector3(-500, -5, -500), velocityRandomness: 0, lifetime: .1, turbulence: 0});
    this.addParticleSystem({name: 'earth', maxParticles: 75000, spawnRate: 12500, color: 0x734d26, positionRandomness: .3, verticalSpeed: 1.33, horizontalSpeed: 1.5, velocity: new THREE.Vector3(0, 0, 0), size: 15, position: new THREE.Vector3(-500, -5, -500), velocityRandomness: 0, lifetime: .1, turbulence: 0});
    this.addParticleSystem({name: 'air', maxParticles: 75000, spawnRate: 12500, color: 0xd9d9d9, positionRandomness: .3, verticalSpeed: 1.33, horizontalSpeed: 1.5, velocity: new THREE.Vector3(0, 0, 0), size: 15, position: new THREE.Vector3(-500, -5, -500), velocityRandomness: 0, lifetime: .1, turbulence: 0});
//LoadWalls and floor
    for(var i=0; i < this.map.grid.length; i++){
        for(var j=0; j < this.map.grid[i].length; j++){
            var value = this.map.grid[i][j];
            //I'm a wall segment
            if(value === 0){
                this.addWallSegment(j, i);
            }
            //I'm not!
            if(value !== 0){
                this.addFloorSegment(j, i);
            }
            //I'm the player
            if(value === 2){
                this.player.x = j * 5;
                this.player.z = i * 5;
                this.player.gridX = j;
                this.player.gridZ = i;
            }
            if($.inArray(value, monsterTypeEnum))
            {
                this.spawnMonster(monsterTypeEnum[value], value, 0);
            }
        }
    }

// LoadGeometries
    this.spawnMonster(dummy, new THREE.Vector3(this.player.x, -1.5, this.player.z), new THREE.Vector3(0,0,0));
};

THREECanvas.prototype.spawnMonster = function(monsterType, position, rotation){
    var myMonster = monsterType.clone();
    var monsterMesh = this.loadModelGeometry(monsterType.modelPathName, position, rotation, new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[monsterType.textureId]}));
    myMonster.setMesh(monsterMesh);
    this.monsters.push(myMonster);
};

THREECanvas.prototype.spawnPlayerProjectile = function(element, accent, targets, spell){
    // var projGroup = new Object3D();
    for(var i=0; i < targets.length;i++){
        var myMesh = this.addMeshToScene(this.makeGeometry(THREE.SphereGeometry, 0.5,16,16),
            new THREE.MeshBasicMaterial({color: 0xffffff, visible: false}),
            new THREE.Vector3(this.player.x, 0.5, this.player.z),
            new THREE.Vector3(0,0,0));

        var proj = new Projectile({x: this.player.gridX, y: 1, z: this.player.gridZ}, myMesh, this.elementEnum[element]);
        proj.setSpell(spell);
        proj.playSound();

        if(this.player.rotY === 0){
            if(this.player.grid[this.player.gridZ - 1][this.player.gridX] !== 0){
                proj.addZ = -0.1;
            }
        }
        else if(this.player.rotY == 90 || this.player.rotY == -270){
            if(this.player.grid[this.player.gridZ][this.player.gridX - 1] !== 0){
                proj.addX = -0.1;
            }
        }
        else if(this.player.rotY == 270 || this.player.rotY == -90){
            if(this.player.grid[this.player.gridZ][this.player.gridX + 1] !== 0){
                proj.addX = 0.1;
            }
        }
        else if(this.player.rotY == 180 || this.player.rotY == -180){
            if(this.player.grid[this.player.gridZ + 1][this.player.gridX] !== 0){
                proj.addZ = 0.1;
            }
        }
        // this.particleSystems[0].rotation.set(0,degreesToRadians(this.player.rotY),0);
        this.bullets.push(proj);
    }
};

THREECanvas.prototype.addParticleSystem = function(args){
    var particleSystem = new THREE.GPUParticleSystem({
        maxParticles: args.maxParticles ? args.maxParticles : 50000
    });
    particleSystem.name = args.name ? args.name : "newParticleSystem";
    this.scene.add( particleSystem);
    this.particleSystems.push(particleSystem);

    // options passed during each spawned
    var myOptions = {
        position: args.position ? args.position : new THREE.Vector3(0,0,0),
        positionRandomness: args.positionRandomness ? args.positionRandomness : 0,
        velocity: args.velocity ? args.velocity : new THREE.Vector3(0,0,0),
        velocityRandomness: args.velocityRandomness ? args.velocityRandomness : 0,
        color: args.color ? args.color : 0xffffff,
        colorRandomness: args.colorRandomness ? args.colorRandomness : .3,
        turbulence: args.turbulence ? args.turbulence : 0,
        lifetime: args.lifetime ? args.lifetime : .5,
        size: args.size ? args.size : 1,
        sizeRandomness: args.sizeRandomness ? args.sizeRandomness : 1,
        smoothPosition: args.smoothPosition ? args.smoothPosition : true
    };

    var mySpawnerOptions = {
        spawnRate: args.spawnRate ? args.spawnRate : 5000,
        horizontalSpeed: args.horizontalSpeed ? args.horizontalSpeed : 0,
        verticalSpeed: args.verticalSpeed ? args.verticalSpeed : 0,
        timeScale: args.timeScale ? args.timeScale : 1
    };

    options.push(myOptions);
    spawnerOptions.push(mySpawnerOptions);

    this.scene.add(particleSystem);
};

THREECanvas.prototype.getParticleSystemFor = function(thing){
    return this.particleSystems[0];
};

THREECanvas.prototype.makeGeometry = function(geoType, width, height, depth){
    var geo = new geoType(width, height, depth);
    return geo;
};

THREECanvas.prototype.addMeshToScene = function(geo, material, position, rotation, type){
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
    return mesh;
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

THREECanvas.prototype.loadModelGeometry = function(pathName, position, rotation, material, type){
    var myCanvas = this;
    var test = this.loader.load(pathName, function(geometry){
        myCanvas.addMeshToScene(geometry, material === undefined ? myCanvas.materials[0] : material, position, rotation, type);
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
    this.camera.rotation.set(0,degreesToRadians(this.player.rotY),0);
};

THREECanvas.prototype.processTurn = function(){

};

THREECanvas.prototype.processProjectiles = function(tick){
    for(var k=0;k<this.bullets.length;k++){
        this.bullets[k].mesh.position.x += this.bullets[k].addX;
        this.bullets[k].mesh.position.z += this.bullets[k].addZ;

        //Movement shenanigans
        this.bullets[k].mesh.position.y = Math.sin(( 8 * tick) * degreesToRadians(45));

        //Update the particle system 'options' position to the new bullet position. This is just an easy way to make sure
        //particles are being spawned in the correct location
        options[this.bullets[k].element].position.x = this.bullets[k].mesh.position.x;
        options[this.bullets[k].element].position.y = this.bullets[k].mesh.position.y;
        options[this.bullets[k].element].position.z = this.bullets[k].mesh.position.z;
    }
};

THREECanvas.prototype.processParticles = function(delta, tick){
    if (tick < 0) tick = 0;

    if (delta > 0) {
        for(var i=0;i< spawnerOptions.length;i++){
            for (var x = 0; x < spawnerOptions[i].spawnRate * delta; x++) {
              // Yep, that's really it.  Spawning particles is super cheap, and once you spawn them, the rest of
              // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
              // myThreeCanvas.particleSystems[0].spawnParticle(options);
              myThreeCanvas.particleSystems[i].spawnParticle(options[i]);
            }
        }
    }
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

    // for(var i=0; i < myThreeCanvas.enemies.length; i++){
    //     myThreeCanvas.enemies[i].position;
    // }
    var delta = clock.getDelta() * spawnerOptions[0].timeScale;
    tick += delta;

    myThreeCanvas.processParticles(delta, tick);
    myThreeCanvas.processProjectiles(tick);

    if (tick < 0) tick = 0;

    myThreeCanvas.particleSystems[0].update(tick);
    myThreeCanvas.particleSystems[1].update(tick);
    myThreeCanvas.particleSystems[2].update(tick);
    myThreeCanvas.particleSystems[3].update(tick);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
});




