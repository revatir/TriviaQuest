window.onload = function () {

  //Global Variables
  let scoreNode = document.querySelector("#scoreNode");
  let healthNode = document.querySelector("#healthNode");
  let rocks = [];
  let ghosts = [];
  let crystals = [];
  const question = [];
  const correctAnswer = [];
  let character = {
    x: 0,
    y: 0
  };
  const crystalImages = new Array();

  crystalImages[0] = new Image();
  crystalImages[0].src = 'Images/Crystal-1.png';

  crystalImages[1] = new Image();
  crystalImages[1].src = 'Images/Crystal-2.png';

  crystalImages[2] = new Image();
  crystalImages[2].src = 'Images/Crystal-3.png';

  crystalImages[3] = new Image();
  crystalImages[3].src = 'Images/Crystal-4.png';

  crystalImages[4] = new Image();
  crystalImages[4].src = 'Images/Crystal-5.png';

  const heartImages = new Array();

  heartImages[0] = new Image();
  heartImages[0].src = 'Images/heart.png';

  heartImages[1] = new Image();
  heartImages[1].src = 'Images/heart.png';

  heartImages[2] = new Image();
  heartImages[2].src = 'Images/heart.png';

  const randomPosition = function (max) {
    return Math.floor(Math.random() * (max - 1) + 1); // so the starting area of the character is clear
  }
  ////

  ////Reset Game Function
  document.querySelector(".reset-button").addEventListener("click", function () {
    console.log("Resetting Game...");
    character = {
      x: 0,
      y: 0
    };
    moveCharacterTo(0, 0);

    scoreNode.innerHTML = ``;
    healthNode.innerHTML = ``;

    rocks = [];
    ghosts = [];
    crystals = [];
    document.querySelector(".rocks").innerHTML = '';
    renderHearts(3);
    renderNewGhosts(25);
    renderRocks(100);
    let message = document.querySelector(".message");
    if (message) {
      message.remove();
    };

    question.pop()
    correctAnswer.pop();
    startGame();
  })
  ////

  //Gameplay

  //
  function startGame() {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'message';
    welcomeMessage.innerHTML =
      `<div>Welcome, traveler! You've entered the Deadly Forest. The only way to escape is to collect (3) Escape Gems. To obtain an Escape Gem, approach a ghost and answer their question correctly. But be careful...if you answer incorrectly, they will attack. Three hits to your Health Points, and you're dead!</div>
      <button id="continue-game">Continue</button>`;
    document.querySelector('.board').appendChild(welcomeMessage);
    document.querySelector('.message').addEventListener('click', function () {
      welcomeMessage.classList.add('fade-out');
      setTimeout(function () { welcomeMessage.remove() }, 500);
    })
  }

  startGame();

  function renderRocks(numRocks) {
    for (let i = 0; i < numRocks; i++) {
      rocks.push({ x: randomPosition(37), y: randomPosition(17) })
      const rock = rocks[i];
      const rockElement = document.createElement('div');
      rockElement.className = 'rock';
      rockElement.style.left = (rock.x * 25).toString() + 'px';
      rockElement.style.top = (rock.y * 25).toString() + 'px';
      document.querySelector('.rocks').appendChild(rockElement);
    }
  };

  renderRocks(150);

  function renderHearts(numHearts) {
    for (let i = 0; i < numHearts; i++) {
      const heartElement = document.createElement('img');
      heartElement.className = 'heart';
      heartElement.setAttribute('src', heartImages[i].src);
      healthNode.appendChild(heartElement);
      console.log(`Printed heartImages${[i]}`)
    }
  };

  renderHearts(3);

  function renderNewGhosts(numGhosts) {
    const ghostElements = document.querySelectorAll('.ghost');
    for (let i = 0; i < ghostElements.length; i++) {
      ghostElements[i].remove();
      ghosts = [];
    }
    for (let i = 0; i < numGhosts; i++) {
      ghosts.push({ x: randomPosition(37), y: randomPosition(17) })
      const ghost = ghosts[i];
      const ghostElement = document.createElement('div');
      ghostElement.className = 'ghost';
      ghostElement.style.left = (ghost.x * 25).toString() + 'px';
      ghostElement.style.top = (ghost.y * 25).toString() + 'px';
      document.querySelector('.ghosts').appendChild(ghostElement);
    }
  };
  renderNewGhosts(25);

  function renderGhosts() {
    const ghostElements = document.querySelectorAll('.ghost');
    for (let i = 0; i < ghostElements.length; i++) {
      ghostElements[i].remove();
    }
    for (let i = 0; i < ghosts.length; i++) {
      const ghost = ghosts[i];
      const ghostElement = document.createElement('div');
      ghostElement.className = 'ghost';
      ghostElement.style.left = (ghost.x * 25).toString() + 'px';
      ghostElement.style.top = (ghost.y * 25).toString() + 'px';
      document.querySelector('.ghosts').appendChild(ghostElement);
    }
  };

  function isThereAGhostAt(x, y) {
    for (let i = 0; i < ghosts.length; i++) {
      const ghost = ghosts[i];
      if (ghost.x === x && ghost.y === y) {
        return true;
      }
    }
    return false;
  };

  function removeGhostAt(x, y) {
    for (let i = 0; i < ghosts.length; i++) {
      const ghost = ghosts[i];
      if (ghost.x === x && ghost.y === y) {
        ghosts.splice(i, 1);
        console.log(`removed ${[i]}`)
      }
    }
  };

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
    if (x < 0 || y < 0 || x > 37 || y > 17) {
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

  document.body.addEventListener('keydown', function (evt) {
    const keyCode = evt.keyCode;
    const character = document.querySelector('.character');
    if ([37, 38, 39, 40].includes(keyCode)) { //includes determines whether array includes a certain value amoung its entries, returning true/false when appropriate
      evt.preventDefault();
    };
    switch (keyCode) {
      case 37:
        moveLeft();
        // character.classList.replace("character-walking-left");
        character.classList.toggle("character-walking-left");
        break;
      case 38:
        moveUp();
        character.classList.toggle("character-walking-left");
        break;
      case 39:
        moveRight();
        character.classList.toggle("character-walking-left");
        break;
      case 40:
        moveDown();
        character.classList.toggle("character-walking-left");
        break;
    }
  });

  function addCrystal() {
    const crystalElement = document.createElement('img');
    const i = Math.floor(Math.random() * (5))
    crystalElement.className = 'crystal';
    crystalElement.setAttribute('src', crystalImages[i].src);
    scoreNode.appendChild(crystalElement);
    crystals.push(crystalImages[i]);
    console.log(`Printed crystalImages${[i]}`)
  }

  async function displayTriviaMessage() {
    if (document.querySelector('.trivia-message') !== null) {
      return;
    };

    const response = await axios.get('https://opentdb.com/api.php?amount=50&category=15&difficulty=easy&type=boolean');
    const results = response.data.results;
    const randomQuestion = randomPosition(15);
    question.push(results[randomQuestion].question);
    correctAnswer.push(results[randomQuestion].correct_answer);
    console.log(question[0]);
    console.log(correctAnswer[0]);
    const triviaMessageElement = document.createElement('div');
    triviaMessageElement.className = 'trivia-message, message';
    triviaMessageElement.innerHTML =
      `<div id="question-preface"> Answer the following question to proceed:</div>
        <div>"${question[0]}"</div>
        <button class="response-button" id="true">True</button>
        <button class="response-button" id="false">False</button>`;
    document.querySelector('.board').appendChild(triviaMessageElement);

    const responseButtons = document.querySelectorAll('.response-button');
    // let scoreNumber = parseInt(scoreNode.innerHTML, 10);
    // let healthNumber = parseInt(healthNode.innerHTML, 10);

    for (let i = 0; i < responseButtons.length; i++) {
      responseButtons[i].addEventListener('click', function (evt) {
        let answer = evt.target.innerHTML;
        console.log(`Answered ${answer}`)
        if (answer == correctAnswer[0]) {
          // scoreNumber += 1;
          addCrystal();
          console.log("That was correct!");
          triviaMessageElement.innerHTML =
            `<div>Correct answer! The defeated ghost gives you (1) escape gem.</div>
            <button id="continue-game">Continue Game</button>`;
        } else if (answer != correctAnswer[0]) {
          console.log("Sorry, wrong answer");
          // healthNumber -= 1;
          document.querySelector('#healthNode').lastChild.classList.add('fade-out');
          setTimeout(function () { document.querySelector('#healthNode').lastChild.remove() }, 500);
          triviaMessageElement.innerHTML =
            `<div>Wrong answer :( The ghost viciously attacks you and you lose 1 HP.</div>
              <button id="continue-game">Continue Game</button>`
        } else {
          console.log("You must choose True or False.");
        }
        question.pop();
        correctAnswer.pop();
        console.log(question);
        console.log(correctAnswer);
        // console.log(`Points: ${scoreNumber}`);
        // console.log(`HP: ${healthNumber}`);
        // scoreNode.innerHTML = `${scoreNumber}`;
        // healthNode.innerHTML = `${healthNumber}`;
        document.querySelector('#continue-game').addEventListener('click', function () {
          triviaMessageElement.classList.add('fade-out');
          setTimeout(function () { triviaMessageElement.remove(); }, 500);
          // if (scoreNode.innerHTML == 3) {
          if (crystals.length == 3) {
            displayWinMessage();
          }
          if (healthNode.innerHTML == 0) {
            displayLoseMessage();
          }
        })
      });
    };
  };

  function displayWinMessage() {
    // Only display one win message.
    if (document.querySelector('.win-message') !== null) {
      return;
    }
    const winMessageElement = document.createElement('div');
    winMessageElement.className = 'win-message, message';
    winMessageElement.innerHTML =
      `<div>Congratulations!!! You collected (3) Escape Gems and escaped the Deadly Forest!</div>`;
    // <button class="reset-button">Play Again</button>;
    document.querySelector('.board').appendChild(winMessageElement);
  };

  function displayLoseMessage() {
    // Only display one lose message.
    if (document.querySelector('.lose-message') !== null) {
      return;
    }
    const loseMessageElement = document.createElement('div');
    loseMessageElement.className = 'lose-message, message';
    loseMessageElement.innerHTML =
      `<div> You have lost all HP points! Looks like you're going to die here.</div>`
    // < button class="reset-button" > Play Again</button > `;
    document.querySelector('.board').appendChild(loseMessageElement);
  };

  function moveCharacterTo(x, y) {
    const character = document.querySelector('.character');
    character.style.top = (y * 25).toString() + 'px';
    character.style.left = (x * 25).toString() + 'px';
    if (isThereAGhostAt(x, y)) {
      removeGhostAt(x, y);
      displayTriviaMessage()
      renderGhosts(25);
    }
  };
};