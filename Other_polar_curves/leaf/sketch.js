// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// Equations from:
// https://mathworld.wolfram.com/topics/PlaneCurves.html
// cannibus curve

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
  // sin term at end affects length of leaves
  let r  = 90 * (1 + 9/10 * cos(8 * a))*(1 + 1/10 * cos(24*a))*(9/10 + 1/10 * cos(200*a)) * (1 + sin(a));
  const x = r * cos(a);
  const y = r * sin(a);
  heart.push(createVector(x, y));
  
  // So that it stops (approx. 3/8 for one leaf--probably need to start at PI/8)
  if ( a > PI ) {
    noLoop();
  }
  a += 0.01;
}
function mousePressed() {
  save('leaf.jpg');
 }