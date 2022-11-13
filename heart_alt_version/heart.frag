// Code ported from The Art of Code Tutorial
// Making a Heart in ShaderToy
// https://www.youtube.com/watch?v=dXyPOLf2MbU

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

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

float smax(float a, float b, float k) {
    float h = clamp( (b-a) / k+0.5, 0.0 ,1.0 );
    return mix(a, b, h) + h* (1.0-h)*k * 0.5;
}

float Heart( vec2 uv, float blur) {
    float r = 0.28;  
    //blur *= r;
    
    uv.x * 0.7;
    //Take the absolute value to make it symmetrical
    // Take square root to get nice curve
    // smax is eliminating hard edges
    uv.y -= smax(sqrt(abs(uv.x)) * 0.5, blur, 0.1);
    uv.y += 0.1 + blur * 0.5;
    
    float d = length(uv) ;
    float m = S(r+blur, r-blur-0.01, d);
    return m;
}

void main( )
{
   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
   vec2 m = iMouse.xy / u_resolution.xy;
   // Add a background color with gradient
    vec3 col = colorGradient(uv, PURPLE, BLUE, .4);
 
     
     float h = Heart( uv, 0.0);
     col += h * RED;
 
    gl_FragColor = vec4(col,1) ; 
}


