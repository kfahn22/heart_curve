# Rendering a heart curve with a shader in P5.js

There are many ways to render a heart in a shader. Inigo Quelez has a signed distance function (SDF) for a [heart curve](https://iquilezles.org/articles/distfunctions2d/) on his website.  Additionally, Martijn Steinrucken (The Art of Code) has a [tutorial](https://www.youtube.com/watch?v=dXyPOLf2MbU) where demonstrates how to render a heart shape.

I wanted to use an approach more similar to the one taken by [Daniel Shiffman](https://thecodingtrain.com), so I started with his equations and played around with the parameters until I was able to render a decent heart shape. 

- [Coding Train Heart Curve Coding Challenge](https://thecodingtrain.com/challenges/134-heart-curve)

## Heart curve from Heart Curve coding challenge

<img class="img" src="images/heart_CT.jpg" alt="Heart Curve Coding Challenge" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

## Here is my version, which reminds me of a Smartie (candy): 

<img class="img" src="images/heart.jpg" alt="Heart" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="800" height="450">

- [P5 sketch](https://editor.p5js.org/kfahn/sketches/MVZqRTY_l)

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