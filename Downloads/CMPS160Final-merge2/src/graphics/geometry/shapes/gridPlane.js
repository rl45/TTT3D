/**
 * Specifies a GridPlane. A subclass of Geometry.
 *
 * @author Lawrence Tam
 * @this {GridPlane}
 */
class GridPlane extends Geometry {
    /**
     * Constructor for GridPlane.
     *
     * @constructor
     * @param {Shader} shader Shading object used to shade geometry
     * @param {Ev} ev Mouseclick value for the location of geometry
     * @returns {GridPlane} GridPlane created
     */
    constructor(shader, x, y, size, image, height, widthSegs, heightSegs) {
        super(shader, x, y);

        this.vertices = this.generateGridPlaneVertices(x, y, size);
        this.faces = { 0: this.vertices };

        this.image = image;
        this.height = height;
        this.widthSegs = widthSegs;
        this.heightSegs = heightSegs;

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

    generateGridPlaneVertices(x, y, size) {
        /**
         * @author mrdoob / http://mrdoob.com/
         * based on http://papervision3d.googlecode.com/svn/trunk/as3/trunk/src/org/papervision3d/objects/primitives/Plane.as
         */

        THREE.PlaneBufferGeometry = function (width, height, widthSegments, heightSegments) {

            THREE.BufferGeometry.call(this);

            this.parameters = {
                width: width,
                height: height,
                widthSegments: widthSegments,
                heightSegments: heightSegments
            };

            var width_half = width / 2;
            var height_half = height / 2;

            var gridX = widthSegments || 1;
            var gridY = heightSegments || 1;

            var gridX1 = gridX + 1;
            var gridY1 = gridY + 1;

            var segment_width = width / gridX;
            var segment_height = height / gridY;

            var vertices = new Float32Array(gridX1 * gridY1 * 3);
            var normals = new Float32Array(gridX1 * gridY1 * 3);
            var uvs = new Float32Array(gridX1 * gridY1 * 2);

            var offset = 0;
            var offset2 = 0;

            for (var iy = 0; iy < gridY1; iy++) {

                var y = iy * segment_height - height_half;

                for (var ix = 0; ix < gridX1; ix++) {

                    var x = ix * segment_width - width_half;

                    vertices[offset] = x;
                    vertices[offset + 1] = - y;

                    normals[offset + 2] = 1;

                    uvs[offset2] = ix / gridX;
                    uvs[offset2 + 1] = 1 - (iy / gridY);

                    offset += 3;
                    offset2 += 2;

                }

            }

            offset = 0;

            var indices = new Uint16Array(gridX * gridY * 6);

            for (var iy = 0; iy < gridY; iy++) {

                for (var ix = 0; ix < gridX; ix++) {

                    var a = ix + gridX1 * iy;
                    var b = ix + gridX1 * (iy + 1);
                    var c = (ix + 1) + gridX1 * (iy + 1);
                    var d = (ix + 1) + gridX1 * iy;

                    indices[offset] = a;
                    indices[offset + 1] = b;
                    indices[offset + 2] = d;

                    indices[offset + 3] = b;
                    indices[offset + 4] = c;
                    indices[offset + 5] = d;

                    offset += 6;

                }

            }

            this.attributes['index'] = { array: indices, itemSize: 1 };
            this.attributes['position'] = { array: vertices, itemSize: 3 };
            this.attributes['normal'] = { array: normals, itemSize: 3 };
            this.attributes['uv'] = { array: uvs, itemSize: 2 };

        };
    }
}
