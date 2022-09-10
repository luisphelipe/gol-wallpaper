import { useEffect, useRef, useState } from "react";
import {
  COLUMNS,
  ITERATION_DELAY,
  MAX_ITERATIONS,
  ROWS,
} from "../config/constants";

import {
  fill_random_board,
  generate_default_board,
  iterate_board,
} from "../services/game_of_life";

const useGameOfLife = () => {
  const [board, setBoard] = useState<number[][]>([[]]);
  const iterations = useRef(1);

  const updateBoard = () => {
    if (iterations.current % MAX_ITERATIONS === 0) {
      setBoard((old_board) => fill_random_board(old_board));
    } else {
      setBoard((old_board) => iterate_board(old_board));
    }

    iterations.current++;
  };

  const ref = useRef<any>(null);

  const setup = () => {
    const default_board = generate_default_board(ROWS, COLUMNS);
    const random_board = fill_random_board(default_board);
    setBoard(random_board);

    if (ref.current) return;
    ref.current = setInterval(updateBoard, ITERATION_DELAY);
  };

  useEffect(() => {
    setup();
    // eslint-disable-next-line
  }, []);

  return { board };
};

export default useGameOfLife;
