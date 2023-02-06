class Heart {
  constructor(_px, _py, _pz) {
    this.px = _px;
    this.py = _py;
    this.pz = _pz;
    this.points = [];
  }

  ctHeart() {
    for (let beta = 0; beta < 361; beta += 1) {
      this.points[beta] = [];
      for (let r = 0; r < 5; r+= 0.1)
      {
        const x = r * 16 * pow(sin(beta), 3);
        const y = r * (13 * cos(beta) - 5 * cos(2 * beta) - 2 * cos(3 * beta) - cos(4 * beta));
        const z = this.pz;
        if (this.points.length < 361) {
          this.points[beta][r] = createVector(x, y, z);
        } else {
          break;
        }
      }
    }
  }

  show() {
    
   let from = color(217,102,255);
    let to = color(134,0,179);
    // let col1 = lerpColor(from, to, k/num);
    // let col2 = lerpColor(to, from, k/num);
    stroke(to, 200);
    fill(from, 100);
    push();
    translate(this.px, this.py);
    for (let i = 0; i < 361; i+=1) {
      beginShape(TRIANGLE_STRIP);
      for (let j = 0; j < 5; j+=0.1) {
        const v1 = this.points[i][j];
        vertex(v1.x, v1.y, v1.z);
        const v2 = this.points[i + 1][j];
        vertex(v2.x, v2.y, v2.z);
      }
      endShape();
    }
    pop();
  }
}