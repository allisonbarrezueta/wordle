import React, { useEffect, useState } from "react";

import { usePrevious } from "../hooks";
import useStore, { MAX_GUESSES } from "../store";
import { isValidWord, MAX_WORD_LENGTH } from "../utils";
import Guess from "./guess";

type IState = {
    isGuessInvalid: boolean;
};

const INITIAL_STATE: IState = {
    isGuessInvalid: false,
};

type IProps = {
    guess: string;
    setGuess: React.Dispatch<React.SetStateAction<string>>;
};

const GuessGrid = ({ guess, setGuess }: IProps) => {
    const [{ isGuessInvalid }, setState] = useState(INITIAL_STATE);
    const { alreadyGuessed, addGuess } = useStore();
    const previousGuess = usePrevious(guess);

    useEffect(() => {
        if (guess.length === 0 && previousGuess?.length === MAX_WORD_LENGTH) {
            if (isValidWord(previousGuess)) {
                if (alreadyGuessed.map((g) => g.word).includes(previousGuess)) {
                    setState({ isGuessInvalid: true });
                    setGuess(previousGuess);
                    alert(`Ya adivinates ${previousGuess}`);
                } else {
                    setState({ isGuessInvalid: false });
                    addGuess(previousGuess);
                }
            } else {
                setState({ isGuessInvalid: true });
                setGuess(previousGuess);
                alert(`${previousGuess} no es valida`);
            }
        }
    }, [guess]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isGuessInvalid) {
            timeout = setTimeout(() => {
                setState({ isGuessInvalid: false });
            }, 1000);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [isGuessInvalid]);

    let guesses = [...alreadyGuessed];
    let currentRow = 0;

    if (guesses.length < MAX_GUESSES) {
        currentRow =
            guesses.push({
                word: guess,
            }) - 1;
    }

    const numberOfGuessesRemaining = MAX_GUESSES - guesses.length;
    guesses = guesses.concat(Array(numberOfGuessesRemaining).fill(""));
    console.log("==>", guesses);
    return (
        <div className="flex-1 flex flex-col items-center justify-center py-5 px-4 mx-auto w-10/12">
            <div className="w-full h-full max-h-[70%] max-w-[70%] grid grid-rows-5 gap-3 justify-around">
                {guesses.map((g, index) => (
                    <Guess key={`guess-${index}`} guess={g} isInvalid={isGuessInvalid && index === currentRow} />
                ))}
            </div>
        </div>
    );
};

export default GuessGrid;
