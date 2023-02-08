// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let r = 2;
const e = 2.71828;
let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);

  for (let i = 0; i < 1; i++) {
    hearts.push(new Heart(0, 0));
  }
}


function draw() {
  background('#330033');
  noStroke();
  for (let k = 0; k < hearts.length; k++) {
    hearts[k].ctHeart(r);
    hearts[k].show(k, hearts.length);
  }
  r = r + 50;
}

// function mousePressed() {
//   save('heart.jpg');
//  }