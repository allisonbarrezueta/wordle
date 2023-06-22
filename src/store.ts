import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { evaluateGuess, getRandomWord, LetterState } from "./utils";

export const MAX_GUESSES = 5;

export type IGuess = {
    word: string;
    state?: LetterState[];
};

export enum GameState {
    WON,
    LOST,
    IN_PROGRESS,
}

type IGameStatus = {
    gameOver: boolean;
    state: GameState;
    wins: number;
    totalPlays: number;
};

export type IStoreState = {
    answer: string;
    selectedAnswers: string[];
    alreadyGuessed: IGuess[];
    keysPressed: Record<string, LetterState>;
    addGuess: (guess: string) => void;
    outOfTime: () => void;
    gameStatus: IGameStatus;
    newGame: () => void;
};

const useStore = create<IStoreState>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    persist(
        (set, _get) => {
            return {
                answer: getRandomWord([]),
                selectedAnswers: [],
                alreadyGuessed: [],
                gameStatus: {
                    gameOver: false,
                    state: GameState.IN_PROGRESS,
                    wins: 0,
                    totalPlays: 0,
                },
                keysPressed: {},
                addGuess: (guess: string) =>
                    set((state) => {
                        const evaluatedGuess = evaluateGuess(state.answer, guess);

                        const _keysPressed = { ...state.keysPressed };
                        evaluatedGuess.forEach((letterState, index) => {
                            if (_keysPressed[guess[index]] !== LetterState.MATCH) {
                                _keysPressed[guess[index]] = letterState;
                            }
                        });

                        const _gameStatus = { ...state.gameStatus };

                        if (evaluatedGuess.every((s) => s === LetterState.MATCH)) {
                            _gameStatus.gameOver = true;
                            _gameStatus.state = GameState.WON;
                            _gameStatus.wins += 1;
                            _gameStatus.totalPlays += 1;
                            return { gameStatus: _gameStatus };
                        } else if (state.alreadyGuessed.length + 1 === MAX_GUESSES) {
                            _gameStatus.gameOver = true;
                            _gameStatus.state = GameState.LOST;
                            _gameStatus.totalPlays += 1;
                            return { gameStatus: _gameStatus };
                        }

                        return {
                            gameStatus: _gameStatus,
                            alreadyGuessed: [
                                ...state.alreadyGuessed,
                                {
                                    word: guess,
                                    state: evaluatedGuess,
                                },
                            ],
                            keysPressed: _keysPressed,
                        };
                    }),
                outOfTime: () => {
                    set((state) => {
                        return {
                            gameStatus: {
                                gameOver: true,
                                state: GameState.LOST,
                                wins: state.gameStatus.wins,
                                totalPlays: state.gameStatus.totalPlays + 1,
                            },
                            keysPressed: {},
                        };
                    });
                },
                newGame: () =>
                    set((state) => {
                        return {
                            answer: getRandomWord(state.selectedAnswers),
                            selectedAnswers: [state.answer, ...state.selectedAnswers],
                            alreadyGuessed: [],
                            gameStatus: {
                                gameOver: false,
                                state: GameState.IN_PROGRESS,
                                wins: state.gameStatus.wins,
                                totalPlays: state.gameStatus.totalPlays,
                            },
                            keysPressed: {},
                        };
                    }),
            };
        },
        {
            name: "word-storage", // name of the item in the storage (must be unique)
        }
    ) as StateCreator<IStoreState>
);

export default useStore;
