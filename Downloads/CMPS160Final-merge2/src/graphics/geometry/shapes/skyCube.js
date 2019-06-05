/**
 * Specifies a SkyCube. A subclass of geometry.
 *
 * @author Lawrence Tam
 * @this {SkyCube}
 */
class SkyCube extends Cube {
    /**
     * Constructor for SkyCube.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param {Ev} ev Mouseclick value for the location of geometry
     * @returns {SkyCube} SkyCube created
     */
    constructor(shader, x, y, size, image) {
        super(shader, x, y, size, image);

        this.vertices = this.generateSkyCubeVertices(x, y, size);
        this.faces = { 0: this.vertices };
        this.image = image;

        this.modelMatrix = new Matrix4();
        // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
        this.interleaveVertices();
    }

    generateSkyCubeVertices(x, y, size) {
        var vertices = []

        // back x,y square (v1-6), 3x3 grid
        var vertex1 = new Vertex(x - size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex2 = new Vertex(x + size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex3 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);

        var vertex4 = new Vertex(x - size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex5 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);
        var vertex6 = new Vertex(x - size * 0.25, y + size * 0.25, -size * 0.25);

        vertex1.normal = [0, 0, -1];
        vertex2.normal = [0, 0, -1];
        vertex3.normal = [0, 0, -1];
        vertex4.normal = [0, 0, -1];
        vertex5.normal = [0, 0, -1];
        vertex6.normal = [0, 0, -1];

        vertex1.texCoord = [0, 0];
        vertex2.texCoord = [1, 0];
        vertex3.texCoord = [1, 1];
        vertex4.texCoord = [0, 0];
        vertex5.texCoord = [1, 1];
        vertex6.texCoord = [0, 1];

        // front x,y square (v7-12), whole texture image
        var vertex7 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex8 = new Vertex(x + size * 0.25, y - size * 0.25, size * 0.25);
        var vertex9 = new Vertex(x + size * 0.25, y + size * 0.25, size * 0.25);

        var vertex10 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex11 = new Vertex(x + size * 0.25, y + size * 0.25, size * 0.25);
        var vertex12 = new Vertex(x - size * 0.25, y + size * 0.25, size * 0.25);

        vertex7.normal = [0, 0, 1];
        vertex8.normal = [0, 0, 1];
        vertex9.normal = [0, 0, 1];
        vertex10.normal = [0, 0, 1];
        vertex11.normal = [0, 0, 1];
        vertex12.normal = [0, 0, 1];

        vertex7.texCoord = [0, 0];
        vertex8.texCoord = [1, 0];
        vertex9.texCoord = [1, 1];
        vertex10.texCoord = [0, 0];
        vertex11.texCoord = [1, 1];
        vertex12.texCoord = [0, 1];

        // top y,z square, top half of image
        var vertex13 = new Vertex(x - size * 0.25, y + size * 0.25, size * 0.25);
        var vertex14 = new Vertex(x + size * 0.25, y + size * 0.25, size * 0.25);
        var vertex15 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);

        var vertex16 = new Vertex(x - size * 0.25, y + size * 0.25, size * 0.25);
        var vertex17 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);
        var vertex18 = new Vertex(x - size * 0.25, y + size * 0.25, -size * 0.25);

        vertex13.normal = [0, 1, 0];
        vertex14.normal = [0, 1, 0];
        vertex15.normal = [0, 1, 0];
        vertex16.normal = [0, 1, 0];
        vertex17.normal = [0, 1, 0];
        vertex18.normal = [0, 1, 0];

        vertex13.texCoord = [0, 0];
        vertex14.texCoord = [1, 0];
        vertex15.texCoord = [1, 1];
        vertex16.texCoord = [0, 0];
        vertex17.texCoord = [1, 1];
        vertex18.texCoord = [0, 1];

        // bottom y,z square, bottom half of image
        var vertex19 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex20 = new Vertex(x + size * 0.25, y - size * 0.25, size * 0.25);
        var vertex21 = new Vertex(x + size * 0.25, y - size * 0.25, -size * 0.25);

