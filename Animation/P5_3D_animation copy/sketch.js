// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let timeOfLastHeart = 0;
let r = 1;
const e = 2.71828;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background('#330033');
  noStroke();

  for (i = 0; i < 1; i++) {
    hearts.push(new Heart(random(600 - 2 * r), random(600 - 2 * r), r));
  }

  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].ctHeart();
    hearts[i].show(r);
    hearts[i].update(r);
  }
 
  // if (r < 3) {
  //   r = r + random(0.005, 0.01);
  // }
  if (hearts.length > 10) {
    hearts.splice(0, 1)
  }
}

// function ctHeart() {
//   let px = random(width);
//   let py = random(height);
//   let r = 0.1;
//   for (let beta = 0; beta < 361; beta += 1) {
//     const x = r * 16 * pow(sin(beta), 3);
//     const y = -r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));

//     if (points.length < 361) {
//       points[beta] = createVector(x, y);
//     } else {
//       break;
//     }
//     r += 0.1;
//   }
// }
// function mousePressed() {
//   save('heart.jpg');
//  }