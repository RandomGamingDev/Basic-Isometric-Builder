function setup() {
  LoadImages();
  noCursor();
  createCanvas(width, height);
}

function draw() {
  background(220);
  Placed();
  Selected();
  ClickHandler();
}