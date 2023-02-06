// class Heart {
//     constructor(_px, _py, _pz) {
//       this.px = _px;
//       this.py = _py;
//       this.pz = _pz;
//       this.points = [];
//     }


// Starter code by Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/egvieHyt0
// https://thecodingtrain.com/challenges/134-heart-curve
// https://youtu.be/oUBAi9xQ2X4

// https://editor.p5js.org/kfahn/sketches/SsZu1WV1G

let hearts = [];
let a = 0;
let r, _z;
const e = 2.71828;
let angle = 0;
let points = [];


function setup() {
    createCanvas(600, 600, WEBGL);
    angleMode(DEGREES);
}

// function ctHeart() {
//     for (let beta = 0; beta < 361; beta += 1) {
//         points[beta] = [];
//         for (let r = 0; r < 5; r += 0.1) {
//             const x = r * 16 * pow(sin(beta), 3);
//             const y = r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
//             const z = this.pz;
//             if (points.length < 361) {
//                 points[beta][r] = createVector(x, y, z);
//             } else {
//                 break;
//             }
//         }
//     }
// }

function draw() {
    background('#330033');
    noStroke();
    rotateY(angle);
    angle += 1;
   // for (let beta = 0; beta < 361; beta += 1) {
       // this.points[beta] = [];
        for (let _z = 0; _z < 5; _z+=0.1)
        {
            points[_z] = [];
            const beta = map(_z, 0, 5, 0, 360);
            for (let r = 0; r < 5; r += 0.1) {
                const x = r * 16 * pow(sin(beta), 3);
                const y = r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
                const z = _z;
                if (points.length < 361) {
                    points[_z][r] = createVector(x, y, z);
                } else {
                    break;
                }
            }
        //}
    }

    let from = color(217, 102, 255);
    let to = color(134, 0, 179);
    // let col1 = lerpColor(from, to, k/num);
    // let col2 = lerpColor(to, from, k/num);
    stroke(to, 200);
    fill(from, 100);
    push();
    translate(width/2, height/2);
    for (let i = 0; i < 5; i += 1) {
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j < 5 + 1; j += 0.1) {
            const v1 = points[i][j];
            vertex(v1.x, v1.y, v1.z);
            const v2 = points[i + 1][j];
            vertex(v2.x, v2.y, v2.z);
        }
        endShape();
    }
    pop();

}