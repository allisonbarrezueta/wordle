/* eslint-disable default-case */
import React from "react";
import { mappings } from "../../constants";
import useStore from "../../store";
import { LetterState } from "../../utils";

type IProps = {
    letter: string;
    onClick: (letter: string) => void;
};

const getKeyStyle = (letter: string, keysPressed: Record<string, LetterState>) => {
    const styles: string[] = [];

    if (keysPressed[letter]) {
        if (keysPressed[letter] === LetterState.MISS) {
            styles.push("hover:cursor-not-allowed");
        }
    }

    styles.push(mappings.StateToColor[keysPressed[letter]] || "bg-keyBackgroundLight dark:bg-keyBackgroundDark");
    return styles.join(" ");
};

const Key = ({ letter, onClick }: IProps) => {
    const { keysPressed } = useStore();

    const handleOnClick = () => {
        if (typeof letter === "string") {
            onClick(letter);
        } else {
            onClick("Backspace");
        }
    };

    return (
        <button
            type="button"
            onClick={handleOnClick}
            className={`flex items-center justify-center p-2 sm:p-3 md:p-5 max-h-12 rounded-xs ${
                letter.length > 1 ? "min-w-max" : "min-w-[2rem]"
            } text-18 text-key dark:text-white font-semibold transition-colors ${getKeyStyle(letter, keysPressed)}`}
            disabled={keysPressed[letter] === LetterState.MISS}>
            {letter === "Backspace" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                letter.toUpperCase()
            )}
        </button>
    );
};

export default Key;
