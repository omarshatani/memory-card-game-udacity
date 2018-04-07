// Variables declaration
let deck = document.querySelector('.deck');
let cards = document.getElementsByClassName('card');
let shuffledCards;
let clickStack = [];
let winCounter = 0;
let limit = 12;
let time;
let finish = true;
let clickCount = 0;
const finishTime = document.querySelector('.finishTime');
const victory = document.querySelector('.victory');
const moves = document.querySelector('.moves');
const result = document.querySelector('.result');
const restart = document.querySelector('.restart');
const retry = document.querySelector('.retry');
const stars = document.querySelector('.stars');
const starsCount = document.querySelector('.starsCount');
cards = [...cards];
shuffledCards = [...cards];

const timer = {
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
}

// Stars reset
function starsReset() {
  stars.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    stars.insertAdjacentHTML('afterbegin', '<li><i class="fa fa-star"></i></li>');
  }
}

// Starts the timer
function setTimer() {
  time = setInterval(function() {
    if (timer.seconds.innerHTML < 59) {
      timer.seconds.innerHTML++;
      if (timer.seconds.innerHTML < 10) {
        timer.seconds.innerHTML = "0" + timer.seconds.innerHTML;
      }
    } else {
      timer.minutes.innerHTML++;
      timer.seconds.innerHTML = "00";
      if (timer.minutes.innerHTML < 10) {
        timer.minutes.innerHTML = "0" + timer.minutes.innerHTML;
      }
    }
    if (timer.minutes.innerHTML === 59 && timer.seconds.innerHTML === 59) {
      timer.hours.innerHTML++;
      timer.minutes.innerHTML = "00";
      timer.seconds.innerHTML = "00";
      if (timer.hours.innerHTML < 10) {
        timer.hours.innerHTML = "0" + timer.hours.innerHTML;
      }
    }
  }, 1000);
}

// Reset the timer
function resetTimer() {
  clearInterval(time);
  timer.seconds.innerHTML = "00";
  timer.minutes.innerHTML = "00";
  timer.hours.innerHTML = "00";
}

function startTimer() {
  //Resets timer
  resetTimer();
  //Starts new timer
  setTimer();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Game initialization / reset
function init() {
  //Stars initialization
  starsReset();
  // Resets win counter
  winCounter = 0;
  //Reset limit
  limit = 12;
  // Resets moves
  moves.innerText = "0";
  //Empty moves stack
  emptyStack();
  // Shuffling each card and update
  deck.innerHTML = "";
  shuffle(shuffledCards);
  for (card of shuffledCards) {
    deck.append(card);
  }
  // Closes all cards
  for (card of deck.children) {
    card.setAttribute('class', 'card');
  }
  // Start / Reset timer
  startTimer();
}

function match(card1, card2) {
  card1.classList.add("match");
  card2.classList.add("match");
}

// Checks if cards are the same or not
function compare(card1, card2) {
  return card1.firstElementChild.classList.value === card2.firstElementChild.classList.value;
}

function emptyStack() {
  clickStack = [];
}

// Closes cards
function close(card1, card2) {
  card1.classList.remove("open", "show");
  card2.classList.remove("open", "show");
}

//Game logic
function Game(card) {

  // If the previous comparing has ended, push new card clicked
  if (finish) {
    clickStack.push(card);
    card.classList.add("open", "show");
  }

  //If stack contains 2 cards, begin comparing
  if (clickStack.length > 1) {
    //Set finish to false, so that player can't click other cards until the logic finishes comparing
    finish = false;
    //if the cards match, add new class & empty stack
    if (compare(clickStack[0], clickStack[1])) {
      match(clickStack[0], clickStack[1]);
      moves.innerText++;
      emptyStack();
      //Increase win counter
      winCounter++;
      finish = true;
    } else {
      //if the cards don't match, close them after a second
      setTimeout(function() {
        clickStack[0].classList.remove("open", "show");
        clickStack[1].classList.remove("open", "show");
        moves.innerText++;
        emptyStack();
        finish = true;
      }, 1000);
    }
  }

  // Stars logic
  if (stars.childElementCount > 0) {
    if (moves.innerText >= limit) {
      stars.firstElementChild.remove();
      limit += 8;
    }
  }

  // Win check
  if (winCounter === 8) {
    //Stop timer
    clearInterval(time);
    // Open win interface
    victory.style.display = "block";
    // Update moves result
    result.innerText = moves.innerText;
    // Update stars result
    starsCount.innerText = stars.childElementCount.toString();
    // Update time result
    finishTime.innerHTML = "<strong>" + timer.hours.innerText + ":" + timer.minutes.innerText + ":" + timer.seconds.innerText + "</strong>";
  }
}

// Listener for card click
deck.addEventListener('click', function(event) {
  // Opens card if clicked and adds to stack
  if (event.target.nodeName === "LI" && finish) {
    Game(event.target);
  }
});

// Restart button listener
restart.addEventListener('click', function() {
  init();
});

// Play again listener
retry.addEventListener('click', function() {
  init();
  victory.style.display = "none";
});

// Main
init();
