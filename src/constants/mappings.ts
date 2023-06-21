import { LetterState } from "../utils";

const StateToColor: Record<LetterState, string> = {
    [LetterState.PRESENT]: "bg-[#CEB02C]",
    [LetterState.MATCH]: "bg-[#66A060]",
    [LetterState.MISS]: "bg-[#939B9F]",
};

export default {
    StateToColor,
};
