// This file renders the supershape
// The code for the superformula and supershape3D are based primarily on Daniel Shiffman's 3d Supershape Coding CHallenge

// This method is based on a youtube tutorial by The Art of Code  Martijn Steinrucken
// How to turn your 2d fractal into 3d!
// https://www.youtube.com/watch?v=__dSLc7-Cpo
// https://www.youtube.com/c/TheArtofCodeIsCool

// Base code based on the Ray Marching Starting Point from the Art of Code
// https://www.youtube.com/watch?v=PGtv-dBi2wE

#ifdef GL_ES
precision mediump float;
#endif

#define MAX_STEPS 100
#define MAX_DIST 100.
#define SURF_DIST .001
#define S smoothstep
#define T iTime
#define PI 3.14159

// supershape parameters
uniform float aa;
uniform float bb;
uniform float rr; 
uniform float m;  
uniform float n1;
uniform float n2;
uniform float n3;
uniform float re;  // value for red
uniform float gr;  // value for green
uniform float bl;  // value for blue

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define ORANGE vec3(251,162, 100) / 255.
#define BLUE vec3(118, 212, 229) / 255.
#define TEAL vec3(11, 106, 136) / 255.
#define RASPBERRY vec3(236,1,90) / 255.

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

// Smooth max function from The Art of Code
float smax(float a, float b, float k) {
    float h = clamp( (b-a) / k+0.5, 0.0 ,1.0 );
    return mix(a, b, h) + h* (1.0-h)*k * 0.5;
}

// Spherical function modified from Daniel Shiffman
vec2 Spherical( vec2 pos) 
{
   float r = sqrt(pos.x*pos.x + pos.y*pos.y);
   float theta = atan(pos.y, pos.x);
   vec2 w = vec2(r, theta);
   return w;
}

// From Daniel Shiffman's 2d Supershape Coding Challenge
float superFormula(float theta) {
  float t1 = abs((1.0/aa) * cos(m * theta / 4.0));
  t1 = pow(t1, n2);
  
  float t2 = abs((1.0/bb) * sin(m * theta / 4.0));
  t2 = pow(t2, n3);
  
  float t3 = t1 + t2;
  float r = pow(t3, -1.0 / n1);
  return r;
}

float Supershape2D( vec2 uv ) {
  vec2 q;
  float d = length(uv);
  float angle = atan(uv.y, uv.x);
  float radius = superFormula( angle );
  q.x = rr * radius * cos(angle);
  q.y = rr * radius * sin(angle);
  return d -= length(q); 
}

float sdHeart( vec2 uv, float blur) {
    float r = 0.28;  
    //blur *= r;
    
    uv.x * 0.7;
    //Take the absolute value to make it symmetrical
    // Take square root to get nice curve
    // smax is eliminating hard edges
    uv.y -= smax(sqrt(abs(uv.x)) * 0.5, blur, 0.1);
    uv.y += 0.1 + blur * 0.5;
    
    float d = length(uv) ;
    //float m = S(r+blur, r-blur-0.01, d);
    return d;
}


float Heart( vec2 uv) {
    vec2 q;
    //Take the absolute value to make it symmetrical
    uv.x = abs(uv.x);
    
    float d = length(uv);
    float angle = atan(uv.y, uv.x);
    float radius = superFormula( angle );
    
    // Get r and theta from the Spherical function
    float r = Spherical(uv).x;
    float theta = Spherical(uv).y;
  
    // Formula from Fractal Flames sketch

    q.x =  radius * sin(theta * r);
    q.y = -radius * cos(theta * r);
    // Formula for Heart 1
    // q.x =  pow(r, 0.5)/1.5 * sin( theta * pow(r, 0.5) ) + pow(r, 0.5) /6.0 * sin (theta * pow(r, 0.5)) + pow(r, 0.5)/ 12.0  * sin( theta * pow(r, 0.5));
    // q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );// + r  * cos( theta * pow(r, 2.5));
    
    // Formula for Heart 2
    // q.x = pow(r, 0.5)/1.1 * sin( theta * pow(r, 0.5) ) *  cos (theta * pow(r, 0.5)) ;//* log( abs(theta) * pow(r, 1.0));
    // q.y = -pow(r, 3.5) * cos( theta * pow(r, 2.5) );
    
    // Instead of iterating through theta we find the distance from a uv to the curve
    d -= length(q) ;
    return d;
}

float Rotation ( vec3 p ) {
   float d1 =  Heart( vec2( length(p.xy), p.z ) );
   float d2 =  Heart( vec2( length(p.yz), p.x ) );
   float d3 =  Heart( vec2( length(p.xz), p.y ) );
   //can try different combos of the following
   return smax(d1, max(d2, d3), 0.5);
}

float GetDist(  vec3 p ) {
  return Rotation( p );
}

float RayMarch(vec3 ro, vec3 rd) {
	float dO=0.;
    
    for(int i=0; i<MAX_STEPS; i++) {
    	vec3 p = ro + rd*dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO>MAX_DIST || abs(dS)<SURF_DIST) break;
    }   
    return dO;
}

vec3 GetNormal(vec3 p) {
	float d = GetDist(p);
    vec2 e = vec2(.001, 0);
    
    vec3 n = d - vec3(
        GetDist(p-e.xyy),
        GetDist(p-e.yxy),
        GetDist(p-e.yyx));
    
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l-p),
        r = normalize(cross(vec3(0,1,0), f)),
        u = cross(f,r),
        c = f*z,
        i = c + uv.x*r + uv.y*u,
        d = normalize(i);
    return d;
}

void main( )
{
    vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3, -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    
    vec3 rd = GetRayDir(uv, ro, vec3(0,0.,0), 1.0);
    col = colorGradient(uv,BLUE, PURPLE, 0.75);
  
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
         
       col += vec3(c); //very nice purple
       // col = vec3(0.5, dif*0.8, 1.0 ); // purple
       // col = vec3(0.0, 0.5*dif, dif*1.0); // aqua
       col = c * RED;
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}