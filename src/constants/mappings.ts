import { LetterState } from "../utils";

const StateToColor: Record<LetterState, string> = {
  [LetterState.PRESENT]: "bg-yellow-[#CEB02C]",
  [LetterState.MATCH]: "bg-green-[#66A060]",
  [LetterState.MISS]: "bg-gray-[#939B9F]",
};

export default {
  StateToColor,
};
