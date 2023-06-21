import words from "./lists/words.json";

const MAX_WORD_LENGTH = 5;

enum LetterState {
  MISS = "MISS",
  MATCH = "MATCH",
  PRESENT = "PRESENT",
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
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

export {
  evaluateGuess,
  getRandomWord,
  isValidWord,
  LetterState,
  MAX_WORD_LENGTH,
};
