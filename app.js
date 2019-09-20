/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
- After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/********************************
 ***** GAME INITIALIZATION ******
 ********************************/

var playerOne = {
    score: 0,
    currentScore: 0,
    holdScore: function () {
        this.score += this.currentScore;
        this.currentScore = 0;
    },
    addCurrentScore: function (value) {
        this.currentScore += value;
    },
    reset: function () {
        this.score = 0;
        this.currentScore = 0;
    }
}

var playerTwo = {
    score: 0,
    currentScore: 0,
    holdScore: function () {
        this.score += this.currentScore;
        this.currentScore = 0;
    },
    addCurrentScore: function (value) {
        this.currentScore += value;
    },
    reset: function () {
        this.score = 0;
        this.currentScore = 0;
    }
}


var activePlayer = 0;
var MAX_SCORE = 50;

/********************************
 ********** SELECTORS ************
 ********************************/

//Players name
var $playerOneName = document.querySelector('#name-0');
var $playerTwoName = document.querySelector('#name-1');

//Players score
var scorePlayerOne = document.querySelector('#score-0');
var scorePlayerTwo = document.querySelector('#score-1');

var $currentScorePlayerOne = document.querySelector('#current-0');
var $currentScorePlayerTwo = document.querySelector('#current-1');

//Players Panel
var $playerOnePanel = document.querySelector('.player-0-panel');
var $playerTwoPanel = document.querySelector('.player-1-panel');

//Buttons
var $newGameButton = document.querySelector('.btn-new');
var $rollDiceButton = document.querySelector('.btn-roll');
var $holdPointsButton = document.querySelector('.btn-hold');

// Dice
var $dice = document.querySelector('.dice');

/********************************
 ******** GAME FUNCTIONS ********
 ********************************/

function initGame() {
    newGame();
}

function newGame() {
    activePlayer = 0;

    playerOne.reset();
    playerTwo.reset();

    $playerOneName.textContent = 'Player 1';
    $playerTwoName.textContent = 'Player 2';

    scorePlayerOne.textContent = 0;
    scorePlayerTwo.textContent = 0;

    $currentScorePlayerOne.textContent = 0;
    $currentScorePlayerTwo.textContent = 0;

    $playerOnePanel.classList.add('active');
    $playerTwoPanel.classList.remove('active');

    $playerOnePanel.classList.remove('winner');
    $playerTwoPanel.classList.remove('winner');

    $rollDiceButton.removeAttribute('disabled');
    $holdPointsButton.removeAttribute('disabled');

    $dice.classList.add('d-none');
}

function switchPlayer() {
    //Resetting the current player score
    document.querySelector('#current-' + activePlayer).textContent = 0;

    //Removing active class from the current player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    //Switching to the other player
    activePlayer = (activePlayer === 0) ? 1 : 0;

    //Adding active class to the current player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function rollDice() {
    //Get random number between 1 and 6
    var number = getRandomNumber(1, 6);

    if (number === 1) {
        //Switching to the other player
        switchPlayer();

        //Resetting the current player score
        if (activePlayer === 0) {
            playerOne.currentScore = 0;
        } else {
            playerTwo.currentScore = 0;
        }

        $dice.classList.add('d-none');

        return;
    }

    //Setting dice based on the random number
    $dice.src = 'dice-' + number + '.png';

    //Adding points to the current active player
    if (activePlayer === 0) {
        playerOne.addCurrentScore(number);
        $currentScorePlayerOne.textContent = playerOne.currentScore;
    } else {
        playerTwo.addCurrentScore(number);
        $currentScorePlayerTwo.textContent = playerTwo.currentScore;
    }

    $dice.classList.remove('d-none');
}

function holdPoints() {
    if (activePlayer === 0) {
        playerOne.holdScore();
        scorePlayerOne.textContent = playerOne.score;
        $currentScorePlayerOne.textContent = 0;
    } else {
        playerTwo.holdScore();
        scorePlayerTwo.textContent = playerTwo.score;
        $currentScorePlayerTwo.textContent = 0;
    }

    if (thereIsWinner()) return;

    switchPlayer();
}

function thereIsWinner() {
    if (playerOne.score >= MAX_SCORE) {
        $playerOneName.textContent = 'Winner!';

        $playerOnePanel.classList.add('winner');

        $rollDiceButton.setAttribute('disabled', true);
        $holdPointsButton.setAttribute('disabled', true);

        return true;

    } else if (playerTwo.score >= MAX_SCORE) {
        $playerTwoName.textContent = 'Winner!';

        $playerTwoPanel.classList.add('winner');
        $rollDiceButton.setAttribute('disabled', true);
        $holdPointsButton.setAttribute('disabled', true);

        return true;
    }
    return false;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/********************************
 ******** GAME EVENTS ************
 ********************************/

$newGameButton.addEventListener('click', newGame);
$rollDiceButton.addEventListener('click', rollDice);
$holdPointsButton.addEventListener('click', holdPoints);


initGame();