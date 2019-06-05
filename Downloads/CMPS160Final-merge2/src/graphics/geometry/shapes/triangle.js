/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
    /**
     * Constructor for Triangle.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param {Ev} ev Mouseclick value for the location of geometry
     * @returns {Triangle} Triangle created
     */
    constructor(shader, x, y, image) {
        super(shader, x, y);
        this.x = x;
        this.y = y;
        this.image = image;

        this.vertices = this.generateTriangleVertices();
        this.faces = { 0: this.vertices };

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateTriangleVertices() {
        var vertices = []
        var x = this.x;
        var y = this.y;

        var vertex1 = new Vertex(x - (0.25), y - (0.25), 0.0);
        vertex1.texCoord = [0, 0];
        var vertex2 = new Vertex(x + (0.25), y - (0.25), 0.0);
        vertex2.texCoord = [1, 0];
        var vertex3 = new Vertex(x + (0.0), y + (0.25), 0.0);
        vertex3.texCoord = [0.5, 1];

        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);

        return vertices;
    }
}
