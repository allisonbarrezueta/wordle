import words from "./lists/words.json";

const MAX_WORD_LENGTH = 5;

enum LetterState {
    MISS = "MISS",
    MATCH = "MATCH",
    PRESENT = "PRESENT",
}

function getRandomWord(selectedAnswers: string[]) {
    const filteredWords = words.filter((word) => word.length === 5);
    let randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)].toUpperCase();

    while (selectedAnswers.includes(randomWord)) {
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        randomWord = filteredWords[randomIndex].toUpperCase();

        if (!selectedAnswers.includes(randomWord)) {
            break;
        }
    }

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
        if (answer[i] === letter || isSameLetterWithOrWithoutAccent(answer[i], letter)) {
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

const calculateCountdown = (timestamp: number) => {
    const resetInterval = 5 * 60 * 1000; // 5 minutes in milliseconds
    const remainingTime = resetInterval - (Date.now() - timestamp);
    const seconds = Math.floor(remainingTime / 1000) % 60;
    const minutes = Math.floor(remainingTime / 1000 / 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const isSameLetterWithOrWithoutAccent = (letter1: string, letter2: string) => {
    const normalizedLetter1 = letter1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const normalizedLetter2 = letter2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return normalizedLetter1 === normalizedLetter2;
};

const getVowelWithAccent = (key: string) => {
    switch (key) {
        case "KeyA":
        case "A":
            return "Á";
        case "KeyE":
        case "E":
            return "É";
        case "KeyI":
        case "I":
            return "Í";
        case "KeyO":
        case "O":
            return "Ó";
        case "KeyU":
        case "U":
            return "Ú";
        default:
            return "";
    }
};

export {
    evaluateGuess,
    getRandomWord,
    isValidWord,
    LetterState,
    MAX_WORD_LENGTH,
    calculateCountdown,
    formatTime,
    isSameLetterWithOrWithoutAccent,
    getVowelWithAccent,
};
