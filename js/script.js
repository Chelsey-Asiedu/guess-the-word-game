const guessedLettersElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterImput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
//starting word
let word = "magnolia"; 
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const response = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await response.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};
// Fire off the game
getWord();

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word){
       // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


button.addEventListener("click", function(e){
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    // Let's grab what was entered in the input
    const guess = letterImput.value;
    // Let's make sure that it is a single letter
    const goodGuess = playersInput(guess);

    if(goodGuess){
        makeGuess(guess)
    }
    letterImput.value = "";
});

const playersInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0){
        message.innerText = "Please enter a letter.";
    }else if (input.length > 1) {
        message.innerText = "You can only enter one letter.";
    }else if (!input.match(acceptedLetter) ) {
        message.innerText = "Please enter a letter from A-Z.";
    }else {return input};
    };

    const makeGuess = function(guess){
        guess = guess.toUpperCase();
        if(guessedLetters.includes(guess)) {
            message.innerText = "You already guessed that letter, try again.";
        }else{
            guessedLetters.push(guess)
            console.log(guessedLetters);
            countGuessesRemaining(guess)
            showGuessedLetters();
            updateWorkInProgress(guessedLetters);
        }

    };

    const showGuessedLetters = function () {
        guessedLettersElement.innerHTML = "";
        for(const letter of guessedLetters) {
            const li = document.createElement("li");
            li.innerText = letter;
            guessedLettersElement.append(li);
        }
    };

    const updateWorkInProgress = function (guessedLetters) {
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        console.log(wordArray);
        revealWord = [];
        for(const letter of wordArray) {
            if(guessedLetters.includes(letter)){
                revealWord.push(letter.toUpperCase());
            }else {
                revealWord.push("●")
            }
        }
       // console.log(revealWord);
        wordInProgress.innerText = revealWord.join("");
        checkIfWin();
    };
    const countGuessesRemaining = function(guess){
        const upperWord = word.toUpperCase();

        if(!upperWord.includes(guess)){
            message.innerText = `sorry, word does not have ${guess}.`;
            remainingGuesses  -= 1;
        }else{
            message.innerText = `you guessed correctly, the word has the letter ${guess}`;
        }

        if(remainingGuesses === 0){
            message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
            startOver();
        }else if(remainingGuesses === 1) {
            remainingSpan.innerText = `${remainingGuesses} guess`;
        }else{
            remainingSpan.innerText = `${remainingGuesses} guesses;`
        }
    }
    const checkIfWin = function() {
        if(word.toUpperCase() === wordInProgress.innerText){
            message.classList.add("win");
            message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
            startOver();
        } 
    };

    const startOver = function () {
        button.classList.add("hide");
        remaining.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        playAgainButton.classList.remove("hide");
    };

    playAgainButton.addEventListener("click", function() {
        message.classList.remove("win");
        guessedLetters = [];
        message.innerText = "";
        guessedLettersElement.innerHTML = "";
        remainingGuesses = 8;
        remainingSpan.innerText = `${remainingGuesses} guesses`;

        // Grab a new word
        getWord();

        button.classList.remove("hide");
        playAgainButton.classList.add("hide");
        remaining.classList.remove("hide");
        guessedLettersElement.classList.remove("hide");
    });

