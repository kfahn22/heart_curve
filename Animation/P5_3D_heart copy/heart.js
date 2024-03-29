let colors = [
  [153, 0, 204],
  [204, 51, 255],
  [255, 51, 204],
  [204, 0, 153],
  [153, 0, 153],
  [204, 102, 255]
]

class Heart {
  constructor(_px, _py, _r) {
    this.px = _px;
    this.py = _py;
    this.r = _r;
    this.c = random(colors);
    this.points = [];
    this.alpha = 255;
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
  finished() {
  return this.r = 5;
 //   return this.alpha < 0;
  }

  update() {
    this.r += 0.5;
   // let a = map(this.r, 1, 6, 0, 255);
    this.alpha -= 1;
  }

  show(r) {
    // let a1 = map(r, 1, 3, 0, 255);
    // this.alpha = 255 - a1;
    let from = color(217, 102, 255);
    let to = color(134, 0, 179);
    // let col1 = lerpColor(from, to, k/num);
    // let col2 = lerpColor(to, from, k/num);
    noStroke();
    fill(204, 102, 255, this.alpha);
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      vertex(this.r * v.x, this.r * v.y);
      //vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}