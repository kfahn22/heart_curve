let c;

class Heart {
  constructor(_px, _py) {
    this.px = _px;
    this.py = _py;
    this.p = 3;
    this.q = 2;
    this.h = 2;
    this.color = color('#9253A1');
    this.points = [];
    this.total = 25;
    this.sc = 0.1;
    this.height = 1;
  }

  // oneHeart() {
  //   // 630 when angle mode radians
  //   for (let beta = 0; beta < 180; beta += 1) {
  //     let phi = this.p * beta;
  //     let theta = this.q * beta;
  //     // const r = this.sc * pow(sin(beta), 7) * pow(e, 2 * beta);
  //     let r = this.sc * (1 - abs(beta)) * (1 + 2 * abs(beta));
  //     //const r = 2 - 2 * sin(beta) + sin(beta) * (pow(abs(cos(beta)), 0.5) / (sin(beta) + 1.4));
  //     let x = r * cos(theta) * (this.h + cos(phi));
  //     let y = -r * sin(theta) * (this.h + cos(phi));
  //     let z = 0;
  //     //let z = r * sin(phi);
  //     if (this.points.length < 180) {
  //       this.points[beta] = createVector(x, y, z);
  //     } else {
  //       break;
  //     }
  //   }
  // }
  // spherical(_r, total) {
  //   for (let i = 0; i < total + 1; i++) {
  //     this.points[i] = [];
  //     const lat = map(i, 0, total, 0, PI);
  //     for (let j = 0; j < total + 1; j++) {
  //       const lon = map(j, 0, total, 0, TWO_PI);
  //       //const x = r * sin(lat) * cos(lon);
  //       const x = _r * sin(lat) * 16 * pow(sin(lon), 3);
  //       //const y = r * sin(lat) * sin(lon);
  //       const y = -_r * sin(lat) * (13 * cos(lon) - 5 * cos(2 * lon) - 2 * cos(3 * lon) - cos(4 * lon));
  //       const z = _r * cos(lat);
  //       this.points[i][j] = createVector(x, y, z);
  //     }
  //   }
  // }

  ctHeart(_r, num) {
    for (let beta = 0; beta < 361; beta += 1) {
      // let phi = this.p * beta;
      // let theta = this.q * beta;

      const lat = map(k, 0, num, 0, PI);
      const x = _r * 16 * pow(sin(beta), 3);
      const y = -_r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
      const z = -1;
      if (this.points.length < 361) {
       // this.points[beta] = createVector(x, y, z);
        this.points[beta] = createVector(x, y);
      } else {
        break;
      }
    }
  }
  // anHeart() {
  //   for (let beta = 0; beta < 361; beta += 1) {
  //     let phi = this.p * beta;
  //     let theta = this.q * beta;
  //     const r = 40 * (1 - abs(theta)) * (1 + 2 * abs(theta));
  //     const x = r * cos(theta / 2) * sin(theta) * (this.h + cos(phi));
  //     const y = -r * sin(theta) * (this.h + cos(phi));
  //     const z = r * sin(phi);
  //     if (this.points.length < 361) {
  //       this.points[beta] = createVector(x, y, z);
  //     } else {
  //       break;
  //     }
  //   }
  // }

  // oneHt() {
  //   sc = 10;
  //   //let r = 40 * (1 - abs(beta)) * (1 + 2 * abs(beta));
  //   for (let i = 0; i < this.total + 1; i++) {
  //     this.points[i] = [];
  //     const lat = map(i, 0, this.total, 0, PI);
  //     for (let j = 0; j < this.total + 1; j++) {
  //       const lon = map(j, 0, this.total, 0, TWO_PI);
  //       const x = this.sc * 16 * pow(sin(lat), 3) * (this.h + cos(lon));
  //       const y = -this.sc * (13 * cos(lat) - 5 * cos(2 * lat) - 2 * cos(3 * lat) - cos(4 * lat)) * (this.h + cos(lon));
  //       const z = this.sc * cos(lat);
  //       if (this.points.length < 361) {
  //         this.points[i][j] = createVector(x, y, z);
  //       } else {
  //         break;
  //       }
  //     }
  //   }
  // }

  // http://mathandmultimedia.com/2013/02/22/3d-heart-graph/
  // this doesn't work!!
  // 5 + (-sqrt(1 – x^2 – (y-abs(x))^2)) * cos(30*((1 – x^2 – (y-abs(x))^2)))
  // mmHeart() {
  //   for (let x = -1; x < 1; x += 0.1) {
  //     for (let y = -1; y < 1.5; y += 0.1) {
  //       for (let z = 1; z < 6; z += 0.1) {
  //         c = 5 + (-sqrt(1 - pow(x, 2) - pow(y - abs(x)), 2) * cos(30 * ((1 - pow(x, 2) - pow(y - abs(x)), 2))));
  //         console.log(c);
  //        // let cc = constrain(c, -0.01, 0.1);
  //        // this.points.push(c);
  //       }
  //     }
  //   }
  // }

  show() {
    push();
    noFill();
    translate(this.px, this.py);
    beginShape();
    for (let p of this.points) {
      strokeWeight(2);
      //fill('#b30059')
      stroke(179, 0, 89, 150);
    //  vertex(p.x, p.y, p.z);
      vertex(p.x, p.y);
    }
    endShape();
    pop();
  }
}