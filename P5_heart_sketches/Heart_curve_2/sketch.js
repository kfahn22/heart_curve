// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/challenges/134-heart-curve


//x	=	sintcostln|t|	
//y	=	|t|^(0.5)(cost),	
//https://mathworld.wolfram.com/HeartCurve.html

const heart = [];
let a = 0;
//const e = 2.71828;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 0, 0);
  translate(width / 2, height * 2 / 3);
  noStroke(255);
  strokeWeight(2);

  fill(150, 0, 100);
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

  // Heart curve fomula adjusted from mathworld
  const r = 325;
  const x = -r * sin(a) * cos(a) * log(abs(a) * 0.9);
  const y = -1.25 * r * pow(abs(a), 0.7) * cos(a);
  heart.push(createVector(x, y));

  // We stop at PI/2 b/c the curve contains on for a > PI/2
  if (a > PI / 2) {
    noLoop();
  }

  a += 0.01;
}