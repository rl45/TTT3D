/**
 * Specifies a Cube. A subclass of geometry.
 *
 * @author Lawrence Tam
 * @this {Cube}
 */
class TerrainRendering extends Geometry {
    /**
     * Constructor for Cube.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param {Ev} ev Mouseclick value for the location of geometry
     * @returns {Cube} Cube created
     */
    constructor(shader, x, y, z, size, array, xDim, zDim, image) {
        super(shader, x, y, size);

        this.vertices = this.generateTerrainVertices(array, size, xDim, zDim);
        this.faces = { 0: this.vertices };
        this.image = image;

        this.modelMatrix = new Matrix4().setTranslate(x, y, z);

        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateTerrainVertices(array, size, xDim, zDim) {
        var vertices = [];

        var normals = [];

        //calculate normals
        for (var x = 0; x < xDim; x++) {
            normals[x] = [];
            for (var z = 0; z < zDim; z++) {
                var deltaXValue = 0.0;
                var xCount = 0;
                var deltaZValue = 0.0;
                var zCount = 0;

                if (x > 0) {
                    deltaXValue += (array[x][z] - array[x - 1][z]);
                    xCount++;
                }
                if (x < xDim - 1) {
                    deltaXValue += (array[x + 1][z] - array[x][z]);
                    xCount++;
                }
                if (z > 0) {
                    deltaZValue += (array[x][z] - array[x][z - 1]);
                    zCount++;
                }
                if (z < zDim - 1) {
                    deltaZValue += (array[x][z + 1] - array[x][z]);
                    zCount++;
                }

                if (xCount > 1) {
                    deltaXValue /= xCount;
                }
                if (zCount > 1) {
                    deltaZValue /= zCount;
                }
                var normal = new Vector3([-deltaXValue, 1, -deltaZValue]).normalize();

                normals[x].push(normal);
            }
        }

        //calculate vertices for triangles
        for (var x = 0; x < xDim - 1; x++) {
            for (var z = 0; z < zDim - 1; z++) {
                //triangle 1 of square
                var vertex0 = new Vertex(x, array[x][z], z);
                vertex0.texCoord = [0, 0];
                var vertex1 = new Vertex(x + 1, array[x + 1][z + 1], z + 1);
                vertex1.texCoord = [1, 1];
                var vertex2 = new Vertex(x, array[x][z + 1], z + 1);
                vertex2.texCoord = [0, 1];

                vertex0.normal = normals[x][z];
                vertex1.normal = normals[x + 1][z + 1];
                vertex2.normal = normals[x][z + 1];

                vertices.push(vertex0);
                vertices.push(vertex1);
                vertices.push(vertex2);

                //triangle 2 of square
                var vertex3 = new Vertex(x, array[x][z], z);
                vertex3.texCoord = [0, 0];
                var vertex4 = new Vertex(x + 1, array[x + 1][z], z);
                vertex4.texCoord = [1, 0];
                var vertex5 = new Vertex(x + 1, array[x + 1][z + 1], z + 1);
                vertex5.texCoord = [1, 1];

                vertex3.normal = normals[x][z];
                vertex4.normal = normals[x + 1][z];
                vertex5.normal = normals[x + 1][z + 1];

                vertices.push(vertex3);
                vertices.push(vertex4);
                vertices.push(vertex5);
            }
        }
        return vertices;
    }
}