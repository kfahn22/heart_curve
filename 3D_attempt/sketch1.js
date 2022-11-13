// The shader code builds on work by Inigo Quilez and Martijn Steinrucken as detailed in the frag file


let divA, divB, divC;
let r, n, m, h, sc, mixValue, ht, rd, gr, bl;
let scaleSlider, mixSlider, hSlider, rSlider, mSlider, nSlider;
let redSlider, greenSlider, blueSlider;
let sel2, sel3, sspan, mspan, hspan, spanr, spann, spanm;

// Shader 
let theShader;

function preload() {
  // load the shader
  theShader = loadShader('heart.vert', 'mix.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  noCursor();

  // Controls for shader
  divA = createDiv().position(50, 630).class('flex-container');

  sspan = createSpan("scale: ").parent(divA);
  scaleSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  mspan = createSpan("mix: ").parent(divA);
  mixSlider = createSlider(1, 20, 10, 1).style('width', '180px').parent(divA);

  hspan = createSpan("depth: ").parent(divA);
  hSlider = createSlider(0, 10, 5, 1).style('width', '180px').parent(divA);


  divC = createDiv().position(450, 630).class('flex-container');
  colorP = createP('Choose colors:').parent(divC);
  let spanred = createSpan("red: ").parent(divC);
  redSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
  let spangreen = createSpan("green: ").parent(divC);
  greenSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);
  let spanblue = createSpan("blue: ").parent(divC);
  blueSlider = createSlider(0, 255, 125, 1).style('width', '180px').parent(divC);

}

function draw() {
  background(0);

  sc = scaleSlider.value();
  let newSC = map(sc, 1, 20, 0.0, 1.0);
  mixValue = mixSlider.value();
  let newMV = map(mixValue, 1, 20, 0.0, 1.0);
  ht = hSlider.value();
  let newH = map(ht, 1, 10, 0.0, 1.0);

  // Pass color choices
  rd = redSlider.value();
  let newRed = map(rd, 0, 255, 0.0, 1.0, 0.1);
  gr = greenSlider.value();
  let newGr = map(gr, 0, 255, 0.0, 1.0, 0.1);
  bl = blueSlider.value();
  let newBl = map(bl, 0, 255, 0.0, 1.0, 0.1);


  // send resolution of sketch into shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform("iMouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  theShader.setUniform("iFrame", frameCount);
  theShader.setUniform("iTime", millis() / 1000.0);
  theShader.setUniform("scale", newSC);
  theShader.setUniform("mv", newMV);
  theShader.setUniform("h", newH);
  theShader.setUniform("re", newRed);
  theShader.setUniform("gr", newGr);
  theShader.setUniform("bl", newBl);


  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0, 0, width, height);

}