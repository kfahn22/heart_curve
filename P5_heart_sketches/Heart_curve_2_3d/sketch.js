// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Heart curve equations from http://www.mathematische-basteleien.de/heart.html
// https://mathworld.wolfram.com/HeartCurve.html

// Note that two and four render the slowest

let hearts = [];
let a = 0;
const e = 2.71828;
let angle = 0; //

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  for (k = 0; k < 1; k++) {
    hearts.push(new Heart(0, 0));
  }
}

function draw() {
  background(0);
  noStroke();
  rotateY(angle);
  angle += 1;
  for (let k = 0; k < hearts.length; k++) {
   // for (let r = 0; r < 5; r++) {
      hearts[k].ctHeart(2, hearts.length);
      hearts[k].show();
   // }
  }
}

// function mousePressed() {
//   save('heart.jpg');
//  }