class Heart {
  constructor(_px, _py, _r) {
    this.px = _px;
    this.py = _py;
    this.r = _r;
    this.alpha = 255;
    this.c = color(random(255), 0, random(255));
    this.points = [];
  }

  ctHeart() {
    for (let beta = 0; beta < 361; beta += 1) {
      const x = this.r * 16 * pow(sin(beta), 3);
      const y = -this.r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));

      if (this.points.length < 361) {
        this.points[beta] = createVector(x, y);
      } else {
        break;
      }
    }
  }
  update() {
    if (this.r < 4) {
      this.r += 0.1
    }
  }

  finished() {
    this.alpha = 0;
  }
  show(r) {
    let a1 = map(this.r, 0.1, 3, 0, 255);
    this.alpha = 255 - a1;
    noStroke();
    fill(217, 102, 255, this.alpha);
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      vertex(this.r * v.x, this.r * v.y);
    }
    endShape();
    pop();
  }
}