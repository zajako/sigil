var clock = new THREE.Clock();
var options, spawnerOptions, tick = 0;





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
    this.projectiles = [];
    
    this.particleSystems = [];


    //Actual Non Mesh Information Storage 
    this.bullets = [];
    this.monsters = [];

    this.init();
}

THREECanvas.prototype.init = function(){
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );


    this.loadIn()

    this.addParticleSystem({name: 'Fire', maxParticles: 250000, spawnRate: 15000, color: 0xff6600, positionRandomness: .4, verticalSpeed: 1.33, horizontalSpeed: 1.5, velocity: new THREE.Vector3(0, 0, 0), size: 3, position: new THREE.Vector3(0, 0, 0), velocityRandomness: .2, lifetime: 3, turbulence: .05});
    // this.addParticleSystem('Fire', 1500, 0xffffff, 0.1, new THREE.Vector3(this.player.x, 1, this.player.z));
    // for(var k=0; k < 50; k++){
    //     this.loadModelGeometry("./MODELS/candle2.json", new THREE.Vector3(getRandomArbitrary(-25, 25), getRandomArbitrary(1, 2), getRandomArbitrary(-25, 25)), new THREE.Vector3(0,0,0));
    // }

    //var proj = new Projectile({x: this.player.gridX, y: 1, z: this.player.gridZ}, this.projectiles[this.projectiles.length - 1]);

    
};

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

THREECanvas.prototype.addWallSegment = function(x, y)
{
    var wall = Math.floor(Math.random() * 4 + 4);

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
    this.loadTexture("./IMG/Textures/DummyUVs_textured.png", 1, 1);

//LoadWalls and floor
    for(var i=0; i < this.map.grid.length; i++){
        for(var j=0; j < this.map.grid[i].length; j++){
            if(this.map.grid[i][j] === 0){
                this.addWallSegment(j, i);
            }
            if(this.map.grid[i][j] !== 0){
                this.addFloorSegment(j, i);
            }
            if(this.map.grid[i][j] === 2){
                this.player.x = j * 5;
                this.player.z = i * 5;
                this.player.gridX = j;
                this.player.gridZ = i;
            }
        }
    }

//LoadGeometries
    this.loadModelGeometry("./MODELS/Dummy.json", new THREE.Vector3(this.player.x,-1.5,this.player.z), new THREE.Vector3(0,0,0), new THREE.MeshBasicMaterial({color: 0xffffff, map: this.textures[8]}), "enemy");
};

THREECanvas.prototype.spawnPlayerProjectile = function(element, accent, targets, spell){
    // var projGroup = new Object3D();
    for(var i=0; i < targets.length;i++){
        this.addMeshToScene(this.makeGeometry(THREE.SphereGeometry, .5, 16, 16), 
            new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: .15}), 
            new THREE.Vector3(this.player.x, 0, this.player.z), 
            new THREE.Vector3(0,0,0), "projectile");


        var proj = new Projectile({x: this.player.gridX, y: 1, z: this.player.gridZ}, this.projectiles[this.projectiles.length - 1]);
        proj.setSpell(spell);

        if(this.player.rotY === 0){
            if(this.player.grid[this.player.gridZ - 1][this.player.gridX] !== 0){
                proj.addZ = -0.5;
            }
        }
        else if(this.player.rotY == radiansToDegrees(Math.PI / 2) || this.player.rotY == radiansToDegrees((-3 * Math.PI / 2))){
            if(this.player.grid[this.player.gridZ][this.player.gridX - 1] !== 0){
                proj.addX = -0.5;
            }
        }
        else if(this.player.rotY == radiansToDegrees((3 * Math.PI / 2)) || this.player.rotY == radiansToDegrees(-Math.PI / 2)){
            if(this.player.grid[this.player.gridZ][this.player.gridX + 1] !== 0){
                proj.addX = 0.5;
            }
        }
        else if(this.player.rotY == radiansToDegrees(Math.PI) || this.player.rotY == radiansToDegrees(-Math.PI)){
            if(this.player.grid[this.player.gridZ + 1][this.player.gridX] !== 0){
                proj.addZ = 0.5;
            }
        }
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
    options = {
        position: args.position ? args.position : new THREE.Vector3(0,0,0),
        positionRandomness: args.positionRandomness ? args.positionRandomness : 0,
        velocity: args.velocity ? args.velocity : new THREE.Vector3(0,0,0),
        velocityRandomness: args.velocityRandomness ? args.velocityRandomness : 0,
        color: args.color ? args.color : 0xffffff,
        colorRandomness: args.colorRandomness ? args.colorRandomness : .3,
        turbulence: args.turbulence ? args.turbulence : 0,
        lifetime: args.lifetime ? args.lifetime : 2,
        size: args.size ? args.size : 1,
        sizeRandomness: args.sizeRandomness ? args.sizeRandomness : 1
    };

    spawnerOptions = {
        spawnRate: args.spawnRate ? args.spawnRate : 5000,
        horizontalSpeed: args.horizontalSpeed ? args.horizontalSpeed : 0,
        verticalSpeed: args.verticalSpeed ? args.verticalSpeed : 0,
        timeScale: args.timeScale ? args.timeScale : 1
    };

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
    if(type == "enemy"){
        var dummy1 = dummy.clone();
        dummy1.setMesh(mesh);
        this.monsters.push(dummy1);

        // debugger;


        this.enemies.push(mesh);
    }
    else if(type == "projectile"){
        this.projectiles.push(mesh);
    }
    else{
        this.meshes.push(mesh);
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





    for (var x = 0; x < myThreeCanvas.bullets.length; x++)
    {
        myThreeCanvas.bullets[x].mesh.position.z += myThreeCanvas.bullets[x].addZ;
        myThreeCanvas.bullets[x].mesh.position.x += myThreeCanvas.bullets[x].addX;


        // debugger;
        for (var x2 = 0; x2 < myThreeCanvas.monsters.length; x2++)
        {
           // debugger;
            var differencez = myThreeCanvas.monsters[x2].mesh.position.z - myThreeCanvas.bullets[x].mesh.position.z;
            var differencex = myThreeCanvas.monsters[x2].mesh.position.x - myThreeCanvas.bullets[x].mesh.position.x;
            // debugger;
            if((differencez > 0.01 || differencez < 0.01) && (differencex > 0.01 || differencex < 0.01))
            {

        //         for (var i = bullets.length-1; i >= 0; i--) {
        // var b = bullets[i], p = b.position, d = b.ray.direction;
        // if (checkWallCollision(p)) {
        //     bullets.splice(i, 1);
        //     scene.remove(b);
        //     continue;
        // }
                
                console.log("WE HIT THE JACKPOT!!");



                myThreeCanvas.monsters[x2].onContact(myThreeCanvas.bullets[x].spell);

                var b = myThreeCanvas.bullets[x].mesh;
                myThreeCanvas.bullets.splice(x, 1);
                myThreeCanvas.scene.remove(b);



                continue;


                // myThreeCanvas.scene.remove(myThreeCanvas.bullets[x].mesh);
                // myThreeCanvas.scene.remove(myThreeCanvas.bullets[x]);
                // myThreeCanvas.bullets[x] =  "";
                // break;


                // debugger;
             



            }
            

        }


    }
    
    
    

    myThreeCanvas.particleSystems[0].update(tick);

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
});




