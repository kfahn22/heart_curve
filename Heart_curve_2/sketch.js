// Heart Curve
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/134-heart-curve.html
// https://youtu.be/oUBAi9xQ2X4
// I ❤️ you

//x	=	sintcostln|t|	
//y	=	|t|^(0.5)(cost),	
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
  //translate(width/2, height*3/4); // use with curve a
  translate(width/2, height*2/3);
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

  // Heart curve A
  // curve from mathematische-basteleien.de
  // gives 1/2 of the heart curve

  const r = 10 * pow(sin(a), 7)* pow(e , 2*a)
  const x = r * (cos(a));
  const y = - r * abs(sin(a));

 // Heart curve B
//   const r = 325;
//   const x = -r * sin(a)* cos(a)*log(abs(a)*0.9);
//   const y = -1.25*r * pow(abs(a), 0.7)*cos(a);


  // fifth heart curve
//   const r = height/40;
//   const x = r * 16 * pow(sin(a), 3);
//   const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
 

heart.push(createVector(x, y));
  
  // So that it stops
  if (a > PI/2) {
    noLoop();
  }

  a += 0.01;
}