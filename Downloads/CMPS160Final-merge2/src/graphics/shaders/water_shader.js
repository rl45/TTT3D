var WATER_VSHADER =
    `
#define SCALE = 10.0
precision mediump float;

attribute vec4 a_Position;
varying vec3 v_Position;

attribute vec4 a_Normal;
varying vec3 v_Normal;

attribute vec4 a_Color;
varying vec4 v_Color;

attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;

uniform mat4 u_ModelMatrix; 
uniform mat4 u_NormalMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_ProjectionMatrix;


void main() {
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_TexCoord = a_TexCoord;

    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * vec4(v_Position, 1.0);

}  
`;

var WATER_FSHADER =
    `
precision mediump float;
varying vec3 v_Position;
varying vec3 v_Normal;
varying vec4 v_Color;
varying vec2 v_TexCoord;

uniform sampler2D u_Sampler;
uniform float u_Time;

void main() {    
    vec2 uv = v_TexCoord * 10.0 + vec2(u_Time * -0.05);

    uv.y += 0.01 * (sin(uv.x * 3.5 + u_Time * 0.35) + sin(uv.x * 4.8 + u_Time * 1.05) + sin(uv.x * 7.3 + u_Time * 0.45)) / 3.0;
    uv.x += 0.12 * (sin(uv.y * 4.0 + u_Time * 0.5) + sin(uv.y * 6.8 + u_Time * 0.75) + sin(uv.y * 11.3 + u_Time * 0.2)) / 3.0;
    uv.y += 0.12 * (sin(uv.x * 4.2 + u_Time * 0.64) + sin(uv.x * 6.3 + u_Time * 1.65) + sin(uv.x * 8.2 + u_Time * 0.45)) / 3.0;

    vec4 tex1 = texture2D(uSampler, uv * 1.0);
    vec4 tex2 = texture2D(uSampler, uv * 1.0 + vec2(0.2));

    gl_FragColor = vec4(v_Color + (vec3(tex1.a * 0.9 - tex2.a * 0.02), 1.0));
}
`;
