class Heart {
  constructor(_px, _py) {
    this.px = _px;
    this.py = _py;
    this.c = color(random(255),0,random(255));
    this.points = [];
  }

  ctHeart(r) {
    for (let beta = 0; beta < 361; beta += 1) {
      const x = r * 16 * pow(sin(beta), 3);
      const y = -r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
      
      if (this.points.length < 361) {
        this.points[beta] = createVector(x, y);
      } else {
        break;
      }
    }
  }

grow() {
  this.r = this.r + 2;
}

  show(k, num) {
    let alpha = map(k, 0, num, 255, 0);
    let from = color(217,102,255);
    let to = color(134,0,179);
    let col1 = lerpColor(from, to, k/num);
    let col2 = lerpColor(to, from, k/num);
    noStroke();
    fill(125, 125, 125);
    push();
    translate(this.px, this.py);
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape();
    pop();
  }
}