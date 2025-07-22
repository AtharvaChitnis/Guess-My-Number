// Enforces stricter parsing and error handling for a cleaner, more robust codebase.
'use strict';

/*
// --- Initial Test Code (Commented Out) ---
// This section was likely used for initial testing to manipulate the DOM directly.

// Selects the element with the class 'message' and logs its text content.
console.log(document.querySelector('.message').textContent);
// Changes the message text to show a win.
document.querySelector('.message').textContent = '🎉 Correct Number!';

// Changes the number and score display for testing purposes.
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

// Sets the value of the input field and logs it to the console.
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

// --- Game Initialization ---

// Generates a random secret number between 1 and 20.
// Math.random() creates a float between 0 and 1.
// Multiplying by 20 gives a float between 0 and 19.99...
// Math.trunc() removes the decimal part.
// Adding 1 makes the range 1 to 20.
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// Initializes the player's starting score.
let score = 20;

// Initializes the high score to 0. It will be updated when a player wins with a new top score.
let highscore = 0;

// --- Helper Function ---

// A function to display a message to the user. This avoids repeating the same line of code.
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// --- Game Logic: "Check" Button ---

// Adds an event listener to the 'check' button, which runs the main game logic on click.
document.querySelector('.check').addEventListener('click', function () {
  // Retrieves the value from the input field and converts it from a string to a number.
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess); // Logs the guess and its type for debugging.

  // --- Game Conditions ---

  // 1. When there is no input from the player.
  // The 'guess' will be 0, which is a "falsy" value, so !guess becomes true.
  if (!guess) {
    displayMessage('⛔️ No number!');

  // 2. When the player wins.
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    // Reveals the secret number.
    document.querySelector('.number').textContent = secretNumber;

    // Changes the background color to green to indicate a win.
    document.querySelector('body').style.backgroundColor = '#60b347';
    // Makes the number box wider to celebrate the win.
    document.querySelector('.number').style.width = '30rem';

    // Updates the high score if the current score is higher.
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

  // 3. When the guess is wrong (either too high or too low).
  // This refactored block handles both high and low guesses together.
  } else if (guess !== secretNumber) {
    // Checks if the player still has score points left.
    if (score > 1) {
      // Uses a ternary operator to set the message based on the guess.
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      // Decrements the score and updates the display.
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // If the score is 1, the next wrong guess means the player loses.
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});


// --- Game Reset: "Again!" Button ---

// Adds an event listener to the 'again' button to reset the game state.
document.querySelector('.again').addEventListener('click', function () {
  // Resets the score to the starting value.
  score = 20;
  // Generates a new secret number for the next round.
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  // --- Reset UI Elements ---
  // Restores the initial message.
  displayMessage('Start guessing...');
  // Resets the score display.
  document.querySelector('.score').textContent = score;
  // Hides the secret number again.
  document.querySelector('.number').textContent = '?';
  // Clears the input field.
  document.querySelector('.guess').value = '';

  // Resets the background color and the width of the number box.
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
