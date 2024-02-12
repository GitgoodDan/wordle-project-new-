
const boardEl = document.querySelector("#board-wrapper");
const rowEl = document.querySelector(".row");
const cellEl = [...rowEl.children];
const guessBtn = document.querySelector("#enter");
const rstBtn = document.querySelector("#reset");

import characterList from "./assets/character.js";

let guess = "";
let character = getRandomCharacterName();
let attempts = 0;

function getRandomCharacterName() {
    const characterNames = characterList.map(character => character.name);
    const randomIndex = Math.floor(Math.random() * characterNames.length);
    return { name: characterNames[randomIndex].toLowerCase(), index: randomIndex };
}

console.log(character.name);
guessBtn.addEventListener("click", () => getGuess(character.index));

let currentRowIndex = 0;

function checkWinCondition(guessedCharacter, randomIndex) {
    for (let key in guessedCharacter) {
        if (guessedCharacter.hasOwnProperty(key)) {
            if (guessedCharacter[key] !== characterList[randomIndex][key]) {
                return { result: false, message: "Incorrect guess. Try again." };
            }
        }
    }
    return { result: true, message: "Congratulations! You've won!" };
}

function getGuess(randomIndex) {
    let guessInput = document.getElementById("guess");
    guess = guessInput.value.toLowerCase();
    console.log("User guessed: " + guess);

    const guessedCharacter = characterList.find(character => character.name.toLowerCase() === guess);

    const currentRow = document.querySelector(`.row[data-num="${currentRowIndex + 1}"]`);

    if (!currentRow) {
        document.querySelector("h1").textContent = "You've exceeded the attempt limit. You lose!";
        return;
    }

    if (guessedCharacter) {
        Object.entries(guessedCharacter).forEach(([key, value], index) => {
            const cell = currentRow.querySelector(`.cell[data-index="${index + 1}"]`);
            const correct = guessedCharacter[key] === characterList[randomIndex][key];
            if (Array.isArray(guessedCharacter[key])) {
                let isPartiallyCorrect = false;
                guessedCharacter[key].forEach(guessedValue => {
                    if (guessedValue === characterList[randomIndex][key]) {
                        isPartiallyCorrect = true;
                    }
                });
                cell.style.backgroundColor = isPartiallyCorrect ? 'orange' : 'red';
            } else {
                cell.style.backgroundColor = correct ? "green" : "red";
            }
            cell.innerHTML = `<span>${value}</span>`;
        });

        const result = checkWinCondition(guessedCharacter, randomIndex);
        if (result.result) {
            document.querySelector("h1").textContent = result.message;
        }
        currentRowIndex++;
    } else {
        document.querySelector("h1").textContent = "Invalid character guess. Try again!";
        Array.from(currentRow.children).forEach(cell => {
            cell.innerHTML = "";
            cell.style.backgroundColor = "gray";
        });
    }
}

rstBtn.addEventListener("click", resetBoard);

function resetBoard() {
    const rows = document.querySelectorAll(".row");
    rows.forEach(row => {
        Array.from(row.children).forEach(cell => {
            cell.innerHTML = "";
            cell.style.backgroundColor = "gray";
        });
    });
    document.querySelector("h1").textContent = "Guess A Nintendo Character!";

    attempts = 0;

    character = getRandomCharacterName();
    console.log(character.name);

    currentRowIndex = 0;
}
