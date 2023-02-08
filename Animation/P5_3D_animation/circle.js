// from chatgpt -- doesn't work

let circles = [];
let timeOfLastCircle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  if (millis() - timeOfLastCircle > 5000) {
    addCircle();
    timeOfLastCircle = millis();
  }
  for (let i = 0; i < circles.length; i++) {
    fill(circles[i].color);
    ellipse(circles[i].x, circles[i].y, circles[i].diameter, circles[i].diameter);
  }
  
}

function addCircle() {
  let x = random(width);
  let y = random(height);
  let radius = random(10, 100);
  let color = color(random(255), random(255), random(255));
  circles.push({x, y, radius, color});
}
