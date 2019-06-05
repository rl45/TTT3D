class Sphere extends Geometry {
  /**
   * Constructor for Sphere.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Sphere} Sphere created
   */
  constructor(shader, segments, x, y, z) {
      super(shader);
      this.segments = segments;
      this.x = x;
      this.y = y;
      this.z = z;

      this.vertices = this.generateSphereVertices(segments);

      this.modelMatrix = new Matrix4();
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(this.x, this.y, this.z);

      //set up the hitbox
      var hitbox = new SphereHitbox(0, 0, 0, 1);
      hitbox.updateTransform(this.translationMatrix);
      hitbox.isMoving = true;
      hitbox.update();
      hitbox.isMoving = false;
      //put the hitbox into the handler
      this.hitboxID = _hitboxHandler.addHitboxToCategory(hitbox, 1);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSphereVertices(segments) {
      var outerVerts = [];

      // Generate coordinates
      for (var j = 0; j <= segments; j++) {
          var aj = j * Math.PI / segments;
          var sj = Math.sin(aj);
          var cj = Math.cos(aj);
          for (var i = 0; i <= segments; i++) {
              var ai = i * 2 * Math.PI / segments;
              var si = Math.sin(ai);
              var ci = Math.cos(ai);

              outerVerts.push({"x": si * sj, "y": cj, "z": ci * sj});
          }
      }

      var vertices = [];

      // Generate vertices
      for (var j = 0; j < segments; j++) {
        for (var i = 0; i < segments; i++) {
          var p1 = j * (segments+1) + i;
          var p2 = p1 + (segments+1);

          var vertex0 = new Vertex(outerVerts[p1].x, outerVerts[p1].y, outerVerts[p1].z);
          vertex0.normal.elements[0] = outerVerts[p1].x;
          vertex0.normal.elements[1] = outerVerts[p1].y;
          vertex0.normal.elements[2] = outerVerts[p1].z;

          var vertex1 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z);
          vertex1.normal.elements[0] = outerVerts[p2].x;
          vertex1.normal.elements[1] = outerVerts[p2].y;
          vertex1.normal.elements[2] = outerVerts[p2].z;

          var vertex2 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z);
          vertex2.normal.elements[0] = outerVerts[p1 + 1].x;
          vertex2.normal.elements[1] = outerVerts[p1 + 1].y;
          vertex2.normal.elements[2] = outerVerts[p1 + 1].z;

          vertices.push(vertex0, vertex1, vertex2);

          var vertex3 = new Vertex(outerVerts[p1 + 1].x, outerVerts[p1 + 1].y, outerVerts[p1 + 1].z);
          vertex3.normal.elements[0] = outerVerts[p1 + 1].x;
          vertex3.normal.elements[1] = outerVerts[p1 + 1].y;
          vertex3.normal.elements[2] = outerVerts[p1 + 1].z;

          var vertex4 = new Vertex(outerVerts[p2].x, outerVerts[p2].y, outerVerts[p2].z);
          vertex4.normal.elements[0] = outerVerts[p2].x;
          vertex4.normal.elements[1] = outerVerts[p2].y;
          vertex4.normal.elements[2] = outerVerts[p2].z;

          var vertex5 = new Vertex(outerVerts[p2 + 1].x, outerVerts[p2 + 1].y, outerVerts[p2 + 1].z);
          vertex5.normal.elements[0] = outerVerts[p2 + 1].x;
          vertex5.normal.elements[1] = outerVerts[p2 + 1].y;
          vertex5.normal.elements[2] = outerVerts[p2 + 1].z;

          vertices.push(vertex3, vertex4, vertex5);
        }
      }

      return vertices;
  }

    render() {
        this.modelMatrix = new Matrix4();
        this.modelMatrix.multiply(this.translationMatrix);
        this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);

        this.normalMatrix.setInverseOf(this.modelMatrix);
        this.normalMatrix.transpose();
        this.shader.setUniform("u_NormalMatrix", this.normalMatrix.elements);
    }
}
