//const API = 'https://opentdb.com/api.php?amount=30&category=15&difficulty=easy&type=boolean';

const character = { x: 0, y: 0 };

const rocks = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 }
];

const plants = [
  { x: 1, y: 2 },
  { x: 3, y: 0 }
];

function renderRocks(rocks) {
  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    const rockElement = document.createElement('div');
    rockElement.className = 'rock';
    rockElement.style.left = (rock.x * 100).toString() + 'px';
    rockElement.style.top = (rock.y * 100).toString() + 'px';
    document.querySelector('.board').appendChild(rockElement);
  }
}
renderRocks(rocks);

function renderPlants() {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    const plantElement = document.createElement('div');
    plantElement.className = 'plant';
    plantElement.style.left = (plant.x * 100).toString() + 'px';
    plantElement.style.top = (plant.y * 100).toString() + 'px';
    document.querySelector('.board').appendChild(plantElement);
  }
  // const plantElements = document.querySelectorAll('.plant');
  // for (let i = 0; i < plantElements.length; i++) {
  //   plantElements[i].remove();
  // }
};
renderPlants();

function isCoordinateInGrid(x, y) {
  if (x < 0 || y < 0 || x > 3 || y > 3) {
    return false;
  }
  return true
}

function isThereARockAt(x, y) {
  for (let i = 0; i < rocks.length; i++) {
    const rock = rocks[i];
    if (rock.x === x && rock.y === y) {
      return true;
    }
  }
  return false
}

function isThereAPlantAt(x, y) {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    if (plant.x === x && plant.y === y) {
      return true;
    }
  }
  return false;
}

function removePlantAt(x, y) {
  for (let i = 0; i < plants.length; i++) {
    const plant = plants[i];
    if (plant.x === x && plant.y === y) {
      plants.splice(i, 1);
    }
  }
};

function canMoveTo(x, y) {
  if (!isCoordinateInGrid(x, y)) { //if the coordinate is not in a grid x,y that returns false, return true
    return false; //why doesn't the opposite work?
  }
  if (isThereARockAt(x, y)) {
    return false;
  }
  return true;
};

function moveCharacterTo(x, y) {
  const character = document.querySelector(".character");
  character.style.left = (x * 100).toString() + 'px';
  character.style.top = (y * 100).toString() + 'px';
  if (isThereAPlantAt(x, y)) {
    removePlantAt(x, y);
    renderPlants();
  }
  if (plants.length === 0) {
    displayWinMessage();
  }
}

function moveLeft() {
  if (canMoveTo(character.x - 1, character.y)) {
    character.x -= 1;
    return moveCharacterTo(character.x, character.y);
  }
}

function moveRight() {
  if (canMoveTo(character.x + 1, character.y)) {
    character.x += 1;
    return moveCharacterTo(character.x, character.y)
  }
}

function moveDown() {
  if (canMoveTo(character.x + character.y + 1)) {
    character.y += 1
    return moveCharacterTo(character.x, character.y);
  }
}

function moveUp() {
  if (canMoveTo(character.x + character.y - 1)) {
    character.y -= 1
    return moveCharacterTo(character.x, character.y)
  }
}

document.body.addEventListener('keydown', function (evt) {
  const keyCode = evt.keyCode;
  if ([37, 38, 39, 40].includes(keyCode)) { //includes determines whether array includes a certain value amoung its entries, returning true/false when appropriate
    evt.preventDefault();
  };
  switch (keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
  }
});

function displayWinMessage() {
  // Only display one win message.
  if (document.querySelector('.win-message') !== null) {
    return;
  }
  const winMessageElement = document.createElement('div');
  winMessageElement.className = 'win-message';
  winMessageElement.innerHTML = `Congratulations!!! You won!`;
  document.querySelector('.board').appendChild(winMessageElement);
};
