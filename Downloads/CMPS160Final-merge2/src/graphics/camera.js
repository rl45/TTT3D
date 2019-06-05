/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 *  @author student -- Lawrence Tam
 * @this {Renderer}
 */

 var harpoonX;
 var harpoonY;
 var harpoonZ;
class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Camera} Camera object created
    */
    constructor(canvas) {
        this.speed = 0.1;
        this.canvas = canvas;

        // Camera view attributes
        this.eye     = new Vector3([0, 0, 2]);
        this.center  = new Vector3([0, 0,-1]);
        this.up      = new Vector3([0, 1, 0]);

        // Create variables for transformation calculations
        this.viewMatrix = new Matrix4();
        this.updateView();
        this.projectionMatrix = new Matrix4();
        this.tiltRotate = new Matrix4();
        this.panRotate = new Matrix4();

        // Set perspective for camera
        this.fovy = 90;
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.zNear = 0.1;
        this.zFar = 100;
        this.projectionMatrix.setPerspective(this.fovy, this.aspectRatio, this.zNear, this.zFar);

        // Variables for camera functions
        this.fovy_delta = 0; // zoom fovy change
        this.dist = 10;    // orthogonal initial distance

        var hitbox = new SphereHitbox(this.eye[0], this.eye[1], this.eye[2], 1.0);
        hitbox.isMoving = true; //make it updateable
        this.hitboxID = _hitboxHandler.addHitboxToCategory(hitbox, 0);
    }

    setView() {
        if (isPerspectiveOn) {
            this.projectionMatrix = new Matrix4();
            this.projectionMatrix.setPerspective(90, 1, 0.1, 100);
        }
        else {
            this.projectionMatrix = new Matrix4();
            this.projectionMatrix.setOrtho(-this.dist, this.dist, -this.dist, this.dist, 0, 1000);
        }
    }

    zoom(delta) {
        if (isPerspectiveOn) {
            this.projectionMatrix.setPerspective(90 + delta, 1, 0.1, 100);
        }
        else {
            var left = -this.dist - delta/10;
            var right = this.dist + delta/10;
            var bot = -this.dist - delta/10;
            var top = this.dist + delta/10;
            this.projectionMatrix.setOrtho(left, right, bot, top, 0, 1000);
        }

    }

    // Move Left and Right
    truck(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        //check for collision via hitboxes
        var eyeTemp = new Vector3(this.eye.add(u).elements)
        //var eyeTemp = this.eye.add(n);
        var hitbox = _hitboxHandler.getHitbox(this.hitboxID);
        hitbox.setPosition(eyeTemp.elements[0], eyeTemp.elements[1], eyeTemp.elements[2]);   //compute the update
        if (_hitboxHandler.checkCollision(this.hitboxID, 1)) {
            console.log("camera colliding with something");
            const sound = new Audio();
            sound.src = "sounds/hit.mp3"
            sound.play();
            return;
        } else {
            //console.log("eyeTemp:", eyeTemp[0], eyeTemp[1], eyeTemp[2]);

            _hitboxHandler.setHitbox(this.hitboxID, hitbox);          //push the update
        }

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u);

        if(harpoon != null){
                                  //harpoon.updateValue(this.eye.elements[0]+5,this.center.elements[1]-10,this.center.elements[2]);
        //harpoon.updateValue(this.eye.elements[0]+2,this.eye.elements[1]-63,this.eye.elements[2]+10);
        //harpoon.updateValue(this.center.elements[0]+2,this.center.elements[1]-63,this.center.elements[2]+10);
        //harpoonX = this.center.elements[0] + 2;
        //harpoonY = this.center.elements[1] - 50;
        //this.center.elements[1]-63;
        //harpoonZ = this.eye.elements[2]+23;

        harpoonX = this.center.elements[0]
        harpoonY = this.center.elements[1] - 50;
        harpoonY = -50
        //this.center.elements[1]-63;
        harpoonZ = this.eye.elements[2]+23;


        harpoon.updateValue(harpoonX/2,harpoonY,harpoonZ/2);
        //harpoon.updateValue(this.center.elements[0],this.center.elements[1],this.center.elements[2]);
        harpoon.updateValue(this.eye.elements[0] + 10 , harpoonY, this.eye.elements[2] + 10);
      }



        this.updateView();
        //console.log("truck");

    }

    // Move Forwards and Backwards
    dolly(dir) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Scale the n axis to the desired distance to move
        n = n.mul(dir * this.speed);

        //check for collision via hitboxes
        var eyeTemp = new Vector3(this.eye.add(n).elements)
        //var eyeTemp = this.eye.add(n);
        var hitbox = _hitboxHandler.getHitbox(this.hitboxID);
        hitbox.setPosition(eyeTemp.elements[0], eyeTemp.elements[1], eyeTemp.elements[2]);   //compute the update
        if (_hitboxHandler.checkCollision(this.hitboxID, 1)) {
            console.log("camera colliding with something");
            return;
        } else {
            //console.log("eyeTemp:", eyeTemp[0], eyeTemp[1], eyeTemp[2]);

            _hitboxHandler.setHitbox(this.hitboxID, hitbox);          //push the update
        }

        this.eye = this.eye.add(n);
        this.center = this.center.add(n);

        /*if(harpoon != null){
                                  //harpoon.updateValue(this.eye.elements[0]+5,this.center.elements[1]-10,this.center.elements[2]);
        //harpoon.updateValue(this.eye.elements[0]+2,this.eye.elements[1]-63,this.eye.elements[2]+10);
        //harpoon.updateValue(this.center.elements[0]+2,this.center.elements[1]-63,this.center.elements[2]+10);
        //harpoonX = this.center.elements[0] + 2;
        //harpoonY = this.center.elements[1] - 50;
        //this.center.elements[1]-63;
        //harpoonZ = this.eye.elements[2]+23;

        harpoonX = this.center.elements[0]
        harpoonY = this.center.elements[1] - 50;
        harpoonY = -50
        //this.center.elements[1]-63;
        harpoonZ = this.eye.elements[2]+23;


        harpoon.updateValue(harpoonX/2,harpoonY,harpoonZ/2);
        //harpoon.updateValue(this.center.elements[0],this.center.elements[1],this.center.elements[2]);
        harpoon.updateValue(this.eye.elements[0] + 10 , harpoonY, this.eye.elements[2] + 10);
      }*/



        this.updateView();
        //console.log(this.eye);
    }

    // View Left and Right
    pan(dir) {
        // v axis rotation, about the y-axis, horiztonal rotation
        var panVector = new Matrix4();
        var new_Center = new Vector3();

        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Calculate the v camera axis
        var v = this.up.normalize();

        // translate camera to origin, rotate, then translate back to place
        new_Center = this.center.sub(this.eye);

        var angle = dir;
        this.panRotate.setRotate(angle, v.elements[0], v.elements[1], v.elements[2]);
        panVector = this.panRotate.multiplyVector3(new_Center);
        this.center = panVector.add(this.eye);

        /*if(harpoon != null){

        harpoonX = this.center.elements[0]
        harpoonY = this.center.elements[1] - 50;
        harpoonY = -50
        //this.center.elements[1]-63;
        harpoonZ = this.eye.elements[2]+23;

        harpoon.updateValue(harpoonX/2,harpoonY,harpoonZ/2);
        harpoon.updateValue(this.center.elements[0],this.center.elements[1],this.center.elements[2]);
        //harpoon.updateValue(this.eye.elements[0] + 10 , harpoonY, this.eye.elements[2] + 10);
        }*/
        /*if(harpoon != null){

        harpoon.updateViewMatrix(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        }*/


        this.updateView();
    }

    // View up and Down
    tilt(dir) {
        var tiltVector = new Matrix4();
        var new_Center = new Vector3();

        var n = this.eye.sub(this.center);
        n = n.normalize();

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Rotate the center around the u unit vector, and then translate back to place
        new_Center = this.center.sub(this.eye);
        var angle = dir;
        this.tiltRotate.setRotate(angle, u.elements[0], u.elements[1], u.elements[2]);
        tiltVector = this.tiltRotate.multiplyVector3(new_Center);
        this.center = tiltVector.add(this.eye);

        // If the image heads out of sight, rotate the up vector
        if (Math.abs(n.dot(this.up)) >= 0.985) {
            console.log("cant go higher or lower");
            return
        }


        this.updateView();
    }

    updateView() {
        //console.log("update view");
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);

        if(harpoon != null){
                                                            //harpoon.updateValue(this.eye.elements[0]+5,this.center.elements[1]-10,this.center.elements[2]);
          //harpoon.updateValue(this.eye.elements[0]+2,this.eye.elements[1]-63,this.eye.elements[2]+10);
                                  //harpoon.updateValue(this.center.elements[0]+2,this.center.elements[1]-63,this.center.elements[2]+10);
                                  //harpoonX = this.center.elements[0] + 2;
                                  //harpoonY = this.center.elements[1] - 50;
                                  //this.center.elements[1]-63;
                                  //harpoonZ = this.eye.elements[2]+23;

          //harpoonX = this.eye.elements[0] + 1;
          harpoonX = this.eye.elements[0] + this.center.elements[0];
          //harpoonY = this.center.elements[1] - 50;
          //harpoonY = this.eye.elements[1]
          harpoonY = this.center.elements[1];
          harpoonY = -10
                                  //this.center.elements[1]-63;
          //harpoonZ = this.eye.elements[2]+23;
        //  harpoonZ = this.eye.elements[2] + 2;
         harpoonZ = this.eye.elements[2] + this.center.elements[2];




          harpoon.updateValue(harpoonX/4,harpoonY,harpoonZ/4);
          //harpoon.updateValue(-10,-10,-10);
                                  //harpoon.updateValue(this.center.elements[0],this.center.elements[1],this.center.elements[2]);
          //harpoon.updateValue(this.eye.elements[0] + 10 , harpoonY, this.eye.elements[2] + 10);
          }



    }
}
