import { ThemeProvider } from "styled-components";
import { theme } from "./config";
import { GameOfLife } from "./screens";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GameOfLife />
    </ThemeProvider>
  );
}

export default App;
