// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/challenges/134-heart-curve


//x	=	sintcostln|t|	
//y	=	|t|^(0.5)(cost),	
//https://mathworld.wolfram.com/HeartCurve.html

const heart = [];
let a = 0;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // Set a gradient background color
  let c1 = color(146,83,161);
  let c2 = color('#A42963');
  let c3 = color('#F063A4');
  let  col2 = setGradientL(0, 0, 400, 450, c2, c3, X_AXIS);
  let  col3 = setGradientR(400, 0, 750, 450, c3, c2, X_AXIS);
  
  translate(width / 2, height * 2 / 3);
  noStroke(255);
  strokeWeight(2);

  fill('#70327E');
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

function mousePressed() {
  save('heart.jpg');
 }