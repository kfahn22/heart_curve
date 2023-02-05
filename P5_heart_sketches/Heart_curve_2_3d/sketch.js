// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Heart curve equations from http://www.mathematische-basteleien.de/heart.html
// https://mathworld.wolfram.com/HeartCurve.html

// Note that two and four render the slowest

let hearts = [];
let a = 0;
let r;
const e = 2.71828;
let angle = 0; //

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  for (let z = -10; z < -1; z += 1) {
    hearts.push(new Heart(0, 0, z));
  }
  for (let z = 1; z < 10; z += 1) {
    hearts.push(new Heart(0, 0, z));
  }
}


function draw() {
  background(0);
  noStroke();
  rotateY(angle);
  angle += 1;
  let num = hearts.length;
  for (let k = 0; k < num/2; k++) {
    r = map(k, 0, num/2, 2, 6);
    hearts[k].ctHeart(r);
    hearts[k].show(k, num);
  }
  for (let k = num/2; k < num; k++) {
    r = map(k, 0, hearts.length, 6, 2);
    hearts[k].ctHeart(r);
    hearts[k].show(k, num);
  }

}

// function mousePressed() {
//   save('heart.jpg');
//  }