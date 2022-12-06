// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// I started with a heart curve equation from http://www.mathematische-basteleien.de/heart.htm
// and futzed with it quite a bit

const heart = [];
let a= 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(800, 450);
}

function draw() {
  //background(255, 0, 0);
  let c0 = color(0);
  let c1 = color(146,83,161);
  let c2 = color(236,1,90);
  let c3 = color('#F063A4');
  let  col2 = setGradientL(0, 0, 400, 450, c1, c0, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c0, c1, X_AXIS);
  translate(width/2, height*3/4);
  noStroke(255);
  strokeWeight(2);
  scale(-1);
  fill('#F063A4');
  rotate(-PI/18);
  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();
  rotate(PI/9);
  beginShape();
  for (let v of heart) {
    vertex(-v.x, v.y);
  }
  endShape();

  if (a > PI/3) // added this constraint to eliminate weird tail at bottom of curve
  {const r = 40 * (1-abs(a))*(1+2*abs(a)) ;
  const x = r* cos(a/2)*sin(a);
  const y = -r* sin(a);
  heart.push(createVector(x, y));}
  
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
