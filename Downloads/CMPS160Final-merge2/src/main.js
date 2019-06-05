var shader = null;
var texture_shader = null;
var textureless_shader = null;

function main() {
  // Retrieve the canvas from the HTML document
    canvas = document.getElementById("webgl");
    //canvas.height = 100vw;
    //canvas.width = 500;

    hud = document.getElementById("hud");
    //hud.height = 500;
    //hud.width = 500;

  // Retrieve WebGL rendering context
    var gl = getWebGLContext(canvas);   // 3D WebGL Canvas
    var menu = hud.getContext("2d");    // 2D Canvas HUD Overlay

    if (!gl) {
        console.log("Failed to get WebGL rendering context.");
        return;
    }

    // Initialize hitbox handler
    var hitboxHandler = new HitboxHandler();

    // Initialize main renderer variables
    var scene = new Scene();
    var camera = new Camera(canvas);
    var walls = [   // wall = [(x,z), height]
        [[7, 0], 4],
        [[-7, 0], 3],
        [[3, -5], 2],
        [[-3, -5], 1],
        [[0, 10], 0]
    ];
    var light = new Light(2000, 2000, 2000);
    scene.setLight(light);
    console.log("light position:", light.pos.elements);


    // Initialize shaders
    // Shader: no texture, yes camera, no lighting (basic)
    shader = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);
    shader.addAttribute("a_Position");
    shader.addAttribute("a_Color");
    shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
    shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
    shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);

    // Note: Phong shaders include diffuse, ambient, and specular lighting
    // Texture Phong shader: yes texture, yes camera, yes lighting
    texture_shader = new Shader(gl, ASG5_VSHADER, ASG5_FSHADER);
    texture_shader.addAttribute("a_Position");
    texture_shader.addAttribute("a_Normal");
    texture_shader.addAttribute("a_Color");
    texture_shader.addAttribute("a_TexCoord");
        // geometry uniforms
    texture_shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
    texture_shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
        // camera uniforms
    texture_shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
    texture_shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
    texture_shader.addUniform("u_Eye", "vec4", new Vector3().elements); //fog
    texture_shader.addUniform("u_EyePosition", "vec3", new Vector3().elements);
        // light uniforms
    texture_shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
    texture_shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
    texture_shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
    texture_shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

        // fog
    texture_shader.addUniform("u_FogColor", "vec3", new Vector3().elements);
    texture_shader.addUniform("u_FogDist", "vec2", new Vector3().elements);
    //texture uniforms
    texture_shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);


    // Textureless Phong shader: no texture, yes camera, yes lighting
    textureless_shader = new Shader(gl, ASG6_VSHADER, ASG6_FSHADER);
    textureless_shader.addAttribute("a_Position");
    textureless_shader.addAttribute("a_Normal");
    textureless_shader.addAttribute("a_Color");
    // geometry uniforms
    textureless_shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
    textureless_shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
    // camera uniforms
    textureless_shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
    textureless_shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
    textureless_shader.addUniform("u_Eye", "vec4", new Vector3().elements); //fog
    textureless_shader.addUniform("u_EyePosition", "vec3", new Vector3().elements);
    // light uniforms
    textureless_shader.addUniform("u_LightPosition", "vec3", new Vector3().elements);
    textureless_shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
    textureless_shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
    textureless_shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
      //Fog
    textureless_shader.addUniform("u_FogColor", "vec3", new Vector3().elements);
    textureless_shader.addUniform("u_FogDist", "vec2", new Vector3().elements);


    console.log("textureless shader added");

    // run input.js
    var inputHandler = new InputHandler(canvas, scene, camera, walls, hud);

    // Initialize renderer with scene and camera
    renderer = new Renderer(gl, scene, camera, menu, canvas, hud);

    renderer.start();
}

