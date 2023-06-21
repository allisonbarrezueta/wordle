import {
	evaluateGuess,
	getRandomWord,
	isValidWord,
	LetterState
} from '../word.utils';

describe('word-utils', () => {
	describe('getRandomWord', () => {
		it('returns word with 5 letters', () => {
			const word = getRandomWord();
			expect(word.length).toBe(5);
		});
	});
	describe('evaluateGuess', () => {
		it('returns all misses', () => {
			const result = evaluateGuess('HELLO', 'FIRST');
			expect(result).toEqual(Array(5).fill(LetterState.MISS));
		});
		it('returns all matches', () => {
			const result = evaluateGuess('HELLO', 'HELLO');
			expect(result).toEqual(Array(5).fill(LetterState.MATCH));
		});
		it('returns some matches, misses and exists', () => {
			const result = evaluateGuess('FIRST', 'FLOOR');
			expect(result).toEqual([
				LetterState.MATCH,
				LetterState.MISS,
				LetterState.MISS,
				LetterState.MISS,
				LetterState.PRESENT
			]);
		});
		it('returns empty array when given incomplete guess', () => {
			const result = evaluateGuess('boost', 'an');
			expect(result).toEqual([]);
		});
		it('when 2 letters are present but answer has only 1 of those letters', () => {
			let result = evaluateGuess('relax', 'sweep');
			expect(result).toEqual([
				LetterState.MISS,
				LetterState.MISS,
				LetterState.PRESENT,
				LetterState.MISS,
				LetterState.MISS
			]);
			result = evaluateGuess('grook', 'knock');
			expect(result).toEqual([
				LetterState.MISS,
				LetterState.MISS,
				LetterState.MATCH,
				LetterState.MISS,
				LetterState.MATCH
			]);
		});
		it('when 1 letter matches but guess has more of the same letter', () => {
			const result = evaluateGuess('colon', 'allol');
			expect(result).toEqual([
				LetterState.MISS,
				LetterState.MISS,
				LetterState.MATCH,
				LetterState.MATCH,
				LetterState.MISS
			]);
		});
	});
	describe('isValidWord', () => {
		it('returns true when word is valid', () => {
			const result = isValidWord('alive');
			expect(result).toBeTruthy();
		});
		it('returns false when word is invalid', () => {
			const result = isValidWord('italy');
			expect(result).toBeFalsy();
		});
	});
});
