// Heart SDF from Inigo Quelez
// https://iquilezles.org/articles/distfunctions2d/

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;

#define S smoothstep
#define PI 3.14159

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define PINK vec3(236,203,217) / 255.

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

// From Inigo Quelez
//Heart - exact   (https://www.shadertoy.com/view/3tyBzV)
float dot2( in vec2 v ) { return dot(v,v); }
float sdHeart( vec2 p )
{
    p.x = abs(p.x);

    if( p.y+p.x>1.0 )
        return sqrt(dot2(p-vec2(0.25,0.75))) - sqrt(2.0)/4.0;
    return sqrt(min(dot2(p-vec2(0.00,1.00)),
                    dot2(p-0.5*max(p.x+p.y,0.0)))) * sign(p.x-p.y);
}

void main( )
{
   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
   vec2 m = iMouse.xy / u_resolution.xy;
   // Add a background color with gradient
   vec3 col = colorGradient(uv, RED, PINK, .4);
   uv = uv * 1.5;
   float h = sdHeart( uv - vec2(0.0, -0.55));
   float s = S(0.008, 0.0, h);
   col = (1.0 - s)*col + s * PURPLE;
 
   gl_FragColor = vec4(col,1.0) ; 
}