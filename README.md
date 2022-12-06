# Rendering a heart curve with a shader in P5.js

There are many ways to draw a heart shape. It could be something really simple like rotating a square by PI/2 and attatching half circles to two adjacent sides.  You can also render a heart using higher order math equations.  Following [Daniel Shiffman](https://thecodingtrain.com)'s approach in his Heart Curve coding challenge, I choose the later route. I started with the equations on two different websites, and played around with the parameters until I was able to render a decent heart shape. 

## Heart curve from Heart Curve coding challenge

Daniel used the following equations to render a heart curve.

`const r = height/40;`  
`const x = r * 16 * pow(sin(a), 3);`  
`const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a)`

<img class="img" src="images/heart_CT.jpg" alt="Heart Curve Coding Challenge" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

- [Heart curve P5 sketch] (https://editor.p5js.org/codingtrain/sketches/egvieHyt0)
- [Coding Train Heart Curve Coding Challenge](https://thecodingtrain.com/challenges/134-heart-curve)

## Heart curve 1

In my first version of the heart curve, the equations draw a petal shape.  I rendered the heart by drawing the shape and its reflection.  Equations for heart curve equations from http://www.mathematische-basteleien.de/heart.html

`const r = 10 * pow(sin(a), 7) * pow(e, 2 * a);`  
`const x = r * cos(a);`  
`const y = -r * abs(sin(a));`

<img class="img" src="images/heart_1.jpg" alt="Heart Curve 1" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">


## Heart curve 2

The heart curve equations for version four are adapted from http://www.mathematische-basteleien.de/heart.htm.

`const r = 40 * (1-abs(a))*(1+2*abs(a));`  
`const x = r* cos(a/2)*sin(a);`  
`const y = -r* sin(a);`

<img class="img" src="images/heart_2.jpg" alt="Heart Curve 2" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

I adapted the equations for heart curves 3 and 4 from [MathWorld](https://mathworld.wolfram.com/HeartCurve.html)

## Heart curve 3

`const r = 325;`  
`const x = -r * sin(a) * cos(a) * log(abs(a) * 0.9);`  
`const y = -1.25 * r * pow(abs(a), 0.7) * cos(a);`

<img class="img" src="images/heart_3.jpg" alt="Heart Curve 3" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">


## Heart curve 4

`const r = 2 - 2 * sin(a) + sin(a)*(pow(abs(cos(a)), 0.5)/(sin(a) + 1.4)`  
`const x = r * cos(a);`  
`const y = r * sin(a);`

<img class="img" src="images/heart_4.jpg" alt="Heart Curve 4" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">


# Heart curves rendered with a shader

There are many ways to render a heart in a shader. Inigo Quelez has a signed distance function (SDF) for a [heart curve](https://iquilezles.org/articles/distfunctions2d/) on his website.  Additionally, Martijn Steinrucken (The Art of Code) has a [tutorial](https://www.youtube.com/watch?v=dXyPOLf2MbU) where demonstrates how to render a heart shape.

## Here is my version, which reminds me of a Smartie candy: 

<img class="img" src="images/shader_heart.jpg" alt="Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

- [P5 sketch](https://editor.p5js.org/kfahn/sketches/MVZqRTY_l)

## Here is a screen shot of an animation adapted from a Starfield tutorial by Martyn Steinrucken

<img class="img" src="images/heart_animation.jpg" alt="Heart Animation" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

## Here is my first attempt at rendering a 3d heart

<img class="img" src="images/3d_heart.jpg" alt="3DHeart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="600" height="600">

## Here is the version from Martyn Steinrucken

<img class="img" src="images/heart_art.jpg" alt="Art of Code Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">
