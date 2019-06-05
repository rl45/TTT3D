/**
 * Point Hitbox extends Hitbox
 * for point collision
 */
class PointHitbox extends Hitbox {
    constructor(x, y, z) {
        super(x, y, z);
    }

    isColliding(other) {
        //console.log("point hitbox cannot collide with other hitboxes");
        var otherPos = other.getPosition();
        if (other instanceof PointHitbox) {
            return otherPos == this.position;
        } else {
            return other.isColliding(this);
        }
    }
}