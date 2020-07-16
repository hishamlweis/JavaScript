let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBTN = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for guess
guessBTN.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //validate

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    // check if won
    if (guess === winningNum) {
      //Game over won
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
      // Wrong number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        //Game over - lost
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        //game continues - wrong guess
        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
        //tell user its the wrong number
        guessInput.style.borderColor = "red";
        //clear input
        guessInput.value = "";
      }
    }
  }
});

// Set message

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  // text color
  message.style.color = color;
  // set message
  setMessage(msg);

  // Play Again
  guessBTN.value = "Play Again";
  guessBTN.className += "play-again";
}

// get winning num
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
