let cols, rows;
let scale = 20;
let w = 1000;
let h = 1000;
let flying = 0;
let terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  rows = w / scale;
  cols = h / scale;

  for (let x = 0; x < cols; x++) {
    terrain[x] = []
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0;
    }
  }
}

function draw() {

  flying -= 0.1;
  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  fill(200, 200, 200, 50);
  translate(0,50);
  rotateX(PI/3);
  translate(-w/2, -h/2);

  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scale, y*scale, terrain[x][y]);
      vertex(x*scale, (y+1)*scale, terrain[x][y+1]);
    }
    endShape();
  }
}