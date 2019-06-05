var _seascape = null;
var _hitboxCategory_terrain = 1;

class Seascape {
    constructor(scene, camera) {
        //generic init stuff
        this.scene = scene;
        this.camera = camera;
        _seascape = this;

        //init images
        this.seafloorImg = new Image();

        //---------build stuff-------------
        //build seafloor
        this.seafloor = new Terrain(32, 0, 6.0);
        this.seafloorImg.onload = function () {
            console.log("seafloor img loaded!", _seascape.seafloorImg.src)
            _seascape.buildSeafloor();
        }
        this.seafloorImg.src = "objs/sand.jpg";

        //add side hitboxes
        this.buildBoundingWallHitboxes(0, 0, 32, 32);

        //set camera position
        camera.eye = new Vector3([4, 4, 4]);
        camera.center = new Vector3([32, 4, 32]);
        camera.updateView();
    }

    buildSeafloor() {
        //geometry stuff
        var seafloorGeom = new TerrainRendering(texture_shader, 0, 0, 0, 1.0, this.seafloor.points, this.seafloor.xDim, this.seafloor.zDim, this.seafloorImg);
        this.scene.addGeometry(seafloorGeom);

        //hitbox stuff
        var seafloorHitbox = new AABBHitbox(0, 0, 0, [new Vector3([0, 1, 0]), new Vector3([32, -1, 32])]);
        seafloorHitbox.updateBounds();
        _hitboxHandler.addHitboxToCategory(seafloorHitbox, _hitboxCategory_terrain);
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