import words from "./lists/words.json";

const MAX_WORD_LENGTH = 5;

enum LetterState {
    MISS = "MISS",
    MATCH = "MATCH",
    PRESENT = "PRESENT",
}

function getRandomWord() {
    const filteredWords = words.filter((word) => word.length === 5);
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    const randomWord = filteredWords[randomIndex].toUpperCase();
    console.log("RANDOM WORD", randomWord);
    return randomWord;
}

function evaluateGuess(answer: string, guess: string): LetterState[] {
    if (answer.length !== guess.length && guess.length !== MAX_WORD_LENGTH) {
        return [];
    }

    const result: LetterState[] = Array(MAX_WORD_LENGTH).fill(LetterState.MISS);

    const lettersToCheck = answer.split("");
    const guessLetters = guess.split("");

    guessLetters.forEach((letter, i) => {
        if (answer[i] === letter) {
            result[i] = LetterState.MATCH;
            lettersToCheck.splice(i === lettersToCheck.length ? i - 1 : i, 1);
        }
    });

    guessLetters.forEach((letter, i) => {
        if (lettersToCheck.includes(letter) && result[i] !== LetterState.MATCH) {
            result[i] = LetterState.PRESENT;
            lettersToCheck.splice(lettersToCheck.indexOf(letter), 1);
        }
    });

    return result;
}

function isValidWord(word: string): boolean {
    return words.includes(word.toLowerCase());
}

const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export { evaluateGuess, getRandomWord, isValidWord, LetterState, MAX_WORD_LENGTH, formatTime };
