// Code base from Daniel Shiffman's Heart Curve coding challenge
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://mathworld.wolfram.com/topics/PlaneCurves.html
// jwilson.coe.jga.edu r = pow(cos(5*theta), 2) + sin(3*theta) + 0.3
// also from jwilson r = sin(theta) + pow(sin(5/2*theta),3)

// Paul Bourke.net
//x = cos(u)*(pow(e, cos(u)) - 2 * cos(4*u) - pow(sin(u/12), 5)
//y = sin(u)*(pow(e, cos(u)) - 2 * cos(4*u) - pow(sin(u/12), 5)

const heart = [];
let a = 0;
let omega;
const Y_AXIS = 1;
const X_AXIS = 2;
const e = 2.71828;
const N = 100;
function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(59);
  // let c1 = color(146, 83, 161);
  // let c2 = color(236, 1, 90);
  // let c3 = color('#F063A4');
  // let col2 = setGradientL(0, 0, 400, 450, c2, c1, X_AXIS);
  // let col3 = setGradientR(400, 0, 750, 450, c1, c2, X_AXIS);
  translate(width / 2, height * 1 / 2);
  stroke(255, 255, 255, 50);
  strokeWeight(2);
  noFill();
  //fill('#F063A4');

  beginShape();
  for (let v of heart) {
    vertex(v.x, v.y);
  }
  endShape();
  //let r = 100;
  //attemmpt at butterfly curve
   let r = pow(e, sin(a)) - 2*cos(4*a) + pow(sin((2*a - PI)/24), 5);
   const x = 60 * r * cos(a);
   const y = -60 * r * sin(a);
  // let u = a * 24 * PI / N;
  // const x = cos(u) * (pow(e, cos(u)) - 2 * cos(4 * u) - pow(sin(u / 12), 5));
  // const y = sin(u) * (pow(e, cos(u)) - 2 * cos(4 * u) - pow(sin(u / 12), 5));

  // Helix attempt
  // let R = 10;
  // let h = 30;
  // let sc = 1;
  // const x = (R + sc *cos(omega*a))*cos(a);
  // const y = (R + sc *cos(omega*a))*sin(a);
  // const z = h*a + sc * sin(omega*a);
  heart.push(createVector(x, y));

  // So that it stops
  if (a > 6 * PI) {
    noLoop();
  }
  a += 0.01;
  omega += 0.01;
}

function mousePressed() {
  save('helix.jpg');
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
      let inter = map(i, x, x + w, 0, 1.75);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}