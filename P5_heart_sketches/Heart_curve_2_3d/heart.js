let c;

class Heart {
  constructor(_px, _py, _pz) {
    this.px = _px;
    this.py = _py;
    this.pz = _pz;
    this.p = 3;
    this.q = 2;
    this.h = 2;
    this.color = color('#9253A1');
    this.points = [];
    this.total = 25;
    this.sc = 0.1;
    this.height = 1;
  }

  ctHeart(_r) {
    for (let beta = 0; beta < 361; beta += 1) {
      const x = _r * 16 * pow(sin(beta), 3);
      const y = -_r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
      const z = this.pz;
      if (this.points.length < 361) {
        // this.points[beta] = createVector(x, y, z);
        this.points[beta] = createVector(x, y, z);
      } else {
        break;
      }
    }
  }

  show(k, num) {
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      strokeWeight(1);
      stroke(230, 0, 119, 100);
      vertex(v.x, v.y, v.z);
      if (k === 0 || k === num) {
        fill(230, 0, 119, 50);
      }
      vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
  }
}