// See https://github.com/kfahn22/hearts for other heart curve sketches

// The spherical code is based on Daniel Shiffman's 3d-supershapes challenge
// https://thecodingtrain.com/challenges/26-3d-supershapes

// Instead of using beginShape(), endShape(), vertex() we use the p5.Geometry class to handle the vertices.

// Reference for how to use p5 geometry
// https://p5js.org/learn/getting-started-in-webgl-custom-geometry.html

let ang = 0;
let rotation = true;

const detail = 75;
const sc = 4;

let myGeometry;

function setup() {
  //createCanvas(800, 450, WEBGL);
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);

  myGeometry = new p5.Geometry(detail, detail, function () {
    const e = 2.71828;

    for (let i = 0; i < detail + 1; i++) {
      let lat = map(i, 0, detail, -PI, PI);

      for (let j = 0; j < detail + 1; j++) {
        let lon = map(j, 1, detail - 1, -PI, PI);
        let r = pow(sin(lat), 7) * pow(e, 2 * lat);

        let y = -sc * r * sin(lon) * sin(lat);
        let x = sc * r * cos(lon) * sin(lat) - abs(y);
        let z = constrain(y * cos(lat), -50, 50);

        this.vertices.push(new p5.Vector(x, y, z));
      }
    }
    // this will attach all our vertices and create faces automatically
    this.computeFaces();
    // this will calculate the normals to help with lighting
    this.computeNormals();
    this.averageNormals();
    this.averagePoleNormals();
  });
}

function draw() {
  background(0);
  //rotateX(90);
  rotateY(ang);
  rotateZ(33);

  noStroke();

  // orbitControl allows us to control shape with the mouse
  //https://p5js.org/reference/#/p5/orbitControl
  orbitControl();

  // We need two directional lights coming from opposite directions
  // View the shape with normal material and you will see that the normals change with each band
  // normalMaterial();

  // If we add different colors to each directional light, we get stripes
  directionalLight(248, 117, 117, 0, 0, -1);
  directionalLight(248, 117, 117, 0, 0, 1);
  push();
  //translate(0, height / 3);
  //rotateY((cos(millis() / 1000) * PI) / 4);
  model(myGeometry);
  pop();

  if (rotation) {
    ang += 0.01;
  }
}

function heart(theta) {
  const e = 2.71828;
  return (r = 1 * pow(sin(theta), 7) * pow(e, 2 * theta));
}

// function mousePressed() {
//   save("3dheart.jpg");
// }
