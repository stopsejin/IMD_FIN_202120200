let video;
let randomColor;
let lastMouseX;
let pumpFactor = 0.0;
let shapeMode = 0;

function setup() {
  createCanvas(800, 600);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  randomColor = getRandomColor();

  lastMouseX = mouseX;
}

function draw() {
  background(255);

  pumpFactor = noise(frameCount * 0.05) * 10;

  let gridSize = int(map(mouseX, 0, width, 25, 100));

  let mouseDeltaX = abs(mouseX - lastMouseX);

  if (mouseDeltaX < 5) {
    gridSize = int(map(mouseX, 0, width, 25, 100));
  }

  video.loadPixels();
  for (let y = 0; y < video.height; y += gridSize) {
    for (let x = 0; x < video.width; x += gridSize) {
      let index = (y * video.width + x) * 4;
      let r = video.pixels[index];
      let dia = map(r, 0, 255, gridSize, 2);
      drawShape(x + gridSize / 2, y + gridSize / 2, dia + pumpFactor);
    }
  }

  lastMouseX = mouseX;
}

function mouseMoved() {
  randomColor = getRandomColor();
}

function getRandomColor() {
  return color(random(255), random(255), random(255));
}

function mousePressed() {
  shapeMode = (shapeMode + 1) % 3;
}

function drawShape(x, y, size) {
  fill(randomColor);
  noStroke();
  if (shapeMode === 0) {
    ellipse(x, y, size, size);
  } else if (shapeMode === 1) {
    rectMode(CENTER);
    rect(x, y, size, size);
  } else {
    let h = (sqrt(3) / 2) * size;
    beginShape();
    vertex(x, y - size / 2);
    vertex(x - size / 2, y + h / 2);
    vertex(x + size / 2, y + h / 2);
    endShape(CLOSE);
  }
}
