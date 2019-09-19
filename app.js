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
    addCurrentScore: function(value){
        this.currentScore += value;
    },
    reset: function(){
        this.score = 0;
        this.currentScore = 0;
    }
}

var playerTwo = {
    score: 0,
    currentScore: 0,
    addCurrentScore: function(value){
        this.currentScore += value;
    },
    reset: function(){
        this.score = 0;
        this.currentScore = 0;
    }
}

var activePlayer = 0;


/********************************
********** SELECTORS ************
********************************/

//Players score
var scorePlayerOne = document.querySelector('#score-0');
var scorePlayerTwo = document.querySelector('#score-1');
var currentScorePlayerOne = document.querySelector('#current-0');
var currentScorePlayerTwo = document.querySelector('#current-1');

//Active player panel
var activePlayerPanel =  document.querySelector('.player-' + activePlayer + '-panel');
var currentScoreActivePlayer = document.querySelector('#current-' + activePlayer);
//Buttons
var newGameButton = document.querySelector('.btn-new');
var rollDiceButton = document.querySelector('.btn-roll');
var holdPointsButton = document.querySelector('.btn-hold');

// Dice
var dice =  document.querySelector('.dice');

/********************************
******** GAME FUNCTIONS ********
********************************/


function initGame() {
    newGame();
}

function newGame() {
    playerOne.reset();
    playerTwo.reset();

    scorePlayerOne.textContent = 0;
    scorePlayerTwo.textContent = 0;
    currentScorePlayerOne.textContent = 0;
    currentScorePlayerTwo.textContent = 0;

    activePlayerPanel.classList.add('active');
    dice.classList.add('d-none');
}

function switchPlayer() {
    activePlayer = (activePlayer === 0)? 1: 0;
}

function rollDice() {
    //Get random number between 1 and 6
    var number = getRandomNumber(1, 6);

    if(number === 1) {
        
    }
        

    //Setting dice based on the random number
    dice.setAttribute('src', 'dice-' + number + '.png');

    //Adding points to the current active player
    if(activePlayer === 0){
        playerOne.addCurrentScore(number);
        currentScorePlayerOne.textContent = playerOne.currentScore;
    } else {
        playerTwo.addCurrentScore(number);
        currentScorePlayerTwo.textContent = playerTwo.currentScore;
    } 

    //Validating if the class has been already removed    
    if(dice.classList.contains('d-none'))
        dice.classList.remove('d-none');
}

function holdPoints() {

}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
}


/********************************
******** GAME EVENTS ************
********************************/

newGameButton.addEventListener('click', newGame);
rollDiceButton.addEventListener('click', rollDice);
holdPointsButton.addEventListener('click', holdPoints);


initGame();

