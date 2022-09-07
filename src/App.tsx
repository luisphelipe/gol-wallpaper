import { useEffect, useRef, useState } from "react";

const ROWS = 40;
const COLUMNS = 80;
const ALIVE_COLOR = "black";
// const ALIVE_COLOR = "#ccc";
const DEAD_COLOR = "white";
const BACKGROUND_COLOR = "white";
const ITERATION_DELAY = 1000; // ms

const default_board = Array(ROWS)
  .fill(0)
  .map(() => Array(COLUMNS).fill(0));

const Cell = (props: any) => {
  return (
    <div
      className="cell"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor: props.active ? ALIVE_COLOR : DEAD_COLOR,
      }}
    />
  );
};

const generate_random = (board: number[][], chance = 10) => {
  const board_copy = [];

  for (const row of board) {
    const row_copy = [...row];

    for (let i = 0; i < row.length; i++) {
      if (Math.random() * 100 < chance) {
        row_copy[i] = 1;
      }
    }

    board_copy.push(row_copy);
  }

  return board_copy;
};

const iterate_board = (board: number[][]) => {
  const board_copy = [];

  for (let row = 0; row < board.length; row++) {
    const row_copy = [...board[row]];

    for (let col = 0; col < board[row].length; col++) {
      let sum = 0;

      const alive = row_copy[col];

      sum += board[row - 1] ? board[row - 1][col - 1] || 0 : 0;
      sum += board[row - 1] ? board[row - 1][col] || 0 : 0;
      sum += board[row - 1] ? board[row - 1][col + 1] || 0 : 0;
      sum += board[row] ? board[row][col - 1] || 0 : 0;
      sum += board[row] ? board[row][col + 1] || 0 : 0;
      sum += board[row + 1] ? board[row + 1][col - 1] || 0 : 0;
      sum += board[row + 1] ? board[row + 1][col] || 0 : 0;
      sum += board[row + 1] ? board[row + 1][col + 1] || 0 : 0;

      // Any live cell with two or three live neighbours survives.
      if (alive && sum === 2) row_copy[col] = 1;
      // Any dead cell with three live neighbours becomes a live cell.
      else if (sum === 3) row_copy[col] = 1;
      // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
      else row_copy[col] = 0;
    }

    board_copy.push(row_copy);
  }

  return board_copy;
};

function App() {
  const [board, setBoard] = useState(default_board);
  const iterations = useRef(0);

  const updateBoard = () => {
    if (iterations.current % 100 === 0) {
      setBoard(generate_random(board));
    } else {
      setBoard((old) => iterate_board(old));
    }

    iterations.current++;
  };

  const ref = useRef<any>(null);

  const setup = () => {
    setBoard(generate_random(board));
    if (ref.current) return;
    ref.current = setInterval(updateBoard, ITERATION_DELAY);
  };

  useEffect(() => {
    setup();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      {board.map((row) => (
        <div
          style={{
            width: "100vw",
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {row.map((cell) => (
            <Cell active={cell} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