        var vertex22 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex23 = new Vertex(x + size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex24 = new Vertex(x - size * 0.25, y - size * 0.25, -size * 0.25);

        vertex19.normal = [0, -1, 0];
        vertex20.normal = [0, -1, 0];
        vertex21.normal = [0, -1, 0];
        vertex22.normal = [0, -1, 0];
        vertex23.normal = [0, -1, 0];
        vertex24.normal = [0, -1, 0];

        vertex19.texCoord = [0, 0];
        vertex20.texCoord = [1, 0];
        vertex21.texCoord = [1, 1];
        vertex22.texCoord = [0, 0];
        vertex23.texCoord = [1, 1];
        vertex24.texCoord = [0, 1];

        //  right side z,y square, side by side images
        var vertex25 = new Vertex(x + size * 0.25, y - size * 0.25, size * 0.25);
        var vertex26 = new Vertex(x + size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex27 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);

        var vertex28 = new Vertex(x + size * 0.25, y - size * 0.25, size * 0.25);
        var vertex29 = new Vertex(x + size * 0.25, y + size * 0.25, -size * 0.25);
        var vertex30 = new Vertex(x + size * 0.25, y + size * 0.25, size * 0.25);

        vertex25.normal = [1, 0, 0];
        vertex26.normal = [1, 0, 0];
        vertex27.normal = [1, 0, 0];
        vertex28.normal = [1, 0, 0];
        vertex29.normal = [1, 0, 0];
        vertex30.normal = [1, 0, 0];

        vertex25.texCoord = [0, 0];
        vertex26.texCoord = [1, 0];
        vertex27.texCoord = [1, 1];
        vertex28.texCoord = [0, 0];
        vertex29.texCoord = [1, 1];
        vertex30.texCoord = [0, 1];

        // left side z,y square, left half of image
        var vertex31 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex32 = new Vertex(x - size * 0.25, y - size * 0.25, -size * 0.25);
        var vertex33 = new Vertex(x - size * 0.25, y + size * 0.25, -size * 0.25);

        var vertex34 = new Vertex(x - size * 0.25, y - size * 0.25, size * 0.25);
        var vertex35 = new Vertex(x - size * 0.25, y + size * 0.25, -size * 0.25);
        var vertex36 = new Vertex(x - size * 0.25, y + size * 0.25, size * 0.25);

        vertex31.normal = [-1, 0, 0];
        vertex32.normal = [-1, 0, 0];
        vertex33.normal = [-1, 0, 0];
        vertex34.normal = [-1, 0, 0];
        vertex35.normal = [-1, 0, 0];
        vertex36.normal = [-1, 0, 0];

        vertex31.texCoord = [0, 0];
        vertex32.texCoord = [1, 0];
        vertex33.texCoord = [1, 1];
        vertex34.texCoord = [0, 0];
        vertex35.texCoord = [1, 1];
        vertex36.texCoord = [0, 1];

        vertices.push(vertex1);
        vertices.push(vertex2);
        vertices.push(vertex3);
        vertices.push(vertex4);
        vertices.push(vertex5);
        vertices.push(vertex6);
        vertices.push(vertex7);
        vertices.push(vertex8);
        vertices.push(vertex9);
        vertices.push(vertex10);
        vertices.push(vertex11);
        vertices.push(vertex12);
        vertices.push(vertex13);
        vertices.push(vertex14);
        vertices.push(vertex15);
        vertices.push(vertex16);
        vertices.push(vertex17);
        vertices.push(vertex18);
        vertices.push(vertex19);
        vertices.push(vertex20);
        vertices.push(vertex21);
        vertices.push(vertex22);
        vertices.push(vertex23);
        vertices.push(vertex24);
        vertices.push(vertex25);
        vertices.push(vertex26);
        vertices.push(vertex27);
        vertices.push(vertex28);
        vertices.push(vertex29);
        vertices.push(vertex30);
        vertices.push(vertex31);
        vertices.push(vertex32);
        vertices.push(vertex33);
        vertices.push(vertex34);
        vertices.push(vertex35);
        vertices.push(vertex36);

        return vertices;
    }   
}
