window.onload = function () {

  let scoreNode = document.querySelector("#scoreNode");
  let healthNode = document.querySelector("#healthNode");
  let rocks = [];
  let ghosts = [];
  const question = [];
  const correctAnswer = [];
  const character = {
    x: 0,
    y: 0
  };
  const randomPosition = function (max) {
    return Math.floor(Math.random() * (max));
  }

  //Reset Game Function
  document.querySelector("#reset-button").addEventListener("click", function () {
    let message = document.querySelector(".message");
    console.log("Resetting Game...");
    scoreNode.innerHTML = `0`;
    healthNode.innerHTML = `3`;
    document.querySelector(".rocks").innerHTML = '';
    rocks = [];
    ghosts = [];
    const character = {
      x: 0,
      y: 0
    };
    moveCharacterTo(0, 0);
    renderGhosts(10);
    renderRocks(100);
    message.remove();
    question.pop()
    correctAnswer.pop();
  })
  //

  //Gameplay
  function renderRocks(numRocks) {
    for (let i = 0; i < numRocks; i++) {
      rocks.push({ x: randomPosition(38), y: randomPosition(18) })
      const rock = rocks[i];
      const rockElement = document.createElement('div');
      rockElement.className = 'rock';
      rockElement.style.left = (rock.x * 25).toString() + 'px';
      rockElement.style.top = (rock.y * 25).toString() + 'px';
      document.querySelector('.rocks').appendChild(rockElement);
    }
  };

  renderRocks(100);

  function renderGhosts(numGhosts) {
    const ghostElements = document.querySelectorAll('.ghost');
    for (let i = 0; i < ghostElements.length; i++) {
      ghostElements[i].remove();
    }
    for (let i = 0; i < numGhosts; i++) {
      ghosts.push({ x: randomPosition(38), y: randomPosition(18) })
      const ghost = ghosts[i];
      const ghostElement = document.createElement('div');
      ghostElement.className = 'ghost';
      ghostElement.style.left = (ghost.x * 25).toString() + 'px';
      ghostElement.style.top = (ghost.y * 25).toString() + 'px';
      document.querySelector('.ghosts').appendChild(ghostElement);
    }
  };
  renderGhosts(10);

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
    if (x < 0 || y < 0 || x > 38 || y > 18) {
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

  async function displayTriviaMessage() {
    if (document.querySelector('.trivia-message') !== null) {
      return;
    };

    const response = await axios.get('https://opentdb.com/api.php?amount=30&category=15&difficulty=easy&type=boolean');
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
    let scoreNumber = parseInt(scoreNode.innerHTML, 10);
    let healthNumber = parseInt(healthNode.innerHTML, 10);

    for (let i = 0; i < responseButtons.length; i++) {
      responseButtons[i].addEventListener('click', function (evt) {
        let answer = evt.target.innerHTML;
        console.log(`Answered ${answer}`)
        if (answer == correctAnswer[0]) {
          scoreNumber += 1;
          console.log("That was correct!");
          triviaMessageElement.innerHTML =
            `Correct answer! The defeated ghost gives you (1) escape gem.
            <button id="continue-game">Continue Game</button>`;
        } else if (answer != correctAnswer[0]) {
          console.log("Sorry, wrong answer");
          healthNumber -= 1;
          triviaMessageElement.innerHTML =
            `Wrong answer :( The ghost viciously attacks you and you lose 1 HP.
              <button id="continue-game">Continue Game</button>`
        } else {
          console.log("You must choose True or False.");
        }
        question.pop();
        correctAnswer.pop();
        console.log(question);
        console.log(correctAnswer);
        console.log(`Points: ${scoreNumber}`);
        console.log(`HP: ${healthNumber}`);
        scoreNode.innerHTML = `${scoreNumber}`;
        healthNode.innerHTML = `${healthNumber}`;
        document.querySelector('#continue-game').addEventListener('click', function () {
          triviaMessageElement.remove();
          renderGhosts();
          if (scoreNode.innerHTML == 3) {
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
    winMessageElement.innerHTML = `Congratulations!!! You collected (3) Escape Gems and escaped the deadly forest!`;
    document.querySelector('.board').appendChild(winMessageElement);
  };

  function displayLoseMessage() {
    // Only display one lose message.
    if (document.querySelector('.lose-message') !== null) {
      return;
    }
    const loseMessageElement = document.createElement('div');
    loseMessageElement.className = 'lose-message, message';
    loseMessageElement.innerHTML = `You lost all HP points and have died in the deadly forest.`;
    document.querySelector('.board').appendChild(loseMessageElement);
  };

  function moveCharacterTo(x, y) {
    const character = document.querySelector('.character');
    character.style.top = (y * 25).toString() + 'px';
    character.style.left = (x * 25).toString() + 'px';
    if (isThereAGhostAt(x, y)) {
      removeGhostAt(x, y);
      displayTriviaMessage()
      renderGhosts();
    }
  };
};