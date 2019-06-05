var _renderer = null;

/**
 * Specifies a WebGL render. Used alongside Spring 2019 CMPS 160's Scene,
 * Camera, Geometry, and other subclasses.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Renderer {
   /**
    * Constructor for Renderer.
    *
    * @constructor
    * @returns {Renderer} Renderer object created
    */
    constructor(gl, scene, camera, menu, canvas, hud) {
        this.gl = gl;
        this.scene = scene;
        this.camera = camera;
        this.menu = menu;
        this.canvas = canvas;
        this.hud = hud;
        //console.log("renderer", menu);

        this.textures = {};

        this.initGLSLBuffers();

        // Setting canvas' clear color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Use the z-buffer when drawing
        this.gl.enable(gl.DEPTH_TEST);

        _renderer = this;
    }
    
    /**
     * Starts an animation loop
     */
    start() {
        // Rescale gl and menu to the dimensions of the window display
        resize(canvas);
        resize(hud);

        _renderer.updatePerspective(_renderer.camera, _renderer.canvas);

        // Draw the new frame
        draw2D(_renderer.menu, hud);
        _renderer.render();
        requestAnimationFrame(_inputHandler.moveCamera);
        requestAnimationFrame(_renderer.start);
    }

    /**
    * Updates camera perspective to canvas size
    */
    updatePerspective(camera, canvas) {
        var fovy = 90;
        var aspectRatio = canvas.width / canvas.height;
        var zNear = 0.1;
        var zFar = 100;
        camera.projectionMatrix.setPerspective(fovy, aspectRatio, zNear, zFar);
    }

    /**
     * Renders all the geometry within the scene.
     */
    render() {
        // Adjust gl render to canvas size
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        // Clear the geometry onscreen
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      

        for (var i = 0; i < this.scene.geometries.length; i++) {
            var geometry = this.scene.geometries[i];
            //console.log(geometry.value);

            // Switch to shader attached to geometry
            this.gl.useProgram(geometry.shader.program);
            this.gl.program = geometry.shader.program;

            // Add Geometry uniforms to shader
            geometry.shader.setUniform("u_ModelMatrix", this.modelMatrix);
            geometry.shader.setUniform("u_NormalMatrix", this.normalMatrix);

            // Add Camera uniforms to shader
            geometry.shader.setUniform("u_ViewMatrix", this.camera.viewMatrix.elements);
            geometry.shader.setUniform("u_ProjectionMatrix", this.camera.projectionMatrix.elements);
            var eye = new Float32Array([25,65,35,0]);
            geometry.shader.setUniform("u_Eye", eye);
            geometry.shader.setUniform("u_EyePosition", this.camera.eye.elements);



            // Add Light uniforms to shader
            if(geometry.image != null) {
                if (!(geometry.image.src in this.textures)) {
                    // Create a texture object and store id using its path as key
                    this.textures[geometry.image.src] = this.gl.createTexture();
                    this.loadTexture(this.textures[geometry.image.src], geometry.image);
                }
                else {
                    this.gl.activeTexture(this.gl.TEXTURE0);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[geometry.image.src]);
                }
            }

            if (this.scene.light != null) {
                geometry.shader.setUniform("u_LightPosition", this.scene.light.pos.elements);
                geometry.shader.setUniform("u_AmbientColor", this.scene.light.ambient);
                geometry.shader.setUniform("u_DiffuseColor", this.scene.light.diffuse);
                geometry.shader.setUniform("u_SpecularColor", this.scene.light.specular);

                var fogColor = new Float32Array([0.637, 0.631, 0.323]);
                var fogDist = new Float32Array([100,80]);
                geometry.shader.setUniform("u_FogColor", fogColor);
                geometry.shader.setUniform("u_FogDist", fogDist);



            }
            this.scene.light.render();

            // Callback function in the case user wants to change the
            // geometry before the draw call
            geometry.render();

            // Set attribute buffer with the geometry data
            this.sendVertexDataToGLSL(geometry.data, geometry.dataCounts, geometry.shader);

            // Passes the indices of a geometry to the index buffer a
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indices, this.gl.STATIC_DRAW);

            // Draw geometries using current buffer data
            this.gl.drawElements(this.gl.TRIANGLES, geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
        }

            /*if(harpoon != null){
            //harpoon.updateValue(this.eye.elements[0]+5,this.center.elements[1]-10,this.center.elements[2]);
            //harpoon.updateValue(this.eye.elements[0]+2,this.eye.elements[1]-63,this.eye.elements[2]+10);
            //harpoon.updateValue(this.center.elements[0]+2,this.center.elements[1]-63,this.center.elements[2]+10);
            //this.center.elements[1]-63;

            harpoonX = Math.random() * 100
            harpoonY = -65
            harpoonZ = Math.random() * 100

            harpoonX

            harpoon.updateValue(harpoonX/3,harpoonY,harpoonZ);
          }*/
    }

    /**
     * Initializes a single index and single attribute buffer for future use
     */
    initGLSLBuffers() {
        var attributeBuffer = this.gl.createBuffer();
        var indexBuffer = this.gl.createBuffer();

        if (!attributeBuffer || !indexBuffer) {
            console.log("Failed to create buffers!");
            return;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributeBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    /**
     * Sends an array of interleaved vertex information the shader.
     *
     * @private
     * @param {Float32Array} data Data being sent to attribute variable
     * @param {Number} dataCount The amount of data to pass per vertex
     * @param {String} attribName The name of the attribute variable
     */
    sendVertexDataToGLSL(data, dataCounts, shader) {
      var FSIZE = data.BYTES_PER_ELEMENT;

      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

      var dataEnd = 0;
      for (var i = 0; i < dataCounts.length; i++) {
        dataEnd += dataCounts[i];
      }
      dataEnd *= FSIZE;

      var i = 0;
        var currentDataStart = 0;

      // Send attributes
      for (const attributeName in shader.attributes) {
          var attribute = shader.attributes[attributeName].location;
          //console.log(attributeName);

          this.gl.vertexAttribPointer(attribute, dataCounts[i], this.gl.FLOAT, false, dataEnd, currentDataStart);
          this.gl.enableVertexAttribArray(attribute);

          currentDataStart += FSIZE * dataCounts[i];

          i += 1;
       }

       // Send uniforms
        for (const uniformName in shader.uniforms) {
            //console.log(uniformName);
            this.sendUniformToGLSL(shader.uniforms[uniformName]);
            //console.log("pass");
        }
    }

    /**
     * Passes a uniform's value to it's saved location
     * @private
     * @param uniform An associative array with the location and value of a uniform
     */
    sendUniformToGLSL(uniform) {
        switch (uniform.type) {
            case "float":
              this.gl.uniform1f(uniform.location, uniform.value);
              break;
            case "vec2":
              this.gl.uniform2fv(uniform.location, uniform.value);
              break;
            case "vec3":
              this.gl.uniform3fv(uniform.location, uniform.value);
              break;
            case "vec4":
              this.gl.uniform4fv(uniform.location, uniform.value);
              break;
            case "mat2":
              this.gl.uniformMatrix2fv(uniform.location, false, uniform.value);
              break;
            case "mat3":
              this.gl.uniformMatrix3fv(uniform.location, false, uniform.value);
              break;
            case "mat4":
              this.gl.uniformMatrix4fv(uniform.location, false, uniform.value);
              break;
            case "sampler2D":
              this.gl.uniform1i(uniform.location, uniform.value);
              break;
        }
    }

    loadTexture(texture, image) {
        // Flip the image's y axis
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);

        // Enable texture unit0
        this.gl.activeTexture(this.gl.TEXTURE0);

        // Bind the texture object to the target
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Set the texture parameters
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        // Set the texture image
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    }
}
