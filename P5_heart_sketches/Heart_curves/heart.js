//https://github.com/anuraghazra/CanvasFun/blob/master/LoveHearts/Heart.js

class Heart {
    constructor(x = 0, y = 0, _sc = 10, pulseRadius = 5, falling = false) {
        this.x = x;
        this.y = y;
        this.points = [];
        // this.angle = 0;
        // this.sc = _sc;
        // this.pulse = 1;
        // this.pulseRadius = pulseRadius;
        // this.beat = true;
        // this.falling = falling;
    }

    // oneCycle() {
    //     this.sc += 0.005;
    //     for (let a = 0; a < PI; a += 0.01) {
    //         const r = this.sc * pow(sin(a), 7) * pow(e, 2 * a)
    //         const x = r * cos(a);
    //         const y = -r * abs(sin(a));
    //         if (this.beat) {
    //             this.pulse = map(cos(a), 0, this.pulseRadius, 0.5, -1);
    //         }

    //         if (this.points.length < 500) {
    //             this.points.push(createVector(x, y));
    //         }
    //     }
    // }


    // update() {
    //     const r = this.sc * pow(sin(a), 7) * pow(e, 2 * a)
    //     const x = r * cos(a);
    //     const y = -r * abs(sin(a));
    //     this.sc += 0.005;
    //     this.angle += 0.05;
    //     if (this.beat) {
    //         this.pulse = map(cos(this.angle), 0, this.pulseRadius, 0.5, -1);
    //     }

    //     if (this.points.length < 500) {
    //         // this.points.pop();
    //         this.points.push(createVector(x, y));
    //     }
    // }

    show(x, y) {
        // stroke('white');
        // strokeWeight(2);
        // strokeJoin(ROUND);
        // let opacity = 1;
        // if (this.falling) {
        //     this.x = x;
        //     this.y = y;
        //     opacity = 0.6;
        //     noStroke();
        // }
        push();
        translate(this.x, this.y);
        fill(255, 101, 186, opacity * 255);
        beginShape();
        for (let v of this.points) {
            vertex(v.x, v.y);
        }
        endShape();
        pop();
    }
}