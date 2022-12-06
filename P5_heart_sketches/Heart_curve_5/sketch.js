// Base code from Daniel Shiffman's Heart Curve Coding Challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Heart curve formula adapted from https://mathworld.wolfram.com/HeartCurve.html
//  r =  sin(a)*pow(abs(cos(a)), 0.5) / (sin(a)+7/5) ) + 2 * sin(a) + 2; (not sure if * or +)

const heart = [];
let a = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(255, 0, 0);
  let c0 = color(0);
  let c1 = color(146,83,161);
  let c2 = color('#F063A4');

  let  col2 = setGradientL(0, 0, 400, 450, c1, c2, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c2, c1, X_AXIS);
  translate(width/2, height*1/3);
  noStroke();
  strokeWeight(2);
  scale(-1);
  //fill('#70327E');
  fill(0);
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();

  // const r = 450 * (sin(a)*pow(abs(cos(a)), 0.05) / (sin(a)+7/5) );
  // const x =  r * cos(a);
  // const y = 1.25 * r * abs(pow(sin(a), 0.25));

  heart.push(createVector(x, y));
  
  // So that it stops
  if (a > 2* PI) {
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
