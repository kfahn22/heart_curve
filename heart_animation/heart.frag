// Adapted to P5.js from the Art of Code YouTube star field tutorial
// by Martijn Steinrucken aka The Art of Code/BigWings - 2020
// YouTube: youtube.com/TheArtOfCodeIsCool

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define NUM_LAYERS 4.
#define S smoothstep

mat2 Rot( float a) 
{
   float s = sin(a);
   float c = cos(a);
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

float smax(float a, float b, float k) {
    float h = clamp( (b-a) / k+0.5, 0.0 ,1.0 );
    return mix(a, b, h) + h* (1.0-h)*k * 0.5;
}

float acHeart( vec2 uv, float blur) {
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

float Heart( vec2 uv) {
    vec2 q;
    //Take the absolute value to make it symmetrical
    uv.x = abs(uv.x);
    
    float r = Spherical(uv).x;
    float theta = Spherical(uv).y;
  
    // Formula for Heart
    // q.x =  pow(r, 0.5)/1.5 * sin( theta * pow(r, 0.5) ) + pow(r, 0.5) /6.0 * sin (theta * pow(r, 0.5)) + pow(r, 0.5)/ 12.0  * sin( theta * pow(r, 0.5));
    // q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );// + r  * cos( theta * pow(r, 2.5));
    
    // Formula for Heart 2
    q.x = pow(r, 0.5)/1.1 * sin( theta * pow(r, 0.5) ) *  cos (theta * pow(r, 0.5)) ;
    q.y = -pow(r, 3.5) * cos( theta * pow(r, 2.5) );
    
    float d = length(uv - q) ;
    float s = S(0.3, 0.299, d);
    return s;
}

 float Hash21(vec2 p)
 {
  p = fract(p*vec2(123.34, 456.21));
  p += dot(p, p+45.32);
  return fract(p.x*p.y);
 }
 
 vec3 HeartLayer(vec2 uv)
 {
    vec3 col = vec3(0.);

    // Make boxes with (0,0) in middle
    vec2 gv = fract(uv) - 0.5;
    
    // Add Hearts
    // Add id for boxes
    vec2 id = floor(uv);
    
    // Iterate through neighborhood of box to add contribution from neighbors
    for (int  y =-1; y <= 1; y++)
    {
      for (int x=-1; x <= 1; x++) 
      {
         vec2 offset = vec2(x,y);
         float n = Hash21(id+offset);  // random number between 0,1
         
         //  Make hearts different sizes
         float size = fract(n*345.678);
         // Add by .5 to keep values between -.5, .5

        // With my heart -- there is an artifact present
        //float heart = Heart( gv - offset- vec2(n, fract(n*56.)) +.5); 
         //float heart = Heart( gv - offset - vec2(n, fract(n*56.)) +.5); 
        // Using Art of Code heart
       float heart = acHeart( gv - offset - vec2(n, fract(n*56.)) +.5, 0.0 ); 
        vec3 color = sin(vec3(0.4, .001, .9)*fract(n*2345.2)*19.)*.5+.5;
        color += color*vec3(.5, .001, 1.+size); // can filter out color by change R/G/B value to 0.
        
        // Add a twinkle
        heart *= sin(iTime*3.+n*6.2831)*.5 + 1.;
        col += heart*size*color;
      }
    }
    return col;
}

void main()
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
    uv.y = uv.y * 0.7;
    float t = iTime*.02;
    //uv *= Rot(t);
    
    vec3 col = vec3(0.);
    
    for (float i=0.; i<1.; i += 1./NUM_LAYERS)
    {
        // Depth increases with time; if hits 1 get reset
        float depth = fract(i+t);
        float scale = mix(20., 0.5, depth);
        // Adjust so that repeat is not noticable
        float fade = depth*smoothstep(1., .9, depth);  // multiply by depth 0 in back
        col += HeartLayer(uv*scale+i*453.)*fade; // add value so layers are shifted
    }
    //if (gv.x>.48 || gv.y>.48) col.r = 1.;
    //col.rg = id*.4;  Every box has a different color
    
    
    gl_FragColor = vec4(col,1.0);
}