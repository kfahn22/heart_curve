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
    let per = map(k/num, 0, 1, 100, 255);
    let from = color(255,153, 255);
    let to = color(122, 0, 153);
    let col1 = lerpColor(from, to, k/num);
    let col2 = lerpColor(to, from, k/num);
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      strokeWeight(1);
      if (k < num/2)
     {
       stroke(col1, 100);
     } else {
       stroke(col2, 100);
     }
      if (k == 0 || k == num/2 || k == num) {
        fill(col1);
      }
      vertex(v.x, v.y, v.z);
    }
    endShape();
    pop();
  }
}