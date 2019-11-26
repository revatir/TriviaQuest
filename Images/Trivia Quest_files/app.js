window.onload = function () {
  //const API = 'https://opentdb.com/api.php?amount=30&category=15&difficulty=easy&type=boolean';

  function randomPosition(max) {
    return Math.floor(Math.random() * (max));
  }

  const character = {
    x: 0,
    y: 0
  };

  const plants = [ //RR: Make placement random
    { x: 0, y: 3 },
    { x: 0, y: 5 }
  ];

  const rocks = [];
  function renderRocks(numRocks) {
    for (let i = 0; i < numRocks; i++) {
      rocks.push({ x: randomPosition(39), y: randomPosition(19) })
      const rock = rocks[i];
      const rockElement = document.createElement('div');
      rockElement.className = 'rock';
      rockElement.style.left = (rock.x * 25).toString() + 'px';
      rockElement.style.top = (rock.y * 25).toString() + 'px';
      document.querySelector('.board').appendChild(rockElement);
    }
  };

  renderRocks(100);

  function isThereARockAt(x, y) {
    for (let i = 0; i < rocks.length; i++) {
      const rock = rocks[i];
      if (rock.x === x && rock.y === y) {
        return true;
      }
    }
    return false
  };

  function isCoordinateInGrid(x, y) {
    if (x < 0 || y < 0 || x > 39 || y > 19) {
      return false;
    }
    return true
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
    const character = document.querySelector('.character');
    character.style.top = (y * 25).toString() + 'px';
    character.style.left = (x * 25).toString() + 'px';
    if (isThereAPlantAt(x, y)) {
      removePlantAt(x, y);
      renderPlants();
    }
    if (plants.length === 0) {
      displayWinMessage();
    }
  };

  function moveLeft() {
    if (canMoveTo(character.x - 1, character.y)) {
      character.x -= 1;
      moveCharacterTo(character.x, character.y);
    }
  };

  function moveRight() {
    if (canMoveTo(character.x + 1, character.y)) {
      character.x += 1;
      moveCharacterTo(character.x, character.y)
    }
  };

  function moveUp() {
    if (canMoveTo(character.x, character.y - 1)) {
      character.y -= 1;
      moveCharacterTo(character.x, character.y)
    }
  };

  function moveDown() {
    if (canMoveTo(character.x, character.y + 1)) {
      character.y += 1;
      moveCharacterTo(character.x, character.y);
    }
  };



  function renderPlants() {
    const plantElements = document.querySelectorAll('.plant');
    for (let i = 0; i < plantElements.length; i++) {
      plantElements[i].remove();
    }
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      const plantElement = document.createElement('div');
      plantElement.className = 'plant';
      plantElement.style.left = (plant.x * 25).toString() + 'px';
      plantElement.style.top = (plant.y * 25).toString() + 'px';
      document.querySelector('.board').appendChild(plantElement);
    }
  };
  renderPlants();

  function isThereAPlantAt(x, y) {
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      if (plant.x === x && plant.y === y) {
        return true;
      }
    }
    return false;
  };

  function removePlantAt(x, y) {
    for (let i = 0; i < plants.length; i++) {
      const plant = plants[i];
      if (plant.x === x && plant.y === y) {
        plants.splice(i, 1);
      }
    }
  };

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

}