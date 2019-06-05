// Vertex Shader
var ASG1_VSHADER =
    `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;

  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  attribute vec4 a_Color;
  varying vec4 v_Color;

  uniform mat4 u_ModelMatrix; 
  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG1_FSHADER =
    `precision mediump float;
  varying vec3 v_Position;
  varying vec3 v_Normal;
  varying vec4 v_Color;

  uniform vec3 u_EyePosition;

  uniform vec3 u_LightPosition;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_SpecularColor;

  void main() {
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPosition - v_Position);
    float nDotL = max(dot(lightDirection, normal), 0.0);  

    vec3 reflection = 2.0 * (dot(normalize(v_Normal), lightDirection)) * normalize(v_Normal) - lightDirection;
    vec3 Eye2Surface = u_EyePosition - v_Position;
    float specAngle = max(dot(normalize(reflection), normalize(Eye2Surface)), 0.0);
    specAngle = pow(specAngle, 4.0);

    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb;
    vec3 specular = u_SpecularColor * v_Color.rgb * specAngle;

    gl_FragColor = vec4((diffuse + ambient + specular), 1.0);
  }`;
