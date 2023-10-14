const guessedLettersElement = document.querySelector(".guessed");
const button = document.querySelector(".guess");
const letterImput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
//starting word
const word = "magnolia"; 
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

button.addEventListener("click", function(e){
    e.preventDefault();
    const guess = letterImput.value;
    console.log(guess);
    const goodGuess = playersInput(guess);
    console.log(goodGuess);
    if(goodGuess){
        makeGuess(guess)
    }
    letterImput.value = "";
});

const playersInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input === 0){
        message.innerText = "Please enter a letter";
    }else if (input.length > 1) {
        message.innerText = "You can only enter one letter";
    }else if (!input.match(acceptedLetter) ) {
        message.innerText = "Please enter a number from A-Z";
    }else {return input};
    };

    const makeGuess = function(guess){
        guess = guess.toUpperCase();
        if(guessedLetters.includes(guess)) {
            message.innerText = "You already guessed that letter, try again.";
        }else{guessedLetters.push(guess)}
        console.log(guessedLetters);
    };
