/**
 * sphere Hitbox extends Hitbox
 * for sphere collision
 * 
 * based off https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
 */
class SphereHitbox extends Hitbox {
    constructor(x, y, z, radius) {
        super(x, y, z);
        this.radius = radius;
    }

    isColliding(other) {
        if (other instanceof Hitbox) {
            var otherPos = other.getPosition();
            if (other instanceof PointHitbox) {
                var distance = Math.sqrt((otherPos.elements[0] - this.position.elements[0]) * (otherPos.elements[0] - this.position.elements[0]) +
                    (otherPos.elements[1] - this.position.elements[1]) * (otherPos.elements[1] - this.position.elements[1]) +
                    (otherPos.elements[2] - this.position.elements[2]) * (otherPos.elements[2] - this.position.elements[2]));
                return distance < this.radius;
            } else if (other instanceof SphereHitbox) {
                var distance = Math.sqrt((otherPos.elements[0] - this.position.elements[0]) * (otherPos.elements[0] - this.position.elements[0]) +
                    (otherPos.elements[1] - this.position.elements[1]) * (otherPos.elements[1] - this.position.elements[1]) +
                    (otherPos.elements[2] - this.position.elements[2]) * (otherPos.elements[2] - this.position.elements[2]));
                return distance < (this.radius + other.radius);
            } else if (other instanceof AABBHitbox) {
                // get box closest point to sphere center by clamping
                var x = Math.max(other.minX, Math.min(this.position.elements[0], other.maxX));
                var y = Math.max(other.minY, Math.min(this.position.elements[1], other.maxY));
                var z = Math.max(other.minZ, Math.min(this.position.elements[2], other.maxZ));

                // this is the same as isPointInsideSphere
                var distance = Math.sqrt((x - this.position.elements[0]) * (x - this.position.elements[0]) +
                    (y - this.position.elements[1]) * (y - this.position.elements[1]) +
                    (z - this.position.elements[2]) * (z - this.position.elements[2]));

                return distance < sphere.radius;
            } else {
                return other.isColliding(this);
            }
        } else {
            console.log("sphere hitbox can only collide with other hitboxes");
        }
    }
}