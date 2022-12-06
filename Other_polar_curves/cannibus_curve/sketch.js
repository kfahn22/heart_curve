// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://mathworld.wolfram.com/topics/PlaneCurves.html

const heart = [];
let a= 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(212,197,226);
  let c1 = color(0);
  // let c2 = color(236,1,90);
  // let c3 = color('#F063A4');
  // let  col2 = setGradientL(0, 0, 400, 450, c2, c1, X_AXIS);
  // let  col3 = setGradientR(400, 0, 750, 450, c1, c2, X_AXIS);
  translate(width/2, height*7/8);
  noStroke(255);
  strokeWeight(2);
  scale(-1);
  fill(59,93,89);
  
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();
  rotate(PI/9);
  let r  = 90 * (1 + 9/10 * cos(8 * a))*(1 + 1/10 * cos(24*a))*(9/10 + 1/10 * cos(200*a)) * (1 + sin(a));
  const x = r * cos(a);
  const y = r * sin(a);
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
