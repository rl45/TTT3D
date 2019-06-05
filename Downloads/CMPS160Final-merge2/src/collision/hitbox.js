/**
 * Hitbox base code for inheriting in later hitboxes
 */

class Hitbox {
    /**
     * constructor for a generic Hitbox
     */
    constructor(x, y, z, transform) {
        this.modelMatrix = new Matrix4();
        this.basePosition = new Vector3([x, y, z]);  //distance from (0, 0, 0)
        this.position = new Vector3([x, y, z]);      //absolute position
        this.isMoving = true;

        if (transform) {
            this.updateTransform(transform);
        }
    }

    /**
     * Check for collision with other hitboxes in an array
     * @param {any} other
     */
    checkCollision(others) {
        for (var i = 0; i < others.length; i++) {
            if (this.isColliding(others[i])) {
                //console.log("collision!!");
                return true;
            }
            //console.log("no collision");
            return false;
        }
    }

    isColliding(other) {
        //console.log("generic hitbox cannot collide with other hitboxes");
    }

    getPosition() {
        return this.position;
    }

    /**
     * Update the transform matrix, to a given one if provided
     */
    updateTransform(matrix) {
        if (matrix) {
            this.modelMatrix = matrix;
        } else {
            console.log("static hitbox transforms are NYI");

            //this.modelMatrix.setIdentity(); //reset the order
            ////---new multiply order--- 
            //this.modelMatrix = this.modelMatrix.multiply(this.transMatrix);
            //this.modelMatrix = this.modelMatrix.multiply(this.rotMatrix);
            //this.modelMatrix = this.modelMatrix.multiply(this.scaleMatrix);
        }

        //this.position = this.modelMatrix.multiplyVector3(this.basePosition);
    }

    setPosition(x, y, z) {
        this.position.elements[0] = x;
        this.position.elements[1] = y;
        this.position.elements[2] = z;
        //console.log("position:", this.position.elements[0], this.position.elements[1], this.position.elements[2])
    }

    update() {
        if (this.isMoving) {
            this.position = this.modelMatrix.multiplyVector3(this.basePosition);
        }
    }
}