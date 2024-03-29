# Rendering a Heart Curve in P5.js

There are many ways to draw a heart shape. It could be something really simple like rotating a square by PI/4 and attatching half circles to two adjacent sides.  You can also render a heart using higher order math equations.  Following [Daniel Shiffman](https://thecodingtrain.com)'s approach in his Heart Curve coding challenge, I choose the later route. I utilized the equations from two different websites.  In some cases, I had to tinker a bit with the parameters until I was able to render a decent heart shape. 

## Heart curve from Heart Curve coding challenge

Daniel used the following equations to render a heart curve.

`const r = height/40;`  
`const x = r * 16 * pow(sin(a), 3);`  
`const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a)`

<img class="img" src="images/heart_CT.jpg" alt="Heart Curve Coding Challenge" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[Coding Train P5 sketch](https://editor.p5js.org/codingtrain/sketches/egvieHyt0)  
[Coding Train Heart Curve Coding Challenge](https://thecodingtrain.com/challenges/134-heart-curve)


The equations for the first and second heart curves are from [Mathematische-Basteleien](http://www.mathematische-basteleien.de/heart.html), while the equations for heart curves 3 and 4 are from [MathWorld](https://mathworld.wolfram.com/HeartCurve.html).  All four hearts are added as classes in this [p5 sketch](https://editor.p5js.org/kfahn/sketches/xNdg0UUI6).  Heart curve 3 is the heart that will render and the others are commented out. 


## Heart curve 1

In the first heart curve, the equations draw a petal shape.  I rendered the heart by drawing the shape and its reflection.  

`const r = 10 * pow(sin(a), 7) * pow(e, 2 * a);`  
`const x = r * cos(a);`  
`const y = -r * abs(sin(a));`

<img class="img" src="images/heart_1.jpg" alt="Heart Curve 1" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/TaLiYG9ed)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/P5_heart_sketches/Heart_curve_1)

## Heart curve 2

The second curve is tall and skinny, and renders a little slowly.

`const r = 40 * (1-abs(a))*(1+2*abs(a));`  
`const x = r * cos(a/2)*sin(a);`  
`const y = -r* sin(a);`

<img class="img" src="images/heart_2.jpg" alt="Heart Curve 2" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/QIxvo0IsR)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/P5_heart_sketches/Heart_curve_2)

## Heart curve 3

This one is my favorite.  Just a typical heart shape.  

`const r = 325;`  
`const x = -r * sin(a) * cos(a) * log(abs(a) * 0.9);`  
`const y = -1.25 * r * pow(abs(a), 0.7) * cos(a);`

<img class="img" src="images/Heart_3.jpg" alt="Heart Curve 3" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/jypBSD0PX)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/P5_heart_sketches/Heart_curve_3)

## Heart curve 4

This heart is very curvy.  It would probably look a little  better with a deeper curve in the middle.

`const r = 2 - 2 * sin(a) + sin(a)*(pow(abs(cos(a)), 0.5)/(sin(a) + 1.4)`  
`const x = r * cos(a);`  
`const y = r * sin(a);`

<img class="img" src="images/heart_4.jpg" alt="Heart Curve 4" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">  

[P5 sketch](https://editor.p5js.org/kfahn/sketches/58a49hodn)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/P5_heart_sketches/Heart_curve_4)

# Heart curves rendered with a shader

There are many ways to render a heart in a shader. Inigo Quelez has a signed distance function (SDF) for a [heart curve](https://iquilezles.org/articles/distfunctions2d/) on his website.  Additionally, Martijn Steinrucken (The Art of Code) has a tutorial where he demonstrates how to render a heart shape.

## Here is my version, which reminds me of a Smartie candy: 

<img class="img" src="images/shader_heart.jpg" alt="Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/15Wj_4RYR)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/shader_heart_sketches/heart_sketch)

## Another shader version.

The trick to getting this one to render was using the clamp function to limit theta.

<img class="img" src="images/shader_heart2.jpg" alt="Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/sxV-8QgVn)    
[Code](https://github.com/kfahn22/heart_curve/tree/main/shader_heart_sketches/heart_sketch2)

## Here is the version from [Making a Heart in ShaderToy](https://www.youtube.com/watch?v=dXyPOLf2MbU) tutorial by The Art of Code.

<img class="img" src="images/heart_art.jpg" alt="Art of Code Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

## Here is a screen shot of an animation adapted from [Shader Coding: Making a starfield](https://www.youtube.com/watch?v=dhuigO4A7RY) tutorial by The Art of Code (Martyn Steinrucken).

Martyn Steinrucken explains the algorithm to create this effect in his tutorial, so if you are interested in it go watch his excellent video.

<img class="img" src="images/heart_animation.jpg" alt="Heart Animation" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/CUZdtTg6L)    
[Code](https://github.com/kfahn22/heart_curve/tree/main/Animation/heart_animation)

## Another animation with a different heart curve

<img class="img" src="images/animation2.jpg" alt="Heart Animation 2" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="500">

[P5 sketch](https://editor.p5js.org/kfahn/sketches/vtP85qLbB)     
[Code](https://github.com/kfahn22/heart_curve/tree/main/Animation/Heart_animation_2)

## 3D Heart

I have tried several different approaches to rendering a 3D heart.  My most successful version is a little hacky and I got the idea from a failed attempt to ask chatGPT to render a 3D heart (it gave code for a rotating 2D heart -- most likely from Daniel Shiffman's Heart curve coding challenge.)  While it did not give me the answer I was hoping for, it did suggest a way to render the heart -- draw hearts with different combinations of r and z.  

![](./GIFS/3dheart.gif)  
[P5 sketch](https://editor.p5js.org/kfahn/sketches/qUoH9VLg3)  
[Code](https://github.com/kfahn22/heart_curve/tree/main/3D/P5_3D_heart_GIF)

Here is a 3D shader version. This is my attempt to follow along with Inigo Quelez's [Making a heart with Maths](https://www.youtube.com/watch?v=aNR4n0i2ZlM) Youtube tutorial, which is rendered by starting with a sphere and adding distortions.  While I have managed to render a 3D heart, my version is not as nicely curved as his.

<img class="img" src="images/3d_shader_heart.png" alt="3D shader heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">  

[P5 sketch](https://editor.p5js.org/kfahn/sketches/tPl86Ecgl)    
[Code](https://github.com/kfahn22/heart_curve/tree/main/3D/3D_shader_heart)