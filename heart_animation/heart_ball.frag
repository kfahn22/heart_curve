// The Art of Code Feathers in the Wind YouTube tutorial

#ifdef GL_ES
precision mediump float;
#endif

// Pass in uniforms from the sketch.js file
uniform vec2 u_resolution; 
uniform float iTime;
uniform vec2 iMouse;
uniform float iFrame;

#define S smoothstep
 // can adjust the speed of the animation by changing 
#define T (iTime*.5) 

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

// Rotation Matrix
mat2 Rot(float a)
{ 
float s = sin(a), c = cos(a);
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

float Heart( vec2 uv) {
    vec2 q;
    //Take the absolute value to make it symmetrical
    uv.x = abs(uv.x);
    uv.y = 0.7 * uv.y;
    float r = Spherical(uv).x;
    float theta = Spherical(uv).y;
  
    // Formula for Heart
    // q.x =  pow(r, 0.5)/1.5 * sin( theta * pow(r, 0.5) ) + pow(r, 0.5) /6.0 * sin (theta * pow(r, 0.5)) + pow(r, 0.5)/ 12.0  * sin( theta * pow(r, 0.5));
    // q.y = -pow(r, 2.5) * cos( theta * pow(r, 2.5) );// + r  * cos( theta * pow(r, 2.5));
    
    // Formula for Heart 2
    q.x = pow(r, 0.5)/1.1 * sin( theta * pow(r, 0.5) ) *  cos (theta * pow(r, 0.5)) ;//* log( abs(theta) * pow(r, 1.0));
    q.y = -pow(r, 3.5) * cos( theta * pow(r, 2.5) );
    
    float d = length(uv - q) ;
    float s = S(0.3, 0.299, d);
    return s;
}

vec3 Transform(vec3 pos, float angle) 
{  
  pos.xz *= Rot(angle);
  pos.xy *= Rot(angle*.7);
  
  return pos;
}

vec4 HeartBall( vec3 ro, vec3 rd, vec3 pos, float angle)
{
   vec4 col = vec4(0.);
   float t = dot(pos - ro, rd);
   vec3 eye = ro + rd*t;
   float y = length(pos - eye);
   
   // Ray marching
   if (y < 1.) 
   {  
      float x = sqrt(1. - y);  // adust for size of feather
      // Front intersection
      // subtract off position of sphere to remap to object coordinates
      vec3 pF = ro + rd *(t-x) - pos;  // front intersection
      pF = Transform(pF, angle);
      
      // add polar coordinates to. wrap feather around sphere
      //cyclindical projection
      // [-pi, pi] in x direction &  [-1,1 in y direction
      vec2 uvF = vec2(atan(pF.x, pF.z), pF.y);  
      uvF *= vec2(.25, .5);  // makes the feather bigger
      float f = Heart(uvF);
      // tweek the alpha separately
      vec4 front = vec4(vec3(f), S(0., .1, f)); // adjustment so don't see back from front
      
      
     // Back intersection
      vec3 pB = ro + rd * (t+x) - pos;  // back intersection
      pB = Transform(pB, angle);
      vec2 uvB = vec2(atan(pB.x, pB.z), pB.y);  //cyclindical projection
      uvB *= vec2(.25, 0.5);  // makes the feather bigger
      
      float b = Heart(uvB);
      vec4 back = vec4(vec3(b), S(0., .1, b));
      
      col = mix(back, front, front.a);   // additive blend, use alpha so doesn't look blown out  
      return col;
   }
}
void main()
{
   // Normalized pixel coordinates (from 0 to 1)
   vec2 uv = (gl_FragCoord.xy - 0.5*u_resolution.xy)/u_resolution.y;
   
   
   // add a mouse
   vec2 M = iMouse.xy/u_resolution.xy - .5; 
   
   vec3 col1 = colorGradient(uv, PINK, PURPLE, 0.5);
   // Add background color with gradient
   vec3 bg = vec3(.1, .2, .8)*(uv.y +.5);
   bg += vec3(.7, .4, .1)*(-uv.y+.5);
   vec4 col = vec4(col1, 0.);
    
   // Rotate the hearts
   // uv -= vec2(0.-.45);  //rotate around bottom of stem
   // float d = length(uv);
   // uv *= Rot(sin(iTime)*d); // rotate at different rates 
    //uv += vec2(0.-.45);  // shift back to same position
   // uv * = Rot(iTime);  

   // col += Feather(uv);
 
   vec3 ro = vec3(0,0,-3);
   vec3 rd = normalize(vec3(uv, 1));
   
   // Create multiple heartss; divisor in the += term determines # of hearts
   // use 1./50. so that i goes from [0,1]
   for (float i = 0.; i < 1.; i += 1./50.)
   {  
   
       // move the hearts across screen
       // need to scale appropriately
       // can add M.x to x and M.y to y to adjust with mouse
       float x = mix( -8., 8., fract(i+T*.1) );
       // randomize the y position
       float y = mix( -2., 2., fract(sin(i*564.3)*4570.3) );
       // render objects from back to front
       float z = mix(5., 0., i);
       float a = T+i*563.34;
       
       // Create the heart instance
       vec4 heart = HeartBall(ro, rd, vec3(x, y, z), a);
       
       // Blend the heart color into background color
       // so that hearts in distance fade
       heart.rgb = mix(col1, heart.rgb, mix(.3, 1., i) );
       
       // Take square root to get less contrast
       // Squaring it will give more contrast
       heart.rgb  = sqrt(heart.rgb);
       col = mix(col, heart, heart.a);
   }
   
   col = pow(col, vec4(.4545)); // gamma correction before you adjust color
   
    // Output to screen
    gl_FragColor = col;
}