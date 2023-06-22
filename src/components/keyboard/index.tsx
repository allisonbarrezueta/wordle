import React from "react";
import Key from "../key";

const KEYBOARD_KEYS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ", "´"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

type IProps = {
    onLetterPressed: (letter: string) => void;
};

const KeyboardInput = ({ onLetterPressed }: IProps) => {
    return (
        <div className="h-1/4 w-10/12 flex-0 flex flex-col items-center py-8 mx-auto justify-center px-5 bg-darkHeader bg-opacity-30 rounded-md dark:bg-darkHeader dark:bg-opacity-3">
            <div className="w-full flex flex-col space-y-1 md:space-y-2 items-center">
                {KEYBOARD_KEYS.map((row, rowIndex) => (
                    <div key={rowIndex} className={`row-${rowIndex + 1} flex space-x-1 md:space-x-2 w-full items-center justify-center`}>
                        {row.map((key, keyIndex) => (
                            <Key key={`${rowIndex}-key-${keyIndex}`} letter={key} onClick={onLetterPressed} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyboardInput;
