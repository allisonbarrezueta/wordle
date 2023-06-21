import { mappings } from "../../constants";
import useStore from "../../store";
import { LetterState } from "../../utils";

type IProps = {
  letter: string;
  state?: LetterState;
};

const Letter = ({ letter, state }: IProps) => {
  const { keysPressed } = useStore();

  const getWrapperStyle = () => {
    const styles: string[] = [];

    if (state) {
      styles.push(mappings.StateToColor[state]);
    } else if (keysPressed[letter] === LetterState.MISS) {
      styles.push("bg-[#939B9F]");
    }
    styles.push("bg-[rgba(147, 155, 159, 0.3)]");
  };

  return (
    <div
      className={`rounded-xs flex items-center justify-center w-16 h-16 bg-[#939b9f4c] ${getWrapperStyle()}`}
    >
      <h2
        className={`font-semibold text-35 text-white  ${
          state || keysPressed[letter] === LetterState.MISS ? "text-white" : ""
        }`}
      >
        {letter}
      </h2>
    </div>
  );
};

Letter.defaultProps = {
  state: undefined,
};

export default Letter;
