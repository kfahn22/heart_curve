// The supershape code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes
// I also used the code from https://openprocessing.org/sketch/651525 as a starting point

let divA
let button;
let angX = 0;
let angY = 0;
let globe = [];
let rotation = true;
let total = 100;
//, m, a, b, r;
let mSlider, rSlider, tSlider;
let n1Slider, n2Slider, n3Slider;
let aSlider, bSlider;
let n1, n2, n3;
let rP, aP, bP, n1P, n2P, n3P, mP, totalP;
let num;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();
 
  // let divA = createDiv().position(30, 650).class("flex-container");
  // let divA1 = createDiv().parent(divA).class('subdiv');
  // let spanr = createSpan("r: ").parent(divA1);
  // rSlider = createSlider(1, 250, 150).style('width', '180px').parent(divA1);
  
  // let divA2 = createDiv().parent(divA).class('subdiv');
  // let spana = createSpan("a: ").parent(divA2);
  // aSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA2);
 
  // let divA3 = createDiv().parent(divA).class('subdiv');
  // let spanb = createSpan("b: ").parent(divA3);
  // bSlider = createSlider(0, 2, 1, 0.1).style('width', '180px').parent(divA3);
  
  // let divA4 = createDiv().parent(divA).class('subdiv');
  // let spannm = createSpan("m: ").parent(divA4);
  // mSlider = createSlider(0, 12, 6).style('width', '180px').parent(divA4);

  // let divA5 = createDiv().parent(divA).class('subdiv');
  // let spannc = createSpan("Choose Color").parent(divA5);
  
  
 
  
}

function draw() { 
  let choice = sel.value();
  chooseBackground(choice);
  //background('#70327E');
  rotateX(angX);
  rotateY(angY);

  ambientLight(255);
  noStroke();

//   r = rSlider.value();
//   // rP = createP('').parent(divA);
//   // rP.html(`r: ${r}`);
  
//   a = aSlider.value();
//   // aP = createP('').parent(divA);
//   // aP.html(`a: ${a}`);
  
//   b = bSlider.value();
//   // bP = createP('').parent(divA);
//   // bP.html(`b: ${b}`);
  
//   m = mSlider.value();
//   // mP = createP('').parent(divA);
//   // mP.html(`m: ${m}`);
  
//   n1 = n1Slider.value();
// //   n1P = createP('').parent(divB);
// //   n1P.html(`n1: ${nf(n1, 1, 1)}`);
  
//   n2 = n2Slider.value();
//   // n2P = createP('').parent(divB);
//   // n2P.html(`n2: ${nf(n2, 1, 1)}`);
  
//   n3 = n3Slider.value();
//   // n3P = createP('').parent(divB);
//   // n3P.html(`n3: ${nf(n3, 1, 1)}`);
  
//   total = tSlider.value();
//   // totalP = createP('').parent(divB);
//   // totalP.html(`total: ${nf(total)}`);
  
  for (let i = 0; i < total+1; i++) {
    globe[i] = [];
    let lat = map(i, 0, total, -HALF_PI, HALF_PI);
    //let r2 = Heart(lat, m, n1, n2, n3);

    for (let j = 0; j < total+1; j++) {
      let lon = map(j, 0, total, -PI, PI);
      //let r1 = superShape(lon, m, n1, n2, n3);
      let x = 16.0 * pow(sin(lon,3.0));
      let y = 13.0 * cos(lat) + 5.0 * cos(2.0 * lat) + 2.0 * cos ( 3.0 * lat) + cos ( 4.0 * lat);
      // let x = r * r1 * cos(lon) * r2 * cos(lat);
      // let y = r * r1 * sin(lon) * r2 * cos(lat);
      let z = x * y * sin(lat);

      globe[i].push(createVector(x, y, z));
    }
  }
  
  for (let i = 0; i < total; i++) {

    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total+1; j++) {
      let v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      let v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
    }

    if(rotation) {
      angX += 0.03;
      angY += 0.04;
    }
}

function superShape(theta, m, n1, n2, n3) {
  let a = 1;
  let b = 1;
  
  let t1 = abs((1/a) * cos(m * theta / 4));
  t1 = pow(t1, n2);
  
  let t2 = abs((1/b) * sin(m * theta / 4));
  t2 = pow(t2, n3);
  
  t3 = t1 + t2;
  let r = pow(t3, -1 / n1);
  return r;
}

function Heart(v) {
    let r = v.x * v.x + v.y * v.y;
    let theta = atan(v.x / v.y);
    let x =  r * sin(theta * r);
    let y = -r * cos(theta * r);
    return new createVector(x, y);
}

