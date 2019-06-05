
class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);
        this.originalPos = this.pos;
        this.ambient = [0.5, 0.5, 0.5];
        this.diffuse = [0.5, 0.5, 0.5];
        this.specular = [0.5, 0.5, 0.5];

        this.modelMatrix = new Matrix4();
        this.rotationMatrix = new Matrix4();
        this.translationMatrix = new Matrix4();

        // Rotation values for iterated rotations
        this.rot_x = 0;
        this.rot_y = 0;
        this.rot_z = 0;
    }
    render() {
        if (isPaused == false) {
            this.modelMatrix = new Matrix4();
            this.rotationMatrix = new Matrix4();

            // 2. Rotate the shape, then iterate
            //  -- 2B> Rotate with iterated values
            this.rotationMatrix.rotate(this.rot_x, 1, 0, 0);
            this.rotationMatrix.rotate(this.rot_y, 0, 1, 0);
            this.rotationMatrix.rotate(this.rot_z, 0, 0, 1);
            this.modelMatrix.multiply(this.rotationMatrix);
            //  -- 2C> Iterate
            this.rot_x += 0;
            this.rot_y += 0.02;
            this.rot_z += 0;

            this.pos = (this.modelMatrix.multiplyVector3(this.originalPos));

        }

        return
    }
}
