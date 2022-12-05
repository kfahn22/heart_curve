// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4
// I ❤️ you

//https://mathworld.wolfram.com/HeartCurve.html


//r(theta)=2-2sintheta+sintheta(sqrt(|costheta|))/(sintheta+1.4) 

const heart = [];
let a = 0;
const e = 2.71828;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 0, 0);
  translate(width/2, height*3/4);
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

  const r = 2 - 2 * sin(a) + sin(a)*pow(abs(cos(a)), 0.5)/(sin(a)+1.4);
  //const r = 10 * pow(sin(a), 7)* pow(e , 2*a)
  const x = r * cos(a);
  const y = - r * abs(sin(a));

heart.push(createVector(x, y));
  
  // So that it stops
  if (a > PI) {
    noLoop();
  }

  a += 0.01;
}