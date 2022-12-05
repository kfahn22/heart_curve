// Starter code by Daniel Shiffman
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4


// Heart curve equations from http://www.mathematische-basteleien.de/heart.html

const heart = [];
let a = 0;
const e = 2.71828;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  let c1 = color(146,83,161);
  let c2 = color(236,1,90);
  let c3 = color('#F063A4');

  let  col2 = setGradientL(0, 0, 400, 450, c1, c3, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c3, c1, X_AXIS);
  
  translate(width / 2, height * 3 / 4);
  noStroke(255);
  strokeWeight(2);

  fill('#70327E');

  // We draw shape and then draw its reflection across Y axis.
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();
  beginShape();
  for (let v of heart) {
    vertex(-v.x, v.y);
  }
  endShape();

  // gives 1/2 of the heart curve
  const r = 10 * pow(sin(a), 7) * pow(e, 2 * a)
  const x = r * cos(a);
  const y = -r * abs(sin(a));
  heart.push(createVector(x, y));

  // So that it stops
  if (a > PI) {
    noLoop();
  }
  a += 0.01;
}

function mousePressed() {
  save('heart.jpg');
 }

function setGradientL(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function setGradientR(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0.0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0,1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
