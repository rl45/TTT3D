/**
 * Specifies a FlatSquare. A subclass of Geometry.
 *
 * @author Lawrence Tam
 * @this {FlatSquare}
 */
class FlatSquare extends Geometry {
  /**
   * Constructor for FlatSquare.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @param {Ev} ev Mouseclick value for the location of geometry
   * @returns {FlatSquare} FlatSquare created
   */
  constructor(shader, x, y, size, image, height) {
      super(shader, x, y);

      this.vertices = this.generateFlatSquareVertices(x, y, size);
      this.faces = { 0: this.vertices };
      this.image = image;
      this.height = height;

      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(90, 1, 0, 0);

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(0, 0, height);

      this.modelMatrix = new Matrix4();
      this.modelMatrix.multiply(this.rotationMatrix);
      this.modelMatrix.multiply(this.translationMatrix);
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateFlatSquareVertices(x,y,size) {
      var vertices = []

      var vertex1 = new Vertex(x - size * 0.25, y - size * 0.25, 0.0);
      var vertex2 = new Vertex(x + size * 0.25, y - size * 0.25, 0.0);
      var vertex3 = new Vertex(x + size * 0.25, y + size * 0.25, 0.0);
      vertex1.normal = [0, 0, 1];
      vertex2.normal = [0, 0, 1];
      vertex3.normal = [0, 0, 1];

      vertex1.texCoord = [0, 0];
      vertex2.texCoord = [5, 0];
      vertex3.texCoord = [5, 5];

      var vertex4 = new Vertex(x - size * 0.25, y - size * 0.25, 0.0);
      var vertex5 = new Vertex(x + size * 0.25, y + size * 0.25, 0.0);
      var vertex6 = new Vertex(x - size * 0.25, y + size * 0.25, 0.0);
      vertex4.normal = [0, 0, 1];
      vertex5.normal = [0, 0, 1];
      vertex6.normal = [0, 0, 1];

      vertex4.texCoord = [0, 0];
      vertex5.texCoord = [5, 5];
      vertex6.texCoord = [0, 5];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      return vertices;
    }
}
