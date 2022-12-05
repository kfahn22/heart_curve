# Rendering a heart curve with a shader in P5.js

There are many ways to render a heart in a shader. Inigo Quelez has a signed distance function (SDF) for a [heart curve](https://iquilezles.org/articles/distfunctions2d/) on his website.  Additionally, Martijn Steinrucken (The Art of Code) has a [tutorial](https://www.youtube.com/watch?v=dXyPOLf2MbU) where demonstrates how to render a heart shape.

I wanted to use an approach more similar to the one taken by [Daniel Shiffman](https://thecodingtrain.com), so I started with his equations and played around with the parameters until I was able to render a decent heart shape. 

- [Coding Train Heart Curve Coding Challenge](https://thecodingtrain.com/challenges/134-heart-curve)

## Heart curve from Heart Curve coding challenge

<img class="img" src="images/heart_CT.jpg" alt="Heart Curve Coding Challenge" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

## Heart curve 1

The equations draw a petal shape.  We render the heart by drawing shape and its reflection.

`const r = 10 * pow(sin(a), 7) * pow(e, 2 * a);`  
`const x = r * cos(a);`  
`const y = -r * abs(sin(a));`

<img class="img" src="images/heart_1.jpg" alt="Heart Curve 1" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="450" height="450">


I adapted the equations for heart curves 2 and 3 from [MathWorld](https://mathworld.wolfram.com/HeartCurve.html)

## Heart curve 2

`const r = 325;`  
`const x = -r * sin(a) * cos(a) * log(abs(a) * 0.9);`  
`const y = -1.25 * r * pow(abs(a), 0.7) * cos(a);`

<img class="img" src="images/heart_2.jpg" alt="Heart Curve 2" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="450" height="450">

## Heart curve 3

`const r = 450 * (sin(a)*pow(abs(cos(a)), 0.05) / (sin(a)+7/5) );`  
`const x =  r * cos(a);`  
`const y = 1.25 * r * abs(pow(sin(a), 0.25));`

<img class="img" src="images/heart_3.jpg" alt="Heart Curve 3" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="450" height="450">

## Heart curve 4

// Heart curve equations from http://www.mathematische-basteleien.de/heart.htm

`const r =  10 * pow(sin(a), 7) * pow(e, abs(2*a));`  
`const x = r * cos(a);`  
`const y = r * sin(a);`

<img class="img" src="images/heart_4.jpg" alt="Heart Curve 4" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="450" height="450">

# Heart curves rendered with a shader

## Here is my version, which reminds me of a Smartie (candy): 

<img class="img" src="images/heart.jpg" alt="Heart" style=" display: block;
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

## Here is the version from based on SDF from Inigo Quelez

<img class="img" src="images/heart_iq.jpg" alt="SDF Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

# Motivation

## I am trying to work out how to create a fractal flame shader. As a first step I am trying to write the code for the different variations used by Daniel Shiffman in his [FractalFlames](https://github.com/CodingTrain/FractalFlame) repo.  