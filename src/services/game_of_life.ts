export const generate_default_board = (ROWS = 10, COLUMNS = 10) =>
  Array(ROWS)
    .fill(0)
    .map(() => Array(COLUMNS).fill(0));

export const fill_random_board = (board: number[][], chance = 10) => {
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

export const iterate_board = (board: number[][]) => {
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
