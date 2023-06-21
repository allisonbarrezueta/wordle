import CryptoJS from "crypto-js";
import create, { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

import { evaluateGuess, getRandomWord, LetterState } from "./utils";

const secret = CryptoJS.enc.Utf8.parse("");

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
};

export type IStoreState = {
  answer: string;
  alreadyGuessed: IGuess[];
  keysPressed: Record<string, LetterState>;
  addGuess: (guess: string) => void;
  gameStatus: IGameStatus;
  newGame: () => void;
};

const useStore = create<IStoreState>(
  persist<IStoreState>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, _get) => ({
      answer: getRandomWord(),
      alreadyGuessed: [],
      gameStatus: {
        gameOver: false,
        state: GameState.IN_PROGRESS,
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
          } else if (state.alreadyGuessed.length + 1 === MAX_GUESSES) {
            _gameStatus.gameOver = true;
            _gameStatus.state = GameState.LOST;
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
      newGame: () =>
        set(() => ({
          answer: getRandomWord(),
          alreadyGuessed: [],
          gameStatus: {
            gameOver: false,
            state: GameState.IN_PROGRESS,
          },
          keysPressed: {},
        })),
    }),
    {
      name: "wordle-clone-storage",
      serialize: (state: any) => {
        return CryptoJS.AES.encrypt(JSON.stringify(state), secret, {
          keySize: 128 / 8,
          iv: secret,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }).toString();
      },
      deserialize: (state: any) => {
        return JSON.parse(
          CryptoJS.enc.Utf8.stringify(
            CryptoJS.AES.decrypt(state, secret, {
              keySize: 128 / 8,
              iv: secret,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            })
          )
        );
      },
    }
  ) as StateCreator<IStoreState>
);

export default useStore;
