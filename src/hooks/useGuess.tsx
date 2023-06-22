import { useEffect, useRef, useState } from "react";

import { MAX_WORD_LENGTH, getVowelWithAccent } from "../utils";

const useGuess = (): [string, React.Dispatch<React.SetStateAction<string>>, (letter: string) => void] => {
    const [guess, setGuess] = useState<string>("");
    const previousKey = useRef<string>("");
    const previousKeyBracketLeft = useRef<string>("");

    const isValidKey = (key: string): boolean => {
        if (key === "Backspace" || key === "Enter") {
            return true;
        }

        if (key.includes("Key")) {
            if (
                previousKey.current.includes("Key") ||
                previousKey.current === "" ||
                previousKey.current === "Backspace" ||
                previousKey.current === "Enter"
            ) {
                return true;
            }
        }

        return false;
    };

    const addGuessLetter = (letter: string): void => {
        setGuess((prevGuess) => {
            const newGuess = (letter.length === 1 && prevGuess.length !== MAX_WORD_LENGTH ? prevGuess + letter : prevGuess).toUpperCase();
            console.log(newGuess);

            if (newGuess === "´") {
                previousKeyBracketLeft.current = "BracketLeft";
            } else if (previousKeyBracketLeft?.current === "BracketLeft") {
                const vowelWithAccent = getVowelWithAccent(letter);
                previousKeyBracketLeft.current = "";
                return vowelWithAccent;
            }
            if (letter === "Backspace") {
                return prevGuess.slice(0, -1);
            }
            if (letter === "Enter" && prevGuess.length === MAX_WORD_LENGTH) {
                return "";
            }

            if (newGuess.length === MAX_WORD_LENGTH) {
                return newGuess;
            }
            return newGuess;
        });
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === "BracketLeft" && /[aeiouáéíóú]/i.test(event.code)) {
            previousKeyBracketLeft.current = event.code;
        } else if (previousKeyBracketLeft?.current === "BracketLeft") {
            const vowelWithAccent = getVowelWithAccent(event.code);
            addGuessLetter(vowelWithAccent);
            previousKeyBracketLeft.current = "";
        } else if (isValidKey(event.code)) {
            addGuessLetter(event.key);
        }
        previousKey.current = event.code;
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    return [guess, setGuess, addGuessLetter];
};

export default useGuess;
