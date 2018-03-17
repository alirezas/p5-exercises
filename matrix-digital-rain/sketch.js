let streams = [];
let fadeInterval = 1.6;
let symbolSize = 20;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.first = first;
  this.opacity = opacity;
  this.value;
  this.switchInterval = round(random(2, 25));
  
  this.randomCharacter = function() {
    if (frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  this.render = function() {
    text(this.value, this.x, this.y);
    if (this.first) {
      fill(140, 255, 170, this.opacity);
    } else {
      fill(0, 255, 70, this.opacity);
    }
    this.rain();
    this.randomCharacter();
  }

}

function Stream() {
  this.symbols = [];
  this.symbolCount = round(random(5, 30));
  this.speed = round(random(5, 25));

  this.generateSymbols = function(x, y) {
    let opacity = 255;
    let first = round(random(0, 4)) == 1;
    for (let i = 0; i <= this.symbolCount; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.randomCharacter();
      this.symbols.push(symbol);
      y -= symbolSize;
      opacity -= (255 / this.symbolCount) / fadeInterval;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      symbol.render();
    });
  }
}