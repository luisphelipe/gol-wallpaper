import { BACKGROUND_COLOR } from "../../config/constants";
import { useGameOfLife } from "../../hooks";
import { Board, BoardRow, Cell, LayoutContainer } from "./styles";

const GameOfLife = () => {
  const { board } = useGameOfLife();

  return (
    <LayoutContainer>
      <Board background_color={BACKGROUND_COLOR}>
        {board.map((row) => (
          <BoardRow>
            {row.map((cell) => (
              <Cell active={!!cell} />
            ))}
          </BoardRow>
        ))}
      </Board>
    </LayoutContainer>
  );
};

export default GameOfLife;
