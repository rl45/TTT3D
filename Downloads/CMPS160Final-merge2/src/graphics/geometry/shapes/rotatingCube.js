/**
 * Specifies a RotatingCube. A subclass of geometry.
 *
 * @author Lawrence Tam
 * @this {RotatingCube}
 */
class RotatingCube extends Cube {
  /**
   * Constructor for RotatingCube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @param {Ev} ev Mouseclick value for the location of geometry
   * @returns {RotatingCube} RotatingCube created
   */
  constructor(shader, x, y, size, image) {
      super(shader, x, y, size, image);
      this.x = x;
      this.y = y;
      this.size = size;
      this.rotate = 0;
      this.image = image;

      // Rotation values for initial position
      this.init_x_rot = 0;
      this.init_y_rot = 0;
      this.init_z_rot = 0;

      // Rotation values for iterated rotations
      this.rot_x = 0;
      this.rot_y = 0;
      this.rot_z = 0;

      // Declare matrices
      this.rotationMatrix = new Matrix4();
      this.translationMatrix = new Matrix4();
      this.originalRotationMatrix = new Matrix4();  // used to rotate the cube into initial view
      //  -- set the constant values for this.originalRotationMatrix
      this.originalRotationMatrix.rotate(this.init_x_rot, 1, 0, 0);
        this.originalRotationMatrix.rotate(this.init_y_rot, 0, 1, 0);
          this.originalRotationMatrix.rotate(this.init_z_rot, 0, 0, 1);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
    }
    /*
  render(){
    this.modelMatrix = new Matrix4();
    this.rotationMatrix = new Matrix4();

    // 1. Translate origin to shape
    this.translationMatrix.setTranslate(this.x,this.y,0);
    this.modelMatrix.multiply(this.translationMatrix);

    // 2. Rotate the shape, then iterate
    //  -- 2A> Rotate to the original view, then apply changes
    this.modelMatrix.multiply(this.originalRotationMatrix);
    //  -- 2B> Rotate with iterated values
    this.rotationMatrix.rotate(this.rot_x, 1, 0, 0);
      this.rotationMatrix.rotate(this.rot_y, 0, 1, 0);
        this.rotationMatrix.rotate(this.rot_z, 0, 0, 1);
    this.modelMatrix.multiply(this.rotationMatrix);
    //  -- 2C> Iterate
    this.rot_x += 1;
        this.rot_y += 1;
            this.rot_z += 1;

    // 3. Translate origin back
    this.translationMatrix.setTranslate(-this.x,-this.y,0);
    this.modelMatrix.multiply(this.translationMatrix);

    this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
  }
  */
}
