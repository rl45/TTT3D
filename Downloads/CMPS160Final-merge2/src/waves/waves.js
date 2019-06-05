var _Waves = null;
var _hitboxCategory_terrain = 1;

class Waves {
    constructor(scene, camera) {
        //generic init stuff
        this.scene = scene;
        this.camera = camera;
        _Waves = this;

        //init images
        this.WavesImg = new Image();

        //---------build stuff-------------
        //build Waves
        this.Waves = new Terrain(32, 0, 6.0);
        this.WavesImg.onload = function () {
            console.log("Waves img loaded!", _Waves.WavesImg.src)
            _Waves.buildWaves();
        }
        this.WavesImg.src = "objs/water.jpg";

        //add side hitboxes
        this.buildBoundingWallHitboxes(0, 0, 32, 32);

        //set camera position
        camera.eye = new Vector3([4, 4, 4]);
        camera.center = new Vector3([32, 4, 32]);
        camera.updateView();
    }

    buildWaves() {
        //geometry stuff
        var WavesGeom = new TerrainRendering(texture_shader, 0, 10, 0, 1.0, this.Waves.points, this.Waves.xDim, this.Waves.zDim, this.WavesImg);
        this.scene.addGeometry(WavesGeom);

        //hitbox stuff
        var WavesHitbox = new AABBHitbox(0, 0, 0, [new Vector3([0, 1, 0]), new Vector3([32, -1, 32])]);
        WavesHitbox.updateBounds();
        _hitboxHandler.addHitboxToCategory(WavesHitbox, _hitboxCategory_terrain);
    }

    buildBoundingWallHitboxes(minX, minZ, maxX, maxZ) {
        //create hitboxes
        var hitboxW = new AABBHitbox(0, 0, 0, [new Vector3([minX, -1, minZ]), new Vector3([minX - 1, 1000, maxZ])]);//ok
        //hitboxW.updateBounds();
        var hitboxE = new AABBHitbox(0, 0, 0, [new Vector3([maxX, -1, minZ]), new Vector3([maxX + 1, 1000, maxZ])]);//issue?
        //hitboxE.updateBounds();
        var hitboxN = new AABBHitbox(0, 0, 0, [new Vector3([minX, -1, minZ]), new Vector3([maxX, 1000, minZ - 1])]);//ok
        //hitboxN.updateBounds();
        var hitboxS = new AABBHitbox(0, 0, 0, [new Vector3([minX, -1, maxZ]), new Vector3([maxX, 1000, maxZ + 1])]);
        //hitboxS.updateBounds();

        //add hitboxes to handler
        _hitboxHandler.addHitboxToCategory(hitboxE, _hitboxCategory_terrain);
        _hitboxHandler.addHitboxToCategory(hitboxW, _hitboxCategory_terrain);
        _hitboxHandler.addHitboxToCategory(hitboxN, _hitboxCategory_terrain);
        _hitboxHandler.addHitboxToCategory(hitboxS, _hitboxCategory_terrain);
    }
}