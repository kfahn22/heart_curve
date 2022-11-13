// I started with the formula for a heart shape from the Coding Train repo
// https://github.com/CodingTrain/FractalFlame
// I had to edit the parameters to get a heart shape

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

float Heart( vec2 uv) {
    vec2 q;
    //Take the absolute value to make it symmetrical
    uv.x = abs(uv.x);
    
    float r = Spherical(uv).x;
    float theta = Spherical(uv).y;
  
    // Formula for Heart
    q.x =  pow(r, 0.5)/1.5 * sin( theta * pow(r, 0.5) ) + pow(r, 0.5) /6.0 * sin (theta * pow(r, 0.5)) + pow(r, 0.5)/ 12.0  * sin( theta * pow(r, 0.5));
    q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );// + r  * cos( theta * pow(r, 2.5));
    
    float d = length(uv - q) ;
    return d;
}

void main( )
{
   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
   // Add a background color with gradient
    vec3 col = colorGradient(uv, PURPLE, BLUE, .4);
 
     uv.y = uv.y * 0.6;
     float d = Heart( uv + vec2(0.0, 0.0));
     float m = S(0.31, 0.29, d);
     col += m * RED;
 
    gl_FragColor = vec4(col,1) ; 
}


