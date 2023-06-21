import React from "react";
import { IGuess } from "../../store";
import { MAX_WORD_LENGTH } from "../../utils";
import Letter from "../letter";

type IProps = {
    guess: IGuess;
    isInvalid: boolean;
};

const Guess = ({ guess, isInvalid }: IProps) => {
    const letters = guess.word ? guess.word.split("") : [];
    console.log("guess", guess);
    const letterList = [...letters, ...Array(MAX_WORD_LENGTH - letters.length).fill("")];

    return (
        <div className={"w-full grid grid-cols-5 gap-3"}>
            {letterList.map((letter, index) => (
                <Letter key={`letter-${index}`} letter={letter} state={guess.state && guess.state[index]} />
            ))}
        </div>
    );
};

export default Guess;
