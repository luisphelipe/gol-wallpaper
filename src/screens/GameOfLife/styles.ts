import styled, { css, keyframes } from "styled-components";

interface BoardProps {
  background_color: string;
}

export const Board = styled.div<BoardProps>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.background};
`;

export const BoardRow = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

interface CellProps {
  active: boolean;
}

const alive_born = (theme: any) => keyframes`
  0% {
    background-color: ${theme.colors.alive_born};
  }

  20% {
    background-color: ${theme.colors.alive};
  }

  100% {
    background-color: ${theme.colors.alive_stable};
  }
`;

const cell_alive = css`
  background-color: ${(props) => props.theme.colors.alive_stable};
  animation-name: ${(props) => alive_born(props.theme)};
  animation-duration: ${(props) => props.theme.iteration_delay * 5}ms;
`;

const cell_dead = css`
  background-color: ${(props) => props.theme.colors.dead};
`;

export const Cell = styled.div<CellProps>`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid white;
  ${(props) => (props.active ? cell_alive : cell_dead)};
`;
