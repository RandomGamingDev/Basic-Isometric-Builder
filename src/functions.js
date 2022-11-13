const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function StringIns(string, toIns, insInd) {
  return string.slice(0, insInd) + toIns + string.slice(insInd);
}

function IsUpperCase(char) {
  return(char.toUpperCase() == char)
}

function LoadImages() {
  furnitureTypes.forEach(function(furnitureType) {
    furnitureType = furnitureType.charAt(0).toLowerCase() + furnitureType.slice(1);
    furnitureType = "assets/FurnitureKit/" + furnitureType.replace(/ /g, '') + '_';
    let offset = 0;
    directions.forEach(function(direction) {
      images.push(loadImage(furnitureType + direction + ".png"));
    });
  });
}

function Placed() {
  for (let i = 0; i < placed.length; i++)
    for (let j = placed[i].length - 1; j >= 0; j--)
      if (placed[i][j] != 0)
        image(
              images[placed[i][j] - 1],
              i * 1 / placePrecision,
              j * 1 / placePrecision,
              images[placed[i][j] - 1].width * imageScale,
              images[placed[i][j] - 1].height * imageScale
             );
}

function Selected() {
  // Display
  let imageWidth = images[selected].width * imageScale;
  let imageHeight = images[selected].height * imageScale;
  let halfImageWidth = imageWidth / 2;
  let halfImageHeight = imageHeight / 2;
  push();
  tint(255, 150);
  image(
        images[selected],
        clamp(Math.round((mouseX - halfImageWidth) * placePrecision) / placePrecision, 0, width - imageWidth),
        clamp(Math.round((mouseY - halfImageHeight) * placePrecision) / placePrecision, 0, height - imageHeight),
        imageWidth,
        imageHeight
       );
  pop();
  
  /*
    selected += event.delta * scrollSensitivity;
  selected %= furnitureTypes.length;
  if (selected < 0)
    selected += furnitureTypes.length;
  selected = Math.round(selected);
  */
  lastTurn += deltaTime;
  if (lastTurn < turnDelay)
      return;
  if (keyCodePressed(81)) {
    selected--;
    if (selected < 0)
      selected += furnitureTypes.length;
    lastTurn = 0;
  }
  if (keyCodePressed(69)) {
    selected++;
    selected %= furnitureTypes.length;
    lastTurn = 0;
  }
}

function ClickHandler() {
  if (!mouseIsPressed) return;
  let imageWidth = images[selected].width * imageScale;
  let imageHeight = images[selected].height * imageScale;
  let halfImageWidth = imageWidth / 2;
  let halfImageHeight = imageHeight / 2;
  if(mouseButton == LEFT) {
      placed[
              clamp(Math.round(((mouseX - halfImageWidth) / width) * placed.length), 0, placed.length - 1)
            ]
            [
              clamp(Math.round(((mouseY - halfImageHeight) / height) * placed[0].length), 0, placed[0].length - 1)
            ] = selected + 1;
  }
  if (mouseButton == RIGHT) {
    placed[
              clamp(Math.round(((mouseX - halfImageWidth) / width) * placed.length), 0, placed.length - 1)
            ]
            [
              clamp(Math.round(((mouseY - halfImageHeight) / height) * placed[0].length), 0, placed[0].length - 1)
            ] = 0;
  }
}
