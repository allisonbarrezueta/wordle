import create from "zustand";

import { evaluateGuess, getRandomWord, LetterState } from "./utils";

export const MAX_GUESSES = 5;
export const GAME_DURATION = 300000;

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
    alreadyGuessed: IGuess[];
    keysPressed: Record<string, LetterState>;
    addGuess: (guess: string) => void;
    gameStatus: IGameStatus;
    newGame: () => void;
    timeLeft: number;
};

const useStore = create<IStoreState>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => {
        let timer: NodeJS.Timeout;
        let startTime: number;

        const startTimer = () => {
            timer = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const timeLeft = GAME_DURATION - elapsedTime;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    set((state) => {
                        const _gameStatus = { ...state.gameStatus };
                        _gameStatus.gameOver = true;
                        _gameStatus.state = GameState.LOST;
                        _gameStatus.totalPlays += 1;
                        return { gameStatus: _gameStatus };
                    });
                } else {
                    set({ timeLeft });
                }
            }, 1000);
        };

        const stopTimer = () => {
            clearTimeout(timer);
        };

        return {
            answer: getRandomWord(),
            alreadyGuessed: [],
            gameStatus: {
                gameOver: false,
                state: GameState.IN_PROGRESS,
                wins: 0,
                totalPlays: 0,
            },
            keysPressed: {},
            timeLeft: GAME_DURATION,
            addGuess: (guess: string) =>
                set((state) => {
                    stopTimer(); // Stop the timer when a guess is made
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
                    startTimer(); // Start the timer again after a guess is made

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
            newGame: () =>
                set(() => {
                    stopTimer();
                    return {
                        answer: getRandomWord(),
                        alreadyGuessed: [],
                        gameStatus: {
                            gameOver: false,
                            state: GameState.IN_PROGRESS,
                            wins: 0,
                            totalPlays: 0,
                        },
                        keysPressed: {},
                        timeLeft: GAME_DURATION,
                    };
                }),
        };
    }
);

export default useStore;
