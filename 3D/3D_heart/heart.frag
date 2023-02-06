// This file renders a 3d heart
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

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

// Add color
// The uvs are floating point with a range of [0.0,1.0] so we normalize by dividing by 255.
#define PURPLE vec3(83, 29,109) / 255.
#define RED vec3(191, 18, 97) / 255.
#define RASPBERRY vec3(236,1,90) / 255.
#define PINK vec3(236,203,217) / 255.

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
// Starting point for formulas from Inigo Quilez Youtube tutorial Making a Heart
// float Heart_3D( vec3 p ) {
//     vec3 q;
//     float r = 0.0; // 15.0
//     float r1 = 18.;
//     p.x = abs(p.x);
//     float d = length(p) - r;
//     //p.x = abs(p.x);
//     //p.y = 0.9* p.y - 0.8; //1.2
//    // p.y = 0.9* p.y; //1.2
//     p.y = 0.8* p.y; //1.2
//     //float k = (15.0 - abs(p.x))/r;
//     //float k = (20.0 - p.x)/r1;
//     float k = (20.0 - p.x)/20.;
//     //p.y = 7.0 + p.y - p.x * sqrt(k);
//     q.x = p.x;
//     q.y = 9.0 + 1.25 * p.y - 0.50 * q.x * sqrt(k);
//     q.z = p.z * (2.4-q.y/r1);
//     d -= length(q);
//     return d;
// }

// Copy to edit!!
float Heart_3D( vec3 p ) {
    vec3 q;
    float r = 5.0; // 15.0
    float r1 = 18.; // 18.
    p.x = abs(p.x);
    float d = length(p) - r;
    //p.x = abs(p.x);
    //p.y = 0.9* p.y - 0.8; //1.2
   // p.y = 0.9* p.y; //1.2
    p.y = -0.8* p.y; //1.2
    //float k = (15.0 - abs(p.x))/r;
    //float k = (20.0 - p.x)/20.;
    float k = (15.0 - p.x)/0.5;
    //p.y = 7.0 + p.y - p.x * sqrt(k);
    q.x = p.x;
   // q.y = 5.0 - 1.* p.y - 0.50 * q.x * sqrt(k);
    q.y = 5.0 - 1.5 * p.y - 0.15 * q.x * sqrt(k);
    q.z = p.z * (2.4-q.y/r1);
    d -= length(q);
    return d;
}

float GetDist(  vec3 p ) {
  return Heart_3D( p );
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
    float t = iTime * 0.001;
	vec2 m = iMouse.xy/u_resolution.xy;
    vec3 col = vec3(0);
    
    vec3 ro = vec3(0, 3., -3);
    ro.yz *= Rot(-m.y*3.14+1.);
    ro.xz *= Rot(-m.x*6.2831);
    
    
    vec3 rd = GetRayDir(uv* Rot(PI), ro, vec3(0,0,0), 0.75);
    col = colorGradient(uv, PURPLE, PINK, 0.25);
  
    float d = RayMarch(ro, rd);

    if(d<MAX_DIST) {
        vec3 p = ro + rd * d;
        vec3 n = GetNormal(p);
        vec3 r = reflect(rd, n);

        float dif = dot(n, normalize(vec3(1,2,3)))*.5+.5;
        vec3 c = vec3(dif);
         
        float spec = pow(max(0.0, r.y), 0.5); // add specular highlight
        col = mix(RASPBERRY, vec3(dif), 0.5);//+spec;
      
    } 
       
    col = pow(col, vec3(.4545));	// gamma correction
    
    gl_FragColor = vec4(col,1.0);
}