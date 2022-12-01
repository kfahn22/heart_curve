// I started with the formula for a heart shape from the Coding Train repo
// https://github.com/CodingTrain/FractalFlame
// I had to edit the parameters to get a heart shape

// Formula for heart curve from https://mathworld.wolfram.com/HeartCurve.html
// Used by Daniel Shiffman in Heart Curve coding challenge 

// x = 16.0 * pow(sin(t,3.0));
// y = 13.0 * cos(t) + 5.0 * cos(2.0 * t) + 2.0 * cos ( 3.0 * t) + cos ( 4.0 * t);

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;

#define S smoothstep
#define PI 3.14159
#define NUM_HEARTS 20.
#define t iTime*0.01

// Color scheme
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define PINK vec3(236,203,217) / 255.
#define RASPBERRY vec3(236,1,90) / 255.

// Function to create a color gradient
vec3 colorGradient(vec2 uv, vec3 col1, vec3 col2, float m) {
  float k = uv.y*m + m;
  vec3 col = mix(col1, col2, k);
  return col;
}

// Rotation matrix
mat2 Rot(float a) {
    float s=sin(a), c=cos(a);
    return mat2(c, -s, s, c);
}

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

float myHeart( vec2 uv) {
    vec2 q;
   
    //Take the absolute value to make it symmetrical
    uv *= 3.;
    uv.x = abs(uv.x);
    uv.y = uv.y * 0.45;
    
    float r = Spherical(uv).x;
    float theta = Spherical(uv).y;
  
    // Formula for Heart
    // q.x =  pow(r, 0.5)/1.5 * sin( theta * pow(r, 0.5) ) + pow(r, 0.5) /6.0 * sin (theta * pow(r, 0.5)) + pow(r, 0.5)/ 12.0  * sin( theta * pow(r, 0.5));
    // q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );// + r  * cos( theta * pow(r, 2.5));
    
    // Formula for Heart 2
    q.x = pow(r, 0.5)/1.1 * sin( theta * pow(r, 0.5) ) *  cos (theta * pow(r, 0.5)) ;//* log( abs(theta) * pow(r, 1.0));
    q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );
    
  
    float d = length(uv - q) ;
    return d;
}

float smax(float a, float b, float k) {
    float h = clamp( (b-a) / k+0.5, 0.0 ,1.0 );
    return mix(a, b, h) + h* (1.0-h)*k * 0.5;
}

float Heart( vec2 uv, float blur) {
    float r = 0.28;  
    //blur *= r;
    
   // uv.x * 0.7;
    //Take the absolute value to make it symmetrical
    // Take square root to get nice curve
    // smax is eliminating hard edges
    uv.y -= smax(sqrt(abs(uv.x)) * 0.5, blur, 0.1);
    uv.y += 0.1 + blur * 0.5;
    
    float d = length(uv) ;
    float m = S(r+blur, r-blur-0.01, d);
    return m;
}
// vec3 rotHeart( vec2 uv ) {
//     vec3 col = vec3(0);
//     float t = 0.7;
//     uv.x * t;
//     uv *= 4.0;
//    float i = 1.;
//    float d1 = Heart(uv - vec2(0., t/2.), 0.01);
//    float m1 = S(0.299, 0.3, d1);
//    //note if don't do semetric transformation will warp heart
//    for (float i = 0; i )
//    float d2 = Heart(uv*Rot(PI/6.) + vec2(0., -t/2.0), 0.01);
//    float m2 = S(0.299, 0.3, d2);
//    float d3 = Heart(uv*Rot(PI/3.) + vec2(0., -t/2.0), 0.01);
//    float m3 = S(0.299, 0.3, d3);
//    float d4 = Heart(uv*Rot(PI*1./2.) + vec2(0., -t/2.0), 0.01);
//    float m4 = S(0.299, 0.3, d4);
//    float d5 = Heart(uv*Rot(PI*2./3.) + vec2(0., -t/2.0), 0.01);
//    float m5 = S(0.299, 0.3, d5);
//    col += max((m1 + m3 + m5)* RED, (m2 + m4)* PURPLE);
//    return col;
// }

// pseudo-random number function from Art of Code
 float Hash21(vec2 p)
 {
  p = fract(p*vec2(123.34, 456.21));
  p += dot(p, p+45.32);
  return fract(p.x*p.y);
 }

 // HeartLayer function adapted from StarLayer function from Art of Code
 vec3 HeartLayer(vec2 uv)
 {
    vec3 col = vec3(0.);
    //vec3 col = DKPURPLE;
    //col = colorGradient(uv, RED, DKPURPLE, 0.8);
    
    // Make boxes with (0,0) in middle
    vec2 gv = fract(uv) - 0.5;
    // Add Hearts
    // Add id for boxes
    vec2 id = floor(uv);
    //float n = Hash21(id+offset);  // random number between 0,1
    // Iterate through the hearts
    for (float i=0.; i<1.; i += 1./NUM_HEARTS)
    {
        // Depth increases with time; if hits 1 get reset
        float depth = fract(i+t);
        float scale = mix(20., 0.5, depth);
        //float scale = mix(8., 0.5, depth);
        // Adjust so that repeat is not noticable
       //float fade = depth*smoothstep(1., .8, depth); 
       float fade = depth*smoothstep(1., .9, depth);  // multiply by depth 0 in back
        col += Heart(uv*i*Rot(PI*1./i), 0.01)*fade*PURPLE; // add value so layers are shifted
        //col += col*vec3(0.3*pow(scale, 0.1), 0.01*pow(scale, 0.13), 0.2*pow(scale, 0.1)); // can filter out color by change R/G/B value to 0.
    }
        
        // Add a twinkle
        //heart *= sin(iTime*3.+n*6.2831)*.5 + 1.;
        //col += heart*size*color;
        return col;
      }
    
void main( )
{
   vec2 uv = (gl_FragCoord.xy-0.5*u_resolution.xy) / u_resolution.y;
   // Add a background color with gradient
    vec3 col = vec3(0);
     
     vec3 c = HeartLayer(uv);
     col += c;
    
 
    gl_FragColor = vec4(col,1) ; 
}