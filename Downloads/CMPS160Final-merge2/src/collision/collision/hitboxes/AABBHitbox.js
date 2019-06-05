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
            other.isColliding(this);
        }
    }

    updateBounds() {
        for (var i = 0; i < this.boundingPoints.length; i++) {
            //point = points[i];
            var point = this.modelMatrix.multiplyVector3(this.boundingPoints[i]);
            this.minX = Math.min(point[0], this.minX);
            this.minY = Math.min(point[1], this.minY);
            this.minZ = Math.min(point[2], this.minZ);
            this.maxX = Math.max(point[0], this.maxX);
            this.maxY = Math.max(point[1], this.maxY);
            this.maxZ = Math.max(point[2], this.maxZ);
        }
    }

    update() {
        super.update();
        if (isAnimated) {
            updateBounds();
        }
    }
}