import { BACKGROUND_COLOR } from "../../config/constants";
import { useGameOfLife } from "../../hooks";
import { Board, BoardRow, Cell } from "./styles";

const GameOfLife = () => {
  const { board } = useGameOfLife();

  return (
    <Board background_color={BACKGROUND_COLOR}>
      {board.map((row) => (
        <BoardRow>
          {row.map((cell) => (
            <Cell active={!!cell} />
          ))}
        </BoardRow>
      ))}
    </Board>
  );
};

export default GameOfLife;
