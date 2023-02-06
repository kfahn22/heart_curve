// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let a = 0;
let r;
const e = 2.71828;
let angle = 0; 

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  for (let z = -5; z < 5; z += 0.1) {
    hearts.push(new Heart(0, 0, z));
  }
  
}

function draw() {
  background('#330033');
  noStroke();
  rotateY(angle);
  angle += 1;
  let num = hearts.length;
  for (let k = 0; k < num; k++) {
    hearts[k].ctHeart();
    hearts[k].show();
  }
}


// function mousePressed() {
//   save('heart.jpg');
//  }