// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

// nice pace but not adding new hearts

let hearts = [];
let timeOfLastHeart = 0;
let r = 1;
const e = 2.71828;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  {
    for (i = 0; i < 10; i++) {
      hearts.push(new Heart(random(600 - 2*r), random(600 - 2*r), r));
    }

  }
}

function draw() {
  background('#330033');
  noStroke();
    for (let k = 0; k < hearts.length; k++) {
      hearts[k].ctHeart();
      hearts[k].show(r);
    }
    timeOfLastHeart = millis();
  if (r < 3) {
    r = r + random(0.005, 0.01);
  }
 
}
// function mousePressed() {
//   save('heart.jpg');
//  }