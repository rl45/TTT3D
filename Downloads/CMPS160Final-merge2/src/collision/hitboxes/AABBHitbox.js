/**
 * Axis Aligned Bounding Box extends Hitbox
 * for box collision
 * 
 * based off https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
class AABBHitbox extends Hitbox {
    constructor(x, y, z, points) {
        super(x, y, z);
        this.boundingPoints = points; //Vector3 's in an array
        this.minX = x;
        this.maxX = x;
        this.minY = y;
        this.maxY = y;
        this.minZ = z;
        this.maxZ = z;

        this.updateBounds();
    }

    isColliding(other) {
        if (other instanceof Hitbox) {
            var otherPos = other.getPosition();
            if (other instanceof PointHitbox) {
                return ((otherPos.elements[0] > this.minX) && (otherPos.elements[0] < this.maxX) &&
                    (otherPos.elements[1] > this.minY) && (otherPos.elements[1] < this.maxY) &&
                    (otherPos.elements[2] > this.minZ) && (otherPos.elements[2] < this.maxZ));
            } else if (other instanceof AABBHitbox) {
                return ((other.maxX > this.minX) && (other.minX < this.maxX) &&
                    (other.maxY > this.minY) && (other.minY < this.maxY) &&
                    (other.maxZ > this.minZ) && (other.minZ < this.maxZ));
            }
        } else {
            return other.isColliding(this);
        }
    }

    updateBounds() {
        //create temp vars to use for calculating new bounds
        var tempMinX = Number.MAX_VALUE;
        var tempMinY = Number.MAX_VALUE;
        var tempMinZ = Number.MAX_VALUE;
        var tempMaxX = Number.MIN_VALUE;
        var tempMaxY = Number.MIN_VALUE;
        var tempMaxZ = Number.MIN_VALUE;

        for (var i = 0; i < this.boundingPoints.length; i++) {
            //point = points[i];
            var point = this.modelMatrix.multiplyVector3(this.boundingPoints[i]);
            tempMinX = Math.min(point.elements[0], tempMinX);
            tempMinY = Math.min(point.elements[1], tempMinY);
            tempMinZ = Math.min(point.elements[2], tempMinZ);
            tempMaxX = Math.max(point.elements[0], tempMaxX);
            tempMaxY = Math.max(point.elements[1], tempMaxY);
            tempMaxZ = Math.max(point.elements[2], tempMaxZ);
        }

        this.minX = tempMinX;
        this.maxX = tempMaxX;
        this.minY = tempMinY;
        this.maxY = tempMaxY;
        this.minZ = tempMinZ;
        this.maxZ = tempMaxZ;
    }

    update() {
        super.update();
        if (isAnimated) {
            updateBounds();
        }
    }
}