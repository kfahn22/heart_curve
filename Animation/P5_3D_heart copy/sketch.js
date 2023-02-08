// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4
// Simple Particle System
// https://editor.p5js.org/codingtrain/sketches/D4ty3DgZB

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let r;
const e = 2.71828;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background('#330033');
  noStroke();
  for (let i = 0; i < 1; i++) {
    let h = new Heart(random(400), random(400));
    hearts.push(h);
  }
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].ctHeart();
    hearts[i].update();
    hearts[i].show();
    if (hearts[i].finished()) {
      // remove this heart
      hearts.splice(i, 1);
    }
   // console.log(hearts.length);
  }


}
