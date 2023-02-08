// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let r = 1;
const e = 2.71828;

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);

  for (let i = 0; i < 10; i++) {
    hearts.push(new Heart(random(150),random(150), r));
  }
}


function draw() {
  background('#330033');
 // translate(width/2, height/2);
  noStroke();
  for (let k = 0; k < hearts.length; k++) {
    hearts[k].ctHeart();
    hearts[k].show(k, hearts.length, r);
  }
  if (r < 3)
 { r = r + 0.01;}
}

// function mousePressed() {
//   save('heart.jpg');
//  }